import fs from 'fs/promises';
import path from 'path';
import { Proposal, ProposalSchema } from './types';

const DB_PATH = path.join(process.cwd(), 'data', 'proposals.json');

// Ensure the data directory exists
async function ensureDbExists() {
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    try {
      await fs.access(DB_PATH);
    } catch {
      await fs.writeFile(DB_PATH, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Failed to ensure database exists:', error);
    throw error;
  }
}

// Initialize the database
ensureDbExists();

// Get all proposals
export async function getProposals(): Promise<Proposal[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const proposals = JSON.parse(data);
    return proposals.map((proposal: unknown) => ProposalSchema.parse(proposal));
  } catch (error) {
    console.error('Failed to get proposals:', error);
    return [];
  }
}

// Get a single proposal by ID
export async function getProposal(id: string): Promise<Proposal | null> {
  try {
    const proposals = await getProposals();
    return proposals.find(p => p.id === id) ?? null;
  } catch (error) {
    console.error('Failed to get proposal:', error);
    return null;
  }
}

// Create a new proposal
export async function createProposal(data: Omit<Proposal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Proposal> {
  try {
    const proposals = await getProposals();
    const newProposal: Proposal = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await fs.writeFile(DB_PATH, JSON.stringify([...proposals, newProposal], null, 2));
    return newProposal;
  } catch (error) {
    console.error('Failed to create proposal:', error);
    throw error;
  }
}

// Update a proposal
export async function updateProposal(id: string, data: Partial<Omit<Proposal, 'id' | 'createdAt'>>): Promise<Proposal | null> {
  try {
    const proposals = await getProposals();
    const index = proposals.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProposal = {
      ...proposals[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    proposals[index] = updatedProposal;
    await fs.writeFile(DB_PATH, JSON.stringify(proposals, null, 2));
    return updatedProposal;
  } catch (error) {
    console.error('Failed to update proposal:', error);
    throw error;
  }
}

// Delete a proposal
export async function deleteProposal(id: string): Promise<boolean> {
  try {
    const proposals = await getProposals();
    const filteredProposals = proposals.filter(p => p.id !== id);
    await fs.writeFile(DB_PATH, JSON.stringify(filteredProposals, null, 2));
    return true;
  } catch (error) {
    console.error('Failed to delete proposal:', error);
    return false;
  }
}