import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { useLocalSearchParams } from 'expo-router'

export function ExperienceDetailsScreen() {
  const { id } = useLocalSearchParams()
  
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Experience Details for ID: {id}</Text>
    </View>
  )
}
