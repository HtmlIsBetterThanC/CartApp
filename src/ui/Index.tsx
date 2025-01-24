import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Products from '@/src/ui/screens/products/Products.screen';
import { useCallback, useEffect, useState } from 'react';
import UiProduct from '@/src/model/ui/UiProduct';
import useNetworkManager from '@/src/hooks/useNetworkManager';
import NetworkProduct, { toUiProduct } from '@/src/model/network/NetworkProduct';
import UiCategory from '@/src/model/ui/UiCategory';
import Product from '@/src/ui/screens/product/Product.screen';
import usePreferencesManager from '@/src/hooks/usePreferencesManager';

enum Routes {
  products = 'Products',
  product = 'Product',
  favourite = 'Favourite',
}

type RootStackParamList = {
  Products: undefined;
  Product: { id: number };
  Favourite: undefined;
};

type ProductsProps = NativeStackScreenProps<RootStackParamList, Routes.products>;
type ProductProps = NativeStackScreenProps<RootStackParamList, Routes.product>;
type FavouriteProps = NativeStackScreenProps<RootStackParamList, Routes.favourite>;

function RouteProducts({ navigation }: ProductsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<UiProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<UiProduct[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<UiCategory>();
  const [isRatingAscending, setIsRatingAscending] = useState<boolean>();
  const networkManager = useNetworkManager();
  const preferenceManager = usePreferencesManager();

  useEffect(() => {
    setIsLoading(true);
    networkManager
      .getAllProducts()
      .then((networkProducts: NetworkProduct[]) => {
        const preferredProducts = preferenceManager.getFavourites();
        const uiProducts = networkProducts.map((product) => {
          return {
            ...toUiProduct(product),
            isFavourite: preferredProducts.includes(product.id),
          };
        });
        setProducts(uiProducts);
        setFilteredProducts(uiProducts);
      })
      .finally(() => setIsLoading(false));
  }, [networkManager, preferenceManager]);

  useFocusEffect(
    useCallback(() => {
      const preferredProducts = preferenceManager.getFavourites();
      setProducts((prev) =>
        prev.map((product) => {
          return { ...product, isFavourite: preferredProducts.includes(product.id) };
        }),
      );
    }, [preferenceManager]),
  );

  useEffect(() => {
    setIsLoading(true);
    if (isRatingAscending === undefined && categoryFilter === undefined) {
      setFilteredProducts(products);
    } else {
      let uiProducts = [...products];
      if (isRatingAscending !== undefined) {
        uiProducts = uiProducts.sort((a, b) =>
          isRatingAscending ? b.rating.rate - a.rating.rate : a.rating.rate - b.rating.rate,
        );
      }
      setFilteredProducts(
        categoryFilter !== undefined
          ? uiProducts.filter((product) => product.category === categoryFilter)
          : uiProducts,
      );
    }
    setIsLoading(false);
  }, [categoryFilter, isRatingAscending, products]);

  const onProductPress = (id: number) => {
    navigation.navigate(Routes.product, { id });
  };
  const onFavouritePress = useCallback(
    (product: UiProduct) => {
      preferenceManager.toggleFavourites(product.id);
      setProducts((prev) => {
        const idx = prev.indexOf(product);
        const isFavourite = !prev[idx].isFavourite;
        prev[idx] = { ...prev[idx], isFavourite: isFavourite };
        return [...prev];
      });
    },
    [preferenceManager],
  );
  const onCategoryPress = useCallback((category: UiCategory) => {
    setCategoryFilter(category);
  }, []);
  const onRatingPress = useCallback(() => {
    setIsRatingAscending((prev) => !prev);
  }, []);
  const onFilterClear = useCallback(() => {
    setCategoryFilter(undefined);
    setIsRatingAscending(undefined);
  }, []);

  return (
    <Products
      isLoading={isLoading}
      products={filteredProducts}
      onProductPress={onProductPress}
      onFavouritePress={onFavouritePress}
      onCategoryPress={onCategoryPress}
      onRatingPress={onRatingPress}
      onFilterClear={onFilterClear}
    />
  );
}

function RouteProduct({ route }: ProductProps) {
  const id = route.params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<UiProduct>();
  const networkManager = useNetworkManager();
  const preferenceManager = usePreferencesManager();

  useEffect(() => {
    setIsLoading(true);
    networkManager
      .getProductById(id)
      .then((networkProduct: NetworkProduct) => {
        const isFavourite = preferenceManager.isFavourite(networkProduct.id);
        setProduct({ ...toUiProduct(networkProduct), isFavourite });
      })
      .finally(() => setIsLoading(false));
  }, [id, networkManager, preferenceManager]);

  const onFavouritePress = useCallback(
    (product: UiProduct) => {
      setProduct((prev) => {
        if (prev) {
          preferenceManager.toggleFavourites(product.id);
          const isFavourite = !prev.isFavourite;
          return { ...prev, isFavourite: isFavourite };
        }
      });
    },
    [preferenceManager],
  );

  return <Product isLoading={isLoading} product={product} onFavouritePress={onFavouritePress} />;
}

function RouteFavourite({ navigation }: FavouriteProps) {
  return <View></View>;
}

const Index = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Routes.products} component={RouteProducts} />
        <Stack.Screen name={Routes.product} component={RouteProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
