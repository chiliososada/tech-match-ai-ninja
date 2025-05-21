
import { useState } from 'react';
import { Engineer } from '../types';

export const useEngineerState = (mailCases: any[] = []) => {
  const [selectedEngineers, setSelectedEngineers] = useState<Engineer[]>([]);
  const [isEngineerDialogOpen, setIsEngineerDialogOpen] = useState(false);
  const [engineerCurrentPage, setEngineerCurrentPage] = useState(1);
  const [engineerFilter, setEngineerFilter] = useState('');
  const [engineerCompanyFilter, setEngineerCompanyFilter] = useState('all');

  // For opening the engineer selection dialog
  const openEngineerDialog = () => {
    setIsEngineerDialogOpen(true);
  };

  // For closing the engineer selection dialog
  const closeEngineerDialog = () => {
    setIsEngineerDialogOpen(false);
  };

  // For adding an engineer to the selected list
  const addEngineer = (engineer: Engineer) => {
    const isAlreadySelected = selectedEngineers.some(e => e.id === engineer.id);
    if (!isAlreadySelected) {
      setSelectedEngineers(prev => [...prev, engineer]);
    }
  };

  // For removing an engineer from the selected list
  const removeEngineer = (engineerId: string) => {
    setSelectedEngineers(prev => prev.filter(engineer => engineer.id !== engineerId));
  };

  return {
    selectedEngineers,
    setSelectedEngineers,
    isEngineerDialogOpen,
    setIsEngineerDialogOpen,
    engineerCurrentPage,
    setEngineerCurrentPage,
    engineerFilter,
    setEngineerFilter,
    engineerCompanyFilter,
    setEngineerCompanyFilter,
    openEngineerDialog,
    closeEngineerDialog,
    addEngineer,
    removeEngineer
  };
};
