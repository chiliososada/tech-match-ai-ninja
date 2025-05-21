
import React from 'react';
import { MailCase } from '../types';

// This hook processes case data and extracts sender information
export const useSenderMapper = ({ 
  paginatedCases 
}: { 
  paginatedCases: MailCase[] 
}) => {
  const flattenedSenders = React.useMemo(() => {
    return paginatedCases.flatMap(caseItem => {
      // If the case has defined multiple senders in the senders array
      if (caseItem.senders && caseItem.senders.length > 0) {
        return caseItem.senders.map((sender, index) => ({
          caseId: caseItem.id,
          caseTitle: caseItem.title,
          company: caseItem.company,
          keyTechnologies: caseItem.skills?.join(', ') || '',
          sender: sender.name,
          email: sender.email,
          position: sender.position,
          registrationType: caseItem.registrationType,
          registeredAt: caseItem.registeredAt,
          originalCase: caseItem,
          // Add a unique row ID for each sender to ensure precise selection
          rowId: `${caseItem.id}-${sender.name}-${index}`
        }));
      } 
      // If the case uses the legacy sender format
      else {
        return [{
          caseId: caseItem.id,
          caseTitle: caseItem.title,
          company: caseItem.company,
          keyTechnologies: caseItem.skills?.join(', ') || '',
          sender: caseItem.sender || '',
          email: caseItem.senderEmail || '',
          position: '',
          registrationType: caseItem.registrationType,
          registeredAt: caseItem.registeredAt,
          originalCase: caseItem,
          // Add a unique row ID for single sender cases too
          rowId: `${caseItem.id}-single`
        }];
      }
    });
  }, [paginatedCases]);

  return { flattenedSenders };
};
