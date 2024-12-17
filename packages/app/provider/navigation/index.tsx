import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'
import { Platform } from 'react-native'
import { NativeNavigation } from 'app/navigation/native'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL('/')],
          config: {
            initialRouteName: 'home',
            screens: {
              home: '',
              'experience-detail': 'experience/details/:id',
            },
          },
        }),
        []
      )}
    >
      {Platform.OS === 'web' ? children : <NativeNavigation />}
    </NavigationContainer>
  )
}
