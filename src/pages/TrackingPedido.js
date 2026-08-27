import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const posicionChillan = [-36.6066, -72.1034];

export default function TrackingPedido() {
  return (
    <div>
      <h2>Estado de Entrega en Tiempo Real</h2>
      <p>Sigue la ruta del camión repartidor hacia tu domicilio.</p>

      <div style={{ height: '400px', width: '100%' }}>
        <MapContainer center={posicionChillan} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={posicionChillan}>
            <Popup>
              Camión de Reparto 1 - En camino <br /> Entrega estimada: 45 min.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}