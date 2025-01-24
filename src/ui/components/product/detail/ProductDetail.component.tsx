import { StyleProp, View, ViewStyle } from 'react-native';
import UiProduct from '@/src/model/ui/UiProduct';
import { Icon, ProgressBar, Surface, Text } from 'react-native-paper';
import { styles } from './ProductDetail.styles';
import RatingStarsComponent from '@/src/ui/components/rating/RatingStars.component';
import i18n from '@/src/localization/i18n';

interface ProductProps {
  isLoading: boolean;
  product: UiProduct | undefined;
  onFavouritePress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ProductDetailComponent = (props: ProductProps) => {
  const product = props.product;
  return (
    <Surface style={[styles.container]} elevation={4}>
      {props.isLoading ? (
        <ProgressBar indeterminate={true} />
      ) : (
        <View style={styles.product}>
          <Text variant={'headlineLarge'}>
            {i18n.t('product.detail.title', { title: product?.title ?? '' })}
          </Text>
          <Text variant={'headlineMedium'}>
            {i18n.t('product.detail.category', { category: product?.category ?? '' })}
          </Text>
          <View style={[styles.image]}>
            <Icon source={{ uri: product?.imagePath }} size={200} />
          </View>
          <Text variant={'titleLarge'}>
            {' '}
            {i18n.t('product.detail.id', { id: product?.id ?? '' })}
          </Text>
          <Text variant={'titleLarge'}>
            {' '}
            {i18n.t('product.detail.description', { description: product?.description ?? '' })}
          </Text>
          <Text variant={'titleLarge'}>
            {' '}
            {i18n.t('product.detail.price', { price: product?.price ?? '' })}
          </Text>
          {product?.rating && (
            <RatingStarsComponent
              countStyle={[styles.ratingCount]}
              starsSize={28}
              rating={product!.rating}
            />
          )}
        </View>
      )}
    </Surface>
  );
};

export default ProductDetailComponent;
