import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { getProposal } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, PencilIcon } from 'lucide-react';

export default async function ProposalPage({
  params,
}: {
  params: { id: string };
}) {
  const proposal = await getProposal(params.id);

  if (!proposal) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Proposals
      </Link>
      
      <div className="max-w-3xl">
        <div className="flex justify-between items-start gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold">{proposal.title}</h1>
            <div className="mt-4 flex items-center gap-4">
              <Badge
                variant={
                  proposal.status === "active"
                    ? "default"
                    : proposal.status === "completed"
                    ? "success"
                    : proposal.status === "rejected"
                    ? "destructive"
                    : "secondary"
                }
                className="text-sm px-3 py-1"
              >
                {proposal.status}
              </Badge>
              <Link href={`/proposals/${params.id}/edit`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <PencilIcon className="h-4 w-4" />
                  Edit Proposal
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="prose prose-stone dark:prose-invert max-w-none">
          {proposal.content}
        </div>

        <div className="mt-8 pt-6 border-t text-sm text-muted-foreground">
          <p>Created: {formatDate(proposal.createdAt)}</p>
          <p>Last updated: {formatDate(proposal.updatedAt)}</p>
        </div>
      </div>
    </main>
  );
}
