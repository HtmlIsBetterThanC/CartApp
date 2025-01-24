import { StyleProp, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { styles } from '@/src/ui/components/favourite/FavouriteButton.styles';

interface FavouriteButtonProps {
  isFavourite: boolean;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const FavouriteButton = (props: FavouriteButtonProps) => {
  return (
    <IconButton
      style={[styles.container, props.containerStyle]}
      icon={props.isFavourite ? 'heart' : 'heart-outline'}
      iconColor={props.isFavourite ? 'red' : 'grey'}
      size={32}
      onPress={props.onPress}
    />
  );
};

export default FavouriteButton;
