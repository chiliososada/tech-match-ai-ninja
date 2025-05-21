
import React, { useCallback, useMemo } from 'react';
import { MailCase } from '../types';

interface UseSenderMapperProps {
  paginatedCases: MailCase[];
}

export const useSenderMapper = ({ paginatedCases }: UseSenderMapperProps) => {
  // Create flattened list of all senders from all cases
  const flattenedSenders = useMemo(() => {
    if (!paginatedCases || !Array.isArray(paginatedCases)) {
      console.error("Expected paginatedCases to be an array, got:", paginatedCases);
      return [];
    }

    const flattened: {
      caseId: string;
      caseTitle: string;
      company: string;
      keyTechnologies: string;
      sender: string;
      email: string;
      position?: string;
      registrationType?: string;
      registeredAt?: string;
      originalCase: MailCase;
      rowId: string;
      startDate?: string; // Add startDate property
    }[] = [];

    paginatedCases.forEach((caseItem) => {
      // Extract key technologies as comma-separated string
      const keyTechs = Array.isArray(caseItem.skills) 
        ? caseItem.skills.slice(0, 3).join(', ') 
        : (typeof caseItem.skills === 'string' ? caseItem.skills : '');
      
      // Handle cases with multiple senders
      if (caseItem.senders && Array.isArray(caseItem.senders) && caseItem.senders.length > 0) {
        caseItem.senders.forEach((sender, index) => {
          const rowId = `${caseItem.id}-${sender.email || index}-${index}`;
          flattened.push({
            caseId: caseItem.id,
            caseTitle: caseItem.title || '',
            company: caseItem.company || '',
            keyTechnologies: keyTechs,
            sender: sender.name || '',
            email: sender.email || '',
            position: sender.position || '',
            registrationType: caseItem.registrationType,
            registeredAt: caseItem.registeredAt,
            originalCase: caseItem,
            rowId: rowId,
            startDate: caseItem.startDate || '', // Add startDate
          });
        });
      } 
      // Handle cases with a single sender
      else {
        const senderName = caseItem.sender || caseItem.senderName || '';
        const senderEmail = caseItem.senderEmail || '';
        const rowId = `${caseItem.id}-${senderEmail || 'default'}-0`;
        flattened.push({
          caseId: caseItem.id,
          caseTitle: caseItem.title || '',
          company: caseItem.company || '',
          keyTechnologies: keyTechs,
          sender: senderName,
          email: senderEmail,
          position: '',
          registrationType: caseItem.registrationType,
          registeredAt: caseItem.registeredAt,
          originalCase: caseItem,
          rowId: rowId,
          startDate: caseItem.startDate || '', // Add startDate
        });
      }
    });

    return flattened;
  }, [paginatedCases]);

  return {
    flattenedSenders
  };
};
