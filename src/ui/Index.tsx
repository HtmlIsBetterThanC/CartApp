import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  Route,
  useFocusEffect,
} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import Products from '@/src/ui/screens/products/Products.screen';
import { useCallback, useEffect, useState } from 'react';
import UiProduct from '@/src/model/ui/UiProduct';
import useNetworkManager from '@/src/hooks/useNetworkManager';
import NetworkProduct, { toUiProduct } from '@/src/model/network/NetworkProduct';
import UiCategory from '@/src/model/ui/UiCategory';
import Product from '@/src/ui/screens/product/Product.screen';
import usePreferencesManager from '@/src/hooks/usePreferencesManager';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import i18n from '@/src/localization/i18n';
import { TopAppBar } from '@/src/ui/components/topAppBar/TopAppBar.component';
import { useTheme } from 'react-native-paper';

enum Routes {
  products = 'Products',
  home = 'Home',
  product = 'Product',
  favourite = 'Favourite',
}

type RootStackParamList = {
  Products: undefined;
  Home: undefined;
  Product: { id: number };
  Favourite: undefined;
};

type HomeProps = NativeStackScreenProps<RootStackParamList, Routes.home>;
type ProductProps = NativeStackScreenProps<RootStackParamList, Routes.product>;
type FavouriteProps = NativeStackScreenProps<RootStackParamList, Routes.favourite>;

function RouteHome({ navigation }: HomeProps) {
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
        const uiProducts = networkProducts.map((product) =>
          toUiProduct(product, preferredProducts.includes(product.id)),
        );
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
      isReadOnly={false}
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
      .then((networkProduct: NetworkProduct) =>
        setProduct(toUiProduct(networkProduct, preferenceManager.isFavourite(networkProduct.id))),
      )
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
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<UiProduct[]>([]);
  const [favouritesProducts, setFavouritesProducts] = useState<UiProduct[]>([]);
  const networkManager = useNetworkManager();
  const preferenceManager = usePreferencesManager();

  useEffect(() => {
    setIsLoading(true);
    networkManager
      .getAllProducts()
      .then((networkProducts: NetworkProduct[]) => {
        const preferredProducts = preferenceManager.getFavourites();
        const uiProducts = networkProducts.map((product) =>
          toUiProduct(product, preferredProducts.includes(product.id)),
        );
        setProducts(uiProducts);
        setFavouritesProducts(uiProducts.filter((product) => product.isFavourite));
      })
      .finally(() => setIsLoading(false));
  }, [networkManager, preferenceManager]);

  useFocusEffect(
    useCallback(() => {
      const preferredProducts = preferenceManager.getFavourites();
      setFavouritesProducts(() =>
        products
          .filter((product) => preferredProducts.includes(product.id))
          .map((product) => {
            return { ...product, isFavourite: true };
          }),
      );
    }, [preferenceManager, products]),
  );

  const onProductPress = (id: number) => {
    navigation.navigate(Routes.product, { id });
  };
  const onFavouritePress = useCallback(
    (product: UiProduct) => {
      preferenceManager.toggleFavourites(product.id);
      setFavouritesProducts((prev) => {
        return prev.filter((element) => element.id !== product.id);
      });
    },
    [preferenceManager],
  );

  return (
    <Products
      isLoading={isLoading}
      products={favouritesProducts}
      isReadOnly={true}
      onProductPress={onProductPress}
      onFavouritePress={onFavouritePress}
    />
  );
}

const Index = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const Tab = createMaterialBottomTabNavigator();

  const tabIcon = useCallback((iconName: string, color: string) => {
    // @ts-ignore
    // the type of name is not public
    return <MaterialCommunityIcons name={iconName} color={color} size={26} />;
  }, []);

  const getHeaderTitle = useCallback((route: Partial<Route<string>>) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? Routes.products;

    switch (routeName) {
      case Routes.favourite:
        return i18n.t('navigation.favourites');
      default:
        return i18n.t('navigation.products');
    }
  }, []);

  const TabsNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name={Routes.home}
          options={{
            tabBarLabel: i18n.t('navigation.home'),
            tabBarIcon: ({ color }: { color: string }) => tabIcon('home', color),
          }}
          component={RouteHome}
        />
        <Tab.Screen
          name={Routes.favourite}
          options={{
            tabBarLabel: i18n.t('navigation.favourites'),
            tabBarIcon: ({ color }: { color: string }) => tabIcon('heart', color),
          }}
          component={RouteFavourite}
        />
      </Tab.Navigator>
    );
  };

  const paperTheme = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: ({ navigation, options }) => (
            <TopAppBar
              theme={paperTheme}
              // @ts-ignore
              title={options.headerTitle}
              onBackPress={navigation.canGoBack() ? () => navigation.goBack() : undefined}
            />
          ),
        }}>
        <Stack.Screen
          name={Routes.products}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            statusBarBackgroundColor: paperTheme.colors.primaryContainer,
          })}
          component={TabsNavigator}
        />
        <Stack.Screen
          name={Routes.product}
          options={{ headerTitle: i18n.t('navigation.product') }}
          component={RouteProduct}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
