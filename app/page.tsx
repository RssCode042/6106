'use client';

import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { 
  MapPin, 
  Users, 
  ClipboardList, 
  MessageSquare, 
  Plus, 
  Navigation,
  Phone,
  User,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Settings,
  Server,
  Database,
  Activity,
  Save,
  RefreshCw,
  RotateCcw,
  Download,
  BarChart3,
  Car,
  CreditCard,
  Languages,
  Dog,
  Cigarette,
  ShieldCheck,
  ShieldAlert,
  Info,
  Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';

const TaxiMap = dynamic(() => import('../components/Map'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-zinc-900 text-zinc-600 flex-col gap-4">
      <RefreshCw className="animate-spin" size={32} />
      <p>Зареждане на картата...</p>
    </div>
  )
});

// --- Types ---
interface Driver {
  id: string;
  name: string;
  phone: string;
  status: 'online' | 'offline' | 'busy';
  lat: number;
  lng: number;
  car_brand?: string;
  car_type?: string;
  work_number?: string;
  license_plate?: string;
  payment_methods?: string;
  accepts_animals?: string;
  languages?: string;
  is_smoker?: number;
  is_approved?: number;
}

interface Order {
  id: string;
  customer_name?: string;
  customer_phone?: string;
  pickup_address: string;
  destination_address?: string;
  details?: string;
  status: 'pending' | 'assigned' | 'completed' | 'cancelled';
  driver_id?: string;
  created_at: string;
  type: 'manual' | 'client';
}

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const menuItems = [
    { id: 'map', icon: Navigation, label: 'Карта на живо' },
    { id: 'orders', icon: ClipboardList, label: 'Поръчки' },
    { id: 'drivers', icon: Users, label: 'Шофьори' },
    { id: 'messages', icon: MessageSquare, label: 'Съобщения' },
    { id: 'settings', icon: Settings, label: 'Настройки' },
  ];

  return (
    <div className="w-64 bg-zinc-950 text-zinc-400 h-screen flex flex-col border-r border-zinc-800">
      <div className="p-6 border-bottom border-zinc-800">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-black">
            🚖
          </div>
          TaxiAdmin
        </h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-zinc-800 text-white shadow-lg' 
                : 'hover:bg-zinc-900 hover:text-zinc-200'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
            AD
          </div>
          <div className="text-sm">
            <p className="text-white font-medium">Админ панел</p>
            <p className="text-xs opacity-50">Системен мениджър</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon: Icon, label, value, color = "text-zinc-400" }: any) => (
  <div className="flex items-start gap-3 p-4 bg-zinc-800/50 rounded-2xl border border-zinc-800">
    <div className={`w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center ${color}`}>
      <Icon size={18} />
    </div>
    <div>
      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-medium text-white">{value || 'Не е посочено'}</p>
    </div>
  </div>
);

const DriverDetailsModal = ({ 
  driver, 
  isOpen, 
  onClose, 
  onApprove,
  onReject
}: { 
  driver: Driver | null, 
  isOpen: boolean, 
  onClose: () => void, 
  onApprove: (id: string, approved: boolean) => void,
  onReject: (id: string) => void
}) => {
  if (!isOpen || !driver) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center text-black">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{driver.name}</h2>
              <p className="text-xs text-zinc-500">Детайли за регистрация на шофьор</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Status Alert */}
          {!driver.is_approved && (
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                <ShieldAlert size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-orange-500">Очаква одобрение</p>
                <p className="text-xs text-orange-500/70">Този шофьор не може да приема поръчки, докато не бъде одобрен от администратор.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem icon={User} label="Име" value={driver.name} color="text-yellow-400" />
            <DetailItem icon={Phone} label="Телефонен номер" value={driver.phone} color="text-blue-400" />
            <DetailItem icon={ShieldCheck} label="Работен номер" value={driver.work_number} color="text-purple-400" />
            <DetailItem icon={Car} label="Марка автомобил" value={driver.car_brand} color="text-yellow-400" />
            <DetailItem icon={Car} label="Вид автомобил" value={driver.car_type} color="text-yellow-400" />
            <DetailItem icon={Info} label="Рег. номер" value={driver.license_plate} color="text-zinc-400" />
            <DetailItem icon={CreditCard} label="Начини на плащане" value={driver.payment_methods} color="text-emerald-400" />
            <DetailItem icon={Dog} label="Приема животни" value={driver.accepts_animals} color="text-orange-400" />
            <DetailItem icon={Languages} label="Чужд език" value={driver.languages} color="text-cyan-400" />
            <DetailItem icon={Cigarette} label="Пушач / Непушач" value={driver.is_smoker ? 'Пушач' : 'Непушач'} color="text-red-400" />
          </div>
        </div>

        <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-2xl transition-all"
          >
            Затвори
          </button>
          {!driver.is_approved ? (
            <div className="flex-[2] flex gap-4">
              <button 
                onClick={() => onReject(driver.id)}
                className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <ShieldAlert size={20} />
                Откажи
              </button>
              <button 
                onClick={() => onApprove(driver.id, true)}
                className="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
              >
                <ShieldCheck size={20} />
                Одобри шофьор
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onApprove(driver.id, false)}
              className="flex-[2] bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <ShieldAlert size={20} />
              Откажи одобрение
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const AddressInput = ({ label, value, onChange, placeholder, required = false }: any) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (q: string) => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`/api/addresses/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <div className="space-y-2 relative">
      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input 
          required={required}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            fetchSuggestions(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-20 w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onChange(s);
                setSuggestions([]);
                setShowSuggestions(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-zinc-700 transition-colors border-b border-zinc-700 last:border-0 flex items-center gap-3"
            >
              <Navigation size={14} className="text-yellow-400" />
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const OrderModal = ({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    pickup_address: '',
    destination_address: '',
    details: '',
    customer_phone: '',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <h2 className="text-xl font-bold text-white">Нова ръчна поръчка</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">✕</button>
        </div>
        <form className="p-6 space-y-5" onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
          setFormData({ pickup_address: '', destination_address: '', details: '', customer_phone: '' });
        }}>
          <AddressInput 
            label="От (Адрес на поръчката)" 
            value={formData.pickup_address} 
            onChange={(val: string) => setFormData({...formData, pickup_address: val})}
            placeholder="Въведете начален адрес"
            required
          />
          
          <AddressInput 
            label="До (Краен адрес)" 
            value={formData.destination_address} 
            onChange={(val: string) => setFormData({...formData, destination_address: val})}
            placeholder="Въведете краен адрес (опционално)"
          />

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Подробности (Опционално)</label>
            <textarea 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all min-h-[80px] resize-none"
              placeholder="Допълнителна информация..."
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Телефон (Опционално)</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                placeholder="+359 ..."
                value={formData.customer_phone}
                onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-yellow-400/20 mt-2"
          >
            Създай поръчка
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('map');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const selectedDriverIdRef = useRef<string | null>(null);
  useEffect(() => {
    selectedDriverIdRef.current = selectedDriverId;
  }, [selectedDriverId]);
  const [selectedDriverRoute, setSelectedDriverRoute] = useState<[number, number][]>([]);
  const [viewingDriver, setViewingDriver] = useState<Driver | null>(null);
  const viewingDriverRef = useRef<Driver | null>(null);

  useEffect(() => {
    viewingDriverRef.current = viewingDriver;
  }, [viewingDriver]);
  const [driverSearchQuery, setDriverSearchQuery] = useState('');
  const [driverFilter, setDriverFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [orderFilter, setOrderFilter] = useState<'all' | 'manual' | 'client'>('all');
  const [highlightedOrderId, setHighlightedOrderId] = useState<string | null>(null);
  const [serverSettings, setServerSettings] = useState<any>({});
  const [systemInfo, setSystemInfo] = useState<any>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize Socket.io
    socketRef.current = io();

    socketRef.current.on('driver:location_changed', (data: Driver) => {
      setDrivers(prev => {
        const index = prev.findIndex(d => d.id === data.id);
        if (index !== -1) {
          const newDrivers = [...prev];
          newDrivers[index] = { ...newDrivers[index], ...data };
          return newDrivers;
        }
        return [...prev, data];
      });

      // Update route if this is the selected driver
      if (selectedDriverIdRef.current === data.id) {
        setSelectedDriverRoute(prev => [...prev, [data.lat, data.lng]]);
      }
    });

    socketRef.current.on('order:new', (order: Order) => {
      setOrders(prev => [order, ...prev]);
    });

    socketRef.current.on('order:status_changed', (updatedOrder: Order) => {
      setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
      setHighlightedOrderId(updatedOrder.id);
      setTimeout(() => setHighlightedOrderId(null), 3000);
    });

    socketRef.current.on('driver:status_changed', (updatedDriver: Driver) => {
      setDrivers(prev => prev.map(d => d.id === updatedDriver.id ? updatedDriver : d));
      if (viewingDriverRef.current?.id === updatedDriver.id) {
        setViewingDriver(updatedDriver);
      }
    });

    socketRef.current.on('driver:deleted', (id: string) => {
      setDrivers(prev => prev.filter(d => d.id !== id));
      if (viewingDriverRef.current?.id === id) {
        setViewingDriver(null);
      }
    });

    // Fetch initial data
    fetch('/api/drivers').then(res => res.json()).then(setDrivers);
    fetch('/api/orders').then(res => res.json()).then(setOrders);
    fetch('/api/settings').then(res => res.json()).then(setServerSettings);
    fetch('/api/system/info').then(res => res.json()).then(setSystemInfo);

    const infoInterval = setInterval(() => {
      if (activeTab === 'settings') {
        fetch('/api/system/info').then(res => res.json()).then(setSystemInfo);
      }
    }, 5000);

    return () => {
      socketRef.current?.disconnect();
      clearInterval(infoInterval);
    };
  }, [activeTab]);

  useEffect(() => {
    if (selectedDriverId) {
      fetch(`/api/drivers/${selectedDriverId}/history`)
        .then(res => res.json())
        .then(data => {
          setSelectedDriverRoute(data.map((p: any) => [p.lat, p.lng]));
        })
        .catch(err => console.error('Failed to fetch history:', err));
    } else {
      setSelectedDriverRoute([]);
    }
  }, [selectedDriverId]);

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: serverSettings })
      });
      if (response.ok) {
        // Refresh settings
        const settingsRes = await fetch('/api/settings');
        const settingsData = await settingsRes.json();
        setServerSettings(settingsData);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleRestart = async () => {
    if (!confirm('Are you sure you want to restart the backend server? This will disconnect all users.')) return;
    setIsRestarting(true);
    try {
      const response = await fetch('/api/system/restart', { method: 'POST' });
      if (response.ok) {
        alert('Restart initiated. The page will reload in 5 seconds.');
        setTimeout(() => window.location.reload(), 5000);
      }
    } catch (error) {
      console.error('Failed to restart:', error);
      setIsRestarting(false);
    }
  };

  const handleBackup = async () => {
    setIsBackingUp(true);
    try {
      const response = await fetch('/api/system/backup', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        alert(`Backup successful: ${data.message}`);
      } else {
        alert(`Backup failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Failed to backup:', error);
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/system/analysis');
      const data = await response.json();
      setAnalysisData(data);
    } catch (error) {
      console.error('Failed to analyze:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSimulateMovement = () => {
    if (drivers.length === 0) return alert('Няма шофьори за симулация.');
    
    // Pick a random online driver
    const onlineDrivers = drivers.filter(d => d.status === 'online');
    const driverToMove = onlineDrivers.length > 0 
      ? onlineDrivers[Math.floor(Math.random() * onlineDrivers.length)]
      : drivers[0];

    // Sofia center approx: 42.6977, 23.3219
    // Move by a small random amount
    const newLat = driverToMove.lat + (Math.random() - 0.5) * 0.005;
    const newLng = driverToMove.lng + (Math.random() - 0.5) * 0.005;

    socketRef.current?.emit('driver:update_location', {
      id: driverToMove.id,
      lat: newLat,
      lng: newLng,
      status: driverToMove.status,
      name: driverToMove.name,
      phone: driverToMove.phone
    });
  };

  const handleApproveDriver = async (id: string, approved: boolean) => {
    try {
      const response = await fetch(`/api/drivers/${id}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_approved: approved })
      });
      if (response.ok) {
        const updatedDriver = await response.json();
        setDrivers(prev => prev.map(d => d.id === id ? updatedDriver : d));
        if (viewingDriver?.id === id) {
          setViewingDriver(updatedDriver);
        }
      }
    } catch (error) {
      console.error('Failed to approve driver:', error);
    }
  };

  const handleRejectDriver = async (id: string) => {
    if (!confirm('Сигурни ли сте, че искате да откажете тази заявка и да я изтриете?')) return;
    try {
      const response = await fetch(`/api/drivers/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setDrivers(prev => prev.filter(d => d.id !== id));
        setViewingDriver(null);
      }
    } catch (error) {
      console.error('Failed to reject driver:', error);
    }
  };

  const handleCreateOrder = async (data: any) => {
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: 'pending',
      type: 'manual',
      created_at: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      if (response.ok) {
        setIsOrderModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  const getActiveOrderForDriver = (driverId: string) => {
    return orders.find(o => o.driver_id === driverId && (o.status === 'assigned' || o.status === 'pending'));
  };

  return (
    <div className="flex bg-zinc-950 min-h-screen font-sans text-zinc-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white capitalize">{
              activeTab === 'map' ? 'Карта на живо' :
              activeTab === 'orders' ? 'Поръчки' :
              activeTab === 'drivers' ? 'Шофьори' :
              activeTab === 'messages' ? 'Съобщения' :
              activeTab === 'settings' ? 'Настройки' : activeTab
            }</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-emerald-500">Системата работи</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsOrderModalOpen(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-yellow-400/10"
            >
              <Plus size={18} />
              Нова поръчка
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'map' && (
              <motion.div 
                key="map"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full bg-zinc-900 rounded-3xl border border-zinc-800 relative overflow-hidden"
              >
                <TaxiMap 
                  drivers={drivers} 
                  selectedDriverId={selectedDriverId}
                  selectedDriverRoute={selectedDriverRoute}
                  onDriverSelect={setSelectedDriverId} 
                />
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div 
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard label="Общо поръчки" value={orders.length.toString()} icon={ClipboardList} color="text-blue-400" />
                  <StatCard label="Чакащи" value={orders.filter(o => o.status === 'pending').length.toString()} icon={Clock} color="text-yellow-400" />
                  <StatCard label="Завършени" value={orders.filter(o => o.status === 'completed').length.toString()} icon={CheckCircle2} color="text-emerald-400" />
                </div>

                <div className="flex items-center gap-4 bg-zinc-900 p-2 rounded-2xl border border-zinc-800 w-fit">
                  {[
                    { id: 'all', label: 'Всички' },
                    { id: 'manual', label: 'Ръчни' },
                    { id: 'client', label: 'Клиентски' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setOrderFilter(filter.id as any)}
                      className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                        orderFilter === filter.id 
                          ? 'bg-yellow-400 text-black shadow-lg' 
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-900/50">
                        <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Тип</th>
                        <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Клиент / Инфо</th>
                        <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Маршрут</th>
                        <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Шофьор</th>
                        <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Статус</th>
                        <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Час</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {orders
                        .filter(o => orderFilter === 'all' || o.type === orderFilter)
                        .map((order) => {
                          const assignedDriver = drivers.find(d => d.id === order.driver_id);
                          return (
                            <tr 
                              key={order.id} 
                              className={`hover:bg-zinc-800/50 transition-all duration-500 group ${
                                highlightedOrderId === order.id ? 'bg-yellow-400/10 border-y border-yellow-400/20' : ''
                              }`}
                            >
                              <td className="px-6 py-4 font-mono text-[10px] text-zinc-500">#{order.id}</td>
                              <td className="px-6 py-4">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase ${
                                  order.type === 'manual' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                }`}>
                                  {order.type === 'manual' ? 'Ръчна' : 'Клиент'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                                    <User size={14} />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-white">{order.customer_name || (order.type === 'manual' ? 'Ръчна заявка' : 'Клиент')}</p>
                                    <p className="text-xs text-zinc-500">{order.customer_phone || 'Няма телефон'}</p>
                                    {order.details && <p className="text-[10px] text-zinc-400 mt-1 italic">{order.details}</p>}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-xs space-y-1">
                                  <div className="flex items-center gap-2 text-zinc-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    {order.pickup_address}
                                  </div>
                                  {order.destination_address && (
                                    <div className="flex items-center gap-2 text-zinc-500">
                                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                      {order.destination_address}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                {assignedDriver ? (
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                                      <Car size={12} />
                                    </div>
                                    <span className="text-xs font-medium text-white">{assignedDriver.name}</span>
                                  </div>
                                ) : (
                                  <span className="text-xs text-zinc-600 italic">Не е назначен</span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <StatusBadge status={order.status} />
                              </td>
                              <td className="px-6 py-4 text-xs text-zinc-500">
                                {new Date(order.created_at).toLocaleTimeString()}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'drivers' && (
              <motion.div 
                key="drivers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                    <input 
                      type="text"
                      placeholder="Търси шофьори по име или телефон..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all shadow-lg"
                      value={driverSearchQuery}
                      onChange={(e) => setDriverSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex bg-zinc-900 p-1 rounded-2xl border border-zinc-800 shadow-lg">
                    <button 
                      onClick={() => setDriverFilter('all')}
                      className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${driverFilter === 'all' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      Всички
                    </button>
                    <button 
                      onClick={() => setDriverFilter('approved')}
                      className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${driverFilter === 'approved' ? 'bg-emerald-500/10 text-emerald-500 shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      Одобрени
                    </button>
                    <button 
                      onClick={() => setDriverFilter('pending')}
                      className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${driverFilter === 'pending' ? 'bg-orange-500/10 text-orange-500 shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      Чакащи
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {drivers
                    .filter(driver => {
                      const matchesSearch = driver.name.toLowerCase().includes(driverSearchQuery.toLowerCase()) || driver.phone.includes(driverSearchQuery);
                      const matchesFilter = 
                        driverFilter === 'all' ? true :
                        driverFilter === 'approved' ? driver.is_approved :
                        !driver.is_approved;
                      return matchesSearch && matchesFilter;
                    })
                    .map((driver) => (
                      <div key={driver.id} className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 hover:border-zinc-700 transition-all group relative">
                    {!driver.is_approved && (
                      <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg z-10 animate-bounce">
                        НОВА ЗАЯВКА
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                        <User size={28} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          driver.status === 'online' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                          driver.status === 'busy' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                          'bg-zinc-800 text-zinc-500 border border-zinc-700'
                        }`}>
                          {
                            driver.status === 'online' ? 'на линия' :
                            driver.status === 'offline' ? 'офлайн' :
                            driver.status === 'busy' ? 'зает' : driver.status
                          }
                        </div>
                        {driver.is_approved ? (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase">
                            <ShieldCheck size={12} /> Одобрен
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500 uppercase">
                            <ShieldAlert size={12} /> Изчакващ
                          </div>
                        )}
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">{driver.name}</h4>
                    <p className="text-sm text-zinc-500 flex items-center gap-2 mb-6">
                      <Phone size={14} />
                      {driver.phone}
                    </p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setViewingDriver(driver)}
                        className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Info size={16} />
                        Детайли
                      </button>
                      <button className="w-12 bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center rounded-xl transition-colors">
                        <MessageSquare size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                </div>
              </motion.div>
            )}
            {activeTab === 'messages' && (
              <motion.div 
                key="messages"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex gap-6"
              >
                {/* Contacts List */}
                <div className="w-80 bg-zinc-900 rounded-3xl border border-zinc-800 flex flex-col overflow-hidden">
                  <div className="p-6 border-b border-zinc-800">
                    <h3 className="text-lg font-bold text-white">Контакти</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {drivers.map(driver => (
                      <button 
                        key={driver.id}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-zinc-800 transition-all text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                          <User size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white truncate">{driver.name}</p>
                          <p className="text-xs text-zinc-500 truncate">Шофьор • {
                            driver.status === 'online' ? 'на линия' :
                            driver.status === 'offline' ? 'офлайн' :
                            driver.status === 'busy' ? 'зает' : driver.status
                          }</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Window */}
                <div className="flex-1 bg-zinc-900 rounded-3xl border border-zinc-800 flex flex-col overflow-hidden">
                  <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-black">
                        <User size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Избери контакт</h3>
                        <p className="text-xs text-zinc-500">Избери шофьор или клиент, за да започнеш съобщение</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center text-zinc-600 flex-col gap-4">
                    <MessageSquare size={48} className="opacity-20" />
                    <p className="text-sm">Системата за съобщения е готова за комуникация в реално време.</p>
                  </div>

                  <div className="p-6 border-t border-zinc-800">
                    <div className="flex gap-4">
                      <input 
                        disabled
                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none opacity-50 cursor-not-allowed"
                        placeholder="Напиши съобщение..."
                      />
                      <button disabled className="bg-zinc-800 text-zinc-500 px-6 py-3 rounded-xl font-bold opacity-50 cursor-not-allowed">
                        Изпрати
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Server Configuration */}
                  <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-yellow-400">
                        <Settings size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-white">Конфигурация на сървъра</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Име на системата</label>
                        <input 
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                          value={serverSettings.system_name || ''}
                          onChange={(e) => setServerSettings({...serverSettings, system_name: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Начална такса (€)</label>
                          <input 
                            type="number"
                            step="0.01"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                            value={serverSettings.base_fare || ''}
                            onChange={(e) => setServerSettings({...serverSettings, base_fare: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Дневна тарифа (€/км)</label>
                          <input 
                            type="number"
                            step="0.01"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                            value={serverSettings.day_tariff || ''}
                            onChange={(e) => setServerSettings({...serverSettings, day_tariff: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Нощна тарифа (€/км)</label>
                          <input 
                            type="number"
                            step="0.01"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                            value={serverSettings.night_tariff || ''}
                            onChange={(e) => setServerSettings({...serverSettings, night_tariff: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Престой (€/мин)</label>
                          <input 
                            type="number"
                            step="0.01"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                            value={serverSettings.waiting_price || ''}
                            onChange={(e) => setServerSettings({...serverSettings, waiting_price: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700">
                        <div>
                          <p className="text-sm font-medium text-white">Режим на поддръжка</p>
                          <p className="text-xs text-zinc-500">Изключи всички клиентски връзки</p>
                        </div>
                        <button 
                          onClick={() => setServerSettings({...serverSettings, maintenance_mode: serverSettings.maintenance_mode === 'true' ? 'false' : 'true'})}
                          className={`w-12 h-6 rounded-full transition-all relative ${serverSettings.maintenance_mode === 'true' ? 'bg-yellow-400' : 'bg-zinc-700'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${serverSettings.maintenance_mode === 'true' ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={handleSaveSettings}
                      disabled={isSavingSettings}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-black font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      {isSavingSettings ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                      Запази конфигурацията
                    </button>
                  </div>

                  {/* System Actions */}
                  <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-red-400">
                        <Server size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-white">Системни действия</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button 
                        onClick={handleRestart}
                        disabled={isRestarting}
                        className="flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-bold py-4 rounded-2xl transition-all"
                      >
                        {isRestarting ? <RefreshCw className="animate-spin" size={20} /> : <RotateCcw size={20} />}
                        Рестартирай сървъра
                      </button>
                      <button 
                        onClick={handleBackup}
                        disabled={isBackingUp}
                        className="flex items-center justify-center gap-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 font-bold py-4 rounded-2xl transition-all"
                      >
                        {isBackingUp ? <RefreshCw className="animate-spin" size={20} /> : <Download size={20} />}
                        Създай бекъп
                      </button>
                      <button 
                        onClick={handleAnalysis}
                        disabled={isAnalyzing}
                        className="flex items-center justify-center gap-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 font-bold py-4 rounded-2xl transition-all sm:col-span-2"
                      >
                        {isAnalyzing ? <RefreshCw className="animate-spin" size={20} /> : <BarChart3 size={20} />}
                        Стартирай пълен анализ
                      </button>
                      <button 
                        onClick={handleSimulateMovement}
                        className="flex items-center justify-center gap-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/20 font-bold py-4 rounded-2xl transition-all sm:col-span-2"
                      >
                        <Navigation size={20} />
                        Симулирай движение на шофьор
                      </button>
                    </div>

                    {analysisData && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-6 bg-zinc-800/50 rounded-2xl border border-zinc-700 space-y-4"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Резултати от анализа</h4>
                          <button onClick={() => setAnalysisData(null)} className="text-zinc-500 hover:text-white">✕</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="space-y-1">
                            <p className="text-zinc-500">Размер на базата данни</p>
                            <p className="text-white font-mono">{(analysisData.dbSize / 1024).toFixed(2)} KB</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-zinc-500">Проверка на интегритета</p>
                            <p className={`font-mono ${analysisData.integrity === 'ok' ? 'text-emerald-400' : 'text-red-400'}`}>{analysisData.integrity === 'ok' ? 'ОК' : analysisData.integrity}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-zinc-500 text-[10px] font-bold uppercase">Схеми на таблиците</p>
                          {Object.entries(analysisData.tableInfo).map(([table, info]: [string, any]) => (
                            <div key={table} className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                              <p className="text-white font-mono text-[10px] mb-1">{table} ({info.length} columns)</p>
                              <div className="flex flex-wrap gap-1">
                                {info.map((col: any) => (
                                  <span key={col.name} className="px-1.5 py-0.5 bg-zinc-800 rounded text-[9px] text-zinc-400">{col.name}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* System Health & Server Info */}
                  <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 space-y-6 lg:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-emerald-400">
                        <Activity size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-white">Сървърна информация и Здраве</h3>
                    </div>

                    {systemInfo ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700">
                              <p className="text-xs font-semibold text-zinc-500 uppercase mb-1">Време на работа</p>
                              <p className="text-lg font-bold text-white">{Math.floor(systemInfo.uptime / 3600)}h {Math.floor((systemInfo.uptime % 3600) / 60)}m</p>
                            </div>
                            <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700">
                              <p className="text-xs font-semibold text-zinc-500 uppercase mb-1">Връзки</p>
                              <p className="text-lg font-bold text-white">{systemInfo.socketConnections} Активни</p>
                            </div>
                          </div>

                          {systemInfo.stats && (
                            <div className="grid grid-cols-3 gap-2">
                              <div className="p-3 bg-zinc-800/30 rounded-xl border border-zinc-800 text-center">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase">Шофьори</p>
                                <p className="text-sm font-bold text-white">{systemInfo.stats.drivers}</p>
                              </div>
                              <div className="p-3 bg-zinc-800/30 rounded-xl border border-zinc-800 text-center">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase">Поръчки</p>
                                <p className="text-sm font-bold text-white">{systemInfo.stats.orders}</p>
                              </div>
                              <div className="p-3 bg-zinc-800/30 rounded-xl border border-zinc-800 text-center">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase">Съобщ.</p>
                                <p className="text-sm font-bold text-white">{systemInfo.stats.messages}</p>
                              </div>
                            </div>
                          )}

                          <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-zinc-500 flex items-center gap-2"><Server size={14} /> Версия на Node</span>
                              <span className="text-white font-mono">{systemInfo.nodeVersion}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-zinc-500 flex items-center gap-2"><Database size={14} /> База данни</span>
                              <span className="text-white font-mono">{systemInfo.dbPath}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-zinc-500 flex items-center gap-2"><Activity size={14} /> Използвана памет</span>
                              <span className="text-white font-mono">{Math.round(systemInfo.memory.rss / 1024 / 1024)} MB</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Сървърна Конфигурация</h4>
                          <div className="p-6 bg-zinc-800/30 rounded-2xl border border-zinc-800/50 space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-zinc-500">Среда</span>
                              <span className="text-xs font-bold text-emerald-400 uppercase">Production</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-zinc-500">База данни</span>
                              <span className="text-xs font-bold text-white">SQLite 3 (better-sqlite3)</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-zinc-500">Real-time Engine</span>
                              <span className="text-xs font-bold text-white">Socket.io v4</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-zinc-500">Локация на сървъра</span>
                              <span className="text-xs font-bold text-white">Europe-West2 (London)</span>
                            </div>
                            <div className="pt-4 border-t border-zinc-800">
                              <p className="text-[10px] text-zinc-500 leading-relaxed">
                                Сървърът е оптимизиран за ниска латентност и поддържа до 10,000 едновременни връзки чрез WebSocket протокол.
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-zinc-800">
                            <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                              Всички системи работят
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-48 text-zinc-600">
                        <RefreshCw className="animate-spin" size={32} />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        onSubmit={handleCreateOrder} 
      />

      <DriverDetailsModal 
        driver={viewingDriver}
        isOpen={!!viewingDriver}
        onClose={() => setViewingDriver(null)}
        onApprove={handleApproveDriver}
        onReject={handleRejectDriver}
      />
    </div>
  );
}

// --- Helper Components ---

const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center ${color}`}>
        <Icon size={20} />
      </div>
    </div>
    <p className="text-zinc-500 text-sm font-medium">{label}</p>
    <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const config: any = {
    pending: { label: 'изчакваща', style: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
    assigned: { label: 'назначена', style: 'bg-blue-400/10 text-blue-400 border-blue-400/20' },
    completed: { label: 'завършена', style: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' },
    cancelled: { label: 'отказана', style: 'bg-red-400/10 text-red-400 border-red-400/20' },
  };

  const current = config[status] || config.pending;

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${current.style}`}>
      {current.label}
    </span>
  );
}
