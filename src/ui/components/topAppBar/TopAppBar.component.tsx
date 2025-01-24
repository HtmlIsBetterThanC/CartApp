import { Appbar } from 'react-native-paper';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { styles } from '@/src/ui/components/topAppBar/TopAppBar.styles';

interface TopAppBarProps {
  theme: MD3Theme;
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

export const TopAppBar = (props: TopAppBarProps) => {
  const themeColors = props.theme.colors;
  return (
    <Appbar.Header
      style={[
        styles.container,
        { backgroundColor: themeColors.primaryContainer },
        props.containerStyle,
      ]}
      theme={props.theme}
      mode={'center-aligned'}
      statusBarHeight={0}>
      <Appbar.Content
        style={[{ color: themeColors.onPrimaryContainer }, props.titleStyle]}
        theme={props.theme}
        title={props.title}
      />
    </Appbar.Header>
  );
};
