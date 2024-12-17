import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { Pressable } from 'react-native'

const { useParam } = createParam<{ id: string }>()

export function ExperienceDetailsScreen() {
  const [id] = useParam('id')

  const router = useRouter()

  return (
    <View className="flex-1 bg-black">
      <Text className="text-white">Experience Details for ID: {id}</Text>
      <Pressable onPress={() => router.push('/experience')}>
        <Text className="text-white">Go back</Text>
      </Pressable>
    </View>
  )
}
