import { NextResponse } from 'next/server';
import { createProposal, getProposals } from '@/lib/db';
import { ProposalSchema } from '@/lib/types';

export async function GET() {
  try {
    const proposals = await getProposals();
    return NextResponse.json(proposals);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch proposals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = ProposalSchema.omit({ id: true, createdAt: true, updatedAt: true }).parse(body);
    const newProposal = await createProposal(validatedData);
    return NextResponse.json(newProposal, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create proposal' }, { status: 400 });
  }
}
