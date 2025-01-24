import UiProduct from '@/src/model/ui/UiProduct';
import { StyleProp, ViewStyle } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { styles } from '@/src/ui/screens/products/Products.styles';
import ProductList from '@/src/ui/components/product/list/ProductList.component';
import UiCategory, { uiCategories } from '@/src/model/ui/UiCategory';
import FilterButtons from '@/src/ui/components/filter/FilterButtons.component';
import { useCallback, useMemo, useState } from 'react';
import CategoryDialog from '@/src/ui/components/categoryDialog/CategoryDialog.component';

interface ProductProps {
  isLoading: boolean;
  products: UiProduct[];
  isReadOnly: boolean;
  onProductPress: (id: number) => void;
  onFavouritePress: (product: UiProduct) => void;
  onCategoryPress?: (category: UiCategory) => void;
  onRatingPress?: () => void;
  onFilterClear?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const Products = (props: ProductProps) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<UiCategory>();
  const [isRatingAscending, setRatingAscending] = useState<boolean>();
  const [isDialogVisible, setDialogVisible] = useState(false);

  const isClearAvailable = useMemo(() => {
    return selectedCategory !== undefined || isRatingAscending !== undefined;
  }, [isRatingAscending, selectedCategory]);

  const onRatingPress = useCallback(() => {
    setRatingAscending((prev) => !prev);
    props.onRatingPress?.();
  }, [props.onRatingPress]);

  const showDialog = useCallback(() => setDialogVisible(true), []);
  const onDismiss = useCallback(() => setDialogVisible(false), []);

  const onCategoryPress = useCallback(
    (category: UiCategory) => {
      category && props.onCategoryPress?.(category);
      setSelectedCategory(category);
      onDismiss();
    },
    [onDismiss, props.onCategoryPress],
  );

  const onFilterClear = useCallback(() => {
    setRatingAscending(undefined);
    setSelectedCategory(undefined);
    props.onFilterClear?.();
  }, [props.onFilterClear]);

  return (
    <Surface style={[styles.container, props.containerStyle]}>
      {!props.isReadOnly && (
        <FilterButtons
          theme={theme}
          selectedCategory={selectedCategory}
          isRatingAscending={isRatingAscending}
          isClearAvailable={isClearAvailable}
          onCategoryPress={showDialog}
          onRatingPress={onRatingPress}
          onClear={onFilterClear}
        />
      )}
      <ProductList
        theme={theme}
        isLoading={props.isLoading}
        data={props.products}
        onProductPress={props.onProductPress}
        onFavouritePress={props.onFavouritePress}
      />
      {!props.isReadOnly && (
        <CategoryDialog
          theme={theme}
          categories={uiCategories}
          isDialogVisible={isDialogVisible}
          onDismiss={onDismiss}
          onCategoryChange={onCategoryPress}
        />
      )}
    </Surface>
  );
};

export default Products;
