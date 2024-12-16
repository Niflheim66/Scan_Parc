import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Scan, Send, LogOut } from 'lucide-react';
import { useUserStore } from '../store/userStore';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, setName } = useUserStore();

  const handleLogout = () => {
    setName('');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md p-4 mb-6">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Bonjour, {name}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/scan')}
            className={`p-2 rounded-md ${
              location.pathname === '/scan'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Scanner"
          >
            <Scan size={20} />
          </button>
          
          <button
            onClick={() => navigate('/export')}
            className={`p-2 rounded-md ${
              location.pathname === '/export'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Exporter"
          >
            <Send size={20} />
          </button>
          
          <button
            onClick={handleLogout}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            title="Déconnexion"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}