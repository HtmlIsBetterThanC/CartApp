import { ScrollView, StyleProp, useWindowDimensions, ViewStyle } from 'react-native';
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
  const minHeight = useWindowDimensions().height - 150;
  const product = props.product;

  return (
    <ScrollView style={[styles.container, props.containerStyle]}>
      <Surface theme={theme} style={[styles.content]}>
        {props.isLoading || !props.product ? (
          <ProgressBar indeterminate={true} />
        ) : (
          <ProductDetail containerStyle={{ minHeight: minHeight }} product={product!} />
        )}
      </Surface>
      <FavouriteFAB
        theme={theme}
        isFavourite={product?.isFavourite ?? false}
        onPress={() => props.onFavouritePress(product!)}
      />
    </ScrollView>
  );
};

export default Product;
