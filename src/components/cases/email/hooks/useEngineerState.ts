
import { useState } from 'react';
import { Engineer } from '../types';

export const useEngineerState = () => {
  const [isEngineerDialogOpen, setIsEngineerDialogOpen] = useState(false);
  const [engineerFilter, setEngineerFilter] = useState("");
  const [engineerCurrentPage, setEngineerCurrentPage] = useState(1);
  const [selectedEngineers, setSelectedEngineers] = useState<Engineer[]>([]);
  const [engineerCompanyFilter, setEngineerCompanyFilter] = useState("all");
  
  return {
    isEngineerDialogOpen,
    setIsEngineerDialogOpen,
    engineerFilter,
    setEngineerFilter,
    engineerCurrentPage,
    setEngineerCurrentPage,
    selectedEngineers,
    setSelectedEngineers,
    engineerCompanyFilter,
    setEngineerCompanyFilter
  };
};
