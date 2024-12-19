import { View } from 'app/design/view'
import { Image, Platform, Pressable } from 'react-native'
import { Text } from 'app/design/typography'
import { useRouter } from 'solito/router'

export default function ExperiencesScreen() {
  const router = useRouter()
  const experienceId = '123'

  const handleCardPress = () => {
    router.push(`/experiences/${experienceId}`)
  }

  if (Platform.OS === 'web') {
    return (
      <View className="flex-1 bg-black">
        <View className="flex-1 relative">
          <View className="flex-1 items-center pt-20">
            <View className="w-full max-w-md">
              <View className="flex-row justify-between items-start mb-3">
                <View>
                  <Text className="text-white/75 text-lg">Adam Horwitz</Text>
                  <Text
                    className="text-white/50 text-sm mb-5 text-left"
                    style={Platform.OS === 'web' ? { textAlign: 'left' } : undefined}
                  >
                    VIP Member
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-yellow-500 font-semibold text-lg">5,000</Text>
                  <Text className="text-white/50 text-sm">points</Text>
                </View>
              </View>
              <View className="relative rounded-3xl overflow-hidden">
                <Pressable onPress={handleCardPress} className="cursor-pointer">
                  <Image
                    source={{ uri: 'https://storage.googleapis.com/what-is-utopia/rolex.png' }}
                    className="h-[500px]"
                    style={{
                      width: '100%',
                      height: 500,
                      objectFit: 'cover'
                    }}
                  />
                </Pressable>
                <View className="absolute bottom-0 left-0 right-0 p-6">
                  <Text
                    className="text-white text-2xl font-medium mb-1 text-left"
                    style={Platform.OS === 'web' ? { textAlign: 'left' } : undefined}
                  >
                    Rolex Submariner "Hulk"
                  </Text>
                  <Text
                    className="text-yellow-500 text-lg text-left"
                    style={Platform.OS === 'web' ? { textAlign: 'left' } : undefined}
                  >
                    3,000 pts
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center mt-4 space-x-3">
                <View className="flex-1">
                  <Pressable className="cursor-pointer">
                    <View className="w-full h-12 rounded-full bg-black/30 border border-white/30 items-center justify-center">
                      <Text className="text-white/50 text-xl">×</Text>
                    </View>
                  </Pressable>
                </View>
                <View className="flex-1">
                  <Pressable className="cursor-pointer">
                    <View className="w-full h-12 rounded-full bg-white items-center justify-center">
                      <Text className="text-black text-base">♡</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10">
            <View className="flex-row justify-around items-center py-4">
              <Pressable className="cursor-pointer items-center">
                <Text className="text-yellow-500 text-xl mb-1">✨</Text>
                <Text className="text-white/50 text-xs">Rewards</Text>
              </Pressable>
              <Pressable className="cursor-pointer items-center">
                <Text className="text-white/50 text-xl mb-1">✓</Text>
                <Text className="text-white/50 text-xs">Bookings</Text>
              </Pressable>
              <Pressable className="cursor-pointer items-center">
                <Text className="text-white/50 text-xl mb-1">〰</Text>
                <Text className="text-white/50 text-xs">Activity</Text>
              </Pressable>
              <Pressable className="cursor-pointer items-center">
                <Text className="text-white/50 text-xl mb-1">○</Text>
                <Text className="text-white/50 text-xs">Profile</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-black">
      <View className="flex-1 relative">
        <View className="flex-1 items-center pt-12">
          <View className="w-full max-w-md px-4">
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="text-white/75 text-lg">Adam Horwitz</Text>
                <Text
                  className="text-white/50 text-sm mb-5 text-left"
                >
                  VIP Member
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-yellow-500 font-semibold text-lg">5,000</Text>
                <Text className="text-white/50 text-sm">points</Text>
              </View>
            </View>
            <View className="relative rounded-3xl overflow-hidden">
              <Pressable onPress={handleCardPress}>
                <Image
                  source={{ uri: 'https://storage.googleapis.com/what-is-utopia/rolex.png' }}
                  style={{
                    width: '100%',
                    height: 500,
                    resizeMode: 'cover'
                  }}
                />
              </Pressable>
              <View className="absolute bottom-0 left-0 right-0 p-6">
                <Text
                  className="text-white text-2xl font-medium mb-1 text-left"
                >
                  Rolex Submariner "Hulk"
                </Text>
                <Text
                  className="text-yellow-500 text-lg text-left"
                >
                  3,000 pts
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center mt-4 space-x-3">
              <View className="flex-1">
                <Pressable>
                  <View className="w-full h-12 rounded-full bg-black/30 border border-white/30 items-center justify-center">
                    <Text className="text-white/50 text-xl">×</Text>
                  </View>
                </Pressable>
              </View>
              <View className="flex-1">
                <Pressable>
                  <View className="w-full h-12 rounded-full bg-white items-center justify-center">
                    <Text className="text-black text-base">♡</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <View className="absolute inset-x-0 bottom-0 bg-black border-t border-white/10">
          <View className="flex-row justify-around items-center py-4">
            <Pressable className="cursor-pointer items-center">
              <Text className="text-yellow-500 text-xl mb-1">✨</Text>
              <Text className="text-white/50 text-xs">Rewards</Text>
            </Pressable>
            <Pressable className="cursor-pointer items-center">
              <Text className="text-white/50 text-xl mb-1">✓</Text>
              <Text className="text-white/50 text-xs">Bookings</Text>
            </Pressable>
            <Pressable className="cursor-pointer items-center">
              <Text className="text-white/50 text-xl mb-1">〰</Text>
              <Text className="text-white/50 text-xs">Activity</Text>
            </Pressable>
            <Pressable className="cursor-pointer items-center">
              <Text className="text-white/50 text-xl mb-1">○</Text>
              <Text className="text-white/50 text-xs">Profile</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}
