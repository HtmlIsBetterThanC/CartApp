import NetworkProduct from '@/src/model/network/NetworkProduct';
import NetworkCategory from '@/src/model/network/NetworkCategory';

class NetworkManager {
  readonly apiUrl = 'https://fakestoreapi.com/products';

  async getAllProducts(): Promise<NetworkProduct[]> {
    const res = await fetch(this.apiUrl);
    return await res.json();
  }

  async getProductById(id: number): Promise<NetworkProduct> {
    const res = await fetch(this.apiUrl + `/${id}`);
    return await res.json();
  }

  async getProductsByCategory(category: NetworkCategory): Promise<NetworkProduct[]> {
    const res = await fetch(this.apiUrl + `/category/${category}`);
    return await res.json();
  }
}

export default NetworkManager;
