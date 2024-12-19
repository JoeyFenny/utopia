import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// High-quality curated experiences with professional Unsplash photos
const experienceTemplates = [
  {
    name: 'Private Sunset Yacht Charter',
    bio: 'Experience the ultimate luxury aboard a 100-foot yacht, complete with a private chef and sunset champagne toast.',
    cost: 12000,
    city: 'Saint-Tropez',
    carouselPhotos: ['https://images.unsplash.com/photo-1621277224630-81a8e61b2511']
  },
  {
    name: 'Patek Philippe Museum Tour',
    bio: 'Private guided tour of the prestigious Patek Philippe Museum, including rare timepiece demonstrations.',
    cost: 3500,
    city: 'Geneva',
    carouselPhotos: ['https://images.unsplash.com/photo-1526045431048-f857369baa09']
  },
  {
    name: 'Michelin 3-Star Chefs Table',
    bio: 'Intimate dining experience at the chefs private table with wine pairing and kitchen tour.',
    cost: 1800,
    city: 'Paris',
    carouselPhotos: ['https://images.unsplash.com/photo-1559339352-11d035aa65de']
  },
  {
    name: 'Ferrari F8 Track Experience',
    bio: 'Full-day supercar experience with professional instruction on a private Formula 1 circuit.',
    cost: 7500,
    city: 'Maranello',
    carouselPhotos: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888']
  },
  {
    name: 'Private Island Retreat',
    bio: 'Exclusive access to a private island paradise with personal butler and chef service.',
    cost: 25000,
    city: 'Maldives',
    carouselPhotos: ['https://images.unsplash.com/photo-1573843981267-be1999ff37cd']
  },
  {
    name: 'Luxury Safari Lodge',
    bio: 'Five-star safari experience with private game drives and helicopter tours.',
    cost: 15000,
    city: 'Serengeti',
    carouselPhotos: ['https://images.unsplash.com/photo-1515205244153-31a0a882fa0c']
  },
  {
    name: 'Private Jet Wine Tour',
    bio: 'Private jet tour of the worlds most exclusive vineyards with master sommelier.',
    cost: 35000,
    city: 'Bordeaux',
    carouselPhotos: ['https://images.unsplash.com/photo-1540962351504-03099e0a754b']
  },
  {
    name: 'Royal Suite Experience',
    bio: 'Two nights in the most prestigious suite with butler service and helicopter transfer.',
    cost: 18000,
    city: 'Dubai',
    carouselPhotos: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b']
  },
  {
    name: 'Haute Couture Experience',
    bio: 'Private fashion consultation and fitting with world-renowned designers.',
    cost: 9500,
    city: 'Milan',
    carouselPhotos: ['https://images.unsplash.com/photo-1558769132-cb1aea458c5e']
  },
  {
    name: 'Alpine Helicopter Tour',
    bio: 'Private helicopter tour of the Alps with luxury mountain lodge lunch.',
    cost: 8500,
    city: 'Zermatt',
    carouselPhotos: ['https://images.unsplash.com/photo-1608236465624-f8f79563f063']
  }
]

const getRandomFutureDate = () => {
  const start = new Date()
  const end = new Date()
  end.setMonth(end.getMonth() + 6)
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

async function addExperiences() {
  try {
    // Add 10 experiences with random future dates
    for (const template of experienceTemplates) {
      await prisma.experience.create({
        data: {
          ...template,
          date: getRandomFutureDate(),
        },
      })
    }

    console.log('Successfully added 10 new experiences')
  } catch (error) {
    console.error('Error adding experiences:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addExperiences()
