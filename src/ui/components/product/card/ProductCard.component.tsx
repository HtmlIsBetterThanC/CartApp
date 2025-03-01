import { StyleProp, ViewStyle } from 'react-native';
import UiProduct from '@/src/model/ui/UiProduct';
import { Card, MD3Theme, Text } from 'react-native-paper';
import { styles } from '@/src/ui/components/product/card/ProductCard.styles';
import RatingStarsComponent from '@/src/ui/components/rating/RatingStars.component';
import { useCallback } from 'react';
import FavouriteButton from '@/src/ui/components/favourite/button/FavouriteButton.component';

interface ProductCardProps {
  theme: MD3Theme;
  product: UiProduct;
  onProductPress: () => void;
  onFavouritePress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ProductCardComponent = (props: ProductCardProps) => {
  const theme = props.theme;
  const themeColors = theme.colors;
  const product = props.product;

  const favoriteButton = useCallback(() => {
    return (
      <FavouriteButton
        isFavourite={product.isFavourite ?? false}
        onPress={props.onFavouritePress}
      />
    );
  }, [product.isFavourite, props.onFavouritePress]);

  return (
    <Card
      style={[styles.container, props.containerStyle]}
      theme={theme}
      mode={'contained'}
      onPress={props.onProductPress}>
      <Card.Title
        titleStyle={{ color: themeColors.primary }}
        subtitleStyle={{ color: themeColors.secondary }}
        titleVariant={'headlineLarge'}
        title={product.title}
        subtitle={product.category}
        right={favoriteButton}
      />
      <Card.Cover source={{ uri: product.imagePath }} resizeMode={'contain'} />
      <Card.Content style={[styles.content]}>
        <Text variant="bodyMedium">{product.description}</Text>
        <Text style={[{ color: themeColors.secondary }]} variant="bodyLarge">
          {`€${product.price}`}
        </Text>
        <RatingStarsComponent
          rating={product.rating}
          countStyle={[{ color: themeColors.tertiary }]}
        />
      </Card.Content>
    </Card>
  );
};

export default ProductCardComponent;
