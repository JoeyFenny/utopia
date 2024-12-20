import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { TextInput, Pressable, ActivityIndicator, Platform, Image } from 'react-native'
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
    }
  }
`

const getResponsiveWidth = () => Platform.OS === 'web' ? 500 : '100%'

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

      const { success, error: mutationError, user } = data.createUserOrLoginUser

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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        ...(Platform.OS === 'web' && {
          paddingHorizontal: 16
        })
      }}
    >
      <Image 
        source={Platform.select({
          web: { uri: '/logo.png' },
          default: require('../../assets/images/logo.png')
        })}
        style={{
          width: 140,
          height: 60,
          resizeMode: 'contain',
          marginBottom: 40
        }}
      />
      <View
        style={{
          height: Platform.select({
            ios: 20,
            android: 20,
            web: 20,
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
          borderRadius: 8,
          fontSize: 16,
          color: '#666',
          width: getResponsiveWidth()
        }}
        placeholder="Enter your email"
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
          width: getResponsiveWidth()
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
        style={[
          {
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: 'white',
            opacity: loading ? 0.7 : 1,
            borderRadius: 24,
            width: getResponsiveWidth()
          },
        ]}
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
            ios: 100,
            android: 100,
            web: 100,
          }),
        }}
      />
      <Text className="text-[#666] text-sm mb-2">Powered by</Text>
      <Image 
        source={Platform.select({
          web: { uri: '/logo.png' },
          default: require('../../assets/images/logo.png')
        })}
        style={{
          width: 70,
          height: 30,
          resizeMode: 'contain'
        }}
      />
    </View>
  )
}
