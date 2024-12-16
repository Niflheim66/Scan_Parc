import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useVehicleStore } from '../store/vehicleStore';
import { Scan, FileSpreadsheet, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const BEEP_AUDIO = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTtvT18AAAAAAA==';

export function Scanner() {
  const [position, setPosition] = useState('');
  const [comment, setComment] = useState('');
  const [lastScanned, setLastScanned] = useState('');
  const [manualMode, setManualMode] = useState(false);
  const [chassisInput, setChassisInput] = useState('');
  const addVehicle = useVehicleStore((state) => state.addVehicle);

  useEffect(() => {
    if (!manualMode) {
      const scanner = new Html5QrcodeScanner('scanner', {
        qrbox: {
          width: 300,
          height: 100,
        },
        fps: 10,
        aspectRatio: 1.7777778,
        formatsToSupport: [ 1, 2, 3, 4, 5, 6, 7 ], // Using format IDs directly instead of enum
        rememberLastUsedCamera: true,
      });

      scanner.render(
        (decodedText) => {
          setLastScanned(decodedText);
          const audio = new Audio(BEEP_AUDIO);
          audio.play().catch(() => {
            // Ignore audio play errors
          });
        },
        (error) => {
          // Handle scan error silently
        }
      );

      return () => {
        scanner.clear().catch(() => {
          // Ignore scanner clear errors
        });
      };
    }
  }, [manualMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chassis = manualMode ? chassisInput : lastScanned;
    if (chassis && position) {
      addVehicle({
        chassis,
        position,
        comment: comment.trim(),
      });
      setPosition('');
      setComment('');
      setLastScanned('');
      setChassisInput('');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Scanner un véhicule</h2>
          <button
            onClick={() => setManualMode(!manualMode)}
            className={`flex items-center gap-2 px-3 py-1 rounded-md ${
              manualMode
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {manualMode ? <FileSpreadsheet size={20} /> : <Scan size={20} />}
            {manualMode ? 'Mode manuel' : 'Mode scan'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {manualMode ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de châssis
              </label>
              <input
                type="text"
                value={chassisInput}
                onChange={(e) => setChassisInput(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                placeholder="Entrez le numéro de châssis"
                required
              />
            </div>
          ) : (
            <div>
              <div id="scanner" className="mb-4"></div>
              {lastScanned && (
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                  <span className="flex-1">Dernier scan: {lastScanned}</span>
                  <button
                    type="button"
                    onClick={() => setLastScanned('')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              placeholder="Ex: FL09"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commentaire (optionnel)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              placeholder="Ajoutez un commentaire..."
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={(!manualMode && !lastScanned) || !position}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}