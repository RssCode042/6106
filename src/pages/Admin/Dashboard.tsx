import { useEffect, useState } from 'react';
import { API_URL } from '../../utils/api';
import { Users, MousePointerClick, TrendingUp } from 'lucide-react';

interface Stats {
  visits: number;
  clicks: number;
  clicksBySource: { source: string; count: number }[];
  visitsByDate: { date: string; count: number }[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/admin/stats`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  if (!stats) return <div>Зареждане на статистика...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Статистика</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-brand rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Общо посещения</p>
            <p className="text-2xl font-bold text-gray-900">{stats.visits}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
            <MousePointerClick size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Общо кликове</p>
            <p className="text-2xl font-bold text-gray-900">{stats.clicks}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clicks breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-brand" />
            Кликове по източник
          </h2>
          <div className="space-y-4">
            {stats.clicksBySource.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">
                  {item.source === 'app_store' ? 'App Store' : 
                   item.source === 'google_play' ? 'Google Play' : 
                   item.source === 'order_button' ? 'Бутон "Поръчай сега"' : item.source}
                </span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {item.count}
                </span>
              </div>
            ))}
            {stats.clicksBySource.length === 0 && (
              <p className="text-gray-500 text-sm">Няма данни за кликове.</p>
            )}
          </div>
        </div>

        {/* Visits over time */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Посещения (последни 7 дни)</h2>
          <div className="space-y-4">
            {stats.visitsByDate.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">{item.date}</span>
                <span className="bg-blue-50 text-brand px-3 py-1 rounded-full text-sm font-semibold">
                  {item.count}
                </span>
              </div>
            ))}
            {stats.visitsByDate.length === 0 && (
              <p className="text-gray-500 text-sm">Няма данни за посещения.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
