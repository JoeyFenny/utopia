import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { TextInput, Pressable, ActivityIndicator, Platform } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'solito/router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, gql } from '@apollo/client'

const CREATE_USER_OR_LOGIN = gql`
  mutation CreateUserOrLoginUser($input: EmailInput!) {
    createUserOrLoginUser(input: $input) {
      success
      error
      user {
        id
        email
        emailVerified
      }
      isNewUser
      token
    }
  }
`

export function HomeScreen() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const { push } = useRouter()
  const [createUserOrLogin, { loading }] = useMutation(CREATE_USER_OR_LOGIN)

  const handleSubmit = async () => {
    try {
      if (!email.trim()) {
        setError('Email is required')
        return
      }

      const { data } = await createUserOrLogin({
        variables: {
          input: { email }
        }
      })

      const { success, error: mutationError, token, user } = data.createUserOrLoginUser

      if (!success) {
        setError(mutationError || 'An error occurred')
        return
      }

      // Store email temporarily for verification
      await AsyncStorage.setItem('temp_email', email)

      // Success - proceed to verification
      push('/verify/')
    } catch (err) {
      setError('Failed to connect to server')
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
        className="w-full mb-4 rounded-lg"
        style={{
          borderWidth: 1,
          borderColor: error ? '#ef4444' : '#666',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 24,
          fontSize: 16,
          color: '#666',
          ...Platform.select({
            ios: {
              width: "100%"
            },
            web: {
              width: 400
            },
          }),
        }}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={(text) => {
          setEmail(text)
          if (error) {
            setError('')
          }
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        editable={!loading}
      />
      {error && (
        <Text className="text-red-500 text-sm mb-4 w-full text-left" style={{
          ...Platform.select({
            web: {
              width: 400
            },
          }),
        }}>
          {error}
        </Text>
      )}
      <View
        style={{
          height: Platform.select({
            ios: 0,
            android: 0,
            web: error ? 0 : 20,
          }),
        }}
      />
      <Pressable
        className="w-full bg-white rounded-[24px] mb-4 items-center justify-center"
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: 'white',
          opacity: loading ? 0.7 : 1,
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
        onPress={handleSubmit}
        disabled={loading}>
        <View className="flex-row items-center justify-center">
          {loading ? (
            <ActivityIndicator 
              size="small" 
              color="black"
            />
          ) : (
            <Text className="text-black font-medium text-base text-center">
              Log in
            </Text>
          )}
        </View>
      </Pressable>
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
