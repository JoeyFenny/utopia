import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Platform, Pressable } from 'react-native'
import { useRouter } from 'solito/router'

export function DashboardScreen() {
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
          Please verify your{'\n'}phone number
        </H1>
        
        <View className="flex-row space-x-2 mb-4">
          {[1, 2, 3, 4].map((_, i) => (
            <View 
              key={i}
              className="w-14 h-14 rounded-lg border border-[#333]"
            />
          ))}
        </View>

        <View className="flex-row items-center space-x-1">
          <Text className="text-[#666]">Didn't receive a code?</Text>
          <Pressable>
            <Text className="text-white">Resend Code</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
