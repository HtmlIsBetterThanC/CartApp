import { StyleProp, ViewStyle } from 'react-native';
import UiProduct from '@/src/model/ui/UiProduct';
import { ProgressBar, Surface, useTheme } from 'react-native-paper';
import { styles } from '@/src/ui/screens/product/Product.styles';
import ProductDetail from '@/src/ui/components/product/detail/ProductDetail.component';
import FavouriteFAB from '@/src/ui/components/favourite/fab/FavouriteFAB.component';

interface ProductProps {
  isLoading: boolean;
  product: UiProduct | undefined;
  onFavouritePress: (product: UiProduct) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const Product = (props: ProductProps) => {
  const theme = useTheme();
  const product = props.product;

  return (
    <Surface theme={theme} style={[styles.container, props.containerStyle]}>
      {props.isLoading || !props.product ? (
        <ProgressBar indeterminate={true} />
      ) : (
        <>
          <ProductDetail product={product!} />
          <FavouriteFAB
            theme={theme}
            isFavourite={product?.isFavourite ?? false}
            onPress={() => props.onFavouritePress(product!)}
          />
        </>
      )}
    </Surface>
  );
};

export default Product;
