<script setup lang="ts">
const props = defineProps<{
    isOpen: boolean
    agent: {
        name: string
        address: string
        phone: string
        hours: string
        image: string
        facilities: Array<{
            title: string
            description: string
            image: string
        }>
    } | null
}>()

const emit = defineEmits(['close'])

const modalRef = ref<HTMLElement | null>(null)

// Click Outside Logic
onMounted(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
            emit('close')
        }
    }
    // Use a small timeout to avoid capturing the opening click event
    setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
    }, 100)

    onUnmounted(() => {
        document.removeEventListener('mousedown', handleClickOutside)
    })
})

const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') emit('close')
}

onMounted(() => {
    window.addEventListener('keydown', closeOnEsc)
})

onUnmounted(() => {
    window.removeEventListener('keydown', closeOnEsc)
})
</script>

<template>
    <Transition name="fade-overlay">
        <div v-if="props.isOpen"
            class="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm overflow-y-auto flex justify-center p-4 md:p-12 scrollbar-hide">
            <Transition name="slide-up">
                <div v-if="props.isOpen" ref="modalRef"
                    class="w-full max-w-3xl h-fit bg-white rounded-[2rem] shadow-2xl relative flex flex-col gap-6 p-5 md:p-8 my-auto">

                    <!-- Close Button -->
                    <button @click="emit('close')"
                        class="absolute top-6 right-6 z-50 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-gray-100 hover:bg-gray-50 transition-all active:scale-90">
                        <PhosphorIcon name="x" size="20" weight="bold" class="text-gray-600" />
                    </button>

                    <!-- Agent Banner -->
                    <div class="w-full h-48 md:h-80 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                        <img :src="agent?.image || 'https://placehold.co/719x359'" class="w-full h-full object-cover"
                            alt="Agent Banner" />
                    </div>

                    <!-- Title & Badge -->
                    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                        <h2 class="text-2xl md:text-3xl font-bold text-[#111847] text-center md:text-left">
                            {{ agent?.name || 'Semarang Pusat Kota' }}
                        </h2>
                        <div
                            class="px-4 py-1.5 bg-blue-50 rounded-full flex items-center gap-1.5 border border-blue-100 shadow-sm whitespace-nowrap">
                            <PhosphorIcon name="seal-check" size="18" weight="fill" class="text-blue-600" />
                            <span class="text-sm font-bold text-blue-700">Official Agent</span>
                        </div>
                    </div>

                    <!-- Info Sections -->
                    <div class="grid grid-cols-1 gap-4 md:gap-5">
                        <!-- Address -->
                        <div
                            class="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 shadow-[inset_0px_1px_0px_rgba(213,215,218,0.5)]">
                            <div
                                class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                                <PhosphorIcon name="map-pin" size="24" weight="bold" class="text-orange-600" />
                            </div>
                            <div class="flex-1">
                                <h4 class="text-sm font-bold text-[#111847]">Alamat Agen</h4>
                                <p class="text-xs text-gray-500 leading-relaxed font-medium">
                                    {{ agent?.address || 'Jl. Tanggul Mas Tim. Raya No.138, Panggung Lor, Kec. Semarang Utara, Kota Semarang, Jawa Tengah 50176' }}
                                </p>
                            </div>
                        </div>

                        <!-- Phone -->
                        <div
                            class="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 shadow-[inset_0px_1px_0px_rgba(213,215,218,0.5)]">
                            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                <PhosphorIcon name="phone" size="24" weight="bold" class="text-blue-600" />
                            </div>
                            <div class="flex-1">
                                <h4 class="text-sm font-bold text-[#111847]">No. Telepon</h4>
                                <p class="text-xs text-gray-500 font-medium">{{ agent?.phone || '09762527837' }}</p>
                            </div>
                        </div>

                        <!-- Hours -->
                        <div
                            class="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 shadow-[inset_0px_1px_0px_rgba(213,215,218,0.5)]">
                            <div
                                class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                                <PhosphorIcon name="clock" size="24" weight="bold" class="text-green-600" />
                            </div>
                            <div class="flex-1">
                                <h4 class="text-sm font-bold text-[#111847]">Jam Operasional</h4>
                                <p class="text-xs text-gray-500 font-medium">{{ agent?.hours || 'Open 24 Hours' }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Facilities -->
                    <div class="space-y-4">
                        <div class="space-y-1">
                            <h3 class="text-xl font-bold text-[#111847]">Fasilitas</h3>
                            <p class="text-sm text-gray-500">Nikmati berbagai fasilitas pendukung yang kami sediakan
                                untuk menambah kenyamanan Anda.</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            <div v-for="(facility, idx) in (agent?.facilities || [
                                { title: 'Pemadam Kebakaran', description: 'Area tunggu yang nyaman dengan kursi memadai.', image: 'https://placehold.co/224x150' },
                                { title: 'Palu Pemecah Kaca', description: 'Tersedia toilet bersih and terawat.', image: 'https://placehold.co/224x150' },
                                { title: 'Lahan Parkir', description: 'Lahan parkir luas and aman.', image: 'https://placehold.co/224x150' }
                            ])" :key="idx"
                                class="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                                <img :src="facility.image" class="w-full h-32 md:h-36 object-cover" />
                                <div class="p-3 flex flex-col gap-1">
                                    <h5 class="text-base font-bold text-blue-900 leading-tight">{{ facility.title }}
                                    </h5>
                                    <p class="text-xs text-gray-500 leading-relaxed line-clamp-2">{{
                                        facility.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Map Area -->
                    <div
                        class="relative w-full h-40 md:h-56 rounded-2xl overflow-hidden shadow-inner bg-gray-100 border border-gray-200">
                        <img src="/images/maps.png" class="w-full h-full object-cover grayscale-[0.5]" />
                        <button
                            class="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-lg shadow-xl border border-gray-100 flex items-center gap-2 text-sm font-bold text-[#111847] hover:bg-gray-50 transition-all active:scale-95">
                            Lihat Di Maps
                            <PhosphorIcon name="arrow-square-out" size="16" weight="bold" />
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.fade-overlay-enter-active,
.fade-overlay-leave-active {
    transition: opacity 0.3s ease;
}

.fade-overlay-enter-from,
.fade-overlay-leave-to {
    opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>
