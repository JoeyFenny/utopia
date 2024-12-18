import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Pressable, TextInput, Platform, ActivityIndicator } from 'react-native'
import { useRouter } from 'solito/router'
import { useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, gql } from '@apollo/client'

const VERIFY_CODE = gql`
  mutation VerifyCode($email: String!, $code: String!) {
    verifyCode(email: $email, code: $code) {
      token
      user {
        id
        email
        emailVerified
      }
    }
  }
`

export function VerifyScreen() {
  const { back, push } = useRouter()
  const [code, setCode] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ]
  const [verifyCode, { loading }] = useMutation(VERIFY_CODE)

  const handleChange = async (text: string, index: number) => {
    setError('')
    // Take only the last character if more than one digit is entered
    const singleDigit = text.slice(-1)
    if (!/^[0-9]*$/.test(singleDigit)) return

    const newCode = [...code]
    newCode[index] = singleDigit
    setCode(newCode)

    // Move to next input if there's a value
    if (singleDigit && index < 3) {
      if (Platform.OS === 'web') {
        (inputRefs[index + 1].current as unknown as HTMLInputElement)?.focus()
      } else {
        inputRefs[index + 1].current?.focus()
      }
    } else if (index === 3) {
      // Validate when the 4th digit is entered
      const finalCode = newCode.join('')
      setIsLoading(true)
      
      try {
        const email = await AsyncStorage.getItem('temp_email')
        if (!email) {
          setError('Please go back and enter your email')
          return
        }

        const { data } = await verifyCode({
          variables: {
            email,
            code: finalCode
          }
        })

        const { token, user } = data.verifyCode

        if (token) {
          await AsyncStorage.setItem('token', token)
          push('/experience')
        } else {
          setError('Failed to verify code')
        }
      } catch (err) {
        setError('Failed to verify code')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const email = await AsyncStorage.getItem('temp_email')
      if (!email) {
        setError('Email not found')
        return
      }

      const finalCode = code.join('')
      if (finalCode.length !== 4) {
        setError('Please enter a valid code')
        return
      }

      const { data } = await verifyCode({
        variables: {
          email,
          code: finalCode
        }
      })

      if (data.verifyCode.token) {
        await AsyncStorage.setItem('token', data.verifyCode.token)
        push('/experience')
      } else {
        setError('Failed to verify code')
      }
    } catch (err) {
      console.error('Verification error:', err)
      setError('Failed to verify code')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      if (Platform.OS === 'web') {
        (inputRefs[index - 1].current as unknown as HTMLInputElement)?.focus()
      } else {
        inputRefs[index - 1].current?.focus()
      }
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
        <H1 style={Platform.OS === 'web' ? { textAlign: 'left' } : undefined} className="text-white text-3xl font-light mb-8 text-left">
          Please verify your email
        </H1>
        
        <View className="flex-row space-x-2 mb-4">
          {[0, 1, 2, 3].map((i) => (
            Platform.OS === 'web' ? (
              <input
                key={i}
                ref={(el) => {
                  if (el) {
                    (inputRefs[i].current as any) = el;
                  }
                }}
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

        <View className="mt-8">
          <View className="flex-row items-center space-x-1">
            <Text className="text-[#666]">Didn't receive a code?</Text>
            <Pressable>
              <Text className="text-white">Resend Code</Text>
            </Pressable>
          </View>
          
          {error && (
            <Text className="text-red-500 mt-2 text-left" style={Platform.OS === 'web' ? { textAlign: 'left' } : undefined}>
              {error}
            </Text>
          )}
          {isLoading && (
            <ActivityIndicator size="small" color="#fff" style={{ marginTop: 8 }} />
          )}
        </View>
      </View>
    </View>
  )
}
