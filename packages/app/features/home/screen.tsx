import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'
import { TextInput, Platform } from 'react-native'
import { MotiLink } from 'solito/moti'
import { LinearGradient } from 'expo-linear-gradient'

const GradientBackground = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === 'web') {
    return (
      <View className="flex-1 bg-[radial-gradient(100%_100%_at_0%_0%,_#4A484E_0%,_#0E0E0F_100%)]">
        {children}
      </View>
    )
  }

  // For native platforms
  return (
    <LinearGradient
      colors={['#4A484E', '#0E0E0F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 0.5 }}
      locations={[0, 0.5]}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  )
}

export function HomeScreen() {
  return (
    <GradientBackground>
      <View className="relative flex-1 items-center justify-center p-3">
        <H1 className="text-white">Utopia</H1>
        <TextInput
          className="w-64 px-4 py-2 mb-4 border rounded-lg bg-gray-800 text-white border-gray-700"
          placeholder="Email or phone number"
          placeholderTextColor="#6B7280"
        />
        <TextLink href="/log-in">Log in</TextLink>
      </View>
    </GradientBackground>
  )
}
