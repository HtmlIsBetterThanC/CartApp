import UiProduct from '@/src/model/ui/UiProduct';
import { StyleProp, ViewStyle } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { styles } from '@/src/ui/screens/products/Products.styles';
import ProductList from '@/src/ui/components/product/list/ProductList.component';
import UiCategory from '@/src/model/ui/UiCategory';
import FilterButtons from '@/src/ui/components/filter/FilterButtons.component';
import { useCallback, useState } from 'react';
import CategoryDialog from '@/src/ui/components/categoryDialog/CategoryDialog.component';
import { networkCategories } from '@/src/model/network/NetworkCategory';

interface ProductProps {
  isLoading: boolean;
  products: UiProduct[];
  onProductPress: (id: number) => void;
  onFavouritePress: (product: UiProduct) => void;
  onCategoryPress: (category: UiCategory) => void;
  onRatingPress: () => void;
  onFilterClear: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const Products = (props: ProductProps) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<UiCategory>();
  const [isRatingAscending, setRatingAscending] = useState<boolean>();
  const [isDialogVisible, setDialogVisible] = useState(false);

  const onRatingPress = useCallback(() => {
    setRatingAscending((prev) => !prev);
    props.onRatingPress();
  }, [props.onRatingPress]);

  const showDialog = useCallback(() => setDialogVisible(true), []);
  const onDismiss = useCallback(() => setDialogVisible(false), []);

  const onCategoryPress = useCallback(
    (category: UiCategory) => {
      setSelectedCategory(category);
      selectedCategory && props.onCategoryPress(selectedCategory);
      onDismiss();
    },
    [props.onCategoryPress, selectedCategory],
  );

  const onFilterClear = useCallback(() => {
    setRatingAscending(undefined);
    setSelectedCategory(undefined);
    props.onFilterClear();
  }, [props.onFilterClear]);

  return (
    <Surface style={[styles.container, props.containerStyle]}>
      <FilterButtons
        theme={theme}
        selectedCategory={selectedCategory}
        isRatingAscending={isRatingAscending}
        onCategoryPress={showDialog}
        onRatingPress={onRatingPress}
        onClear={onFilterClear}
      />
      <ProductList
        theme={theme}
        isLoading={props.isLoading}
        data={props.products}
        onProductPress={props.onProductPress}
        onFavouritePress={props.onFavouritePress}
      />
      <CategoryDialog
        theme={theme}
        categories={networkCategories}
        isDialogVisible={isDialogVisible}
        onDismiss={onDismiss}
        onCategoryChange={onCategoryPress}
      />
    </Surface>
  );
};

export default Products;
