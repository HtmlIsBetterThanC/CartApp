import { StyleProp, ViewStyle } from 'react-native';
import { FAB } from 'react-native-paper';
import { styles } from '@/src/ui/components/favourite/fab/FavouriteFAB.styles';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';

interface FavouriteFABProps {
  theme: MD3Theme;
  isFavourite: boolean;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const FavouriteFAB = (props: FavouriteFABProps) => {
  return (
    <FAB
      style={[styles.fab, props.containerStyle]}
      theme={props.theme}
      elevation={4}
      size={'medium'}
      icon={props.isFavourite ? 'heart' : 'heart-outline'}
      color={props.isFavourite ? 'red' : 'grey'}
      onPress={props.onPress}
    />
  );
};

export default FavouriteFAB;
