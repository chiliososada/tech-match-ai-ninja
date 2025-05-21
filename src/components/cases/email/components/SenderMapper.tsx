
import { useEffect, useState } from 'react';
import { MailCase } from '../types';

interface SenderMapperProps {
  paginatedCases: MailCase[];
}

export const useSenderMapper = ({ paginatedCases }: SenderMapperProps) => {
  const [flattenedSenders, setFlattenedSenders] = useState<{
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
  }[]>([]);

  useEffect(() => {
    // Transform cases with multiple senders into flattened list
    const flattened = paginatedCases.reduce((acc, caseItem) => {
      // If case has multiple senders
      if (caseItem.senders && caseItem.senders.length > 0) {
        // Map each sender to a row
        const senderRows = caseItem.senders.map((sender, index) => ({
          caseId: caseItem.id,
          caseTitle: caseItem.title,
          company: caseItem.company,
          keyTechnologies: caseItem.keyTechnologies || caseItem.skills?.join(', ') || '',
          sender: sender.name,
          email: sender.email,
          position: sender.position,
          registrationType: caseItem.registrationType,
          registeredAt: caseItem.registeredAt,
          originalCase: caseItem,
          rowId: `${caseItem.id}-${sender.email}-${index}`
        }));
        return [...acc, ...senderRows];
      } 
      // If case has single sender
      else if (caseItem.sender) {
        return [...acc, {
          caseId: caseItem.id,
          caseTitle: caseItem.title,
          company: caseItem.company,
          keyTechnologies: caseItem.keyTechnologies || caseItem.skills?.join(', ') || '',
          sender: caseItem.sender,
          email: caseItem.senderEmail || '',
          registrationType: caseItem.registrationType,
          registeredAt: caseItem.registeredAt,
          originalCase: caseItem,
          rowId: `${caseItem.id}-${caseItem.senderEmail || 'default'}-0`
        }];
      }
      // If case has no sender
      else {
        return [...acc, {
          caseId: caseItem.id,
          caseTitle: caseItem.title,
          company: caseItem.company,
          keyTechnologies: caseItem.keyTechnologies || caseItem.skills?.join(', ') || '',
          sender: '',
          email: '',
          registrationType: caseItem.registrationType,
          registeredAt: caseItem.registeredAt,
          originalCase: caseItem,
          rowId: `${caseItem.id}-default-0`
        }];
      }
    }, []);

    // Sort by company and title
    const sortedFlattened = [...flattened].sort((a, b) => 
      a.company.localeCompare(b.company) || a.caseTitle.localeCompare(b.caseTitle)
    );

    console.log('Mapped senders:', sortedFlattened);
    setFlattenedSenders(sortedFlattened);
  }, [paginatedCases]);

  return { flattenedSenders };
};
