import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { useRouter } from 'solito/router'

export function FeaturesScreen() {
  const { back } = useRouter()

  return (
    <View className="flex-1 bg-black">
      <View className="p-4 pt-12">
        <View className="w-8 h-8 rounded-full bg-[#222] items-center justify-center" onPress={back}>
          <Text className="text-white">&larr;</Text>
        </View>
      </View>
      
      <View className="p-4">
        <H1 className="text-white text-3xl font-light mb-8">
          Features
        </H1>
        
        <Text className="text-white">
          Welcome to the features screen!
        </Text>
      </View>
    </View>
  )
}
