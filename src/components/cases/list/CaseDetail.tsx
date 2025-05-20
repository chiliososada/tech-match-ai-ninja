
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CaseDetailEmpty } from '../detail/CaseDetailEmpty';
import { CaseDetailHeader } from '../detail/CaseDetailHeader';
import { CaseDetailInfo } from '../detail/CaseDetailInfo';
import { CaseDetailForm } from '../detail/CaseDetailForm';
import { MailCase } from '../email/types';

interface CaseDetailProps {
  selectedCase: MailCase | null;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  editingCaseData: MailCase | null;
  handleEditChange: (field: string, value: any) => void;
  handleSaveEdit: () => void;
}

export const CaseDetail: React.FC<CaseDetailProps> = ({
  selectedCase,
  editMode,
  setEditMode,
  editingCaseData,
  handleEditChange,
  handleSaveEdit
}) => {
  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // When entering edit mode, ensure we have editing data
  useEffect(() => {
    if (editMode && selectedCase && !editingCaseData) {
      console.log("Edit mode activated but no editingCaseData, setting from selectedCase");
      // This is needed to copy the selected case for editing if it was not set
      handleEditChange('title', selectedCase.title);
    }
  }, [editMode, selectedCase, editingCaseData, handleEditChange]);

  if (!selectedCase) {
    return (
      <Card className="flex items-center justify-center h-[300px] text-center bg-muted/10 border-dashed">
        <CaseDetailEmpty />
      </Card>
    );
  }

  // Debug to check what data is available for editing
  console.log("CaseDetail - editMode:", editMode);
  console.log("CaseDetail - selectedCase:", selectedCase);
  console.log("CaseDetail - editingCaseData:", editingCaseData);

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-muted/10 border-b pb-3">
        <CaseDetailHeader selectedCase={selectedCase} toggleEditMode={toggleEditMode} />
      </CardHeader>
      <CardContent className="pt-5">
        {!editMode ? (
          <CaseDetailInfo selectedCase={selectedCase} />
        ) : (
          <>
            {(editingCaseData || selectedCase) && (
              <CaseDetailForm
                selectedCase={selectedCase}
                editingCaseData={editingCaseData || selectedCase}
                toggleEditMode={toggleEditMode}
                handleEditChange={handleEditChange}
                handleSaveEdit={handleSaveEdit}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
