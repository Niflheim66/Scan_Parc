import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';
import { useUserStore } from '../store/userStore';

export function Login() {
  const [inputName, setInputName] = useState('');
  const setName = useUserStore((state) => state.setName);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setName(inputName.trim());
      navigate('/scan');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <UserCircle2 className="w-16 h-16 text-blue-600 mb-2" />
          <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Prénom
            </label>
            <input
              type="text"
              id="name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              placeholder="Entrez votre prénom"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Commencer
          </button>
        </form>
      </div>
    </div>
  );
}