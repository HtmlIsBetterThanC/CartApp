import { MD3Theme } from 'react-native-paper/lib/typescript/types';
import UiCategory from '@/src/model/ui/UiCategory';
import { Button, Dialog, Portal, RadioButton } from 'react-native-paper';
import { styles } from '@/src/ui/components/categoryDialog/CategoryDialog.styles';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import i18n from '@/src/localization/i18n';

interface CategoryDialogProps {
  theme: MD3Theme;
  categories: UiCategory[];
  isDialogVisible: boolean;
  onDismiss: () => void;
  onCategoryChange: (category: UiCategory) => void;
}

const CategoryDialog = (props: CategoryDialogProps) => {
  const themeColors = props.theme.colors;
  const [checkedCategory, setCheckedCategory] = useState(props.categories[0]);

  const onCategoryChange = (category: UiCategory) => {
    setCheckedCategory(category);
    props.onCategoryChange(category);
  };

  const radioButtonItem = useCallback(
    (category: UiCategory) => (
      <RadioButton.Item
        key={category}
        theme={props.theme}
        label={category}
        value={category}
        position="trailing"
      />
    ),
    [props.theme],
  );

  return (
    <Portal theme={props.theme}>
      <Dialog visible={props.isDialogVisible} onDismiss={props.onDismiss}>
        <Dialog.Title style={[{ color: themeColors.secondary }]}>
          {i18n.t('dialog.title')}
        </Dialog.Title>
        <Dialog.Content style={[styles.content]}>
          <RadioButton.Group onValueChange={onCategoryChange} value={checkedCategory}>
            {props.categories.map((category: UiCategory) => radioButtonItem(category))}
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <View style={[styles.actionButton]}>
            <Button
              style={{ backgroundColor: themeColors.errorContainer }}
              labelStyle={{ color: themeColors.onErrorContainer }}
              onPress={props.onDismiss}>
              {i18n.t('general.cancel')}
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CategoryDialog;
