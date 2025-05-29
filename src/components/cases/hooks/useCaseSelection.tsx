
import { useState, useEffect, useRef } from 'react';
import { MailCase } from '../email/types';
import { toast } from '@/hooks/toast';
import { useProjects } from '@/hooks/useProjects';

export const useCaseSelection = (caseData: MailCase[]) => {
  const [selectedCase, setSelectedCase] = useState<MailCase | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingCaseData, setEditingCaseData] = useState<MailCase | null>(null);
  const { updateProject, fetchProjects } = useProjects();
  
  // Use ref to track recently saved case to prevent race condition
  const recentlySavedCaseRef = useRef<string | null>(null);

  // Handler function to select a case
  const handleCaseSelect = (caseItem: MailCase) => {
    console.log('Selecting case:', caseItem.id, caseItem.title);
    
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

  // Update selectedCase when caseData changes (after fetchProjects) - but only if not in edit mode and not recently saved
  useEffect(() => {
    if (selectedCase && caseData.length > 0 && !editMode) {
      // Check if this case was recently saved to prevent overwriting the updated state
      const isRecentlySaved = recentlySavedCaseRef.current === selectedCase.id;
      
      if (isRecentlySaved) {
        console.log("Skipping selectedCase update - case was recently saved");
        // Clear the recently saved flag after preventing the overwrite
        recentlySavedCaseRef.current = null;
        return;
      }
      
      console.log("Checking if selectedCase needs to be updated with fresh data...");
      const updatedCase = caseData.find(item => item.id === selectedCase.id);
      if (updatedCase) {
        console.log("Found updated case data, updating selectedCase:", updatedCase.title);
        const caseWithProcesses = {
          ...updatedCase,
          processes: updatedCase.processes || [],
          interviewCount: updatedCase.interviewCount || '1'
        };
        setSelectedCase(caseWithProcesses);
      }
    }
  }, [caseData, selectedCase?.id, editMode]);

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

  // Save edit handler with race condition prevention
  const handleSaveEdit = async () => {
    if (editingCaseData && selectedCase) {
      console.log("Saving edited data:", editingCaseData);
      
      try {
        // Mark this case as recently saved to prevent state overwrites
        recentlySavedCaseRef.current = selectedCase.id;
        
        // Update the project in the database
        const updateData = {
          title: editingCaseData.title,
          client_company: editingCaseData.company,
          manager_name: editingCaseData.manager,
          manager_email: editingCaseData.managerEmail,
          skills: editingCaseData.skills,
          experience: editingCaseData.experience,
          location: editingCaseData.location,
          work_type: editingCaseData.workType,
          duration: editingCaseData.duration,
          budget: editingCaseData.budget,
          desired_budget: editingCaseData.desiredBudget,
          japanese_level: editingCaseData.japanese,
          priority: editingCaseData.priority,
          status: editingCaseData.status,
          start_date: editingCaseData.startDate,
          foreigner_accepted: editingCaseData.foreignerAccepted,
          freelancer_accepted: editingCaseData.freelancerAccepted,
          interview_count: editingCaseData.interviewCount,
          processes: editingCaseData.processes,
          detail_description: editingCaseData.detailDescription,
          description: editingCaseData.description
        };

        console.log("Updating project with data:", updateData);
        const result = await updateProject(selectedCase.id, updateData);
        
        if (result) {
          console.log("Project updated successfully, updating UI immediately...");
          
          // Immediately update the selectedCase with the edited data to show changes
          setSelectedCase({
            ...editingCaseData,
            processes: editingCaseData.processes || [],
            interviewCount: editingCaseData.interviewCount || '1'
          });
          
          // Exit edit mode
          setEditMode(false);
          setEditingCaseData(null);
          
          toast({
            title: "案件情報が更新されました",
            description: "変更が正常に保存されました"
          });
          
          // Run fetchProjects in background to refresh the left side list
          // This won't interfere with the selectedCase state due to our race condition prevention
          console.log("Starting background refresh of projects list...");
          fetchProjects().then(() => {
            console.log("Background projects refresh completed");
          }).catch((error) => {
            console.error("Background projects refresh failed:", error);
          });
        } else {
          console.error("Project update failed - no result returned");
          // Clear the recently saved flag if update failed
          recentlySavedCaseRef.current = null;
        }
      } catch (error) {
        console.error('Error updating case:', error);
        // Clear the recently saved flag if update failed
        recentlySavedCaseRef.current = null;
        toast({
          title: "エラー",
          description: "案件の更新に失敗しました",
          variant: "destructive"
        });
      }
    } else {
      console.error("Cannot save - missing editingCaseData or selectedCase");
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
