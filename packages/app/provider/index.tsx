import { SafeArea } from './safe-area'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AuthProvider } from './auth'
import { Provider as ApolloProviderWrapper } from './apollo'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ApolloProviderWrapper>
          <SafeArea>{children}</SafeArea>
        </ApolloProviderWrapper>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
