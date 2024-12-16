import { H1 } from 'app/design/typography'
import { View } from 'app/design/view'

export function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center p-3 bg-black">
      <H1 className="text-white">Utopia</H1>
      <H1 className="text-white">Powered by</H1>
      <H1 className="text-white">Utopia</H1>
    </View>
  )
}
