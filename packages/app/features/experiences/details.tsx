import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { useRouter } from 'solito/router'

export function ExperienceDetailsScreen() {
  const router = useRouter()
  
  return (
    <View className="flex-1 bg-black">
      <View className="flex-1 items-center pt-20">
        <View className="w-full max-w-md">
          <Text className="text-white text-2xl font-bold">Experience Details</Text>
        </View>
      </View>
    </View>
  )
}

export default ExperienceDetailsScreen
