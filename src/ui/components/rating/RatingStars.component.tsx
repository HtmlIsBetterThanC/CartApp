import { StyleProp, View, ViewStyle } from 'react-native';
import styles from './RatingStars.styles';
import { Icon, Text } from 'react-native-paper';
import UiRating from '@/src/model/ui/UiRating';

interface RatingStarsProps {
  rating: UiRating;
  containerStyle?: StyleProp<ViewStyle>;
  countColor?: string;
}

const RatingStarsComponent = (props: RatingStarsProps) => {
  const roundendRating = Math.round(props.rating.rate);

  return (
    <View style={[styles.container, props.containerStyle]}>
      {[...Array(roundendRating).keys()].map((rating) => (
        <Icon key={rating} source="star" size={20} color={'yellow'} />
      ))}
      <View style={[styles.spacer]} />
      <Text style={[{ color: props.countColor }]}>{props.rating.count}</Text>
    </View>
  );
};

export default RatingStarsComponent;
