
import { useState } from 'react';
import { MailCase } from '../email/types';
import { toast } from '@/hooks/toast';

// Define CaseDataType here to ensure it matches the original one
type CaseDataType = {
  id: string;
  title: string;
  skills: string[];
  location: string;
  budget: string;
  status: string;
  source: string;
  company: string | null;
  receivedDate: string | null;
  sender: string | null;
  senderName: string | null;
  createdAt: string;
  startDate: string | null;
  keyTechnologies?: string;
  foreignerAccepted: boolean;
  freelancerAccepted: boolean;
  desiredBudget?: string;
  detailDescription?: string;
  experience?: string;
  workType?: string;
  duration?: string;
  japanese?: string;
  priority?: string;
  manager: string | null;
  managerEmail: string | null;
};

export const useCaseSelection = (caseData: CaseDataType[]) => {
  const [selectedCase, setSelectedCase] = useState<CaseDataType | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingCaseData, setEditingCaseData] = useState<CaseDataType | null>(null);

  // Handler function to select a case
  const handleCaseSelect = (caseItem: MailCase) => {
    // Find the matching case with full data structure from our original caseData
    const fullCaseData = caseData.find(item => item.id === caseItem.id);
    
    // If found in our original data, use it; otherwise use the passed item as is
    if (fullCaseData) {
      setSelectedCase(fullCaseData);
    } else {
      // Create a compatible object with the correct type
      const compatibleCase: CaseDataType = {
        ...caseItem as any, // Cast as any first to avoid compiler errors
        // Provide defaults for any required properties that might be missing in MailCase
        startDate: caseItem.startDate || null,
        foreignerAccepted: caseItem.foreignerAccepted || false,
        freelancerAccepted: caseItem.freelancerAccepted || false,
        company: caseItem.company || null,
        receivedDate: caseItem.receivedDate || null,
        sender: caseItem.sender || null,
        senderName: caseItem.senderName || null,
        manager: caseItem.manager || null,
        managerEmail: caseItem.managerEmail || null
      };
      setSelectedCase(compatibleCase);
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
