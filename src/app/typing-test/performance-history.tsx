'use client';

import { TypingPerformance } from './typing-test-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { History } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  return `${seconds / 60} min`;
}

export function PerformanceHistory({ history }: { history: TypingPerformance[] }) {
  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-headline">
          <History className="mr-2 h-5 w-5" />
          Recent Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Speed (WPM)</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((perf, index) => (
              <TableRow key={index}>
                <TableCell className="font-bold">{perf.wpm}</TableCell>
                <TableCell>
                  <Badge variant={perf.accuracy > 90 ? 'default' : 'secondary'}>{perf.accuracy}%</Badge>
                </TableCell>
                <TableCell>{formatDuration(perf.duration)}</TableCell>
                <TableCell className="text-right">{formatDistanceToNow(new Date(perf.date), { addSuffix: true })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
