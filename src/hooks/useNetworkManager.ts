import NetworkManager from '@/src/data/network/NetworkManager';
import { useMemo } from 'react';

const useNetworkManager = () => {
  return useMemo(() => new NetworkManager(), []);
};

export default useNetworkManager;
