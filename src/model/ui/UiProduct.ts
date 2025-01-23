import UiRating, { toNetworkRating } from '@/src/model/ui/UiRating';
import NetworkProduct from '@/src/model/network/NetworkProduct';
import uiCategory, { toNetworkCategory } from '@/src/model/ui/UiCategory';

interface UiProduct {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly category: uiCategory;
  readonly imagePath: string;
  readonly rating: UiRating;
}

export const toNetworkProduct = (uiModel: UiProduct): NetworkProduct => {
  return {
    id: uiModel.id,
    title: uiModel.title,
    description: uiModel.description,
    price: uiModel.price,
    category: toNetworkCategory(uiModel.category),
    image: uiModel.imagePath,
    rating: toNetworkRating(uiModel.rating),
  };
};

export default UiProduct;
