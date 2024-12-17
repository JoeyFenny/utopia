import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Image, Platform, Dimensions, Pressable, TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'
import { useState, useEffect } from 'react'

const ONBOARDING_STEPS = [
  {
    image: 'https://storage.googleapis.com/what-is-utopia/onboarding-1.jpeg',
    title: 'Your World Unlocked',
    description: 'You have earned you VIP status. This is your gateway to a world of curated rewards, high-end goods, and unforgettable experiences.'
  },
  {
    image: 'https://storage.googleapis.com/what-is-utopia/onboarding-2.jpeg',
    title: 'Climb Higher',
    description: 'Earn points for your activities on Betswap. The come redeem them here. The more you contribute, the higher you climb.'
  },
  {
    image: 'https://storage.googleapis.com/what-is-utopia/onboarding-3.jpeg',
    title: 'Made just for you',
    description: 'Access private events, early product releases, and luxury experiences tailored to your unique tastes. Enjoy perks designed for those who stand out.'
  }
]

const SWIPE_THRESHOLD = 50

export function OnboardingScreen() {
  const screenHeight = Dimensions.get('window').height
  const { push } = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [touchStart, setTouchStart] = useState(0)

  const contentContainerStyle = Platform.select({
    web: { minHeight: 200 },
    default: { height: screenHeight * 0.4 }
  })

  const imageContainerStyle = Platform.select({
    web: { height: screenHeight - 200 },
    default: { height: screenHeight * 0.6 }
  })

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleTouchStart = (event: any) => {
    setTouchStart(event.nativeEvent.pageX)
  }

  const handleTouchEnd = (event: any) => {
    const touchEnd = event.nativeEvent.pageX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > SWIPE_THRESHOLD) { 
      if (diff > 0) {
        handleNext()
      } else {
        handlePrevious()
      }
    }
  }

  return (
    <TouchableOpacity 
      className="flex-1 bg-black" 
      activeOpacity={1}
      onPressIn={handleTouchStart}
      onPressOut={handleTouchEnd}
    >
      {/* Image container */}
      <View style={imageContainerStyle}>
        <Image
          source={{ uri: ONBOARDING_STEPS[currentStep].image }}
          className="w-full h-full"
          resizeMode="cover"
          style={Platform.OS === 'web' ? { width: '100%', height: '100%', objectFit: 'cover' } : undefined}
        />
      </View>

      {/* Content container */}
      <View className="bg-black px-8 pt-8 pb-12 flex justify-between" style={contentContainerStyle}>
        <View>
          <H1 className="text-white text-4xl font-light mb-4">
            {ONBOARDING_STEPS[currentStep].title}
          </H1>
          <Text className="text-white/80 text-lg">
            {ONBOARDING_STEPS[currentStep].description}
          </Text>
        </View>

        {currentStep === ONBOARDING_STEPS.length - 1 && (
          <View style={Platform.select({
            web: { 
              width: '100%',
              alignItems: 'center',
              marginTop: 32
            },
            default: {
              width: '100%',
              alignItems: 'center',
              marginTop: 32
            }
          })}>
            <View style={Platform.select({
              web: {
                backgroundColor: 'white',
                borderRadius: 24,
                width: 200,
                padding: 12,
                cursor: 'pointer'
              },
              default: {
                backgroundColor: 'white',
                borderRadius: 24,
                width: '100%',
                padding: 12
              }
            })}>
              <TouchableOpacity onPress={() => push('/notifications')}>
                <Text style={{
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: '500'
                }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {currentStep !== ONBOARDING_STEPS.length - 1 && (
          <View className="flex-row justify-center space-x-2 mt-8">
            {ONBOARDING_STEPS.map((_, index) => (
              <Pressable key={index} onPress={() => setCurrentStep(index)}>
                <View 
                  className={`w-2 h-2 rounded-full ${index === currentStep ? 'bg-[#FED700]' : 'bg-[#333333]'}`}
                />
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}
