<script setup lang="ts">
const props = defineProps({
    error: Object
})

const { t, te } = useI18n()

const handleError = () => clearError({ redirect: '/' })

// Determine status code
const is404 = computed(() => props.error?.statusCode === 404)

// Helper for translations with fallbacks
const translate = (key: string, fallback: string) => {
    try {
        return te(key) ? t(key) : fallback
    } catch (e) {
        return fallback
    }
}
</script>

<template>
    <div class="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 font-['Urbanist']">
        <!-- Subtle Pattern Overlay -->
        <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
            style="background-image: url('/images/pattern.png'); background-size: 400px;"></div>

        <div class="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
            <!-- Brand Logo -->
            <img src="/images/New Shantika Logo.png" alt="New Shantika" class="h-12 md:h-16 w-auto mb-12" />

            <!-- Error Icon Container -->
            <div
                class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-10 border border-gray-100 shadow-sm">
                <PhosphorIcon :name="is404 ? 'magnifying-glass' : 'warning-circle'" size="44" weight="bold"
                    class="text-[#0A1131]" />
            </div>

            <!-- Error Heading -->
            <div class="space-y-4 mb-12">
                <h1 class="text-6xl md:text-8xl font-black text-[#0A1131] tracking-tighter">
                    {{ error?.statusCode || '404' }}
                </h1>
                <h2 class="text-xl md:text-2xl font-bold text-[#0A1131] uppercase tracking-wide">
                    {{ is404 ? translate('errors.404.title', 'Halaman Tidak Ditemukan') : translate('errors.500.title',
                    'Gangguan Teknis') }}
                </h2>
                <p class="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-xs mx-auto">
                    {{ is404 ? translate('errors.404.message', 'Maaf, rute atau halaman yang Anda cari tidak tersedia saat ini.') : translate('errors.500.message', 'Terjadi sedikit kendala pada sistem kami.Silakan coba beberapa saat lagi.') }}
                </p>
            </div>

            <!-- Professional Actions -->
            <div class="flex flex-col sm:flex-row gap-4 w-full max-w-sm px-4">
                <button @click="handleError"
                    class="flex-1 px-8 py-4 bg-[#0A1131] hover:bg-[#111847] text-white font-bold rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
                    <PhosphorIcon name="house" size="20" weight="bold" />
                    {{ translate('errors.backHome', 'Beranda') }}
                </button>
                <NuxtLink to="/contact"
                    class="flex-1 px-8 py-4 bg-white hover:bg-gray-50 text-[#0A1131] border-2 border-gray-100 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95">
                    <PhosphorIcon name="headset" size="20" weight="bold" />
                    {{ translate('errors.contactSupport', 'Bantuan') }}
                </NuxtLink>
            </div>
        </div>

        <!-- Minimal Branding Footer -->
        <div class="absolute bottom-12 text-gray-300 text-[10px] font-bold tracking-[0.3em] uppercase">
            Official New Shantika
        </div>
    </div>
</template>

<style scoped>
/* Override default Nuxt error styles if any */
:deep(body) {
    background-color: white !important;
    color: #0A1131 !important;
}
</style>
