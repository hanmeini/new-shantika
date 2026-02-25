// useArmada – composable for bus fleet data fetching
import type { Bus } from '~/types'

export const useArmada = () => {
  const buses = ref<Bus[]>([
    {
      id: 'sleeper',
      name: 'Sleeper Bus',
      class: 'Sleeper',
      capacity: 22,
      facilities: ['Snack', 'Bantal & Selimut', 'DVD Player', 'AC', 'Telepon', 'Lampu Baca', 'USB Charger', 'Reclining Seat'],
      thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
      icon: '/icons/sleeperbus.svg',
      description: '',
      price: '250.000',
      rating: '4.8/5',
      model: 'Double Decker',
      additionalInfo: '',
      gallery: [
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop',
        'https://plus.unsplash.com/premium_photo-1664302152991-d013ff125f3f?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 'executive',
      name: 'Executive',
      class: 'Executive',
      capacity: 32,
      facilities: ['Snack', 'Bantal & Selimut', 'AC', 'USB Charger', 'Reclining Seat'],
      thumbnail: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop',
      icon: '/icons/executive.svg',
      description: '',
      price: '180.000',
      rating: '4.7/5',
      model: 'Big Bus',
      additionalInfo: '',
      gallery: [
        'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
        'https://plus.unsplash.com/premium_photo-1664302152991-d013ff125f3f?w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 'executivetop',
      name: 'Executive Top',
      class: 'Executive',
      capacity: 28,
      facilities: ['Snack', 'Bantal & Selimut', 'DVD Player', 'AC', 'USB Charger', 'Reclining Seat'],
      thumbnail: 'https://plus.unsplash.com/premium_photo-1664302152991-d013ff125f3f?w=800&auto=format&fit=crop',
      icon: '/icons/executivetop.svg',
      description: '',
      price: '210.000',
      rating: '4.9/5',
      model: 'Big Bus',
      additionalInfo: '',
      gallery: [
        'https://plus.unsplash.com/premium_photo-1664302152991-d013ff125f3f?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop'
      ]
    }
  ])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchBuses = async () => {
    loading.value = true
    try {
      // Simulating API fetch
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch {
      error.value = 'Gagal memuat data armada'
    } finally {
      loading.value = false
    }
  }

  return { buses, loading, error, fetchBuses }
}
