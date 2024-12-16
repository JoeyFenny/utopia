import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Platform, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'solito/router'

export function HomeScreen() {
  const [inputValue, setInputValue] = useState('')
  const [showError, setShowError] = useState(false)
  const { push } = useRouter()

  const handleLogin = () => {
    if (inputValue === '17864960562') {
      setShowError(false)
      push('/dashboard')
    } else {
      setShowError(true)
    }
  }

  return (
    <View className="flex-1 items-center justify-center p-3 bg-black">
      <H1 className="text-white">Utopia</H1>
      <View
        style={{
          height: Platform.select({
            ios: 200,
            android: 200,
            web: 50,
          }),
        }}
      />
      <TextInput
        className="w-full mb-4 text-black p-4 rounded-lg"
        style={{
          borderWidth: 1,
          borderColor: '#666',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 24,
          fontSize: 16,
          ...Platform.select({
            ios: {
              width: "100%"
            },
            web: {
              width: 400
            },
          }),
        }}
        placeholder="Email or phone number"
        placeholderTextColor="#666"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <View
        style={{
          height: Platform.select({
            ios: 0,
            android: 0,
            web: 20,
          }),
        }}
      />
      <Pressable
        className="w-full bg-white rounded-[24px] mb-4 items-center justify-center"
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: 'white',
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
            android: {
              elevation: 4,
            },
            web: {
              width: 400,
              borderRadius: 24
            },
          }),
        }}
        onPress={handleLogin}>
        <Text className="text-black font-medium text-base text-center">Log in</Text>
      </Pressable>
      {showError && (
        <>
          <View
            style={{
              height: Platform.select({
                ios: 0,
                android: 0,
                web: 10,
              }),
            }}
          />
          <Text className="text-red-500 text-sm mb-4">Invalid login credentials</Text>
        </>
      )}
      <View
        style={{
          height: Platform.select({
            ios: 200,
            android: 200,
            web: 50,
          }),
        }}
      />
      <Text className="text-[#666] text-sm">Powered by</Text>
      <H1 className="text-white">Utopia</H1>
    </View>
  )
}
