import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Scanner } from './components/Scanner';
import { Export } from './components/Export';
import { Navbar } from './components/Navbar';
import { useUserStore } from './store/userStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const name = useUserStore((state) => state.name);
  if (!name) return <Navigate to="/" replace />;
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/scan"
            element={
              <ProtectedRoute>
                <Scanner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/export"
            element={
              <ProtectedRoute>
                <Export />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;