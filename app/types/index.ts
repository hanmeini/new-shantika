// Shantika – shared TypeScript types

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail: string
  author: string
  publishedAt: string
  category: string
  readingTime: string
}

export interface Bus {
  id: string
  name: string           
  class: string          
  capacity: number
  facilities: string[]   
  thumbnail: string
  icon: string
  description: string
  price: string
  rating: string
  model: string
  additionalInfo: string
  gallery: string[]
}

export interface Agent {
  id: string
  name: string
  city: string
  address: string
  phone: string
  operationalHours: string
  thumbnail: string
}

export interface Route {
  id: string
  origin: string
  destination: string
  duration: string        
  departureTime: string[] 
  price: {
    executive: number
    business: number
    economy: number
  }
  busClass: string[]
}
