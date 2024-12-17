import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { TouchableOpacity, Image, ImageBackground, Platform } from 'react-native'
import { useRouter } from 'solito/router'

export function ExperienceDetailsScreen() {
  const router = useRouter()
  
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
          {Platform.select({
            ios: <Text className="text-white text-2xl">&lt;</Text>,
            android: <Text className="text-white text-2xl">&lt;</Text>,
            default: <Text className="text-white text-2xl">&lt;</Text>
          })}
        </TouchableOpacity>
        
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <Text className="text-2xl font-bold text-white">Rolex Submariner "Hulk"</Text>
          <Text className="text-lg text-yellow-500">$2,000/day</Text>
        </View>
      </ImageBackground>
    </View>
  )
}
