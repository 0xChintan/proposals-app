# Proposals Management App

A modern web application built with Next.js 14 for managing project proposals. This application provides a simple and intuitive interface for creating, viewing, editing, and managing proposals with different statuses.

## Features

- 📝 Create new proposals with title and content
- 👀 View all proposals in a clean, organized list
- ✏️ Edit existing proposals
- 🗑️ Delete proposals
- 📊 Status management (Draft, Active, Completed, Rejected)
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- ⚡ Fast and efficient with Next.js 14
- 💾 JSON-based storage solution

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI
  - Custom shadcn/ui components
- **State Management**: React Hooks
- **Data Validation**: Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd temp-proposals-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
temp-proposals-app/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   ├── proposals/         # Proposal pages
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   └── ui/               # UI components
│   └── lib/                   # Utilities and database
│       ├── db.ts             # Database operations
│       ├── types.ts          # TypeScript types
│       └── utils.ts          # Utility functions
├── public/                    # Static files
└── data/                     # JSON database storage
```

## Usage

### Creating a Proposal

1. Click "Create Proposal" on the home page
2. Fill in the title and content
3. Select initial status (defaults to Draft)
4. Click "Create Proposal"

### Editing a Proposal

1. Click on a proposal title to view details
2. Click "Edit Proposal"
3. Modify title, content, or status
4. Click "Save Changes"

### Managing Status

Proposals can have one of four statuses:
- **Draft**: Initial state
- **Active**: Currently in progress
- **Completed**: Finished proposals
- **Rejected**: Declined proposals

### Deleting a Proposal

1. Navigate to the proposal's edit page
2. Click "Delete Proposal"
3. Confirm deletion in the popup

## Development

### Building

```bash
pnpm build
```

### Running Production Build

```bash
pnpm start
```

## Data Storage

The application uses a JSON-based storage solution:
- Data is stored in `/data/proposals.json`
- CRUD operations are handled through API routes
- Data is validated using Zod schemas

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js 14
- UI components inspired by shadcn/ui
- Icons from Lucide React
# proposals-app
