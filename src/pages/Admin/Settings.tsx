import { useEffect, useState } from 'react';
import { API_URL } from '../../utils/api';
import { Save } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetch(`${API_URL}/settings`)
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });
    
    try {
      const res = await fetch(`${API_URL}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
        credentials: 'include'
      });
      if (res.ok) {
        setMessage({ text: 'Настройките са запазени успешно!', type: 'success' });
      } else {
        setMessage({ text: 'Грешка при запазване.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Грешка при свързване със сървъра.', type: 'error' });
    }
    setSaving(false);
  };

  if (loading) return <div>Зареждане на настройки...</div>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Настройки на връзките</h1>
      
      {message.text && (
        <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        
        <div>
          <h2 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Мобилно приложение (Магазини)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">App Store URL</label>
              <input
                type="url"
                value={settings.app_store_url || ''}
                onChange={e => handleChange('app_store_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Google Play URL</label>
              <input
                type="url"
                value={settings.google_play_url || ''}
                onChange={e => handleChange('google_play_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4 mt-8">Социални мрежи</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input
                type="url"
                value={settings.facebook_url || ''}
                onChange={e => handleChange('facebook_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input
                type="url"
                value={settings.instagram_url || ''}
                onChange={e => handleChange('instagram_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">TikTok URL</label>
              <input
                type="url"
                value={settings.tiktok_url || ''}
                onChange={e => handleChange('tiktok_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
              <input
                type="url"
                value={settings.youtube_url || ''}
                onChange={e => handleChange('youtube_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? 'Запазване...' : 'Запази промените'}
          </button>
        </div>
      </form>
    </div>
  );
}
