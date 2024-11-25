import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { getProposals } from "@/lib/db";

export default async function Home() {
  const proposals = await getProposals();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Proposals</h1>
        <Link href="/proposals/new" className="inline-flex">
          <Button className="gap-2">
            <PlusIcon className="h-4 w-4" />
            Create Proposal
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm hover:shadow transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <Link
                  href={`/proposals/${proposal.id}`}
                  className="text-xl font-semibold hover:underline"
                >
                  {proposal.title}
                </Link>
                <p className="mt-2 text-muted-foreground line-clamp-2">
                  {proposal.content}
                </p>
              </div>
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
              >
                {proposal.status}
              </Badge>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Last updated {formatDate(proposal.updatedAt)}
            </div>
          </div>
        ))}
        {proposals.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No proposals found. Create your first proposal!</p>
          </div>
        )}
      </div>
    </main>
  );
}
