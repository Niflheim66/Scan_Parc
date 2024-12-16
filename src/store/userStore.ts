import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState } from '../types';

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      setName: (name) => set({ name }),
    }),
    {
      name: 'user-storage',
    }
  )
);