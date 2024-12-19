import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const generateExperiences = () => {
  const experiences = [
    // Watches
    {
      name: 'Rolex Daytona Masterclass',
      bio: 'An exclusive hands-on experience with the iconic Rolex Daytona collection. Learn about its history and craftsmanship.',
      cost: 2500,
      city: 'Geneva',
      date: new Date('2024-01-15'),
      carouselPhotos: ['https://images.unsplash.com/photo-1547996160-81dfa63595aa'],
    },
    {
      name: 'Patek Philippe Private Viewing',
      bio: 'Private viewing session of rare Patek Philippe timepieces with a master watchmaker.',
      cost: 3500,
      city: 'Zurich',
      date: new Date('2024-01-20'),
      carouselPhotos: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49'],
    },

    // Yachts
    {
      name: 'Mediterranean Yacht Week',
      bio: 'Seven days aboard a luxury yacht cruising the Mediterranean coast from Monaco to Capri.',
      cost: 15000,
      city: 'Monaco',
      date: new Date('2024-02-01'),
      carouselPhotos: ['https://images.unsplash.com/photo-1567899378494-47b22a2ae96a'],
    },
    {
      name: 'Caribbean Private Charter',
      bio: 'Five-day private yacht charter exploring the pristine waters of the Caribbean.',
      cost: 12000,
      city: 'St. Barts',
      date: new Date('2024-02-15'),
      carouselPhotos: ['https://images.unsplash.com/photo-1569263979104-865ab7cd8d13'],
    },

    // Fine Dining
    {
      name: 'Chef's Table at Osteria Francescana',
      bio: 'Exclusive chef's table experience at Massimo Bottura's three-Michelin-starred restaurant.',
      cost: 1200,
      city: 'Modena',
      date: new Date('2024-03-01'),
      carouselPhotos: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0'],
    },
    {
      name: 'Noma Copenhagen Experience',
      bio: 'Multi-course tasting menu at the world-renowned Noma, including kitchen tour.',
      cost: 1500,
      city: 'Copenhagen',
      date: new Date('2024-03-15'),
      carouselPhotos: ['https://images.unsplash.com/photo-1600891964599-f61ba0e24092'],
    },

    // Private Jets
    {
      name: 'Private Jet to Maldives',
      bio: 'Luxury private jet experience to the Maldives, including champagne service.',
      cost: 25000,
      city: 'Dubai',
      date: new Date('2024-04-01'),
      carouselPhotos: ['https://images.unsplash.com/photo-1540962351504-03099e0a754b'],
    },
    {
      name: 'Alps Private Helicopter Tour',
      bio: 'Scenic helicopter tour over the Swiss Alps with luxury champagne picnic.',
      cost: 8000,
      city: 'Zermatt',
      date: new Date('2024-04-15'),
      carouselPhotos: ['https://images.unsplash.com/photo-1608236465624-f8f79563f063'],
    },

    // Luxury Cars
    {
      name: 'Ferrari Track Day Experience',
      bio: 'Full day driving various Ferrari models on a private racing circuit.',
      cost: 5000,
      city: 'Maranello',
      date: new Date('2024-05-01'),
      carouselPhotos: ['https://images.unsplash.com/photo-1592198084033-aade902d1aae'],
    },
    {
      name: 'Lamborghini Factory Tour',
      bio: 'VIP tour of the Lamborghini factory followed by test drives.',
      cost: 4000,
      city: 'Sant\'Agata Bolognese',
      date: new Date('2024-05-15'),
      carouselPhotos: ['https://images.unsplash.com/photo-1621135802920-133df287f89c'],
    },
  ]

  // Generate 90 more experiences by varying the existing ones
  const cities = ['New York', 'London', 'Paris', 'Tokyo', 'Singapore', 'Dubai', 'Los Angeles', 'Miami', 'Hong Kong', 'Sydney']
  const months = ['06', '07', '08', '09', '10', '11', '12']
  const variations = ['Premium', 'Elite', 'Exclusive', 'VIP', 'Luxury', 'Private', 'Bespoke', 'Custom', 'Ultimate']

  for (let i = 0; i < 90; i++) {
    const baseExperience = experiences[i % experiences.length]
    const city = cities[i % cities.length]
    const month = months[i % months.length]
    const variation = variations[i % variations.length]
    const costMultiplier = 0.8 + (Math.random() * 0.4) // Random between 0.8 and 1.2

    experiences.push({
      name: `${variation} ${baseExperience.name}`,
      bio: baseExperience.bio,
      cost: Math.round(baseExperience.cost * costMultiplier),
      city,
      date: new Date(`2024-${month}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`),
      carouselPhotos: baseExperience.carouselPhotos,
    })
  }

  return experiences
}

async function main() {
  // Clear existing experiences
  await prisma.experienceInteraction.deleteMany()
  await prisma.experience.deleteMany()

  // Create experiences
  const experiences = generateExperiences()
  for (const experience of experiences) {
    await prisma.experience.create({
      data: experience,
    })
  }

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
