<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
    <section class="relative w-full overflow-hidden" style="min-height: 100vh;">
        <div class="absolute inset-0 bg-sky-300">
            <NuxtImg src="/images/blue-sky-clouds (1) 1.png" alt="" class="w-full h-full object-cover object-center"
                aria-hidden="true" format="webp" quality="80" />
        </div>
        <div class="absolute inset-0 bg-black/10" aria-hidden="true" />
        <div class="relative z-10 flex flex-col items-center px-6 pt-20 pb-4 min-h-[92vh]">
            <p class="text-white font-semibold italic text-base md:text-lg tracking-wide mb-2 drop-shadow">
                {{ t('hero.tagline') }}
            </p>

            <!-- Brand Sandwich -->
            <div class="relative w-full flex-1 flex flex-col items-center justify-start">

                <!-- Layer 1: Solid Brand name (Behind) -->
                <div class="relative w-full max-w-7xl mx-auto px-4 flex justify-center">
                    <h1 class="font-black text-white text-center leading-none tracking-tight z-0 select-none pt-4 w-full"
                        style="font-size: clamp(2.5rem, 10vw, 10rem);">
                        NEW SHANTIKA
                    </h1>
                </div>

                <!-- Layer 2: Bus image (Middle - Full-width container to allow overflow) -->
                <div
                    class="absolute inset-0 z-10 w-full flex justify-center pt-32 md:pt-20 pointer-events-none overflow-visible">
                    <NuxtImg src="/images/bus-img-removebg-preview 1.png" alt="Armada Bus New Shantika"
                        class="w-[180vw] md:w-[200vh] translate-x-36 md:translate-x-0 max-w-none md:max-w-[1400px] object-contain drop-shadow-2xl select-none"
                        draggable="false" format="webp" quality="85" />
                </div>

                <!-- Layer 3: Outline Brand name (Front - In its own centered wrapper) -->
                <div class="absolute inset-x-0 top-0 z-20 pointer-events-none flex justify-center">
                    <div class="w-full max-w-7xl mx-auto px-4 flex justify-center">
                        <h1 class="font-black text-center leading-none tracking-tight select-none pt-4 w-full"
                            style="font-size: clamp(2.5rem, 10vw, 10rem); color: transparent; -webkit-text-stroke: 1.5px white; filter: drop-shadow(0 0 1px white);">
                            NEW SHANTIKA
                        </h1>
                    </div>
                </div>
            </div>

            <!-- Bottom Cards -->
            <div
                class="absolute bottom-6 left-6 right-6 z-30 md:left-auto md:right-10 md:bottom-8 flex flex-col gap-4 w-auto md:w-full md:max-w-[440px]">
                <!-- Stats card -->
                <div
                    class="bg-white rounded-2xl md:rounded-3xl px-4 py-2.5 md:px-5 md:py-3 flex items-center gap-3 md:gap-4 shadow-xl self-start w-full">
                    <!-- Avatar placeholders -->
                    <div class="flex -space-x-3 shrink-0">
                        <div
                            class="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden bg-blue-100">
                            <NuxtImg src="/icons/Jaxon Maddox.svg" alt=""
                                class="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div
                            class="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden bg-pink-100">
                            <NuxtImg src="/icons/Jaxon Maddox.svg" alt=""
                                class="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div
                            class="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden bg-yellow-100">
                            <NuxtImg src="/icons/Jaxon Maddox.svg" alt=""
                                class="w-full h-full object-cover" loading="lazy" />
                        </div>
                    </div>
                    <div>
                        <p class="font-bold text-gray-900 text-sm md:text-lg leading-tight">{{ t('hero.statsCount') }}
                        </p>
                        <p class="text-[10px] md:text-sm text-gray-500 font-medium leading-snug">{{ t('hero.statsLabel')
                        }}</p>
                    </div>
                </div>

                <!-- Description + buttons card (Glassmorphism) -->
                <div
                    class="bg-white/30 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl border border-white/50">
                    <p class="text-sm md:text-lg text-white font-medium leading-relaxed mb-4 md:mb-6 drop-shadow-sm">
                        {{ t('hero.description') }}
                    </p>
                    <div class="flex items-center gap-3 md:gap-4">
                        <!-- Lihat Armada -->
                        <NuxtLink :to="localePath('/armada')"
                            class="flex-1 inline-flex items-center justify-center gap-1.5 md:gap-2 bg-[#0A1131] hover:bg-[#060a1f] text-white text-xs md:text-base font-bold rounded-xl md:rounded-2xl px-3 py-2.5 md:px-6 md:py-3.5 transition-all shadow-lg active:scale-95">
                            {{ t('hero.ctaFleet') }}
                            <PhosphorIcon name="arrow-right" weight="bold" :size="16" />
                        </NuxtLink>

                        <!-- Tonton Video -->
                        <button
                            class="flex-1 inline-flex items-center justify-center gap-1.5 md:gap-2 bg-white hover:bg-gray-50 text-[#0A1131] text-xs md:text-base font-bold rounded-xl md:rounded-2xl px-3 py-2.5 md:px-6 md:py-3.5 transition-all shadow-lg active:scale-95">
                            {{ t('hero.ctaVideo') }}
                            <PhosphorIcon name="play" weight="bold" :size="18" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
