import { View } from 'app/design/view'
import { Image, Platform, Dimensions } from 'react-native'
import { H1, Text } from 'app/design/typography'

export function NotificationsScreen() {
  const screenHeight = Dimensions.get('window').height

  if (Platform.OS === 'web') {
    return (
      <View className="h-screen relative bg-black">
        {/* Background Image */}
        <Image
          source={{ uri: 'https://storage.googleapis.com/what-is-utopia/onboarding-1.jpeg' }}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        {/* Dark Overlay */}
        <View className="absolute inset-0 bg-black/60" />

        {/* Centered Text */}
        <View className="absolute inset-0 flex items-center justify-center px-6">
          <View className="max-w-sm">
            <H1 className="text-white text-4xl font-light text-center mb-4">
              Stay in the inner circle
            </H1>
            <Text className="text-white/90 text-lg text-center">
              Get notified when the most coveted rewards and opportunities drop. You deserve to be in the know.
            </Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1 relative bg-black">
      {/* Background Image */}
      <Image
        source={{ uri: 'https://storage.googleapis.com/what-is-utopia/onboarding-1.jpeg' }}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
      />
      
      {/* Dark Overlay */}
      <View className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />

      {/* Centered Text */}
      <View className="flex-1 items-center justify-center px-6">
        <View className="max-w-sm">
          <H1 className="text-white text-4xl font-light text-center mb-4">
            Stay in the inner circle
          </H1>
          <Text className="text-white/90 text-lg text-center">
            Get notified when the most coveted rewards and opportunities drop. You deserve to be in the know.
          </Text>
        </View>
      </View>
    </View>
  )
}
