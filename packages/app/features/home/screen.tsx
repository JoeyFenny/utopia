import { H1 } from 'app/design/typography'
import { View } from 'app/design/view'
import { TextInput } from 'react-native'
import { TouchableOpacity, Text } from 'react-native'

export function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center p-3 bg-black">
      <H1 className="text-white">Utopia</H1>
      <View className="h-[32px]" />
      <TextInput
        className="w-full mb-4 text-black p-4 rounded-lg"
        style={{
          borderWidth: 1,
          borderColor: '#666'
        }}
        placeholder="Email or phone number"
        placeholderTextColor="#666"
      />
      <TouchableOpacity
        className="w-full bg-white rounded-[24px] mb-4 p-4"
      >
        <Text className="text-black text-center font-medium">Log in</Text>
      </TouchableOpacity>
      <H1 className="text-[#666] text-sm">Powered by</H1>
      <H1 className="text-white">Utopia</H1>
    </View>
  )
}
