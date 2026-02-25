<script setup lang="ts">
import DetailModal from '../agent/DetailModal.vue'

const { t } = useI18n()
const { routes, loading, fetchRoutes } = useRute()

const selectedClass = ref('Sleeper Bus')
const classes = ['Sleeper Bus', 'Executive', 'Executive Big Top', 'Super Executive']

const filteredRoutes = computed(() => {
    return routes.value.filter(route => route.busClass.includes(selectedClass.value))
})

// Modal State
const isModalOpen = ref(false)
const selectedAgent = ref({
    name: 'Semarang Pusat Kota',
    address: 'Jl. Tanggul Mas Tim. Raya No.138, Panggung Lor, Kec. Semarang Utara, Kota Semarang, Jawa Tengah 50176',
    phone: '09762527837',
    hours: 'Open 24 Hours',
    image: '/images/member.png',
    facilities: [
        { title: 'Pemadam Kebakaran', description: 'Area tunggu yang nyaman dengan kursi memadai sebelum keberangkatan.', image: '/images/member.png' },
        { title: 'Palu Pemecah Kaca', description: 'Tersedia toilet bersih dan terawat untuk kenyamanan penumpang.', image: '/images/member.png' },
        { title: 'Palu Pemecah Kaca', description: 'Lahan parkir luas dan aman untuk kendaraan pribadi.', image: '/images/member.png' }
    ]
})

const openAgentDetail = () => {
    isModalOpen.value = true
}

onMounted(() => {
    fetchRoutes()
})
</script>

<template>
    <div class="w-full bg-white py-12 px-4 md:px-10">
        <div class="max-w-7xl mx-auto">
            <!-- Header Section -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <h2 class="text-2xl md:text-4xl font-bold text-[#111847]">Rute Perjalanan</h2>

                <!-- Tabs -->
                <div class="inline-flex p-1 md:p-1.5 bg-gray-100/50 rounded-xl gap-1 items-center">
                    <button v-for="cls in classes" :key="cls" @click="selectedClass = cls"
                        class="px-4 md:px-6 py-1.5 md:py-2 rounded-lg text-[10px] md:text-sm font-bold transition-all whitespace-nowrap"
                        :class="selectedClass === cls
                            ? 'bg-white text-[#111847] shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-200/50'
                            : 'text-gray-400 hover:text-gray-600'">
                        {{ cls }}
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <!-- Left Side: Rute List -->
                <div class="space-y-6 md:space-y-8">

                    <!-- Cards -->
                    <div class="space-y-4 md:space-y-6">
                        <template v-if="loading">
                            <div v-for="i in 3" :key="i" class="w-full h-40 bg-gray-50 animate-pulse rounded-[2.5rem]">
                            </div>
                        </template>

                        <template v-else>
                            <div v-for="route in filteredRoutes" :key="route.id"
                                class="bg-white p-3 md:p-5 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-3 md:gap-7 hover:shadow-lg transition-all group">
                                <!-- Bus Thumbnail -->
                                <div
                                    class="w-20 h-20 md:w-32 md:h-32 rounded-2xl md:rounded-3xl overflow-hidden flex-shrink-0">
                                    <img src="/images/member.png" class="w-full h-full object-cover"
                                        alt="Route Thumbnail" />
                                </div>

                                <!-- Route Details -->
                                <div class="flex-1 flex items-center justify-between gap-1 md:gap-2 md:pr-4 min-w-0">
                                    <!-- Origin -->
                                    <div class="flex flex-col gap-1 md:gap-2 min-w-0 flex-1">
                                        <span
                                            class="text-sm md:text-xl font-bold text-[#111847] leading-tight truncate">{{
                                                route.origin }}</span>
                                        <div class="flex flex-col text-gray-400 font-medium whitespace-nowrap">
                                            <span class="text-xs md:text-lg">08:00</span>
                                            <span class="text-[8px] md:text-xs">24 Feb 2025</span>
                                        </div>
                                    </div>

                                    <!-- SVG Timeline -->
                                    <div class="flex flex-col items-center justify-center px-1 md:px-4 w-12 md:w-24">
                                        <div class="relative w-full flex flex-col items-center">
                                            <NuxtImg src="/icons/bus-line.svg" class="w-full h-auto" alt="Bus Line" />
                                        </div>
                                    </div>

                                    <!-- Destination -->
                                    <div class="flex flex-col gap-1 md:gap-2 text-right min-w-0 flex-1">
                                        <span
                                            class="text-sm md:text-xl font-bold text-[#111847] leading-tight truncate">{{
                                                route.destination }}</span>
                                        <div class="flex flex-col text-gray-400 font-medium whitespace-nowrap">
                                            <span class="text-xs md:text-lg">12:00</span>
                                            <span class="text-[8px] md:text-xs">24 Feb 2025</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>

                <!-- Right Side: Map & Agent Card -->
                <div class="relative flex flex-col gap-6 lg:gap-0">
                    <div
                        class="h-[300px] md:h-[400px] lg:h-[600px] w-full bg-gray-200 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-inner relative group">
                        <!-- Placeholder Map Image -->
                        <img src="/images/maps.png" class="w-full h-full object-cover" />

                        <!-- Map Markers (Simulated) -->
                        <div class="absolute top-[15%] left-[20%] w-8 h-8 flex items-center justify-center">
                            <div
                                class="w-8 h-8 md:w-10 md:h-10 bg-[#111847] rounded-full rounded-bl-none rotate-[-45deg] shadow-lg flex items-center justify-center text-white border-2 border-white ring-4 md:ring-8 ring-[#111847]/10">
                                <PhosphorIcon name="bus" size="14" md-size="20" weight="bold" class="rotate-[45deg]" />
                            </div>
                        </div>
                        <div class="absolute bottom-[50%] z-50 right-[25%] w-8 h-8 flex items-center justify-center">
                            <div
                                class="w-8 h-8 md:w-10 md:h-10 bg-[#111847] rounded-full rounded-bl-none rotate-[-45deg] shadow-lg flex items-center justify-center text-white border-2 border-white ring-4 md:ring-8 ring-[#111847]/10">
                                <PhosphorIcon name="bus" size="14" md-size="20" weight="bold" class="rotate-[45deg]" />
                            </div>
                        </div>
                    </div>

                    <!-- Agent Card -->
                    <div @click="openAgentDetail"
                        class="lg:absolute lg:bottom-6 lg:left-6 lg:right-6 lg:z-10 bg-white rounded-[2rem] md:rounded-[2.5rem] p-3 md:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-row items-center gap-4 md:gap-6 border border-gray-100 lg:border-white/40 lg:backdrop-blur-sm lg:bg-white/95 cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all">
                        <!-- Agent Image with Badge -->
                        <div
                            class="relative w-24 h-24 md:w-48 md:h-44 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm flex-shrink-0">
                            <img src="/images/member.png" class="w-full h-full object-cover" />
                            <!-- Floating Badge -->
                            <div
                                class="absolute top-2 md:top-4 left-2 md:left-4 bg-white/90 backdrop-blur-md px-2 md:px-3 py-1 md:py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-white/50">
                                <PhosphorIcon name="map-pin" size="10" md-size="14" weight="fill"
                                    class="text-gray-500" />
                                <span class="text-[8px] md:text-xs font-bold text-gray-700">Jawa Tengah</span>
                            </div>
                        </div>

                        <!-- Agent Details -->
                        <div class="flex-1 space-y-2 md:space-y-4 py-1 flex flex-col justify-center">
                            <h4 class="text-sm md:text-2xl font-bold text-[#111847] leading-tight">
                                Semarang Pusat
                            </h4>
                            <div class="space-y-1 md:space-y-3">
                                <div class="flex items-start gap-2 md:gap-3">
                                    <div
                                        class="w-5 h-5 md:w-8 md:h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <PhosphorIcon name="map-pin" size="12" md-size="16" weight="bold"
                                            class="text-blue-600" />
                                    </div>
                                    <p
                                        class="text-[10px] md:text-sm text-gray-600 leading-tight md:leading-relaxed font-medium line-clamp-2 md:line-clamp-none">
                                        Jl. Tanggul Mas Tim. Raya No.138, Panggung Lor, Kec. Semarang Utara
                                    </p>
                                </div>
                                <div class="flex items-center gap-2 md:gap-3">
                                    <div
                                        class="w-5 h-5 md:w-8 md:h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <PhosphorIcon name="phone" size="12" md-size="16" weight="bold"
                                            class="text-blue-600" />
                                    </div>
                                    <p class="text-xs md:text-lg text-[#111847] font-bold">
                                        17465389207
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Detail Modal -->
            <DetailModal :is-open="isModalOpen" :agent="selectedAgent" @close="isModalOpen = false" />
        </div>
    </div>
</template>
