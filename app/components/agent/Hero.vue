<script setup lang="ts">
const { t } = useI18n()
const { getCities, agents } = useAgents()

const emit = defineEmits(['search'])

const searchQuery = ref('')
const selectedCity = ref('')
const cities = getCities()

// Dropdown States
const isCityOpen = ref(false)
const isSearchOpen = ref(false)

const cityDropdownRef = ref<HTMLElement | null>(null)
const searchDropdownRef = ref<HTMLElement | null>(null)

// Mock Search History/Suggestions based on the image
const searchSuggestions = computed(() => {
    if (!searchQuery.value) return [
        'Agen daerah Semarang',
        'List agen di daerah Jawa Tengah',
        'Agen terdekat daerah Jakarta',
        'Agen daerah Menado terdekat'
    ]
    return agents.value
        .filter(a => a.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            a.city.toLowerCase().includes(searchQuery.value.toLowerCase()))
        .map(a => a.name)
        .slice(0, 5)
})

const handleSearch = () => {
    isSearchOpen.value = false
    isCityOpen.value = false
    emit('search', { query: searchQuery.value, city: selectedCity.value })
}

const selectCity = (city: string) => {
    selectedCity.value = city
    isCityOpen.value = false
    handleSearch()
}

const selectSuggestion = (suggestion: string) => {
    searchQuery.value = suggestion
    isSearchOpen.value = false
    handleSearch()
}

const clearSearch = () => {
    searchQuery.value = ''
}

// Click Outside Logic
onMounted(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (cityDropdownRef.value && !cityDropdownRef.value.contains(event.target as Node)) {
            isCityOpen.value = false
        }
        if (searchDropdownRef.value && !searchDropdownRef.value.contains(event.target as Node)) {
            isSearchOpen.value = false
        }
    }
    document.addEventListener('mousedown', handleClickOutside)
    onUnmounted(() => {
        document.removeEventListener('mousedown', handleClickOutside)
    })
})

const stats = [
    { value: '500K+', label: t('agentsPage.hero.stats.passengers') },
    { value: '120+', label: t('agentsPage.hero.stats.fleets') },
    { value: '95%', label: t('agentsPage.hero.stats.satisfaction') }
]
</script>

<template>
    <section class="relative w-full h-screen bg-white flex flex-col px-4 md:px-10 py-6 md:py-10 z-10">
        <div class="relative w-full h-full rounded-[30px] md:rounded-[40px] flex flex-col items-center justify-center">
            <!-- Background/Overlay Concept -->
            <div class="absolute inset-0 z-0 overflow-hidden rounded-[30px] md:rounded-[40px]">
                <div class="absolute inset-0 bg-gradient-to-b from-black/0 to-black/40 z-10"></div>
                <NuxtImg src="/images/agenhero.png" class="w-full h-full object-cover" />
            </div>

            <!-- Content -->
            <div
                class="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-28 h-full flex flex-col justify-center items-start gap-12 py-20">
                <div class="max-w-2xl space-y-6">
                    <h1 class="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                        {{ t('agentsPage.hero.title') }}
                    </h1>
                    <p class="text-lg md:text-xl font-light text-white/90 leading-relaxed">
                        {{ t('agentsPage.hero.subtitle') }}
                    </p>
                </div>

                <div class="flex flex-nowrap items-start gap-6 md:gap-16 w-full">
                    <div v-for="stat in stats" :key="stat.label" class="flex flex-col shrink-0">
                        <span class="text-2xl md:text-5xl font-bold text-white">{{ stat.value }}</span>
                        <span class="text-[10px] md:text-xl font-light text-white/70">{{ stat.label }}</span>
                    </div>
                </div>

                <!-- Search Bar Box -->
                <div
                    class="w-full p-3 bg-white/60 rounded-2xl md:rounded-xl border border-white/10 backdrop-blur-md flex flex-col md:flex-row gap-4 items-center mt-8">

                    <!-- Custom Search Input -->
                    <div ref="searchDropdownRef" class="flex-1 w-full relative">
                        <div class="relative group">
                            <input v-model="searchQuery" type="text"
                                :placeholder="t('agentsPage.hero.search.placeholder')" @focus="isSearchOpen = true"
                                class="w-full px-4 py-3 bg-white rounded-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-light pr-10" />
                            <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <button v-if="searchQuery" @click="clearSearch"
                                    class="text-gray-400 hover:text-gray-600">
                                    <PhosphorIcon name="x-circle" size="18" weight="fill" />
                                </button>
                                <PhosphorIcon name="magnifying-glass" size="18" class="text-gray-400" />
                            </div>
                        </div>

                        <!-- Search Dropdown -->
                        <Transition name="fade">
                            <div v-if="isSearchOpen"
                                class="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] py-2">
                                <div class="px-4 py-2 text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                                    Search Agen</div>
                                <button v-for="(suggestion, idx) in searchSuggestions" :key="idx"
                                    @click="selectSuggestion(suggestion)"
                                    class="w-full px-4 py-3 text-left flex items-center gap-3 transition-colors hover:bg-blue-50 group text-sm">
                                    <PhosphorIcon name="magnifying-glass" size="20"
                                        class="text-gray-300 group-hover:text-blue-500" />
                                    <span class="flex-1 text-gray-600 font-medium">{{ suggestion }}</span>
                                    <PhosphorIcon name="x-circle" size="18" weight="bold"
                                        class="text-gray-300 hover:text-red-400" />
                                </button>
                            </div>
                        </Transition>
                    </div>

                    <div class="hidden md:block w-px h-8 bg-gray-200"></div>

                    <!-- Custom City Dropdown -->
                    <div ref="cityDropdownRef" class="flex-1 w-full relative">
                        <button @click="isCityOpen = !isCityOpen"
                            class="w-full px-4 py-3 bg-white rounded-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-light flex justify-between items-center text-left">
                            <span :class="selectedCity ? 'text-gray-700 font-medium' : 'text-gray-400'">
                                {{ selectedCity || t('agentsPage.hero.search.city') }}
                            </span>
                            <PhosphorIcon name="caret-down" size="16" class="text-gray-400 transition-transform"
                                :class="{ 'rotate-180': isCityOpen }" />
                        </button>

                        <!-- City Dropdown List -->
                        <Transition name="fade">
                            <div v-if="isCityOpen"
                                class="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] py-2">
                                <div class="px-4 py-2 text-[10px] uppercase tracking-wider text-gray-400 font-bold">Opsi
                                    Kota</div>
                                <button @click="selectCity('')"
                                    class="w-full px-4 py-3 text-left text-sm transition-colors hover:bg-blue-50"
                                    :class="{ 'bg-blue-50 text-blue-700 font-semibold': selectedCity === '' }">
                                    Semua Kota
                                </button>
                                <button v-for="city in cities" :key="city" @click="selectCity(city)"
                                    class="w-full px-4 py-3 text-left text-sm transition-colors hover:bg-blue-50"
                                    :class="{ 'bg-blue-50 text-blue-700 font-semibold': selectedCity === city }">
                                    {{ city }}
                                </button>
                            </div>
                        </Transition>
                    </div>

                    <button @click="handleSearch"
                        class="w-full md:w-32 py-3 bg-bg-fill-primary hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg active:scale-95">
                        {{ t('agentsPage.hero.search.button') }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
