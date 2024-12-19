import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { useRouter } from 'next/router';
import { Pressable, ActivityIndicator, Image } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import React from 'react';

const GET_EXPERIENCE = gql`
  query GetExperience($id: ID!) {
    experience(id: $id) {
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

export function ExperienceDetailsScreen() {
  const { query, back } = useRouter();
  const id = query?.id
  const [isBooking, setIsBooking] = React.useState(false)

  const { data, loading, error } = useQuery(GET_EXPERIENCE, {
    variables: { id },
    skip: !id,
    onError: (error) => {
      console.error('Error fetching experience:', error)
    }
  })

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator color="#FFF" />
      </View>
    )
  }

  if (error || !data?.experience) {
    console.error('Error or no data:', error)
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white text-xl">Experience not found</Text>
        <Text className="text-white/50 mt-2">ID: {id}</Text>
        <Text className="text-white/50 mt-2">{error?.message || 'No experience found with this ID'}</Text>
        <Pressable onPress={() => back()} className="mt-4">
          <Text className="text-yellow-500">Go back</Text>
        </Pressable>
      </View>
    )
  }

  const experience = data.experience

  return (
    <View className="flex-1 bg-black">
      <View className="absolute z-10 p-4 pt-12">
        <Pressable onPress={() => back()}>
          <View className="w-8 h-8 rounded-full bg-white items-center justify-center">
            <Text className="text-black text-lg">‹</Text>
          </View>
        </Pressable>
      </View>

      {experience.carouselPhotos?.[0] && (
        <View>
          <Image
            source={{ uri: experience.carouselPhotos[0] }}
            className="h-[500px]"
            style={{
              width: '100%',
              height: 500,
              objectFit: 'cover'
            }}
          />
        </View>
      )}

      <View className="p-4 pb-24">
        <View className="items-start">
          <Text className="text-white text-3xl font-normal">{experience.name}</Text>
          <View className="flex-row items-center mt-1 space-x-2">
            <Text className="text-yellow-500">{experience.cost} Pts</Text>
            <Text className="text-white/50">•</Text>
            <Text className="text-white/50">{experience.city}</Text>
            <Text className="text-white/50">•</Text>
            <Text className="text-white/50">{new Date(experience.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
          </View>
        </View>
        
        <View className="mt-8 items-start">
          <Text className="text-white text-xl">About</Text>
          <Text className="text-white/70 mt-2" style={{ textAlign: 'left' }}>
          {experience.bio}
          </Text>
        </View>
      </View>

      {/* Floating Book Button */}
      <View style={{
        position: 'absolute',
        bottom: 24,
        left: 24,
        right: 24
      }}>
        <Pressable 
          onPress={() => {
            setIsBooking(true)
            setTimeout(() => {
              setIsBooking(false)
            }, 400)
          }} 
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 100,
            paddingVertical: 16,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8
          }}
        >
          {isBooking ? (
            <ActivityIndicator color="black" />
          ) : (
            <Text style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '600'
            }}>Book Experience</Text>
          )}
        </Pressable>
      </View>
    </View>
  )
}
