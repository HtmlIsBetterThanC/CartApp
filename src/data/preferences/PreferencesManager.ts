import { MMKV } from 'react-native-mmkv';

export class PreferencesManager {
  private storage = new MMKV();
  private favouritesKey = 'favorites';

  getFavourites(): number[] {
    const favourites = this.storage.getString(this.favouritesKey);
    return favourites ? JSON.parse(favourites) : [];
  }

  toggleFavourites(productId: number): void {
    const favouritesArray = this.getFavourites();
    if (favouritesArray.includes(productId)) {
      this.storage.set(
        this.favouritesKey,
        JSON.stringify(favouritesArray.filter((favourite) => favourite !== productId)),
      );
    } else {
      this.storage.set(this.favouritesKey, JSON.stringify([...this.getFavourites(), productId]));
    }
  }
}
