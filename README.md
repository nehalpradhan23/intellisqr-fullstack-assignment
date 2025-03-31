
## Run Locally

Clone the project

```js
  git clone https://github.com/nehalpradhan23/intellisqr-fullstack-assignment
```

## Backend Setup

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

## Frontend setup

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
