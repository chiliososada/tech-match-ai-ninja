
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/ui/pagination"

interface MatchingResultsCardProps {
  title: string;
  description: string;
  matches: { id: string; name: string; skills: string[] }[];
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
}

export const MatchingResultsCard: React.FC<MatchingResultsCardProps> = ({
  title,
  description,
  matches,
  currentPage,
  itemsPerPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(matches.length / itemsPerPage);
  const paginatedMatches = matches.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold japanese-text">{title}</CardTitle>
        <CardDescription className="japanese-text">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-none space-y-4">
          {paginatedMatches.map((match) => (
            <li key={match.id} className="border rounded-md p-4">
              <h3 className="text-md font-medium japanese-text">{match.name}</h3>
              <div className="mt-2">
                {match.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="mr-2 japanese-text">{skill}</Badge>
                ))}
              </div>
            </li>
          ))}
        </ul>
        
        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchingResultsCard;
