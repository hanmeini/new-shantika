<script setup lang="ts">
const { t } = useI18n()

const depCity = ref('Semarang')
const destCity = ref('Jakarta')
const date = ref('24 Feb 2025')

const isDepOpen = ref(false)
const isDestOpen = ref(false)

const depRef = ref<HTMLElement | null>(null)
const destRef = ref<HTMLElement | null>(null)

const cities = ['Semarang', 'Jakarta', 'Bandung', 'Kudus', 'Surabaya', 'Yogyakarta']

const dateInputRef = ref<HTMLInputElement | null>(null)

const handleSearch = () => {
    console.log('Search:', { departure: depCity.value, destination: destCity.value, date: date.value })
}

const openDatePicker = () => {
    dateInputRef.value?.showPicker()
}

const handleDateChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.value) {
        const d = new Date(target.value)
        const day = d.getDate()
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const month = monthNames[d.getMonth()]
        const year = d.getFullYear()
        date.value = `${day} ${month} ${year}`
    }
}

const selectDeparture = (city: string) => {
    depCity.value = city
    isDepOpen.value = false
}

const selectDestination = (city: string) => {
    destCity.value = city
    isDestOpen.value = false
}

onMounted(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (depRef.value && !depRef.value.contains(event.target as Node)) {
            isDepOpen.value = false
        }
        if (destRef.value && !destRef.value.contains(event.target as Node)) {
            isDestOpen.value = false
        }
    }
    document.addEventListener('mousedown', handleClickOutside)
    onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
})
</script>

<template>
    <div class="relative w-full h-[600px] flex items-center">
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/rutehero.png" class="w-full h-full object-cover" alt="Route Hero Background" />
            <div class="absolute inset-0 bg-black/40"></div>
        </div>

        <div class="container mx-auto px-6 relative z-10 text-white space-y-8">
            <div class="max-w-3xl space-y-4">
                <h1 class="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                    {{ t('routesPage.hero.title') }}
                </h1>
                <p class="text-lg md:text-xl font-light opacity-90 max-w-2xl">
                    {{ t('routesPage.hero.subtitle') }}
                </p>
            </div>

            <!-- Search Bar -->
            <div
                class="max-w-6xl bg-white/10 backdrop-blur-md rounded-3xl p-3 md:p-4 border border-white/20 shadow-2xl">
                <div
                    class="grid grid-cols-2 md:flex md:flex-row items-stretch md:items-center gap-2 md:gap-4 font-inter">
                    <!-- Departure -->
                    <div ref="depRef" class="relative group md:flex-1">
                        <button @click="isDepOpen = !isDepOpen"
                            class="w-full bg-white rounded-2xl px-4 py-2.5 md:py-3 flex items-center justify-between transition-all hover:bg-gray-50 border border-transparent"
                            :class="{ 'ring-2 ring-blue-500 border-blue-500': isDepOpen }">
                            <div class="flex flex-col text-left">
                                <span
                                    class="text-[9px] md:text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                                    {{ t('routesPage.hero.departure') }}
                                </span>
                                <div class="text-sm font-semibold text-gray-900 line-clamp-1">{{ depCity }}</div>
                            </div>
                            <PhosphorIcon name="caret-down" size="16"
                                class="text-gray-400 ml-2 flex-shrink-0 transition-transform"
                                :class="{ 'rotate-180': isDepOpen }" />
                        </button>

                        <!-- Dropdown -->
                        <Transition name="fade">
                            <div v-if="isDepOpen"
                                class="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] py-2">
                                <div class="px-4 py-2 text-[9px] uppercase tracking-wider text-gray-400 font-extrabold">
                                    {{ t('routesPage.hero.departure') }}
                                </div>
                                <button v-for="city in cities" :key="city" @click="selectDeparture(city)"
                                    class="w-full px-4 py-3 text-left flex items-center gap-3 transition-colors hover:bg-blue-50 group/item text-sm">
                                    <PhosphorIcon name="map-pin" size="18" weight="bold"
                                        class="text-gray-300 group-hover/item:text-blue-500 transition-colors" />
                                    <span class="flex-1 text-gray-600 font-medium group-hover/item:text-blue-700">{{
                                        city }}</span>
                                </button>
                            </div>
                        </Transition>
                    </div>

                    <!-- Destination -->
                    <div ref="destRef" class="relative group md:flex-1">
                        <button @click="isDestOpen = !isDestOpen"
                            class="w-full bg-white rounded-2xl px-4 py-2.5 md:py-3 flex items-center justify-between transition-all hover:bg-gray-50 border border-transparent"
                            :class="{ 'ring-2 ring-blue-500 border-blue-500': isDestOpen }">
                            <div class="flex flex-col text-left flex-1 min-w-0">
                                <span
                                    class="text-[9px] md:text-[10px] uppercase tracking-wider text-gray-400 font-bold truncate">
                                    {{ t('routesPage.hero.destination') }}
                                </span>
                                <div class="text-sm font-semibold text-gray-900 line-clamp-1">{{ destCity }}</div>
                            </div>
                            <div class="flex items-center gap-1.5 flex-shrink-0 ml-2">
                                <PhosphorIcon name="caret-down" size="16" class="text-gray-400 transition-transform"
                                    :class="{ 'rotate-180': isDestOpen }" />
                                <div class="w-px h-6 bg-gray-100 mx-1 hidden md:block"></div>
                                <PhosphorIcon name="arrows-left-right" size="18" weight="bold"
                                    class="text-blue-900 hover:scale-110 transition-transform" />
                            </div>
                        </button>

                        <!-- Dropdown -->
                        <Transition name="fade">
                            <div v-if="isDestOpen"
                                class="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] py-2">
                                <div
                                    class="px-4 py-2 text-[9px] uppercase tracking-wider text-gray-400 font-extrabold text-right">
                                    {{ t('routesPage.hero.destination') }}
                                </div>
                                <button v-for="city in cities" :key="city" @click="selectDestination(city)"
                                    class="w-full px-4 py-3 text-left flex items-center gap-3 transition-colors hover:bg-blue-50 group/item text-sm">
                                    <PhosphorIcon name="map-pin" size="18" weight="bold"
                                        class="text-gray-300 group-hover/item:text-blue-500 transition-colors" />
                                    <span class="flex-1 text-gray-600 font-medium group-hover/item:text-blue-700">{{
                                        city }}</span>
                                </button>
                            </div>
                        </Transition>
                    </div>

                    <!-- Date Selection -->
                    <div @click="openDatePicker"
                        class="relative bg-white rounded-2xl px-4 py-2.5 md:py-3 flex items-center justify-between group md:flex-1 cursor-pointer hover:bg-gray-50 transition-colors">
                        <div class="flex flex-col text-left">
                            <span class="text-[9px] md:text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                                {{ t('routesPage.hero.date') }}
                            </span>
                            <div class="text-sm font-semibold text-gray-900">{{ date }}</div>
                        </div>
                        <PhosphorIcon name="calendar-blank" size="18" weight="bold"
                            class="text-blue-900 ml-2 flex-shrink-0" />

                        <!-- Hidden Date Input -->
                        <input ref="dateInputRef" type="date"
                            class="absolute inset-0 opacity-0 cursor-pointer pointer-events-none"
                            @change="handleDateChange" />
                    </div>

                    <!-- Search Button -->
                    <button @click="handleSearch"
                        class="bg-blue-900 hover:bg-blue-950 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95 flex-shrink-0 text-sm md:text-base border border-blue-800/20">
                        {{ t('routesPage.hero.search') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Glassmorphism effect refinements */
.backdrop-blur-md {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
}

/* Dropdown Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
}
</style>
