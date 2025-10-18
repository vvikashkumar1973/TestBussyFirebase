'use server';

/**
 * @fileOverview Generates mock test papers based on a data model of questions, options, and correct answers.
 *
 * - generateMockTestPaper - A function that generates mock test papers.
 * - GenerateMockTestPaperInput - The input type for the generateMockTestPaper function.
 * - GenerateMockTestPaperOutput - The return type for the generateMockTestPaper function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMockTestPaperInputSchema = z.object({
  topic: z.string().describe('The topic of the mock test paper.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty level of the mock test paper.'),
  numberOfQuestions: z.number().int().positive().describe('The number of questions to include in the mock test paper.'),
});

export type GenerateMockTestPaperInput = z.infer<typeof GenerateMockTestPaperInputSchema>;

const GenerateMockTestPaperOutputSchema = z.object({
  testPaper: z.string().describe('The generated mock test paper in a suitable format (e.g., JSON, Markdown).'),
});

export type GenerateMockTestPaperOutput = z.infer<typeof GenerateMockTestPaperOutputSchema>;

export async function generateMockTestPaper(input: GenerateMockTestPaperInput): Promise<GenerateMockTestPaperOutput> {
  return generateMockTestPaperFlow(input);
}

const generateMockTestPaperPrompt = ai.definePrompt({
  name: 'generateMockTestPaperPrompt',
  input: {schema: GenerateMockTestPaperInputSchema},
  output: {schema: GenerateMockTestPaperOutputSchema},
  prompt: `You are an expert in creating mock test papers for Indian government exams.

  Based on the topic, difficulty and number of questions requested by the user, generate a mock test paper.

  Topic: {{{topic}}}
  Difficulty: {{{difficulty}}}
  Number of Questions: {{{numberOfQuestions}}}

  Ensure that the test paper includes multiple-choice questions with four options each and clearly indicates the correct answer.
  The output should be a well-formatted string that includes the questions, options, and correct answers.
  The test paper should be suitable for use in an online exam platform.
  The test paper should be in markdown format, questions, options and answers should be clearly denoted.
  `,
});

const generateMockTestPaperFlow = ai.defineFlow(
  {
    name: 'generateMockTestPaperFlow',
    inputSchema: GenerateMockTestPaperInputSchema,
    outputSchema: GenerateMockTestPaperOutputSchema,
  },
  async input => {
    const {output} = await generateMockTestPaperPrompt(input);
    return output!;
  }
);
