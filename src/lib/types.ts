import { z } from 'zod';

export const ProposalSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  status: z.enum(['draft', 'active', 'completed', 'rejected']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Proposal = z.infer<typeof ProposalSchema>;
