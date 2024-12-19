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
- **Solito**: Cross-platform navigation
- **Expo**: Mobile app development framework
- **Next.js**: React framework for web
- **NativeWind**: Tailwind CSS for React Native
- **Apollo Client**: GraphQL client (v3.12.3)
- **React**: v18.2.0
- **React Native**: v0.72.2
- **React Native Web**: v0.19.6
- **TypeScript**: v5.2.2

### Backend
- **Node.js**: Runtime environment (v18+)
- **GraphQL**: API query language
- **Apollo Server**: GraphQL server
- **Prisma**: Database ORM
- **GraphQL Shield**: Permission layer
- **MongoDB**: NoSQL Database

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v18 or later)
- Yarn (v3.4.1)
- Expo CLI
- MongoDB

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/your-username/utopia.git
cd utopia
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:

Create the following `.env` files:

#### apps/backend/.env
```
DATABASE_URL="mongodb://localhost:27017/utopia"
JWT_SECRET="your-jwt-secret"
PORT=4000
```

### Running the Apps

1. Start the backend server:
```bash
cd apps/backend
yarn dev
```

2. Start the web app:
```bash
yarn web
```

3. Start the mobile app:
```bash
yarn native
```

## 📦 Package Dependencies

### Shared Dependencies
- `@apollo/client`: v3.12.3
- `@react-native-async-storage/async-storage`: v1.18.2
- `graphql`: v16.10.0
- `expo-linear-gradient`: v12.3.0

### Development Dependencies
- `typescript`: v5.2.2
- `prettier`: v3.0.3
- `eslint`: v8.21.0
- `turbo`: v1.4.2

For a complete list of dependencies and their versions, please refer to the `package.json` files in each directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
