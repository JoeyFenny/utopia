import { Stack } from 'expo-router'

export default function ExperienceLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Experience'
        }}
      />
      <Stack.Screen
        name="details/[id]"
        options={{
          title: 'Experience Details'
        }}
      />
    </Stack>
  )
}
