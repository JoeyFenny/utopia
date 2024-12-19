import { View } from 'app/design/view'
import { Image, Platform, Pressable, ActivityIndicator } from 'react-native'
import { Text } from 'app/design/typography'
import { useRouter } from 'solito/router'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useState } from 'react'

const GET_FEED = gql`
  query GetFeed {
    feedExperiences {
      id
      name
      bio
      cost
      city
      date
      carouselPhotos
    }
  }
`

const UPDATE_INTERACTION = gql`
  mutation UpdateInteraction($experienceId: ID!, $isInterested: Boolean!) {
    updateExperienceInteraction(experienceId: $experienceId, isInterested: $isInterested) {
      id
      isInterested
    }
  }
`

export default function ExperiencesScreen() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadingAction, setLoadingAction] = useState<'like' | 'dislike' | null>(null)

  const { data, loading, error } = useQuery(GET_FEED)
  const [updateInteraction] = useMutation(UPDATE_INTERACTION)

  const handleCardPress = (experienceId: string) => {
    router.push(`/experiences/${experienceId}`)
  }

  const handleInteraction = async (isInterested: boolean) => {
    if (!data?.feedExperiences?.[currentIndex]) return

    setLoadingAction(isInterested ? 'like' : 'dislike')
    try {
      await updateInteraction({
        variables: {
          experienceId: data.feedExperiences[currentIndex].id,
          isInterested,
        },
      })
      setCurrentIndex((prev) => prev + 1)
    } catch (err) {
      console.error('Error updating interaction:', err)
    } finally {
      setLoadingAction(null)
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )
    }

    if (error) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white/75 text-lg">Error loading experiences</Text>
        </View>
      )
    }

    if (!data?.feedExperiences?.length) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white/75 text-lg">No experiences found</Text>
        </View>
      )
    }

    if (currentIndex >= data.feedExperiences.length) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white/75 text-lg text-center">You've reached the end of your feed</Text>
          <Text className="text-white/50 text-sm text-center mt-2">Check back later for more experiences</Text>
        </View>
      )
    }

    const experience = data.feedExperiences[currentIndex]

    return (
      <View className="w-full max-w-md">
        <View className="flex-row justify-between items-start mb-3">
          <View>
            <Text className="text-white/75 text-lg">Adam Horwitz</Text>
            <Text
              className="text-white/50 text-sm mb-5 text-left"
              style={Platform.OS === 'web' ? { textAlign: 'left' } : undefined}
            >
              VIP Member
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-yellow-500 font-semibold text-lg">5,000</Text>
            <Text className="text-white/50 text-sm">points</Text>
          </View>
        </View>
        <View className="relative rounded-3xl overflow-hidden">
          <Pressable onPress={() => handleCardPress(experience.id)} className="cursor-pointer">
            <Image
              source={{ uri: experience.carouselPhotos[0] }}
              className="h-[500px]"
              style={{
                width: '100%',
                height: 500,
                objectFit: 'cover'
              }}
            />
          </Pressable>
          <View className="absolute bottom-0 left-0 right-0 p-6">
            <Text
              className="text-white text-2xl font-medium mb-1 text-left"
              style={Platform.OS === 'web' ? { textAlign: 'left' } : undefined}
            >
              {experience.name}
            </Text>
            <Text
              className="text-yellow-500 text-lg text-left"
              style={Platform.OS === 'web' ? { textAlign: 'left' } : undefined}
            >
              {experience.city} • ${experience.cost}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center mt-4 space-x-3">
          <View className="flex-1">
            <Pressable
              className="cursor-pointer"
              onPress={() => handleInteraction(false)}
              disabled={loadingAction !== null}
            >
              <View className="w-full h-12 rounded-full bg-black/30 border border-white/30 items-center justify-center">
                {loadingAction === 'dislike' ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text className="text-white/50 text-xl">×</Text>
                )}
              </View>
            </Pressable>
          </View>
          <View className="flex-1">
            <Pressable
              className="cursor-pointer"
              onPress={() => handleInteraction(true)}
              disabled={loadingAction !== null}
            >
              <View className="w-full h-12 rounded-full bg-white items-center justify-center">
                {loadingAction === 'like' ? (
                  <ActivityIndicator size="small" color="#000000" />
                ) : (
                  <Text className="text-black text-base">♡</Text>
                )}
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-black">
      <View className="flex-1 relative">
        <View className="flex-1 items-center pt-20">
          {renderContent()}
        </View>
        <View className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10">
          <View className="flex-row justify-around items-center py-4">
            <Pressable className="cursor-pointer items-center">
              <Text className="text-yellow-500 text-xl mb-1">✨</Text>
              <Text className="text-white/50 text-xs">Rewards</Text>
            </Pressable>
            <Pressable className="cursor-pointer items-center">
              <Text className="text-white/50 text-xl mb-1">✓</Text>
              <Text className="text-white/50 text-xs">Bookings</Text>
            </Pressable>
            <Pressable className="cursor-pointer items-center">
              <Text className="text-white/50 text-xl mb-1">〰</Text>
              <Text className="text-white/50 text-xs">Activity</Text>
            </Pressable>
            <Pressable className="cursor-pointer items-center">
              <Text className="text-white/50 text-xl mb-1">○</Text>
              <Text className="text-white/50 text-xs">Profile</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <View className="flex-1 bg-black">
      <View className="flex-1 items-center pt-20">
        {renderContent()}
      </View>
    </View>
  )
}
