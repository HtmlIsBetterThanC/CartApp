import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import styles from './RatingStars.styles';
import { Icon, Text } from 'react-native-paper';
import UiRating from '@/src/model/ui/UiRating';

interface RatingStarsProps {
  rating: UiRating;
  containerStyle?: StyleProp<ViewStyle>;
  countStyle?: StyleProp<TextStyle>;
  starsSize?: number;
}

const RatingStarsComponent = (props: RatingStarsProps) => {
  const roundedRating = Math.round(props.rating.rate);

  return (
    <View style={[styles.container, props.containerStyle]}>
      {[...Array(roundedRating).keys()].map((rating) => (
        <Icon key={rating} source="star" size={props.starsSize ?? 20} color={'yellow'} />
      ))}
      <View style={[styles.spacer]} />
      <Text style={[props.countStyle]}>{props.rating.count}</Text>
    </View>
  );
};

export default RatingStarsComponent;
