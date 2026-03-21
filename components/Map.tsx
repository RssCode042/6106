'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Driver {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy';
  lat: number;
  lng: number;
  car_brand?: string;
  car_type?: string;
}

interface MapProps {
  drivers: Driver[];
  selectedDriverId: string | null;
  selectedDriverRoute?: [number, number][];
  onDriverSelect: (id: string) => void;
}

// Helper to center map when selected driver changes
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
}

export default function TaxiMap({ drivers, selectedDriverId, selectedDriverRoute, onDriverSelect }: MapProps) {
  const defaultCenter: [number, number] = [42.6977, 23.3219]; // Sofia center
  
  const selectedDriver = drivers.find(d => d.id === selectedDriverId);
  const center: [number, number] = selectedDriver 
    ? [selectedDriver.lat, selectedDriver.lng] 
    : defaultCenter;

  return (
    <MapContainer 
      center={center} 
      zoom={13} 
      style={{ height: '100%', width: '100%', background: '#18181b' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="map-tiles"
      />
      
      {selectedDriver && <ChangeView center={[selectedDriver.lat, selectedDriver.lng]} />}

      {selectedDriverRoute && selectedDriverRoute.length > 1 && (
        <Polyline 
          positions={selectedDriverRoute} 
          pathOptions={{ color: '#fbbf24', weight: 4, opacity: 0.7, dashArray: '10, 10' }} 
        />
      )}

      {drivers.filter(d => d.status !== 'offline').map((driver) => (
        <Marker 
          key={driver.id} 
          position={[driver.lat, driver.lng]}
          eventHandlers={{
            click: () => onDriverSelect(driver.id),
          }}
        >
          <Popup>
            <div className="p-1">
              <p className="font-bold text-zinc-900">{driver.name}</p>
              <p className="text-xs text-zinc-600">{driver.car_brand} • {driver.car_type}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  driver.status === 'online' ? 'bg-emerald-500' : 'bg-orange-500'
                }`} />
                <span className="text-[10px] uppercase font-bold text-zinc-500">
                  {driver.status === 'online' ? 'На линия' : 'Зает'}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
