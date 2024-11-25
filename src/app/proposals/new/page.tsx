'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NewProposal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create proposal');
      }

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error creating proposal:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Proposal</h1>
      <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <Input
            id="title"
            name="title"
            required
            placeholder="Enter proposal title"
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
            placeholder="Enter proposal content"
            rows={6}
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <Select name="status" defaultValue="draft">
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
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Proposal'}
        </Button>
      </form>
    </main>
  );
}
