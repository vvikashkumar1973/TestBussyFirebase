import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, ListFilter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const allExams = [
  {
    title: "SSC CGL Tier 1 - Full Mock",
    category: "SSC",
    description: "Comprehensive mock test covering all sections of the SSC CGL Tier 1 exam.",
    imageId: "exam-ssc-cgl",
  },
  {
    title: "IBPS PO Prelims - Mock Series",
    category: "Banking",
    description: "A series of mock tests designed to simulate the IBPS PO preliminary exam environment.",
    imageId: "exam-ibps-po",
  },
  {
    title: "RRB NTPC CBT 1 - Practice Set",
    category: "Railways",
    description: "Practice sets for the Railway Recruitment Board NTPC Stage 1 Computer Based Test.",
    imageId: "exam-rrb-ntpc",
  },
   {
    title: "SSC CHSL - English Language",
    category: "SSC",
    description: "Focused practice on the English Language section for the SSC CHSL exam.",
    imageId: "exam-ssc-chsl",
  },
  {
    title: "SBI Clerk Mains - Reasoning Ability",
    category: "Banking",
    description: "Advanced reasoning problems for the SBI Clerk Mains exam.",
    imageId: "exam-sbi-clerk",
  },
  {
    title: "UP Police Constable Mock",
    category: "Other",
    description: "Full-length mock test for state-level police recruitment.",
    imageId: "exam-up-police",
  },
];

export default function ExamTestPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Exam Tests</h1>
        <p className="text-muted-foreground max-w-2xl">
          Choose from a wide variety of mock tests and practice sets. Filter by exam category to find exactly what you need.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <TabsList className="overflow-x-auto">
              <TabsTrigger value="all">All Tests</TabsTrigger>
              <TabsTrigger value="ssc">SSC</TabsTrigger>
              <TabsTrigger value="banking">Banking</TabsTrigger>
              <TabsTrigger value="railways">Railways</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
                <Button variant="outline" className="hidden sm:flex">
                  <BrainCircuit className="mr-2 h-4 w-4"/>
                  Generate Mock Test
                </Button>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                       <Button variant="outline"><ListFilter className="mr-2 h-4 w-4"/> Filter</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Filter by Difficulty</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value="all">
                          <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="easy">Easy</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="hard">Hard</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <TabsContent value="all">
          <ExamGrid exams={allExams} />
        </TabsContent>
        <TabsContent value="ssc">
          <ExamGrid exams={allExams.filter(e => e.category === 'SSC')} />
        </TabsContent>
        <TabsContent value="banking">
          <ExamGrid exams={allExams.filter(e => e.category === 'Banking')} />
        </TabsContent>
        <TabsContent value="railways">
          <ExamGrid exams={allExams.filter(e => e.category === 'Railways')} />
        </TabsContent>
        <TabsContent value="other">
          <ExamGrid exams={allExams.filter(e => e.category === 'Other')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ExamGrid({ exams }: { exams: typeof allExams }) {
    const findImage = (id: string) => {
      const defaultImage = { imageUrl: "https://picsum.photos/seed/default-exam/400/200", imageHint: "exam" };
      return PlaceHolderImages.find(p => p.id === id) || defaultImage;
    };
    
    if (exams.length === 0) {
        return <div className="text-center py-16 text-muted-foreground">No tests found for this category.</div>
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => {
            const image = findImage(exam.imageId);
            return (
              <Card key={exam.title} className="flex flex-col">
                <CardHeader className="p-0">
                  <Image
                    src={image.imageUrl}
                    alt={exam.title}
                    width={400}
                    height={200}
                    data-ai-hint={image.imageHint}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg font-headline leading-tight">{exam.title}</CardTitle>
                  <CardDescription className="mt-2 text-sm">{exam.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" asChild>
                    <Link href="#">Start Test</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
    );
}
