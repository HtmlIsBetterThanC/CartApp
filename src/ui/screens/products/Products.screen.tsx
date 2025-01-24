import UiProduct from '@/src/model/ui/UiProduct';
import { StyleProp, ViewStyle } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { styles } from '@/src/ui/screens/products/Products.styles';
import ProductList from '@/src/ui/components/product/list/ProductList.component';

interface ProductProps {
  isLoading: boolean;
  products: UiProduct[];
  onProductPress: (id: number) => void;
  onFavouritePress: (product: UiProduct) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const Products = (props: ProductProps) => {
  const theme = useTheme();

  return (
    <Surface style={[styles.container, props.containerStyle]}>
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
