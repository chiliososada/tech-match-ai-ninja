
import { toast } from 'sonner';
import { MailCase } from '../../types';

// Handle select all functionality
export const handleSelectAll = (
  paginatedCases: MailCase[],
  isSelectAll: boolean,
  setSelectedCases: (cases: MailCase[]) => void,
  setSelectAll: (value: boolean) => void
) => {
  if (isSelectAll) {
    // Deselect all
    setSelectedCases([]);
    setSelectAll(false);
  } else {
    // Select all with proper rowId
    const casesWithRowId = paginatedCases.map(caseItem => {
      // Generate a unique row ID based on available sender information
      const rowId = `${caseItem.id}-${caseItem.senderEmail || 'default'}-0`;
      
      return {
        ...caseItem,
        selectedRowId: rowId
      };
    });
    
    setSelectedCases(casesWithRowId);
    setSelectAll(true);
  }
};

// Handle individual case selection
export const handleSelectCase = (
  id: string,
  rowId: string,
  selectedCases: MailCase[],
  paginatedCases: MailCase[],
  setSelectedCases: (cases: MailCase[]) => void,
  setSelectAll: (value: boolean) => void
) => {
  // Find the case to toggle
  const caseToToggle = paginatedCases.find(c => c.id === id);
  if (!caseToToggle) return;
  
  // Check if this case is already selected
  const isAlreadySelected = selectedCases.some(c => 
    c.id === id && c.selectedRowId === rowId
  );
  
  if (isAlreadySelected) {
    // Remove from selected
    const updatedCases = selectedCases.filter(c => 
      !(c.id === id && c.selectedRowId === rowId)
    );
    setSelectedCases(updatedCases);
    setSelectAll(false);
  } else {
    // Add to selected, with selected sender details and rowId
    const updatedCase = { 
      ...caseToToggle,
      selectedRowId: rowId
    };
    setSelectedCases([...selectedCases, updatedCase]);
    
    // Check if all are now selected
    if (selectedCases.length + 1 === paginatedCases.length) {
      setSelectAll(true);
    }
  }
};
