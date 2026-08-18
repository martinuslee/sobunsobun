import { create } from 'zustand';

interface AppState {
  currentLocation: string;
  currentCoordinates: { lat: number; lng: number } | null;
  currentUserName: string;
  hasSeenLanding: boolean;
  setCurrentLocation: (location: string) => void;
  setCurrentCoordinates: (coordinates: { lat: number; lng: number }) => void;
  setCurrentUserName: (name: string) => void;
  setHasSeenLanding: (seen: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentLocation: '위치 확인 중',
  currentCoordinates: null,
  currentUserName: '초록이웃(나)',
  hasSeenLanding: false,
  setCurrentLocation: (currentLocation) => set({ currentLocation }),
  setCurrentCoordinates: (currentCoordinates) => set({ currentCoordinates }),
  setCurrentUserName: (currentUserName) => set({ currentUserName }),
  setHasSeenLanding: (hasSeenLanding) => set({ hasSeenLanding }),
}));
