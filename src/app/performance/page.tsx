'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Target, BrainCircuit, Activity } from "lucide-react";
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart";

const overallStats = [
  { label: "Tests Taken", value: "28", icon: Activity },
  { label: "Highest Score", value: "92%", icon: Award },
  { label: "Average Accuracy", value: "85%", icon: Target },
];

const performanceData = [
  { name: 'SSC CGL #1', score: 78, date: '2024-06-15' },
  { name: 'IBPS PO #1', score: 65, date: '2024-06-18' },
  { name: 'SSC CGL #2', score: 82, date: '2024-06-22' },
  { name: 'RRB NTPC #1', score: 75, date: '2024-06-25' },
  { name: 'IBPS PO #2', score: 71, date: '2024-06-29' },
  { name: 'SSC CGL #3', score: 88, date: '2024-07-03' },
];

const recentTests = [
  { name: "SSC CGL #3", score: "88/100", accuracy: "91%", date: "2024-07-03", status: "Completed" },
  { name: "IBPS PO #2", score: "71/100", accuracy: "82%", date: "2024-06-29", status: "Completed" },
  { name: "Typing Test (5 min)", score: "42 WPM", accuracy: "95%", date: "2024-06-28", status: "Completed" },
  { name: "RRB NTPC #1", score: "75/100", accuracy: "85%", date: "2024-06-25", status: "Completed" },
]

export default function PerformancePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Performance Dashboard</h1>
        <p className="text-muted-foreground max-w-2xl">
          Track your progress, analyze your performance, and get personalized recommendations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {overallStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
         <Card className="lg:col-span-1 bg-accent text-accent-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Recommendations</CardTitle>
              <BrainCircuit className="h-4 w-4 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                Focus on <span className="font-bold">Reasoning</span> for Banking exams.
              </div>
            </CardContent>
          </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-5 w-5"/>Score Progression</CardTitle>
            <CardDescription>Your test scores over the last few attempts.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={{}} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={performanceData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" fill="var(--color-primary)" radius={4} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Test History</CardTitle>
            <CardDescription>A log of your most recent test attempts.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Accuracy</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTests.map((test) => (
                  <TableRow key={test.name}>
                    <TableCell className="font-medium">{test.name}</TableCell>
                    <TableCell>{test.score}</TableCell>
                    <TableCell>
                      <Badge variant={parseInt(test.accuracy) > 90 ? "default" : "secondary"}>{test.accuracy}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{test.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
