'use client';

import { LocationSettings } from '@/components/LocationSettings';
import { resolveCurrentLocation } from '@/lib/location';
import { useScreenNavigation } from '@/lib/navigation';
import { useAppStore } from '@/stores/appStore';

export function LocationPage() {
  const currentLocation = useAppStore((state) => state.currentLocation);
  const currentCoordinates = useAppStore((state) => state.currentCoordinates);
  const setCurrentLocation = useAppStore((state) => state.setCurrentLocation);
  const setCurrentCoordinates = useAppStore((state) => state.setCurrentCoordinates);
  const navigate = useScreenNavigation();

  return (
    <LocationSettings
      currentLocation={currentLocation}
      currentCoordinates={currentCoordinates}
      onUseCurrentLocation={() => resolveCurrentLocation(setCurrentLocation, setCurrentCoordinates)}
      onNavigate={navigate}
    />
  );
}
