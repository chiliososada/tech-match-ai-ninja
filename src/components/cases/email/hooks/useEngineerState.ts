
import { useState } from 'react';
import { Engineer } from '@/components/candidates/types';

export const useEngineerState = () => {
  const [isEngineerDialogOpen, setIsEngineerDialogOpen] = useState(false);
  const [selectedEngineers, setSelectedEngineers] = useState<Engineer[]>([]);

  const openEngineerDialog = () => {
    setIsEngineerDialogOpen(true);
  };

  const closeEngineerDialog = () => {
    setIsEngineerDialogOpen(false);
  };

  const addEngineer = (engineer: Engineer) => {
    // Check if engineer is already selected
    if (!selectedEngineers.some(e => e.id === engineer.id)) {
      setSelectedEngineers([...selectedEngineers, engineer]);
    }
  };

  const removeEngineer = (engineerId: string) => {
    setSelectedEngineers(selectedEngineers.filter(e => e.id !== engineerId));
  };

  return {
    isEngineerDialogOpen,
    selectedEngineers,
    openEngineerDialog,
    closeEngineerDialog,
    addEngineer,
    removeEngineer
  };
};
