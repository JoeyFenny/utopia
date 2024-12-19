import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
  id: string
  email: string
  pinVerified: boolean
}

type AuthContextType = {
  user: User | null
  token: string | null
  signIn: (token: string, user: User) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStoredAuth()
  }, [])

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token')
      const storedUser = await AsyncStorage.getItem('auth_user')
      
      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Error loading auth state:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (newToken: string, newUser: User) => {
    try {
      // Store the new token
      await AsyncStorage.setItem('token', newToken)
      await AsyncStorage.setItem('auth_user', JSON.stringify(newUser))
      setToken(newToken)
      setUser(newUser)
    } catch (error) {
      console.error('Error saving auth state:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('auth_user')
      setToken(null)
      setUser(null)
    } catch (error) {
      console.error('Error clearing auth state:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
