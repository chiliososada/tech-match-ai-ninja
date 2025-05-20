
import { useState, useEffect } from 'react';
import { MailCase } from '../email/types';
import { toast } from '@/hooks/toast';

export const useCaseSelection = (caseData: MailCase[]) => {
  const [selectedCase, setSelectedCase] = useState<MailCase | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingCaseData, setEditingCaseData] = useState<MailCase | null>(null);

  // Handler function to select a case
  const handleCaseSelect = (caseItem: MailCase) => {
    // Find the matching case with full data structure from our original caseData
    const fullCaseData = caseData.find(item => item.id === caseItem.id);
    
    // If found in our original data, use it; otherwise use the passed item as is
    if (fullCaseData) {
      // Ensure the processes field exists
      const caseWithProcesses = {
        ...fullCaseData,
        processes: fullCaseData.processes || [],
        interviewCount: fullCaseData.interviewCount || '1'
      };
      setSelectedCase(caseWithProcesses);
    } else {
      // Ensure the processes field exists for the passed item
      const caseWithProcesses = {
        ...caseItem,
        processes: caseItem.processes || [],
        interviewCount: caseItem.interviewCount || '1'
      };
      setSelectedCase(caseWithProcesses);
    }
    
    // Reset edit mode and data when selecting a new case
    setEditingCaseData(null);
    setEditMode(false);
  };

  // Track edit mode changes and ensure editingCaseData is populated
  useEffect(() => {
    if (editMode && selectedCase && !editingCaseData) {
      console.log("Setting initial editing data from selected case");
      setEditingCaseData({
        ...selectedCase,
        processes: selectedCase.processes || [],
        interviewCount: selectedCase.interviewCount || '1'
      });
    } else if (!editMode) {
      // When exiting edit mode without saving, clear the editing data
      setEditingCaseData(null);
    }
  }, [editMode, selectedCase, editingCaseData]);

  // Toggle edit mode handler
  const toggleEditMode = () => {
    const newEditMode = !editMode;
    setEditMode(newEditMode);
    
    // When entering edit mode, copy the selected case data for editing
    if (newEditMode && selectedCase) {
      console.log("Entering edit mode, initializing editing data");
      setEditingCaseData({
        ...selectedCase,
        processes: selectedCase.processes || [],
        interviewCount: selectedCase.interviewCount || '1'
      });
    }
  };

  // Edit change handler - Fix: properly update the state
  const handleEditChange = (field: string, value: any) => {
    if (editingCaseData) {
      console.log(`Editing field: ${field}, new value:`, value);
      
      setEditingCaseData(prev => {
        if (!prev) {
          // If somehow prev is null but editingCaseData was truthy, copy from selectedCase
          if (selectedCase) {
            console.log("Creating initial editing data from selectedCase");
            return {
              ...selectedCase,
              [field]: value,
              processes: selectedCase.processes || [],
              interviewCount: selectedCase.interviewCount || '1'
            };
          }
          return null;
        }
        
        // Create a new object to ensure React detects the state change
        const updated = {
          ...prev,
          [field]: value
        };
        
        console.log("Updated editing data:", updated);
        return updated;
      });
    } else if (selectedCase) {
      // If editingCaseData is null but we have a selectedCase, initialize it
      console.log("Initializing editingCaseData from selectedCase");
      setEditingCaseData({
        ...selectedCase,
        [field]: value,
        processes: selectedCase.processes || [],
        interviewCount: selectedCase.interviewCount || '1'
      });
    }
  };

  // Save edit handler
  const handleSaveEdit = () => {
    if (editingCaseData) {
      console.log("Saving edited data:", editingCaseData);
      
      toast({
        title: "案件情報が更新されました",
        description: "変更が保存されました"
      });
      setSelectedCase(editingCaseData);
      setEditMode(false);
      setEditingCaseData(null);
    }
  };

  return {
    selectedCase,
    setSelectedCase: handleCaseSelect,
    editMode,
    setEditMode,
    editingCaseData,
    setEditingCaseData,
    toggleEditMode,
    handleEditChange,
    handleSaveEdit
  };
};
