import React, { useState } from 'react';
import { Download, Mail } from 'lucide-react';
import { useVehicleStore } from '../store/vehicleStore';
import { useUserStore } from '../store/userStore';
import { createMailtoLink, downloadExcelFile } from '../utils/email';

export function Export() {
  const vehicles = useVehicleStore((state) => state.vehicles);
  const clearVehicles = useVehicleStore((state) => state.clearVehicles);
  const name = useUserStore((state) => state.name);
  const [email, setEmail] = useState('');

  const getExcelData = () => {
    return vehicles.map((vehicle) => ({
      'Prénom': name,
      'Numéro de châssis': vehicle.chassis,
      'Position': vehicle.position,
      'Commentaire': vehicle.comment || '',
      'Date': new Date(vehicle.timestamp).toLocaleString(),
    }));
  };

  const handleExport = () => {
    const fileName = `scan-vehicules-${name}-${new Date().toISOString().split('T')[0]}.xlsx`;
    downloadExcelFile(getExcelData(), fileName);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || vehicles.length === 0) return;

    const fileName = `scan-vehicules-${name}-${new Date().toISOString().split('T')[0]}.xlsx`;
    const subject = `Suivi des véhicules - ${new Date().toLocaleDateString()}`;
    const body = `Bonjour, voici les boxages du jour. Cordialement`;

    // First download the file
    downloadExcelFile(getExcelData(), fileName);

    // Then open the email client
    const mailtoLink = createMailtoLink(email, subject, body);
    window.location.href = mailtoLink;
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Résumé des scans</h2>
        
        <div className="mb-4">
          <p className="text-gray-600">Nombre total de véhicules: {vehicles.length}</p>
        </div>

        <div className="space-y-4 max-h-64 overflow-y-auto mb-6 border rounded-lg p-4">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="border-b pb-2 last:border-b-0">
              <p className="font-medium">Châssis: {vehicle.chassis}</p>
              <p className="text-sm text-gray-600">Position: {vehicle.position}</p>
              {vehicle.comment && (
                <p className="text-sm text-gray-500">Note: {vehicle.comment}</p>
              )}
              <p className="text-xs text-gray-400">
                {new Date(vehicle.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
          {vehicles.length === 0 && (
            <p className="text-center text-gray-500">Aucun véhicule scanné</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Exporter les données</h3>
            <form onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  placeholder="exemple@email.com"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={!email || vehicles.length === 0}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Mail className="w-4 h-4" />
                  Envoyer par email
                </button>
                
                <button
                  type="button"
                  onClick={handleExport}
                  disabled={vehicles.length === 0}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white p-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  Télécharger
                </button>
              </div>
            </form>
          </div>

          {vehicles.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Êtes-vous sûr de vouloir effacer toutes les données ?')) {
                  clearVehicles();
                }
              }}
              className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
            >
              Effacer les données
            </button>
          )}
        </div>
      </div>
    </div>
  );
}