import { View } from 'app/design/view'
import { Image, Platform, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { H1, Text } from 'app/design/typography'
import { useRouter } from 'solito/router'
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client';

const UPDATE_NOTIFICATIONS = gql`
  mutation UpdateNotifications($enabled: Boolean!) {
    updateNotifications(enabled: $enabled) {
      success
      error
      user {
        id
        notificationsEnabled
      }
    }
  }
`;

export function NotificationsScreen() {
  const { push } = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [updateNotifications] = useMutation(UPDATE_NOTIFICATIONS);

  const handleEnableNotifications = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const token = await AsyncStorage.getItem('auth_token')
      
      const response = await updateNotifications({
        variables: {
          enabled: true
        },
        context: {
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        }
      })

      const result = response.data.updateNotifications
      if (!result.success) {
        setError(result.error || 'Failed to enable notifications')
        return
      }

      // Success - proceed to experience page
      push('/experience')
    } catch (err) {
      setError('Failed to connect to server')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMaybeLater = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token')
      if (!token) {
        console.error('No auth token found')
        setError('Authentication required')
        return
      }

      const result = await updateNotifications({
        variables: {
          enabled: false
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      });

      if (!result.data?.updateNotifications.success) {
        const error = result.data?.updateNotifications.error || 'Failed to update notification settings'
        console.error('Update failed:', error)
        setError(error)
        return
      }

      push('/experience')
    } catch (error) {
      console.error('Error updating notifications:', error)
      setError('Failed to update notification settings')
    }
  }

  if (Platform.OS === 'web') {
    return (
      <View className="h-screen relative bg-black">
        <Image
          source={{ uri: 'https://storage.googleapis.com/what-is-utopia/notifications.jpeg' }}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        <View className="absolute inset-0 bg-black/60" />

        <View className="absolute inset-0 flex items-center justify-center px-6">
          <View className="max-w-sm space-y-8">
            <View>
              <H1 className="text-white text-4xl font-light text-center mb-4">
                Stay in the inner circle
              </H1>
              <Text className="text-white/75 text-lg text-center">
                Get notified when the most coveted rewards and opportunities drop. You deserve to be in the know.
              </Text>
            </View>

            {error && (
              <Text className="text-red-500 text-sm text-center">
                {error}
              </Text>
            )}

            <View className="max-w-sm mx-auto w-full space-y-4">
              <TouchableOpacity 
                onPress={handleEnableNotifications}
                style={{ 
                  backgroundColor: 'white', 
                  borderRadius: 9999, 
                  height: 52, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  opacity: isLoading ? 0.7 : 1 
                }}
                className="shadow-lg w-full"
                disabled={isLoading}
              >
                <View className="flex-row items-center justify-center">
                  {isLoading ? (
                    <ActivityIndicator size="small" color="black" />
                  ) : (
                    <Text className="text-black font-medium">Turn on Notifications</Text>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleMaybeLater}
                className="items-center"
                disabled={isLoading}
              >
                <Text className="text-white/80">Maybe Later</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1 relative bg-black">
      <Image
        source={{ uri: 'https://storage.googleapis.com/what-is-utopia/notifications.jpeg' }}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
      />
      
      <View className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />

      <View className="flex-1 px-6">
        <View className="flex-1 justify-center items-center">
          <View className="max-w-sm">
            <H1 className="text-white text-4xl font-light text-center mb-4">
              Stay in the inner circle
            </H1>
            <Text className="text-white/75 text-lg text-center">
              Get notified when the most coveted rewards and opportunities drop. You deserve to be in the know.
            </Text>
          </View>
        </View>

        {error && (
          <Text className="text-red-500 text-sm text-center mb-4">
            {error}
          </Text>
        )}

        <View className="pb-12 space-y-4">
          <TouchableOpacity 
            onPress={handleEnableNotifications}
            style={{ 
              backgroundColor: 'white', 
              borderRadius: 9999, 
              height: 56,
              opacity: isLoading ? 0.7 : 1 
            }}
            className="items-center shadow-lg justify-center"
            disabled={isLoading}
          >
            <View className="flex-row items-center justify-center">
              {isLoading ? (
                <ActivityIndicator size="small" color="black" />
              ) : (
                <Text className="text-black font-medium">Turn on Notifications</Text>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleMaybeLater}
            className="items-center"
            disabled={isLoading}
          >
            <Text className="text-white/80">Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
