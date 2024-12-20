import { View } from 'app/design/view'
import { Platform, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import { H1, Text } from 'app/design/typography'
import { TextInput } from 'app/design/text-input'
import { useState } from 'react'
import { useRouter } from 'solito/router'
import { gql, useMutation } from '@apollo/client'

const CREATE_EXPERIENCE = gql`
  mutation CreateExperience(
    $name: String!
    $bio: String!
    $cost: Float!
    $city: String!
    $date: Date!
    $carouselPhotos: [String!]!
  ) {
    createExperience(
      name: $name
      bio: $bio
      cost: $cost
      city: $city
      date: $date
      carouselPhotos: $carouselPhotos
    ) {
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

export function AddExperienceScreen() {
  const router = useRouter()
  const [createExperience, { loading: isLoading }] = useMutation(CREATE_EXPERIENCE)
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    cost: '',
    city: '',
    date: new Date().toISOString().split('T')[0],
    carouselPhotos: ['']
  })
  const [dateError, setDateError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const validateDate = (date: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) {
      setDateError('Please use YYYY-MM-DD format')
      return false
    }
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) {
      setDateError('Invalid date')
      return false
    }
    setDateError('')
    return true
  }

  const handleSubmit = async () => {
    if (dateError) return

    try {
      await createExperience({
        variables: {
          name: formData.name,
          bio: formData.bio,
          cost: parseFloat(formData.cost),
          city: formData.city,
          date: formData.date ? new Date(formData.date) : new Date(),
          carouselPhotos: formData.carouselPhotos.filter(url => url.trim() !== ''),
        },
      })
      setIsSuccess(true)
      // Clear the form
      setFormData({
        name: '',
        bio: '',
        cost: '',
        city: '',
        date: '',
        carouselPhotos: [''],
      })
      // Show success message briefly
      setTimeout(() => {
        setIsSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Error creating experience:', error)
    }
  }

  const addPhotoUrl = () => {
    setFormData(prev => ({
      ...prev,
      carouselPhotos: [...prev.carouselPhotos, '']
    }))
  }

  const updatePhotoUrl = (index: number, url: string) => {
    setFormData(prev => ({
      ...prev,
      carouselPhotos: prev.carouselPhotos.map((photo, i) => 
        i === index ? url : photo
      )
    }))
  }

  const removePhotoUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      carouselPhotos: prev.carouselPhotos.filter((_, i) => i !== index)
    }))
  }

  return (
    <View style={[styles.container, Platform.select({ web: { alignItems: 'center' } })]}>
      <View style={[Platform.select({ web: { width: '100%', maxWidth: 500 } })]}>
        <ScrollView 
          style={[
            styles.scrollView,
            Platform.select({
              web: {
                maxWidth: 500,
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '100%'
              }
            })
          ]}
        >
          <View style={styles.content}>
            <H1 style={styles.title}>Add New Experience</H1>
            
            <View style={styles.form}>
              <TextInput
                placeholder="Experience Name"
                value={formData.name}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                style={styles.input}
              />
              
              <TextInput
                placeholder="Bio"
                value={formData.bio}
                onChangeText={(text) => setFormData(prev => ({ ...prev, bio: text }))}
                style={styles.input}
                multiline
                numberOfLines={4}
              />
              
              <TextInput
                placeholder="Cost"
                value={formData.cost}
                onChangeText={(text) => setFormData(prev => ({ ...prev, cost: text }))}
                style={styles.input}
                keyboardType="numeric"
              />
              
              <TextInput
                placeholder="City"
                value={formData.city}
                onChangeText={(text) => setFormData(prev => ({ ...prev, city: text }))}
                style={styles.input}
              />
              
              <View>
                <TextInput
                  placeholder="Date (YYYY-MM-DD)"
                  value={formData.date}
                  onChangeText={(text) => {
                    setFormData(prev => ({ ...prev, date: text }))
                    validateDate(text)
                  }}
                  style={[styles.input, dateError ? styles.inputError : null]}
                />
                {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
              </View>

              <View style={styles.photosContainer}>
                <Text style={styles.sectionTitle}>Photos</Text>
                {formData.carouselPhotos.map((url, index) => (
                  <View key={index} style={styles.photoRow}>
                    <TextInput
                      placeholder="Photo URL"
                      value={url}
                      onChangeText={(text) => updatePhotoUrl(index, text)}
                      style={[styles.input, styles.photoInput]}
                    />
                    {formData.carouselPhotos.length > 1 && (
                      <TouchableOpacity
                        onPress={() => removePhotoUrl(index)}
                        style={styles.removeButton}
                      >
                        <Text style={styles.removeButtonText}>Remove</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
                <TouchableOpacity
                  onPress={addPhotoUrl}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>Add Photo URL</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.submitButton, isSuccess && styles.submitButtonSuccess]}
                onPress={handleSubmit}
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <ActivityIndicator color={Platform.OS === 'web' ? '#000' : '#fff'} />
                ) : isSuccess ? (
                  <Text style={styles.submitButtonText}>Success! ✨</Text>
                ) : (
                  <Text style={styles.submitButtonText}>Create Experience</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.select({ ios: 60, android: 40, web: 40 }),
  },
  title: {
    color: '#fff',
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    marginTop: 4,
    fontSize: 12,
  },
  photosContainer: {
    gap: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  photoRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  photoInput: {
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#ff4444',
    padding: 12,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: Platform.OS === 'web' ? '#fff' : '#007AFF',
    padding: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonSuccess: {
    backgroundColor: Platform.OS === 'web' ? '#E8FFF3' : '#34C759',
  },
  submitButtonText: {
    color: Platform.OS === 'web' ? '#000' : '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
