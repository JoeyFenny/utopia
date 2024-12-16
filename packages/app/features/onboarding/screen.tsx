import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Pressable } from 'react-native'
import { useRouter } from 'solito/router'

export function OnboardingScreen() {
  const { back } = useRouter()

  return (
    <View className="flex-1 bg-black">
      <View className="p-4 pt-12">
        <Pressable onPress={back}>
          <View className="w-8 h-8 rounded-full bg-[#222] items-center justify-center">
            <Text className="text-white">&larr;</Text>
          </View>
        </Pressable>
      </View>
      
      <View className="p-4">
        <H1 className="text-white text-3xl font-light mb-8">
          Onboarding
        </H1>
        
        <Text className="text-white">
          Welcome to the onboarding screen!
        </Text>
      </View>
    </View>
  )
}
