import { View } from 'app/design/view'
import { Platform, TouchableOpacity, ActivityIndicator, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { H1, Text } from 'app/design/typography'
import { useRouter } from 'solito/router'
import { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'

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
`

export function NotificationsScreen() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMaybeLaterLoading, setIsMaybeLaterLoading] = useState(false)
  const [isWebNotificationsSupported, setIsWebNotificationsSupported] = useState(false)

  useEffect(() => {
    if (Platform.OS === 'web' && 'Notification' in window) {
      setIsWebNotificationsSupported(true)
    }
  }, [])

  const [updateNotifications] = useMutation(UPDATE_NOTIFICATIONS)

  const handleEnableNotifications = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (Platform.OS === 'web') {
        const permission = await Notification.requestPermission()
        if (permission !== 'granted') {
          setError('Please allow notifications in your browser settings')
          setIsLoading(false)
          return
        }
      }

      const token = await AsyncStorage.getItem('token')
      if (!token) {
        setError('Please sign in to enable notifications')
        return
      }

      const { data } = await updateNotifications({
        variables: {
          enabled: true
        }
      })

      if (data?.updateNotifications?.success) {
        if (Platform.OS === 'web') {
          router.push('/experiences')
        } else {
          router.push('/experiences')
        }
      } else {
        setError(data?.updateNotifications?.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Failed to enable notifications')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMaybeLater = async () => {
    setIsMaybeLaterLoading(true)
    setError(null)

    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) {
        setError('Please sign in to continue')
        return
      }

      const { data } = await updateNotifications({
        variables: {
          enabled: false
        }
      })

      if (data?.updateNotifications?.success) {
        if (Platform.OS === 'web') {
          router.push('/experiences')
        } else {
          router.push('/experiences')
        }
      } else {
        setError(data?.updateNotifications?.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Failed to update notification preferences')
    } finally {
      setIsMaybeLaterLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://storage.googleapis.com/what-is-utopia/notifications.jpeg' }}
        style={[StyleSheet.absoluteFill, styles.backgroundImage]}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        <View style={styles.innerContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Stay in the inner circle</Text>
            <Text style={styles.description}>
              Get notified when the most coveted rewards and opportunities drop. You deserve to be in the know.
            </Text>
            {error && (
              <Text style={styles.error}>{error}</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleEnableNotifications}
              disabled={isLoading}
              style={styles.primaryButton}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="black" />
              ) : (
                <Text style={styles.primaryButtonText}>
                  Turn on Notifications
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleMaybeLater}
              style={styles.secondaryButton}
            >
              {isMaybeLaterLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.secondaryButtonText}>
                  Maybe Later
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  innerContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Platform.select({ ios: 48, android: 24, web: 32 }),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: Platform.select({ ios: 32, android: 28, web: 32 }),
    ...(Platform.OS === 'web' ? { fontFamily: 'system-ui' } : {}),
    fontWeight: '300',
    lineHeight: Platform.select({ ios: 38, android: 34, web: 38 }),
    letterSpacing: -0.3,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: Platform.select({ ios: 16, android: 14, web: 16 }),
    ...(Platform.OS === 'web' ? { fontFamily: 'system-ui' } : {}),
    fontWeight: '400',
    lineHeight: Platform.select({ ios: 22, android: 20, web: 22 }),
    letterSpacing: -0.3,
    textAlign: 'center',
    maxWidth: '85%',
  },
  error: {
    color: '#ef4444',
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: 'white',
    borderRadius: 100,
    paddingVertical: 16,
    width: Platform.OS === 'web' ? '50%' : '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    ...(Platform.OS === 'web' ? { fontFamily: 'system-ui' } : {}),
  },
  secondaryButton: {
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    ...(Platform.OS === 'web' ? { fontFamily: 'system-ui' } : {}),
    fontWeight: '400',
  },
})
