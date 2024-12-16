import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'
import { TextInput, Platform } from 'react-native'
import { MotiLink } from 'solito/moti'

const GradientBackground = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === 'web') {
    return (
      <View className="flex-1 bg-[radial-gradient(100%_100%_at_50%_50%,_var(--tw-gradient-stops))] from-[#141414] via-[#0a0a0a] to-black">
        {children}
      </View>
    )
  }
  
  // For native platforms
  return Platform.select({
    native: (
      <View className="flex-1 bg-black">
        {children}
      </View>
    ),
    default: (
      <View className="flex-1 bg-[radial-gradient(100%_100%_at_50%_50%,_var(--tw-gradient-stops))] from-[#141414] via-[#0a0a0a] to-black">
        {children}
      </View>
    ),
  })
}

export function HomeScreen() {
  return (
    <GradientBackground>
      <View className="relative flex-1 items-center justify-center p-3">
        <H1 className="text-white">Utopia</H1>
        <TextInput 
          className="w-64 px-4 py-2 mb-4 border rounded-lg bg-gray-800 text-white border-gray-700"
          placeholder="Enter text here..."
          placeholderTextColor="#6B7280"
        />
        <View className="max-w-xl">
          <P className="text-center text-gray-300">
            Here is a basic starter to show you how you can navigate from one
            screen to another. This screen uses the same code on Next.js and React
            Native.
          </P>
          <P className="text-center text-gray-300">
            Solito is made by{' '}
            <A
              href="https://twitter.com/fernandotherojo"
              hrefAttrs={{
                target: '_blank',
                rel: 'noreferrer',
              }}
            >
              Fernando Rojo
            </A>
            .
          </P>
          <P className="text-center text-gray-300">
            NativeWind is made by{' '}
            <A
              href="https://twitter.com/mark__lawlor"
              hrefAttrs={{
                target: '_blank',
                rel: 'noreferrer',
              }}
            >
              Mark Lawlor
            </A>
            .
          </P>
        </View>
        <View className="h-[32px]" />
        <Row className="space-x-8">
          <TextLink href="/user/fernando">Regular Link</TextLink>
          <MotiLink
            href="/user/fernando"
            animate={({ hovered, pressed }) => {
              'worklet'

              return {
                scale: pressed ? 0.95 : hovered ? 1.1 : 1,
                rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
              }
            }}
            transition={{
              type: 'timing',
              duration: 150,
            }}
          >
            <Text selectable={false} className="text-base font-bold text-white">
              Moti Link
            </Text>
          </MotiLink>
        </Row>
      </View>
    </GradientBackground>
  )
}
