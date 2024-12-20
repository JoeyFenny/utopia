import { TextInput as RNTextInput, TextInputProps, StyleSheet } from 'react-native'

export function TextInput({ style, ...props }: TextInputProps) {
  return (
    <RNTextInput
      style={[styles.input, style]}
      placeholderTextColor="#666"
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    width: '100%',
    marginBottom: 16,
  },
})
