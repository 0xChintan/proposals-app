import { NextResponse } from 'next/server';
import { getProposal, updateProposal, deleteProposal } from '@/lib/db';
import { ProposalSchema } from '@/lib/types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const proposal = await getProposal(params.id);
    if (!proposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }
    return NextResponse.json(proposal);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch proposal' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = ProposalSchema.partial().omit({ id: true, createdAt: true }).parse(body);
    const updated = await updateProposal(params.id, validatedData);
    if (!updated) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update proposal' }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deleteProposal(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete proposal' }, { status: 500 });
  }
}
