<script setup lang="ts">
interface AboutFeature {
    title: string
    description: string
    icon: string
}

defineProps<{
    item: AboutFeature
}>()

// Mapping for local icons to ensure we only use specific files
const iconMap: Record<string, string> = {
    'disc': '/icons/dvd.svg',
    'map-pin': '/icons/location.svg',
    'snowflake': '/icons/ac.svg',
    'phone-call': '/icons/telephone.svg',
    'plug': '/icons/listrik.svg'
}
</script>

<template>
    <div
        class="min-w-[260px] md:min-w-0 bg-white rounded-3xl p-3 shadow-sm border border-gray-100 flex flex-col gap-6 snap-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div
            class="w-full aspect-square rounded-2xl bg-gradient-to-r from-blue-50 to-blue-500/20 flex items-center justify-center relative overflow-hidden group">

            <!-- SVG Background -->
            <NuxtImg src="/icons/aboutcard.svg"
                class="absolute -bottom-10 w-full h-full object-contain pointer-events-none group-hover:scale-110 transition-transform duration-500" />

            <!-- Placeholder for Local Icon SVG -->
            <div class="relative z-10 w-20 h-20 flex items-center justify-center">
                <NuxtImg :src="iconMap[item.icon] || '/icons/placeholder-icon.svg'" alt="Icon"
                    class="w-full h-full object-contain" />
            </div>
        </div>

        <!-- Content -->
        <div class="space-y-2">
            <h3 class="font-bold text-gray-900 text-lg">
                {{ item.title }}
            </h3>
            <p class="text-sm text-gray-500 leading-relaxed line-clamp-3">
                {{ item.description }}
            </p>
        </div>
    </div>
</template>
