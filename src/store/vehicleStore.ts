import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VehicleState } from '../types';

export const useVehicleStore = create<VehicleState>()(
  persist(
    (set) => ({
      vehicles: [],
      addVehicle: (vehicle) =>
        set((state) => ({
          vehicles: [...state.vehicles, { ...vehicle, timestamp: Date.now() }],
        })),
      clearVehicles: () => set({ vehicles: [] }),
    }),
    {
      name: 'vehicle-storage',
    }
  )
);