# Utopia - Full Stack Cross-Platform App

A modern, cross-platform application built with React Native, Next.js, and GraphQL. This monorepo contains all the necessary components for the mobile app (Expo), web app (Next.js), and backend server.

## 🏗 Project Structure

```
utopia/
├── apps/
│   ├── expo/          # React Native mobile app
│   ├── next/          # Next.js web app
│   └── backend/       # GraphQL API server
└── packages/          # Shared packages
```

## 🚀 Tech Stack

### Frontend (Mobile & Web)
- **Solito**: Cross-platform navigation and shared components
- **Expo**: Mobile app development framework
- **Next.js**: React framework for web
- **NativeWind**: Tailwind CSS for React Native
- **Apollo Client**: GraphQL client
- **React Native**: Mobile app development
- **TypeScript**: Type-safe development

### Backend
- **Node.js**: Runtime environment
- **GraphQL**: API query language
- **Apollo Server**: GraphQL server
- **Prisma**: Database ORM
- **GraphQL Shield**: Permission layer
- **PostgreSQL**: Database

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v18 or later)
- Yarn
- Expo CLI
- PostgreSQL

### Environment Variables

Create the following `.env` files:

#### apps/backend/.env
```
DATABASE_URL="postgresql://user:password@localhost:5432/utopia"
JWT_SECRET="your-jwt-secret"
PORT=4000
```

#### apps/next/.env.local
```
NEXT_PUBLIC_API_URL="http://localhost:4000/graphql"
```

#### apps/expo/.env
```
API_URL="http://localhost:4000/graphql"
```

### Installation Steps

1. Install dependencies:
```bash
yarn install
```

2. Set up the database:
```bash
cd apps/backend
npx prisma migrate dev
```

## 🏃‍♂️ Running Locally

### Backend Server
```bash
cd apps/backend
yarn dev
```
The GraphQL server will be available at `http://localhost:4000/graphql`

### Web App (Next.js)
```bash
cd apps/next
yarn dev
```
Access the web app at `http://localhost:3000`

### Mobile App (Expo)
```bash
cd apps/expo
yarn start
```
This will open the Expo developer tools. You can run the app on:
- iOS simulator (press `i`)
- Android emulator (press `a`)
- Physical device (scan QR code with Expo Go app)

## 🔄 Development Workflow

- The `packages/` directory contains shared code between platforms
- Use Solito for cross-platform navigation
- Style with NativeWind/Tailwind classes
- Write GraphQL queries/mutations in the shared package
- Use Prisma Studio to manage database records (`npx prisma studio`)

## 🧪 Testing

Each app can be tested individually:

```bash
# Backend tests
cd apps/backend
yarn test

# Web tests
cd apps/next
yarn test

# Mobile tests
cd apps/expo
yarn test
```

## 📱 Building for Production

### Web (Next.js)
```bash
cd apps/next
yarn build
```

### Mobile (Expo)
```bash
cd apps/expo
yarn build:android  # For Android
yarn build:ios     # For iOS
```

### Backend
```bash
cd apps/backend
yarn build
```

## 📚 Additional Resources

- [Solito Documentation](https://solito.dev)
- [Expo Documentation](https://docs.expo.dev)
- [NativeWind Documentation](https://nativewind.dev)
- [Apollo GraphQL Documentation](https://www.apollographql.com/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
