import { Platform } from 'react-native'

const DEFAULT_URL = 'http://localhost:4000/graphql'

export const API_URL = Platform.select({
  web: process.env.NEXT_PUBLIC_API_URL,
  default: process.env.EXPO_PUBLIC_API_URL,
}) || DEFAULT_URL
