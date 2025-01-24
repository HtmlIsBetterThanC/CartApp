import { MD3Theme } from 'react-native-paper/lib/typescript/types';
import UiCategory from '@/src/model/ui/UiCategory';
import { Button, Dialog, Portal, RadioButton } from 'react-native-paper';
import { styles } from '@/src/ui/components/categoryDialog/CategoryDialog.styles';
import { useState } from 'react';
import { View } from 'react-native';
import i18n from '@/src/localization/i18n';

interface CategoryDialogProps {
  theme: MD3Theme;
  categories: UiCategory[];
  isDialogVisible: boolean;
  onDismiss: () => void;
  onDonePress: (category: UiCategory) => void;
}

const CategoryDialog = (props: CategoryDialogProps) => {
  const themeColors = props.theme.colors;
  const [checkedCategory, setCheckedCategory] = useState<UiCategory>();

  return (
    <Portal theme={props.theme}>
      <Dialog visible={props.isDialogVisible} onDismiss={props.onDismiss}>
        <Dialog.Title style={[{ color: themeColors.secondary }]}>
          {i18n.t('dialog.title')}
        </Dialog.Title>
        <Dialog.Content style={[styles.content]}>
          {props.categories.map((category: UiCategory) => (
            <RadioButton
              theme={props.theme}
              key={category}
              // TODO doesn't display the value
              value={category}
              status={checkedCategory === category ? 'checked' : 'unchecked'}
              onPress={() => setCheckedCategory(category)}
            />
          ))}
        </Dialog.Content>
        <Dialog.Actions>
          <View style={[styles.actionButtons]}>
            <Button
              style={{ backgroundColor: themeColors.errorContainer }}
              labelStyle={{ color: themeColors.onErrorContainer }}
              onPress={props.onDismiss}>
              {i18n.t('general.cancel')}
            </Button>
            <Button
              style={{ backgroundColor: themeColors.primaryContainer }}
              labelStyle={{ color: themeColors.onPrimaryContainer }}
              onPress={() => checkedCategory && props.onDonePress(checkedCategory)}>
              {i18n.t('general.confirm')}
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CategoryDialog;
