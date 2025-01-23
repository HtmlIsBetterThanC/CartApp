import NetworkRating from '@/src/model/network/NetworkRating';

interface UiRating {
  readonly rate: number;
  readonly count: number;
}

export const toNetworkRating = (uiModel: UiRating): NetworkRating => {
  return {
    rate: uiModel.rate,
    count: uiModel.count,
  };
};

export default UiRating;
