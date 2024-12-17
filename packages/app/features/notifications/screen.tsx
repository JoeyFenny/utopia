import { View } from 'app/design/view'
import { Image, Platform, Dimensions } from 'react-native'

export function NotificationsScreen() {
  const screenHeight = Dimensions.get('window').height

  const imageContainerStyle = Platform.select({
    web: { height: screenHeight },
    default: { height: screenHeight }
  })

  return (
    <View style={imageContainerStyle}>
      <Image
        source={{ uri: 'https://storage.googleapis.com/what-is-utopia/onboarding-1.jpeg' }}
        className="w-full h-full"
        resizeMode="cover"
        style={Platform.OS === 'web' ? { width: '100%', height: '100%', objectFit: 'cover' } : undefined}
      />
    </View>
  )
}
