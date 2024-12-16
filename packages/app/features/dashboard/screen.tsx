import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Platform } from 'react-native'

export function DashboardScreen() {
  return (
    <View className="flex-1 items-center justify-center p-3 bg-black">
      <H1 className="text-white mb-4">Welcome to Dashboard</H1>
      <Text className="text-[#666]">You've successfully logged in!</Text>
    </View>
  )
}
