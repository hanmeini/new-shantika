<script setup lang="ts">
import DetailModal from './DetailModal.vue'

const { t } = useI18n()
const props = defineProps<{
    searchParams: { query: string; city: string }
}>()

const { fetchAgents, searchAgents } = useAgents()
const agents = ref<any[]>([])
const filteredAgents = computed(() => searchAgents(props.searchParams.query, props.searchParams.city))

// Modal State
const isModalOpen = ref(false)
const selectedAgentData = ref<any>(null)

const openAgentDetail = (agent: any) => {
    selectedAgentData.value = {
        name: agent.name,
        address: agent.address,
        phone: agent.phone,
        hours: 'Open 24 Hours', // Default for now
        image: agent.thumbnail,
        facilities: [
            { title: 'Pemadam Kebakaran', description: 'Area tunggu yang nyaman dengan kursi memadai sebelum keberangkatan.', image: agent.thumbnail },
            { title: 'Palu Pemecah Kaca', description: 'Tersedia toilet bersih dan terawat untuk kenyamanan penumpang.', image: agent.thumbnail },
            { title: 'Lahan Parkir', description: 'Lahan parkir luas dan aman untuk kendaraan pribadi.', image: agent.thumbnail }
        ]
    }
    isModalOpen.value = true
}

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(8) // Match user's layout snippet (1-8 dari 29 item)
const totalItems = computed(() => filteredAgents.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

const visiblePages = computed(() => {
    const pages: (number | string)[] = []
    const range = 2

    for (let i = 1; i <= totalPages.value; i++) {
        if (
            i === 1 ||
            i === totalPages.value ||
            (i >= currentPage.value - range && i <= currentPage.value + range)
        ) {
            pages.push(i)
        } else if (pages[pages.length - 1] !== '...') {
            pages.push('...')
        }
    }
    return pages
})

const paginatedAgents = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredAgents.value.slice(start, end)
})

const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') {
        currentPage.value = page
        window.scrollTo({ top: 600, behavior: 'smooth' })
    }
}

watch(() => props.searchParams, () => {
    currentPage.value = 1
}, { deep: true })

watch(itemsPerPage, () => {
    currentPage.value = 1
})

onMounted(async () => {
    agents.value = await fetchAgents()
})

const regionBadgeColors: Record<string, string> = {
    'Jawa Tengah': 'bg-gray-100 text-gray-700',
    'Jawa Barat': 'bg-gray-100 text-gray-700',
    'Jawa Timur': 'bg-gray-100 text-gray-700',
    'Jakarta': 'bg-gray-100 text-gray-700',
    'Yogyakarta': 'bg-gray-100 text-gray-700'
}

const getRegion = (city: string) => {
    const regions: Record<string, string> = {
        'Semarang': 'Jawa Tengah',
        'Kudus': 'Jawa Tengah',
        'Jepara': 'Jawa Tengah',
        'Pekalongan': 'Jawa Tengah',
        'Solo': 'Jawa Tengah',
        'Jakarta': 'Jakarta',
        'Yogyakarta': 'Yogyakarta',
        'Cirebon': 'Jawa Barat',
        'Surabaya': 'Jawa Timur'
    }
    return regions[city] || 'Lainnya'
}
</script>

<template>
    <section class="w-full px-6 md:px-28 py-20 bg-[#FAFAFA] flex flex-col gap-12">
        <!-- Agent Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div v-for="agent in paginatedAgents" :key="agent.id" @click="openAgentDetail(agent)"
                class="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden flex flex-row md:flex-col transition-all hover:shadow-xl group cursor-pointer h-auto md:h-full">
                <!-- Image Section -->
                <div class="w-2/5 md:w-full h-auto md:h-64 relative overflow-hidden shrink-0">
                    <NuxtImg :src="agent.thumbnail"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div class="absolute top-2 left-2 md:top-4 md:left-4">
                        <span
                            class="px-2 py-0.5 md:px-3 md:py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] md:text-xs font-semibold text-text-dark-primary flex items-center gap-1 md:gap-2">
                            <PhosphorIcon name="map-pin" size="10" md:size="12" weight="bold" />
                            {{ getRegion(agent.city) }}
                        </span>
                    </div>
                </div>

                <!-- Content Section -->
                <div
                    class="w-3/5 md:w-full p-4 md:p-6 space-y-2 md:space-y-4 flex flex-col justify-center md:justify-start">
                    <h3 class="text-base md:text-xl font-bold text-text-dark-primary leading-tight">{{ agent.name }}
                    </h3>

                    <div class="space-y-2 md:space-y-3">
                        <div class="flex items-start gap-2 md:gap-3">
                            <PhosphorIcon name="map-pin" size="14" md:size="18"
                                class="text-text-dark-secondary mt-0.5 flex-shrink-0" />
                            <p
                                class="text-[11px] md:text-sm text-text-dark-secondary leading-normal md:leading-relaxed font-light line-clamp-2 md:line-clamp-none">
                                {{ agent.address }}
                            </p>
                        </div>
                        <div class="flex items-center gap-2 md:gap-3">
                            <PhosphorIcon name="phone" size="14" md:size="18"
                                class="text-text-dark-secondary flex-shrink-0" />
                            <p class="text-[11px] md:text-sm text-text-dark-secondary font-light">
                                {{ agent.phone }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1"
            class="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-gray-100 pb-10">
            <!-- Desktop Layout (Hidden on Mobile) -->
            <div class="hidden md:flex w-full justify-between items-center">
                <p class="text-sm text-text-dark-primary font-normal font-['Hanken_Grotesk'] leading-5">
                    {{ t('agentsPage.grid.itemInfo', {
                        start: (currentPage - 1) * itemsPerPage + 1,
                        end: Math.min(currentPage * itemsPerPage, totalItems),
                        total: totalItems
                    }) }}
                </p>

                <div class="flex items-center gap-6">
                    <div class="flex items-center gap-4">
                        <button @click="handlePageChange(currentPage - 1)" :disabled="currentPage === 1"
                            class="p-2 rounded-lg border border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white text-gray-400">
                            <PhosphorIcon name="caret-left" size="16" weight="bold" />
                        </button>

                        <div class="flex items-center gap-2">
                            <button v-for="page in visiblePages" :key="page" @click="handlePageChange(page)"
                                class="min-w-[40px] h-10 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center font-['Urbanist']"
                                :class="currentPage === page ? 'bg-bg-fill-primary text-white shadow-md' : 'text-text-dark-primary hover:bg-gray-100'">
                                {{ page }}
                            </button>
                        </div>

                        <button @click="handlePageChange(currentPage + 1)" :disabled="currentPage === totalPages"
                            class="p-2 rounded-lg border border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white text-gray-400">
                            <PhosphorIcon name="caret-right" size="16" weight="bold" />
                        </button>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <div
                        class="px-3 py-2 bg-bg-fill-primary rounded-lg shadow-md flex items-center justify-center gap-1 cursor-pointer">
                        <select v-model="itemsPerPage"
                            class="bg-transparent text-white text-xs font-bold outline-none border-none cursor-pointer appearance-none pr-4 relative">
                            <option :value="8" class="text-black">8</option>
                            <option :value="9" class="text-black">9</option>
                            <option :value="12" class="text-black">12</option>
                            <option :value="24" class="text-black">24</option>
                        </select>
                        <PhosphorIcon name="caret-down" size="12" weight="bold"
                            class="text-white -ml-3 pointer-events-none" />
                    </div>
                    <span class="text-sm text-text-dark-primary font-normal font-['Hanken_Grotesk'] leading-5">{{
                        t('agentsPage.grid.itemsPerPage') }}</span>
                </div>
            </div>

            <!-- Mobile Layout (Visible only on Mobile) -->
            <div class="md:hidden w-full flex flex-col gap-5 bg-[#FAFAFA]">
                <!-- Top Row: Navigation and Pages -->
                <div class="w-full flex justify-between items-center">
                    <div class="flex gap-1">
                        <button @click="handlePageChange(1)" :disabled="currentPage === 1"
                            class="p-2 border border-gray-100 bg-white rounded-md disabled:opacity-50 transition-colors flex items-center justify-center">
                            <PhosphorIcon name="caret-double-left" size="16" weight="regular" class="text-gray-400" />
                        </button>
                        <button @click="handlePageChange(currentPage - 1)" :disabled="currentPage === 1"
                            class="p-2 rounded-md transition-colors flex items-center justify-center">
                            <PhosphorIcon name="caret-left" size="16" weight="regular" class="text-gray-400" />
                        </button>
                    </div>

                    <div class="flex items-center gap-1">
                        <button v-for="page in visiblePages" :key="page" @click="handlePageChange(page)"
                            class="px-3 py-1 rounded-md text-xs font-bold font-['Urbanist'] leading-4 flex items-center justify-center"
                            :class="currentPage === page ? 'bg-bg-fill-primary text-white shadow-sm h-8 w-8' : 'text-text-dark-primary h-8'">
                            {{ page }}
                        </button>
                    </div>

                    <div class="flex gap-1">
                        <button @click="handlePageChange(currentPage + 1)" :disabled="currentPage === totalPages"
                            class="p-2 rounded-md transition-colors flex items-center justify-center">
                            <PhosphorIcon name="caret-right" size="16" weight="regular" class="text-gray-400" />
                        </button>
                        <button @click="handlePageChange(totalPages)" :disabled="currentPage === totalPages"
                            class="p-2 rounded-md transition-colors flex items-center justify-center">
                            <PhosphorIcon name="caret-right" size="16" weight="bold" class="text-gray-400" />
                        </button>
                    </div>
                </div>

                <div class="w-full flex justify-between items-center">
                    <div class="text-text-dark-primary text-sm font-normal font-['Hanken_Grotesk'] leading-5">
                        {{ currentPage }} dari {{ totalItems }} item
                    </div>

                    <div class="flex justify-start items-center gap-2">
                        <div
                            class="h-8 px-3 py-2 bg-bg-fill-primary rounded-md flex justify-center items-center gap-1 cursor-pointer">
                            <select v-model="itemsPerPage"
                                class="bg-transparent text-white text-xs font-bold outline-none border-none cursor-pointer appearance-none pr-4">
                                <option :value="5" class="text-black">5</option>
                                <option :value="8" class="text-black">8</option>
                                <option :value="10" class="text-black">10</option>
                                <option :value="20" class="text-black">20</option>
                            </select>
                            <PhosphorIcon name="caret-down" size="12" weight="bold"
                                class="text-white -ml-3 pointer-events-none" />
                        </div>
                        <div class="text-text-dark-primary text-sm font-normal font-['Hanken_Grotesk'] leading-5">{{
                            t('agentsPage.grid.itemsPerPage') }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredAgents.length === 0"
            class="w-full py-20 flex flex-col items-center justify-center text-center gap-4">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <PhosphorIcon name="warning" size="40" />
            </div>
            <div class="space-y-1">
                <h3 class="text-xl font-bold text-text-dark-primary">Agen tidak ditemukan</h3>
                <p class="text-text-dark-secondary font-light">Coba gunakan kata kunci atau filter yang berbeda.</p>
            </div>
        </div>

        <!-- Detail Modal -->
        <DetailModal :is-open="isModalOpen" :agent="selectedAgentData" @close="isModalOpen = false" />
    </section>
</template>
