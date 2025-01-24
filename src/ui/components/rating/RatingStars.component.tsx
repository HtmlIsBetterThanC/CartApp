import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import styles from './RatingStars.styles';
import { Icon, Text } from 'react-native-paper';
import UiRating from '@/src/model/ui/UiRating';
import { useCallback } from 'react';

interface RatingStarsProps {
  rating: UiRating;
  containerStyle?: StyleProp<ViewStyle>;
  countStyle?: StyleProp<TextStyle>;
  starsSize?: number;
}

const RatingStarsComponent = (props: RatingStarsProps) => {
  const roundedRating = Math.round(props.rating.rate);
  const starComponent = useCallback(
    (rating: number, position: number) => (
      <Icon
        key={rating}
        source="star"
        size={props.starsSize ?? 20}
        color={position <= roundedRating ? 'yellow' : 'grey'}
      />
    ),
    [props.starsSize, roundedRating],
  );

  return (
    <View style={[styles.container, props.containerStyle]}>
      {[...Array(5).keys()].map((rating, index) => starComponent(rating, index + 1))}
      <View style={[styles.spacer]} />
      <Text style={[props.countStyle]}>{props.rating.count}</Text>
    </View>
  );
};

export default RatingStarsComponent;
