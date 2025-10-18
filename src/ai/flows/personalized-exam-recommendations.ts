'use server';

/**
 * @fileOverview A personalized exam recommendation AI agent.
 *
 * - personalizedExamRecommendations - A function that handles the exam recommendation process.
 * - PersonalizedExamRecommendationsInput - The input type for the personalizedExamRecommendations function.
 * - PersonalizedExamRecommendationsOutput - The return type for the personalizedExamRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedExamRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  examHistory: z.string().describe('The exam history of the user.'),
  practiceAreas: z.string().describe('The practice areas of the user.'),
});
export type PersonalizedExamRecommendationsInput = z.infer<typeof PersonalizedExamRecommendationsInputSchema>;

const PersonalizedExamRecommendationsOutputSchema = z.object({
  examRecommendations: z.string().describe('The personalized exam recommendations for the user.'),
  practiceAreaRecommendations: z.string().describe('The personalized practice area recommendations for the user.'),
});
export type PersonalizedExamRecommendationsOutput = z.infer<typeof PersonalizedExamRecommendationsOutputSchema>;

export async function personalizedExamRecommendations(input: PersonalizedExamRecommendationsInput): Promise<PersonalizedExamRecommendationsOutput> {
  return personalizedExamRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedExamRecommendationsPrompt',
  input: {schema: PersonalizedExamRecommendationsInputSchema},
  output: {schema: PersonalizedExamRecommendationsOutputSchema},
  prompt: `You are an expert exam recommendation system specializing in Indian government exams.

You will use the user's exam history and practice areas to recommend specific exams and practice areas.

User ID: {{{userId}}}
Exam History: {{{examHistory}}}
Practice Areas: {{{practiceAreas}}}

Based on this information, provide personalized exam recommendations and practice area recommendations.

Exam Recommendations:
Practice Area Recommendations: `,
});

const personalizedExamRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedExamRecommendationsFlow',
    inputSchema: PersonalizedExamRecommendationsInputSchema,
    outputSchema: PersonalizedExamRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
