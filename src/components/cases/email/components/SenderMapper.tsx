
import React from 'react';
import { MailCase } from '../types';

interface UseSenderMapperProps {
  paginatedCases: MailCase[];
}

export const useSenderMapper = ({ paginatedCases }: UseSenderMapperProps) => {
  // Flatten cases to show senders as the primary entity
  const flattenedSenders = React.useMemo(() => {
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
    }[] = [];
    
    paginatedCases.forEach(caseItem => {
      // If case has multiple senders, create an entry for each
      if (caseItem.senders && caseItem.senders.length > 0) {
        caseItem.senders.forEach(sender => {
          flattened.push({
            caseId: caseItem.id,
            caseTitle: caseItem.title,
            company: caseItem.company || '',
            keyTechnologies: caseItem.keyTechnologies || '',
            sender: sender.name,
            email: sender.email,
            position: sender.position,
            registrationType: caseItem.registrationType,
            registeredAt: caseItem.registeredAt,
            originalCase: caseItem
          });
        });
      } 
      // If case has a single sender
      else if (caseItem.sender) {
        flattened.push({
          caseId: caseItem.id,
          caseTitle: caseItem.title,
          company: caseItem.company || '',
          keyTechnologies: caseItem.keyTechnologies || '',
          sender: caseItem.sender,
          email: caseItem.senderEmail || '',
          registrationType: caseItem.registrationType,
          registeredAt: caseItem.registeredAt,
          originalCase: caseItem
        });
      }
      // If case has no sender, still include it but with empty sender fields
      else {
        flattened.push({
          caseId: caseItem.id,
          caseTitle: caseItem.title,
          company: caseItem.company || '',
          keyTechnologies: caseItem.keyTechnologies || '',
          sender: '',
          email: '',
          registrationType: caseItem.registrationType,
          registeredAt: caseItem.registeredAt,
          originalCase: caseItem
        });
      }
    });
    
    return flattened;
  }, [paginatedCases]);

  return { flattenedSenders };
};
