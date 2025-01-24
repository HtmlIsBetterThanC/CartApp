import UiProduct from '@/src/model/ui/UiProduct';
import { StyleProp, ViewStyle } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { styles } from '@/src/ui/screens/products/Products.styles';
import ProductList from '@/src/ui/components/product/list/ProductList.component';
import UiCategory from '@/src/model/ui/UiCategory';
import FilterButtons from '@/src/ui/components/filter/FilterButtons.component';
import { useCallback, useState } from 'react';

interface ProductProps {
  isLoading: boolean;
  products: UiProduct[];
  onProductPress: (id: number) => void;
  onFavouritePress: (product: UiProduct) => void;
  onCategoryPress: (category: UiCategory) => void;
  onRatingPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const Products = (props: ProductProps) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<UiCategory>();
  const [isRatingAscending, setRatingAscending] = useState(true);

  const onCategoryPress = () => {
    selectedCategory && props.onCategoryPress(selectedCategory);
  };

  const onRatingPress = useCallback(() => {
    setRatingAscending((prev) => !prev);
    props.onRatingPress();
  }, [props]);

  return (
    <Surface style={[styles.container, props.containerStyle]}>
      <FilterButtons
        theme={theme}
        selectedCategory={selectedCategory}
        isRatingAscending={isRatingAscending}
        onCategoryPress={onCategoryPress}
        onRatingPress={onRatingPress}
      />
      <ProductList
        theme={theme}
        isLoading={props.isLoading}
        data={props.products}
        onProductPress={props.onProductPress}
        onFavouritePress={props.onFavouritePress}
      />
    </Surface>
  );
};

export default Products;
