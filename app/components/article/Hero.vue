<script setup lang="ts">
const { t } = useI18n()

const scrollToArticles = () => {
    const el = document.getElementById('latest-articles')
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>

<template>
    <section class="relative w-full h-[700px] md:min-h-screen overflow-hidden flex items-center justify-center">
        <!-- Background with Overlay -->
        <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/blue-sky-clouds (1) 1.png" class="w-full h-full object-cover"
                alt="Articles Background" />
            <div class="absolute inset-0 bg-black/40"></div>
        </div>

        <div class="relative z-10 container mx-auto px-6 text-center">
            <div class="max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-12">
                <!-- Title & Subtitle -->
                <div class="space-y-4 md:space-y-6">
                    <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
                        {{ t('articlesPage.hero.title') }}
                    </h1>
                    <p class="text-lg md:text-2xl font-semibold text-white/90 max-w-3xl mx-auto leading-relaxed">
                        {{ t('articlesPage.hero.subtitle') }}
                    </p>
                </div>

                <!-- Search Bar -->
                <div class="w-full max-w-[520px]">
                    <div class="relative group">
                        <input type="text" :placeholder="t('articlesPage.hero.searchPlaceholder')"
                            class="w-full px-6 py-4 md:py-5 bg-white rounded-2xl md:rounded-[20px] text-gray-800 placeholder-gray-400 focus:outline-none shadow-2xl transition-all" />
                        <div class="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
                            <PhosphorIcon name="magnifying-glass" weight="bold" size="24" />
                        </div>
                    </div>
                </div>

                <!-- Floating Stats Card (In-flow on mobile, absolute on desktop) -->
                <div
                    class="flex bg-white p-4 rounded-2xl shadow-2xl flex-col gap-4 md:animate-bounce-subtle mx-auto md:absolute md:-bottom-36 md:right-0 md:mx-0">
                    <div class="flex items-center justify-between gap-8 px-2">
                        <span class="text-2xl font-bold text-[#0A1131]">{{ t('articlesPage.hero.statsCount') }}</span>
                        <span class="text-sm font-medium text-gray-500">{{ t('articlesPage.hero.statsLabel') }}</span>
                    </div>
                    <div class="flex gap-2">
                        <NuxtImg src="/images/video.png" class="w-24 h-20 object-cover rounded-lg" />
                        <NuxtImg src="/images/member.png" class="w-24 h-20 object-cover rounded-lg" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Explore Button -->
        <button @click="scrollToArticles"
            class="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white font-medium hover:text-white/80 transition-colors group">
            <PhosphorIcon name="arrow-down" weight="bold" class="group-hover:translate-y-1 transition-transform" />
            <span>{{ t('articlesPage.hero.explore') }}</span>
        </button>
    </section>
</template>

<style scoped>
@keyframes bounce-subtle {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.animate-bounce-subtle {
    animation: bounce-subtle 4s ease-in-out infinite;
}
</style>
