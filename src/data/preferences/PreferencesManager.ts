import { MMKV } from 'react-native-mmkv';

export class PreferencesManager {
  private storage = new MMKV();
  private favouritesKey = 'favorites';

  getFavourites(): number[] {
    const favourites = this.storage.getString(this.favouritesKey);
    return favourites ? JSON.parse(favourites) : [];
  }

  getFavourite(id: number): number | undefined {
    return this.getFavourites()[id];
  }

  isFavourite(id: number): boolean {
    return this.getFavourites().includes(id);
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
