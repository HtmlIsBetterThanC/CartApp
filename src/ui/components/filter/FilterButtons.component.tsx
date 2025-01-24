import { StyleProp, View, ViewStyle } from 'react-native';
import { styles } from '@/src/ui/components/filter/FilterButtons.styles';
import { Button, Icon } from 'react-native-paper';
import UiCategory from '@/src/model/ui/UiCategory';
import i18n from '@/src/localization/i18n';
import { useCallback } from 'react';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';

interface FilterButtonsProps {
  theme: MD3Theme;
  selectedCategory: UiCategory | undefined;
  isRatingAscending: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  onCategoryPress: () => void;
  onRatingPress: () => void;
}

const FilterButtons = (props: FilterButtonsProps) => {
  const ratingIcon = useCallback(() => {
    return (
      <Icon
        color={props.theme.colors.onPrimaryContainer}
        source={props.isRatingAscending ? 'arrow-up' : 'arrow-down'}
        size={28}
      />
    );
  }, [props.isRatingAscending, props.theme.colors.onPrimaryContainer]);

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Button
        theme={props.theme}
        style={[props.buttonStyle]}
        labelStyle={[styles.buttonLabel, props.buttonStyle]}
        mode={'contained-tonal'}
        onPress={props.onCategoryPress}>
        {i18n.t('filter.category')}
      </Button>
      <Button
        style={[props.buttonStyle]}
        labelStyle={[styles.buttonLabel, props.buttonStyle]}
        mode={'contained'}
        onPress={props.onRatingPress}
        icon={ratingIcon}>
        {i18n.t('filter.rating')}
      </Button>
    </View>
  );
};

export default FilterButtons;
