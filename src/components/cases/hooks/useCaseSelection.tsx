
import { useState } from 'react';
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
      setSelectedCase(fullCaseData);
    } else {
      setSelectedCase(caseItem);
    }
    
    setEditingCaseData(null);
    setEditMode(false);
  };

  // Toggle edit mode handler
  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode && selectedCase) {
      setEditingCaseData({...selectedCase});
    } else {
      setEditingCaseData(null);
    }
  };

  // Edit change handler
  const handleEditChange = (field: string, value: any) => {
    if (editingCaseData) {
      setEditingCaseData({
        ...editingCaseData,
        [field]: value
      });
    }
  };

  // Save edit handler
  const handleSaveEdit = () => {
    if (editingCaseData) {
      toast({
        title: "案件情報が更新されました",
        description: "変更が保存されました"
      });
      setSelectedCase(editingCaseData);
      setEditMode(false);
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
