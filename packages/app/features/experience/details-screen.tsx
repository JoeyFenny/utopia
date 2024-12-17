import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { useLocalSearchParams, router } from 'expo-router'
import { TouchableOpacity, Image, ImageBackground } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export function ExperienceDetailsScreen() {
  const { id } = useLocalSearchParams()
  
  return (
    <View className="flex-1 bg-black">
      <ImageBackground
        source={{ uri: 'https://storage.googleapis.com/what-is-utopia/bear.png' }}
        className="w-full aspect-square"
        resizeMode="cover"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-4 z-10 bg-black/50 rounded-full p-2"
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <Text className="text-2xl font-bold text-white">Rolex Submariner "Hulk"</Text>
          <Text className="text-lg text-yellow-500">$2,000/day</Text>
        </View>
      </ImageBackground>
    </View>
  )
}
