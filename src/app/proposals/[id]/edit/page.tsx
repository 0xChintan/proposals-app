'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Proposal } from '@/lib/types';

export default function EditProposal({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    // Fetch the proposal data when the component mounts
    fetch(`/api/proposals/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProposal(data))
      .catch((error) => console.error('Error fetching proposal:', error));
  }, [params.id]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      status: formData.get('status') as 'draft' | 'active' | 'completed' | 'rejected',
    };

    try {
      const response = await fetch(`/api/proposals/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update proposal');
      }

      router.push(`/proposals/${params.id}`);
      router.refresh();
    } catch (error) {
      console.error('Error updating proposal:', error);
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    if (!window.confirm('Are you sure you want to delete this proposal?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/proposals/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete proposal');
      }

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error deleting proposal:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!proposal) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href={`/proposals/${params.id}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Proposal
      </Link>

      <div className="max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit Proposal</h1>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={loading}
          >
            Delete Proposal
          </Button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={proposal.title}
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <Textarea
              id="content"
              name="content"
              required
              defaultValue={proposal.content}
              rows={6}
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-2">
              Status
            </label>
            <Select name="status" defaultValue={proposal.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Link href={`/proposals/${params.id}`}>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
