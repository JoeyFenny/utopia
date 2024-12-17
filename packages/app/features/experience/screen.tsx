import { View } from 'app/design/view'
import { Image, Platform } from 'react-native'
import { H1, Text } from 'app/design/typography'

export function ExperienceScreen() {
  if (Platform.OS === 'web') {
    return (
      <View className="h-screen relative bg-black">
        <View className="absolute inset-0 flex items-center justify-center px-6">
          <View className="max-w-sm">
            <H1 className="text-white text-4xl font-light text-center mb-4">
              Experience Screen
            </H1>
            <Text className="text-white/75 text-lg text-center">
              Coming soon..
            </Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1 relative bg-black">
      <View className="flex-1 px-6">
        <View className="flex-1 justify-center items-center">
          <View className="max-w-sm">
            <H1 className="text-white text-4xl font-light text-center mb-4">
              Experience Screen
            </H1>
            <Text className="text-white/75 text-lg text-center">
              Coming soon...
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
