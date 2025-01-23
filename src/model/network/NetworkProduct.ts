import NetworkRating, { toUiRating } from '@/src/model/network/NetworkRating';
import UiProduct from '@/src/model/ui/UiProduct';
import NetworkCategory, { toUiCategory } from '@/src/model/network/NetworkCategory';

interface NetworkProduct {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly category: NetworkCategory;
  readonly image: string;
  readonly rating: NetworkRating;
}

export const toUiProduct = (networkModel: NetworkProduct): UiProduct => {
  return {
    id: networkModel.id,
    title: networkModel.title,
    description: networkModel.description,
    price: networkModel.price,
    category: toUiCategory(networkModel.category),
    imagePath: networkModel.image,
    rating: toUiRating(networkModel.rating),
  };
};

export default NetworkProduct;
