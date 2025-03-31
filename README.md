
## Run Locally

Clone the project

```js
  git clone https://github.com/nehalpradhan23/intellisqr-fullstack-assignment
```

# Backend Setup

### Go to the project root directory

```js
  cd my-project
```
### create .env

```js
  // /my-project/.env
 
  // add database connection neon db in this case
  DATABASE_URL="your database url here"

  // this is your frontend vite origin url to give access  to the backend. Add whatever is yours
  ORIGIN_URL=http://localhost:5173

  // this is the port address, change accordingly
  PORT=6001
```

### Install dependencies

```bash
  npm install
```
### Install prisma

```bash
  cd backend
  npx prisma generate
```

### Start the server

```bash
  // goto root - cd ..
  npm run dev
```

# Frontend setup

### Go to project frontend directory

```js
  cd my-project/frontend
```

### create .env

```js
  // /my-project/frontend/.env

  VITE_API_URL=http://localhost:5001
  // this is your backend port url for accessing backend. This has to be same as the backend port.
```

### Install dependencies

```bash
  npm install
```
### Start the server

```bash
  npm run dev
```

## Tech Stack

**Client:** React, Vite, TailwindCSS, axios, react-hook-form, react-router, zod, Typescript

**Server:** Node, Express, Prisma, Typescript


## Features

- Typescript for type safety
- Zod for schema validation
- React Hook Form for form management
- React Query(Tanstack Query) for data fetching
- Prisma for database management
- Neon DB for storing data.
- Custom Input component for input fields
- Custom hook for user authentication
- Backend nodejs server with routes and controllers
- Tailwind CSS for styling

## Project Structure

```markdown
├── 📂 backend
│ ├─── 📂 prisma
│ │     └─ 📄schema.prisma - (Prisma User schema)
│ └─── 📂 src
│       ├─ 📂controllers
│       │   └──📄auth.controller.ts - (User API endpoints - login and signup)
│       ├─ 📂db
│       │   └──📄prisma.ts - (Prisma Database connection)
│       ├─ 📂routes
│       │   └──📄auth.route.ts - (express routes - login and signup)
│       └─ 📄index.ts - (nodejs entry point)
├─ 📂 frontend
│   ├─ 📂 src
│   │   ├─ 📂components
│   │   │   └─ 📄InputBox.tsx - (Reusable input box component)
│   │   ├─ 📂hooks
│   │   │   └─ 📄useAuth.tsx - (Authentication to check User token and redirection)
│   │   ├─ 📂pages
│   │   │   ├─ 📄Home.tsx - (Home page)
│   │   │   ├─ 📄Login.tsx - (Login page)
│   │   │   └─ 📄Register.tsx - (Register page)
│   │   ├─ 📄App.tsx - (Root component)
│   │   ├─ 📄App.css
│   │   ├─ 📄index.css
│   │   └─ 📄main.tsx - (Entry point)
│   ├─ 📄.env - (Environment variables)
│   ├─ 📄package.json
│   └─ 📄tsconfig.json
├─ 📄package.json
├─ 📄readme.md
├─ 📄tsconfig.json
└─ 📄.env - (environment variables)
```
