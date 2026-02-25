// useAgen – composable for agent data fetching
import type { Agent } from '~/types'

export const useAgen = () => {
  const agents = ref<Agent[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAgents = async () => {
    loading.value = true
    try {
      // agents.value = await $fetch('/api/agen')
    } catch {
      error.value = 'Gagal memuat data agen'
    } finally {
      loading.value = false
    }
  }

  return { agents, loading, error, fetchAgents }
}
