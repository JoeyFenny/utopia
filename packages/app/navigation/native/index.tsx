import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'
import { ExperienceDetailsScreen } from 'app/features/experiences/[id]'
import ExperiencesScreen from 'app/features/experiences/screen'
import { OnboardingScreen } from 'app/features/onboarding/screen'
import { NotificationsScreen } from 'app/features/notifications/screen'

export type RootStackParamList = {
  onboarding: undefined;
  notifications: undefined;
  experiences: undefined;
  'experiences/:id': { id: string };
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export function NativeNavigation({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: [
            Linking.createURL('/'),
            Linking.createURL('/onboarding'),
            Linking.createURL('/notifications'),
            Linking.createURL('/experiences'),
            Linking.createURL('/experiences/'),
            Linking.createURL('/experiences/:id'),
          ],
          config: {
            initialRouteName: 'onboarding',
            screens: {
              onboarding: '',
              notifications: 'notifications',
              experiences: 'experiences',
              'experience-details': 'experiences/:id',
            },
          },
        }),
        []
      )}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="onboarding"
          component={OnboardingScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="notifications"
          component={NotificationsScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="experiences"
          component={ExperiencesScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="experiences/[id]"
          component={ExperienceDetailsScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
