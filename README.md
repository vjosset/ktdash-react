# KTDash Nextjs React App

## Getting Started

First, prep your environment:

1. Add a `.env` file in project root pointing to your local DB
```
DATABASE_URL=mysql://[user]:[password]@[host]:[port]/[dbname]]?connect_timeout=300
```
2. Install dependencies
```bash
npm install --force
```
3. Build prisma schemas
```bash
npx prisma db push
npx prisma generate
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
