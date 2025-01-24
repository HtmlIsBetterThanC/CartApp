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

const Products = ({
  isLoading,
  products,
  isReadOnly,
  onProductPress,
  onFavouritePress,
  onCategoryPress,
  onRatingPress,
  onFilterClear,
  containerStyle,
}: ProductProps) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<UiCategory>();
  const [isRatingAscending, setRatingAscending] = useState<boolean>();
  const [isDialogVisible, setDialogVisible] = useState(false);

  const isClearAvailable = useMemo(() => {
    return selectedCategory !== undefined || isRatingAscending !== undefined;
  }, [isRatingAscending, selectedCategory]);

  const onRatingPressCallback = useCallback(() => {
    setRatingAscending((prev) => !prev);
    onRatingPress?.();
  }, [onRatingPress]);

  const showDialog = useCallback(() => setDialogVisible(true), []);
  const onDismiss = useCallback(() => setDialogVisible(false), []);

  const onCategoryPressCallback = useCallback(
    (category: UiCategory) => {
      category && onCategoryPress?.(category);
      setSelectedCategory(category);
      onDismiss();
    },
    [onDismiss, onCategoryPress],
  );

  const onFilterClearCallback = useCallback(() => {
    setRatingAscending(undefined);
    setSelectedCategory(undefined);
    onFilterClear?.();
  }, [onFilterClear]);

  return (
    <Surface style={[styles.container, containerStyle]}>
      {!isReadOnly && (
        <FilterButtons
          theme={theme}
          selectedCategory={selectedCategory}
          isRatingAscending={isRatingAscending}
          isClearAvailable={isClearAvailable}
          onCategoryPress={showDialog}
          onRatingPress={onRatingPressCallback}
          onClear={onFilterClearCallback}
        />
      )}
      <ProductList
        theme={theme}
        isLoading={isLoading}
        data={products}
        onProductPress={onProductPress}
        onFavouritePress={onFavouritePress}
      />
      {!isReadOnly && (
        <CategoryDialog
          theme={theme}
          categories={uiCategories}
          isDialogVisible={isDialogVisible}
          onDismiss={onDismiss}
          onCategoryChange={onCategoryPressCallback}
        />
      )}
    </Surface>
  );
};

export default Products;
