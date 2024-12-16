import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Image, Platform, Dimensions, Pressable, TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'
import { useState } from 'react'

const ONBOARDING_STEPS = [
  {
    image: 'https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?q=80&w=1000',
    title: 'Your World Unlocked',
    description: 'Discover your gateway to a world of content and endless possibilities, with everything you need in one place.'
  },
  {
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=3093',
    title: 'Climb Higher',
    description: 'Earn points for your contributions. Between. The coins redeem them here. The more you contribute, the higher you climb.'
  }
]

const SWIPE_THRESHOLD = 50

export function OnboardingScreen() {
  const screenHeight = Dimensions.get('window').height
  const [currentStep, setCurrentStep] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  
  const contentContainerStyle = Platform.select({
    web: { height: 300 },
    default: { height: screenHeight * 0.4 }
  })

  const imageContainerStyle = Platform.select({
    web: { height: screenHeight * 0.6 },
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
      <View className="bg-black px-8 pt-8 pb-12 justify-between" style={contentContainerStyle}>
        <View>
          <H1 className="text-white text-4xl font-light mb-4">
            {ONBOARDING_STEPS[currentStep].title}
          </H1>
          <Text className="text-white/80 text-lg">
            {ONBOARDING_STEPS[currentStep].description}
          </Text>
        </View>

        {/* Pagination dots */}
        <View className="flex-row justify-center space-x-2">
          {ONBOARDING_STEPS.map((_, index) => (
            <Pressable key={index} onPress={() => setCurrentStep(index)}>
              <View 
                className={`w-2 h-2 rounded-full ${index === currentStep ? 'bg-[#FED700]' : 'bg-[#333333]'}`}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  )
}
