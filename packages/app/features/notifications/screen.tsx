import { View } from 'app/design/view'
import { Image, Platform, Dimensions, TouchableOpacity } from 'react-native'
import { H1, Text } from 'app/design/typography'
import { useRouter } from 'solito/router'

export function NotificationsScreen() {
  const { push } = useRouter()

  if (Platform.OS === 'web') {
    return (
      <View className="h-screen relative bg-black">
        {/* Background Image */}
        <Image
          source={{ uri: 'https://storage.googleapis.com/what-is-utopia/notifications.jpeg' }}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        {/* Dark Overlay */}
        <View className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <View className="absolute inset-0 flex items-center justify-center px-6">
          <View className="max-w-sm space-y-8">
            <View>
              <H1 className="text-white text-4xl font-light text-center mb-4">
                Stay in the inner circle
              </H1>
              <Text className="text-white/75 text-lg text-center">
                Get notified when the most coveted rewards and opportunities drop. You deserve to be in the know.
              </Text>
            </View>

            <View className="max-w-sm mx-auto w-full space-y-4">
              <TouchableOpacity 
                onPress={() => push('/experience')}
                style={{ backgroundColor: 'white', borderRadius: 9999, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className="shadow-lg w-full"
              >
                <Text className="text-black font-medium">Turn on Notifications</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => push('/experience')}
                className="items-center"
              >
                <Text className="text-white/80">Maybe Later</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1 relative bg-black">
      {/* Background Image */}
      <Image
        source={{ uri: 'https://storage.googleapis.com/what-is-utopia/notifications.jpeg' }}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
      />
      
      {/* Dark Overlay */}
      <View className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />

      {/* Content */}
      <View className="flex-1 px-6">
        {/* Text Section - Top Half */}
        <View className="flex-1 justify-center items-center">
          <View className="max-w-sm">
            <H1 className="text-white text-4xl font-light text-center mb-4">
              Stay in the inner circle
            </H1>
            <Text className="text-white/75 text-lg text-center">
              Get notified when the most coveted rewards and opportunities drop. You deserve to be in the know.
            </Text>
          </View>
        </View>

        {/* Buttons Section - Bottom */}
        <View className="pb-12 space-y-4">
          <TouchableOpacity 
            onPress={() => push('/experience')}
            style={{ backgroundColor: 'white', borderRadius: 9999, height: 56 }}
            className="items-center shadow-lg justify-center"
          >
            <Text className="text-black font-medium">Turn on Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => push('/experience')}
            className="items-center"
          >
            <Text className="text-white/80">Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
