import UiRating from '@/src/model/ui/UiRating';

interface NetworkRating {
  readonly rate: number;
  readonly count: number;
}

export const toUiRating = (networkModel: NetworkRating): UiRating => {
  return {
    rate: networkModel.rate,
    count: networkModel.count,
  };
};

export default NetworkRating;
