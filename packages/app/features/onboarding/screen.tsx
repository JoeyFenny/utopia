import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Image, Platform, Dimensions } from 'react-native'
import { useRouter } from 'solito/router'

export function OnboardingScreen() {
  const screenHeight = Dimensions.get('window').height
  
  const contentContainerStyle = Platform.select({
    web: { height: 300 },
    default: { height: screenHeight * 0.4 }
  })

  const imageContainerStyle = Platform.select({
    web: { height: screenHeight * 0.6 },
    default: { height: screenHeight * 0.6 }
  })

  return (
    <View className="flex-1 bg-black">
      {/* Image container */}
      <View style={imageContainerStyle}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?q=80&w=1000' }}
          className="w-full h-full"
          resizeMode="cover"
          style={Platform.OS === 'web' ? { width: '100%', height: '100%', objectFit: 'cover' } : undefined}
        />
      </View>

      {/* Content container */}
      <View className="bg-black px-8 pt-8 pb-12 justify-between" style={contentContainerStyle}>
        <View>
          <H1 className="text-white text-4xl font-light mb-4">
            Your World Unlocked
          </H1>
          <Text className="text-white/80 text-lg">
            Discover your gateway to a world of content and endless possibilities, with everything you need in one place.
          </Text>
        </View>

        {/* Pagination dots */}
        <View className="flex-row justify-center space-x-2">
          <View className="w-2 h-2 rounded-full bg-[#FED700]" />
          <View className="w-2 h-2 rounded-full bg-[#333333]" />
          <View className="w-2 h-2 rounded-full bg-[#333333]" />
        </View>
      </View>
    </View>
  )
}
