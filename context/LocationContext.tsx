// src/context/LocationContext.tsx

import React, { createContext, ReactNode, useContext, useState } from "react";

type Location = {
  city: string;
  latitude: number;
  longitude: number;
};

type LocationContextType = {
  location: Location | null;
  setLocation: (location: Location) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Location | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context)
    throw new Error("useLocation must be used within a LocationProvider");
  return context;
};
