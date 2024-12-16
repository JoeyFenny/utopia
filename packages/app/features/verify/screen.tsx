import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Pressable, TextInput, Platform } from 'react-native'
import { useRouter } from 'solito/router'
import { useRef, useState } from 'react'

export function VerifyScreen() {
  const { back } = useRouter()
  const [code, setCode] = useState(['', '', '', ''])
  const inputRefs = [
    useRef<TextInput | HTMLInputElement | null>(null),
    useRef<TextInput | HTMLInputElement | null>(null),
    useRef<TextInput | HTMLInputElement | null>(null),
    useRef<TextInput | HTMLInputElement | null>(null),
  ]

  const handleChange = (text: string, index: number) => {
    // Take only the last character if more than one digit is entered
    const singleDigit = text.slice(-1)
    if (!/^[0-9]*$/.test(singleDigit)) return

    const newCode = [...code]
    newCode[index] = singleDigit
    setCode(newCode)

    // Move to next input if there's a value
    if (singleDigit && index < 3) {
      inputRefs[index + 1]?.current?.focus()
    }
  }

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1]?.current?.focus()
    }
  }

  return (
    <View className="flex-1 bg-black">
      <View className="p-4 pt-12">
        <Pressable onPress={back}>
          <View className="w-8 h-8 rounded-full bg-[#222] items-center justify-center">
            <Text className="text-white">&larr;</Text>
          </View>
        </Pressable>
      </View>
      
      <View className="p-4">
        <H1 className="text-white text-3xl font-light mb-8">
          Please verify your{'\n'}phone number
        </H1>
        
        <View className="flex-row space-x-2 mb-4">
          {[0, 1, 2, 3].map((i) => (
            Platform.OS === 'web' ? (
              <input
                key={i}
                ref={inputRefs[i]}
                className="w-14 h-14 rounded-lg border border-[#333] text-center text-white text-xl bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                maxLength={1}
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
                value={code[i]}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyPress(e, i)}
              />
            ) : (
              <TextInput
                key={i}
                ref={inputRefs[i]}
                className="w-14 h-14 rounded-lg border border-[#333] text-center text-white text-xl"
                maxLength={1}
                keyboardType="number-pad"
                value={code[i]}
                onChangeText={(text) => handleChange(text, i)}
                onKeyPress={(e) => handleKeyPress(e, i)}
              />
            )
          ))}
        </View>

        <View className="flex-row items-center space-x-1">
          <Text className="text-[#666]">Didn't receive a code?</Text>
          <Pressable>
            <Text className="text-white">Resend Code</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
