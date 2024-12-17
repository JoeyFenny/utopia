import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Platform, Dimensions, TouchableOpacity, Image } from 'react-native'
import { useRouter } from 'solito/router'

export function NotificationsScreen() {
  const { push } = useRouter()
  const screenHeight = Dimensions.get('window').height

  const imageContainerStyle = Platform.select({
    web: { height: screenHeight - 200 },
    default: { height: screenHeight * 0.6 }
  })

  return (
    <View className="flex-1 bg-black">
      {/* Background Image */}
      <View style={imageContainerStyle}>
        <Image
          source={{ uri: 'https://storage.googleapis.com/what-is-utopia/notifications.jpeg' }}
          className="w-full h-full opacity-30"
          resizeMode="cover"
          style={Platform.OS === 'web' ? { width: '100%', height: '100%', objectFit: 'cover' } : undefined}
        />
      </View>
    </View>
  )
}