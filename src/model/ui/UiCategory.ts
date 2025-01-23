import NetworkCategory from '@/src/model/network/NetworkCategory';
import i18n from '@/src/localization/i18n';

type UiCategory = string;

export const toNetworkCategory = (uiModel: UiCategory): NetworkCategory => {
  let networkCategory = 'electronics';
  switch (uiModel) {
    case i18n.t('category.jewelery'):
      networkCategory = 'jewelery';
      break;

    case i18n.t('category.menClothing'):
      networkCategory = "men's clothing";
      break;

    case i18n.t('category.womenClothing'):
      networkCategory = "women's clothing";
      break;
  }
  return networkCategory;
};

export default UiCategory;
