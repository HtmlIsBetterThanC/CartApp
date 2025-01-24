import { StyleProp, View, ViewStyle } from 'react-native';
import UiProduct from '@/src/model/ui/UiProduct';
import { Icon, Text } from 'react-native-paper';
import { styles } from './ProductDetail.styles';
import RatingStarsComponent from '@/src/ui/components/rating/RatingStars.component';
import i18n from '@/src/localization/i18n';

interface ProductDetailProps {
  product: UiProduct;
  containerStyle?: StyleProp<ViewStyle>;
}

const ProductDetail = (props: ProductDetailProps) => {
  const product = props.product;
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Text variant={'headlineLarge'}>
        {i18n.t('product.detail.title', { title: product.title })}
      </Text>
      <Text variant={'headlineMedium'}>
        {i18n.t('product.detail.category', { category: product.category })}
      </Text>
      <View style={[styles.image]}>
        <Icon source={{ uri: product.imagePath }} size={200} />
      </View>
      <Text variant={'titleLarge'}> {i18n.t('product.detail.id', { id: product.id })}</Text>
      <Text variant={'titleLarge'}>
        {i18n.t('product.detail.description', { description: product.description })}
      </Text>
      <Text variant={'titleLarge'}>{i18n.t('product.detail.price', { price: product.price })}</Text>

      <RatingStarsComponent
        countStyle={[styles.ratingCount]}
        starsSize={28}
        rating={product.rating}
      />
    </View>
  );
};

export default ProductDetail;
