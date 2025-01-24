import { useMemo } from 'react';
import { PreferencesManager } from '@/src/data/preferences/PreferencesManager';

const usePreferencesManager = () => {
  return useMemo(() => new PreferencesManager(), []);
};

export default usePreferencesManager;
