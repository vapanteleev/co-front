import React, { createContext, useState } from 'react';
import { Construction, Surface } from '../../model/dataModel';

interface ConstructionContextProps {
  construction: Construction;
  setConstruction: React.Dispatch<React.SetStateAction<Construction>>;
  addSurface: (surface: Surface) => void;
  updateSurface: (index: number, updatedSurface: Surface) => void;
  removeSurface: (index: number) => void;
}

export const ConstructionContext = createContext<ConstructionContextProps | null>(null);

export const ConstructionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [construction, setConstruction] = useState<Construction>({
    companyName: '',
    projectName: '',
    surfaces: [],
  });

  const addSurface = (surface: Surface) => {
    setConstruction((prev) => ({ ...prev, surfaces: [...prev.surfaces, surface] }));
  };

  const updateSurface = (index: number, updatedSurface: Surface) => {
    const newSurfaces = [...construction.surfaces];
    newSurfaces[index] = updatedSurface;
    setConstruction((prev) => ({ ...prev, surfaces: newSurfaces }));
  };

  const removeSurface = (index: number) => {
    const newSurfaces = construction.surfaces.filter((_, i) => i !== index);
    setConstruction((prev) => ({ ...prev, surfaces: newSurfaces }));
  };

  return (
    <ConstructionContext.Provider value={{ construction, setConstruction, addSurface, updateSurface, removeSurface }}>
      {children}
    </ConstructionContext.Provider>
  );
};
