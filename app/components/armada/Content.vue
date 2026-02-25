<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const { buses, loading, error, fetchBuses } = useArmada()
const { t } = useI18n()

const activeBusId = ref('sleeper')
const activeBus = computed(() => buses.value.find(b => b.id === activeBusId.value) || buses.value[0])

const facilityCarousel = ref<HTMLElement | null>(null)
let scrollInterval: any = null

const startAutoSlide = () => {
    if (scrollInterval) clearInterval(scrollInterval)
    scrollInterval = setInterval(() => {
        if (!facilityCarousel.value) return

        const container = facilityCarousel.value
        const scrollAmount = 300 // Slightly more than min-w-[280px]

        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
    }, 4000)
}

const stopAutoSlide = () => {
    if (scrollInterval) clearInterval(scrollInterval)
}

onMounted(() => {
    fetchBuses()
    startAutoSlide()
})

onUnmounted(() => {
    stopAutoSlide()
})

// Restart auto-slide when bus changes
watch(activeBusId, () => {
    if (facilityCarousel.value) {
        facilityCarousel.value.scrollTo({ left: 0 })
    }
    startAutoSlide()
})

const galleryCarousel = ref<HTMLElement | null>(null)

const scrollGallery = (direction: 'prev' | 'next') => {
    if (!galleryCarousel.value) return
    const container = galleryCarousel.value
    const scrollAmount = direction === 'next' ? 200 : -200
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
}

const selectBus = (id: string) => {
    activeBusId.value = id
}

// Mobile carousel for bus selection
const mobileCarouselIndex = ref(0)

const prevBus = () => {
    mobileCarouselIndex.value = (mobileCarouselIndex.value - 1 + buses.value.length) % buses.value.length
    selectBus(buses.value[mobileCarouselIndex.value]?.id ?? '')
}

const nextBus = () => {
    mobileCarouselIndex.value = (mobileCarouselIndex.value + 1) % buses.value.length
    selectBus(buses.value[mobileCarouselIndex.value]?.id ?? '')
}

const facilityIcons: Record<string, string> = {
    'Snack': 'cookie',
    'Bantal & Selimut': 'bed',
    'DVD Player': 'disc',
    'AC': 'snowflake',
    'Telepon': 'phone-call',
    'Lampu Baca': 'lightbulb',
    'USB Charger': 'plug',
    'Reclining Seat': 'chair',
    'Leg Rest': 'intersect'
}

const facilityImages: Record<string, string> = {
    'AC': '/icons/ac.svg',
    'DVD Player': '/icons/dvd.svg',
    'Telepon': '/icons/telephone.svg',
    'USB Charger': '/icons/listrik.svg',
    'Lokasi': '/icons/location.svg'
}
</script>

<template>
    <div class="py-24 bg-gray-50">
        <div class="container mx-auto px-0 md:px-6">
            <!-- Selection Section (Floating Card) -->
            <div class="relative -mt-36 md:-mt-32 mb-16 z-20 px-6 md:px-0">
                <div
                    class="bg-white rounded-xl shadow-[0px_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 p-4 md:p-6 mx-auto max-w-6xl">

                    <!-- Mobile Carousel (single item + arrows) -->
                    <div class="flex md:hidden items-center gap-3">
                        <!-- Prev Arrow -->
                        <button @click="prevBus"
                            class="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                            <PhosphorIcon name="caret-left" size="18" weight="bold" />
                        </button>

                        <!-- Single Bus Item -->
                        <Transition name="slide-fade" mode="out-in">
                            <div :key="mobileCarouselIndex"
                                class="flex-1 flex items-center gap-4 py-4 px-5 rounded-2xl bg-[#F0F7FF] ring-1 ring-blue-100">
                                <div class="w-20 h-16 flex-shrink-0 flex items-center justify-center">
                                    <img :src="buses[mobileCarouselIndex]?.icon"
                                        class="w-full h-full object-contain scale-110" alt="Bus Icon" />
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">
                                        {{ t('fleet.selection.subtitle') }}
                                    </span>
                                    <span class="text-sm font-extrabold uppercase text-blue-900">
                                        {{ buses[mobileCarouselIndex]?.name }}
                                    </span>
                                </div>
                            </div>
                        </Transition>

                        <!-- Next Arrow -->
                        <button @click="nextBus"
                            class="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                            <PhosphorIcon name="caret-right" size="18" weight="bold" />
                        </button>
                    </div>

                    <!-- Desktop Grid (3 columns) -->
                    <div class="hidden md:grid md:grid-cols-3 gap-2">
                        <div v-for="bus in buses" :key="bus.id" @click="selectBus(bus.id)" :class="[
                            'flex items-center gap-4 py-4 px-6 rounded-2xl cursor-pointer transition-all duration-300 w-full',
                            activeBusId === bus.id ? 'bg-[#F0F7FF] ring-1 ring-blue-100' : 'hover:bg-gray-50'
                        ]">
                            <div class="w-20 h-16 flex-shrink-0 flex items-center justify-center">
                                <div class="relative w-full h-full">
                                    <img :src="bus.icon"
                                        class="w-full h-full object-contain transition-all duration-300"
                                        :class="activeBusId === bus.id ? 'scale-110' : 'opacity-40'" alt="Bus Icon" />
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">
                                    {{ t('fleet.selection.subtitle') }}
                                </span>
                                <span
                                    :class="['text-sm font-extrabold uppercase', activeBusId === bus.id ? 'text-blue-900' : 'text-gray-700']">
                                    {{ bus.name }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading && !buses.length" class="py-20">
                <ArmadaSkeleton />
            </div>

            <!-- Active Fleet Details Content -->
            <Transition v-else name="slide-fade" mode="out-in">
                <div :key="activeBusId" class="space-y-20 pb-10">
                    <!-- Header: Badge & Title -->
                    <div class="flex flex-col items-center text-center gap-6 px-6 md:px-0">
                        <div
                            class="px-4 py-2 bg-white rounded-[10px] shadow-sm border border-gray-100 inline-flex items-center gap-2">
                            <span class="text-bg-fill-primary text-sm font-semibold tracking-wide">{{ t('fleet.badge')
                            }}</span>
                        </div>
                        <div class="space-y-4">
                            <h2 class="text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
                                {{ activeBus?.name }} New Shantika
                            </h2>
                            <div class="flex flex-col items-center gap-1">
                                <div class="w-28 h-0.5 bg-blue-600 rounded-full"></div>
                                <div class="w-16 h-0.5 bg-blue-400 rounded-full opacity-60"></div>
                            </div>
                        </div>
                    </div>

                    <!-- 6-Card Stats Grid -->
                    <div class="grid grid-cols-1 gap-6 px-6 md:px-0 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                        <!-- Card 1: Medium Bus -->
                        <div
                            class="p-6 bg-white rounded-2xl shadow-[0px_7px_18px_0px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col gap-4">
                            <div class="w-14 h-14 flex items-center justify-start">
                                <img src="/icons/ic-mns_medium_bus_1.svg" class="w-full h-full object-contain"
                                    alt="Medium Bus" />
                            </div>
                            <div class="space-y-1">
                                <h4 class="text-base font-semibold text-gray-900">Medium Bus</h4>
                                <p class="text-xs text-gray-500 leading-relaxed">
                                    Armada berukuran sedang dengan kapasitas penumpang lebih fleksibel. Cocok untuk
                                    perjalanan rombongan kecil dengan kenyamanan tetap terjaga.
                                </p>
                            </div>
                        </div>

                        <!-- Card 2: Big Bus -->
                        <div
                            class="p-6 bg-white rounded-2xl shadow-[0px_7px_18px_0px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col gap-4">
                            <div class="w-14 h-14 flex items-center justify-start">
                                <img src="/icons/ic-mns_big_bus_1.svg" class="w-full h-full object-contain"
                                    alt="Big Bus" />
                            </div>
                            <div class="space-y-1">
                                <h4 class="text-base font-semibold text-gray-900">Big Bus</h4>
                                <p class="text-xs text-gray-500 leading-relaxed">
                                    Bus berkapasitas besar yang nyaman untuk perjalanan jarak jauh. Dilengkapi fasilitas
                                    lengkap untuk memberikan pengalaman perjalanan yang aman dan menyenangkan.
                                </p>
                            </div>
                        </div>

                        <!-- Card 3: Double Decker -->
                        <div
                            class="p-6 bg-white rounded-2xl shadow-[0px_7px_18px_0px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col gap-4">
                            <div class="w-14 h-14 flex items-center justify-start">
                                <img src="/icons/ic-mns_double-decker_1.svg" class="w-full h-full object-contain"
                                    alt="Double Decker" />
                            </div>
                            <div class="space-y-1">
                                <h4 class="text-base font-semibold text-gray-900">Double Decker</h4>
                                <p class="text-xs text-gray-500 leading-relaxed">
                                    Bus bertingkat dua dengan desain modern dan ruang lebih luas. Menawarkan sensasi
                                    perjalanan berbeda dengan kenyamanan premium bagi penumpang.
                                </p>
                            </div>
                        </div>

                        <!-- Card 4: Rating -->
                        <div
                            class="p-6 bg-white rounded-2xl shadow-[0px_7px_18px_0px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col gap-4">
                            <div class="w-14 h-14 flex items-center justify-start">
                                <img src="/icons/ic-mns_rating_2.svg" class="w-full h-full object-contain"
                                    alt="Rating" />
                            </div>
                            <div class="space-y-1">
                                <h4 class="text-base font-semibold text-gray-900">{{ t('fleet.labels.rating', {
                                    rating:
                                        activeBus?.rating
                                }) }}</h4>
                                <p class="text-xs text-gray-500 leading-relaxed">
                                    {{ t('fleet.labels.ratingDesc') }}
                                </p>
                            </div>
                        </div>

                        <!-- Card 5: Price -->
                        <div
                            class="p-6 bg-white rounded-2xl shadow-[0px_7px_18px_0px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col gap-4">
                            <div class="w-14 h-14 flex items-center justify-start">
                                <img src="/icons/ic-mns_price_2.svg" class="w-full h-full object-contain" alt="Price" />
                            </div>
                            <div class="space-y-1">
                                <h4 class="text-base font-semibold text-gray-900">{{ t('fleet.labels.price', {
                                    price:
                                        activeBus?.price
                                }) }}</h4>
                                <p class="text-xs text-gray-500 leading-relaxed">
                                    {{ t('fleet.labels.priceDesc') }}
                                </p>
                            </div>
                        </div>

                        <!-- Card 6: Capacity -->
                        <div
                            class="p-6 bg-white rounded-2xl shadow-[0px_7px_18px_0px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col gap-4">
                            <div class="w-14 h-14 flex items-center justify-start">
                                <img src="/icons/ic-mns_seat_1.svg" class="w-full h-full object-contain" alt="Seat" />
                            </div>
                            <div class="space-y-1">
                                <h4 class="text-base font-semibold text-gray-900">{{ t('fleet.labels.capacity', {
                                    capacity: activeBus?.capacity, bus: activeBus?.name
                                }) }}</h4>
                                <p class="text-xs text-gray-500 leading-relaxed">
                                    {{ t('fleet.labels.capacityDesc', {
                                        capacity: activeBus?.capacity, bus:
                                            activeBus?.name
                                    }) }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Facilities Section -->
                    <div class="space-y-12">
                        <h3 class="text-3xl font-bold text-center text-gray-900 px-6 md:px-0">
                            {{ t('fleet.sections.facilities.title', { bus: activeBus?.name }) }}
                        </h3>
                        <div ref="facilityCarousel" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide"
                            class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 px-6 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-5 max-w-6xl mx-auto pb-10">
                            <div v-for="facility in activeBus?.facilities.slice(0, 5)" :key="facility"
                                class="min-w-[280px] md:min-w-0 snap-center bg-white rounded-3xl p-3 shadow-sm border border-gray-100 flex flex-col gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <div
                                    class="w-full aspect-square rounded-2xl bg-gradient-to-r from-blue-50 to-blue-500/20 flex items-center justify-center relative overflow-hidden">
                                    <img src="/icons/aboutcard.svg"
                                        class="absolute -bottom-10 w-full h-full object-contain pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                                    <div class="relative z-10 w-20 h-20 flex items-center justify-center text-blue-900">
                                        <template v-if="facilityImages[facility]">
                                            <NuxtImg :src="facilityImages[facility]"
                                                class="w-full h-full object-contain" />
                                        </template>
                                        <template v-else>
                                            <PhosphorIcon :name="facilityIcons[facility] || 'sparkle'" size="44"
                                                weight="duotone" />
                                        </template>
                                    </div>
                                </div>
                                <div class="space-y-2 pb-2 px-2">
                                    <h5 class="font-bold text-gray-900 text-lg tracking-tight">{{ facility }}</h5>
                                    <p class="text-sm text-gray-500 leading-relaxed">
                                        Layanan standar {{ activeBus?.class }} untuk kenyamanan Anda.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Additional Information & Gallery -->
                    <div class="space-y-12 px-6 md:px-0">
                        <div class="max-w-4xl mx-auto text-center space-y-6">
                            <h3 class="text-3xl font-bold text-gray-900">
                                {{ t('fleet.sections.additional.title') }}
                            </h3>
                            <p class="text-gray-500 text-lg leading-relaxed">
                                {{ t('fleet.sections.additional.content', {
                                    bus: activeBus?.name, capacity:
                                        activeBus?.capacity
                                }) }}
                            </p>
                        </div>

                        <!-- Mini Gallery with Navigation -->
                        <div class="relative max-w-6xl mx-auto group/gallery pb-10">
                            <!-- Prev Button -->
                            <button @click="scrollGallery('prev')"
                                class="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all">
                                <PhosphorIcon name="caret-left" size="18" weight="bold" />
                            </button>

                            <!-- Next Button -->
                            <button @click="scrollGallery('next')"
                                class="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all">
                                <PhosphorIcon name="caret-right" size="18" weight="bold" />
                            </button>

                            <div ref="galleryCarousel"
                                class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3 px-6 scroll-smooth py-10 md:grid md:grid-cols-4 md:gap-6 md:px-0 md:overflow-visible md:py-16">
                                <div v-for="(img, index) in activeBus?.gallery" :key="index" :class="[
                                    'w-[calc((100%-24px)/3)] md:w-auto md:min-w-0 md:h-96 aspect-[1/2] md:aspect-auto rounded-xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group relative snap-start flex-shrink-0',
                                    index % 2 !== 0 ? 'translate-y-6 md:translate-y-8' : '-translate-y-6 md:-translate-y-8'
                                ]">
                                    <img :src="img"
                                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        alt="Gallery Image" />
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <span class="text-white font-medium text-sm">Interior / Exterior {{
                                            activeBus?.name }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.slide-fade-enter-active {
    transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>
