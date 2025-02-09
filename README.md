`create-turboquick-app` is a CLI tool to quickly scaffold a new project using the **Turbo Starter** template with `pnpm`.  

## Tech Stack  

- Express  
- Next.js  
- WebSocket  
- Prisma  

*Feel free to delete any part of the stack according to your project requirements.*  

## Features  

- Instantly clones the Turbo Starter template from GitHub.  
- Automatically installs dependencies using `pnpm`.  
- Interactive prompt to choose the project name.  
- Removes `.git` to avoid conflicts.  

## Usage  

Run the following command to start the interactive setup:  

```bash
npx create-turboquick-app
```

## Setup Database (Prisma)  

1. Rename `.env.example` to `.env`
2. Run the following commands:  
```base
npx prisma migrate dev
```
```
npx prisma generate
``` 



