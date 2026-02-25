// useRute – composable for bus route data fetching
import type { Route } from '~/types'

export const useRute = () => {
  const routes = ref<Route[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchRoutes = async () => {
    loading.value = true
    try {
      // Mock data for routes
      routes.value = [
        {
          id: '1',
          origin: 'Semarang',
          destination: 'Yogyakarta',
          duration: '4h',
          departureTime: ['2025-02-24T08:00:00Z'],
          price: { executive: 150000, business: 120000, economy: 100000 },
          busClass: ['Sleeper Bus', 'Executive']
        },
        {
          id: '2',
          origin: 'Semarang',
          destination: 'Bandung',
          duration: '8h',
          departureTime: ['2025-02-24T08:00:00Z'],
          price: { executive: 250000, business: 200000, economy: 180000 },
          busClass: ['Sleeper Bus']
        },
        {
          id: '3',
          origin: 'Bandung',
          destination: 'Kudus',
          duration: '10h',
          departureTime: ['2025-02-24T08:00:00Z'],
          price: { executive: 300000, business: 250000, economy: 220000 },
          busClass: ['Executive']
        }
      ]
    } catch {
      error.value = 'Gagal memuat data rute'
    } finally {
      loading.value = false
    }
  }

  return { routes, loading, error, fetchRoutes }
}
