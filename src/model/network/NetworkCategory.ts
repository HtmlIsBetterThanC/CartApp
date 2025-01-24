import UiCategory from '@/src/model/ui/UiCategory';
import i18n from '@/src/localization/i18n';

type NetworkCategory = string;

export const toUiCategory = (networkModel: NetworkCategory): UiCategory => {
  let uiCategory = i18n.t('category.electronics');
  switch (networkModel) {
    case 'jewelery':
      uiCategory = i18n.t('category.jewelery');
      break;

    case "men's clothing":
      uiCategory = i18n.t('category.menClothing');
      break;

    case "women's clothing":
      uiCategory = i18n.t('category.womenClothing');
      break;
  }
  return uiCategory;
};

export const networkCategories: NetworkCategory[] = [
  'jewelery',
  "men's clothing",
  "women's clothing",
];

export default NetworkCategory;
