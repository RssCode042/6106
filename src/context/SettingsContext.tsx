import { createContext, useContext, useEffect, useState } from 'react';
import { fetchSettings } from '../utils/api';

interface Settings {
  app_store_url?: string;
  google_play_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  youtube_url?: string;
}

const SettingsContext = createContext<Settings>({});

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    fetchSettings().then(data => {
      if (data) setSettings(data);
    });
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
