import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ExperienceScreen from 'app/features/experience/screen'
import { ExperienceDetailsScreen } from 'app/features/experience/details-screen'
import { OnboardingScreen } from 'app/features/onboarding/screen'

const Stack = createNativeStackNavigator()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="onboarding"
        component={OnboardingScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="home"
        component={ExperienceScreen}
        options={{
          title: 'Experience'
        }}
      />
      <Stack.Screen
        name="experience-detail"
        component={ExperienceDetailsScreen}
        options={{
          title: 'Details'
        }}
      />
    </Stack.Navigator>
  )
}
