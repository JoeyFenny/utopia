import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Image, Platform } from 'react-native'
import { useRouter } from 'solito/router'

export function OnboardingScreen() {
  return (
    <View className="flex-1 bg-black">
      <View className="flex-1">
        {/* Placeholder image - replace with actual image later */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?q=80&w=1000' }}
          className="w-full h-full"
          resizeMode="cover"
          style={Platform.OS === 'web' ? { width: '100%', height: '100%', objectFit: 'cover' } : undefined}
        />

        {/* Content overlay */}
        <View className="absolute bottom-0 w-full p-8">
          <H1 className="text-white text-4xl font-light mb-4">
            Your World Unlocked
          </H1>
          <Text className="text-white/80 text-lg mb-8">
            Discover your gateway to a world of content and endless possibilities, with everything you need in one place.
          </Text>

          {/* Pagination dots */}
          <View className="flex-row justify-center space-x-2 mb-8">
            <View className="w-2 h-2 rounded-full bg-[#FED700]" />
            <View className="w-2 h-2 rounded-full bg-[#333333]" />
            <View className="w-2 h-2 rounded-full bg-[#333333]" />
          </View>
        </View>
      </View>
    </View>
  )
}
