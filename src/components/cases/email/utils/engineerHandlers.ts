
import { Engineer } from '@/components/candidates/types';

export interface EngineerHandlersProps {
  openEngineerDialog: () => void;
  removeSelectedEngineer: (engineerId: string) => void;
  applyEngineerToTemplate: () => void;
  addSelectedEngineer?: (engineer: Engineer) => void; // Added new handler
}

export const createEngineerHandlers = (
  openDialog: () => void,
  removeEngineer: (engineerId: string) => void,
  applyEngineer: () => void,
  addEngineer?: (engineer: Engineer) => void // Added new parameter
): EngineerHandlersProps => {
  return {
    openEngineerDialog: openDialog,
    removeSelectedEngineer: removeEngineer,
    applyEngineerToTemplate: applyEngineer,
    addSelectedEngineer: addEngineer // Added new handler
  };
};
