<script setup lang="ts">
const { t, tm, rt } = useI18n()

const features = tm('appPromo.features') as string[]
</script>

<template>
    <section class="w-full py-20 md:py-32 bg-[#FAFAFA] overflow-hidden relative">
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                <!-- Left: App Mockup -->
                <div class="w-full lg:w-1/2 flex justify-center items-center relative py-12 lg:py-0">
                    <div class="relative z-10 w-full max-w-[450px] md:max-w-[650px]">
                        <NuxtImg src="/images/mockup.png" class="w-full h-auto" alt="Shantika App Promo" />
                    </div>
                </div>

                <!-- Right: Content -->
                <div class="w-full lg:w-1/2">
                    <div class="max-w-xl mx-auto lg:mx-0">
                        <i18n-t keypath="appPromo.title" tag="h2"
                            class="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#0A1131] leading-[1.1] mb-6">
                            <template #highlight>
                                <span class="text-[#141B4D]">{{ t('appPromo.highlight') }}</span>
                            </template>
                        </i18n-t>

                        <p class="text-gray-400 text-base md:text-lg mb-10 leading-relaxed max-w-lg">
                            {{ t('appPromo.subtitle') }}
                        </p>

                        <!-- Feature List -->
                        <ul class="space-y-6 mb-12">
                            <li v-for="(feature, index) in features" :key="index" class="flex items-start gap-4">
                                <div class="flex-shrink-0 mt-0.5">
                                    <div class="bg-[#108B18] rounded-full p-0.5">
                                        <PhosphorIcon name="check" weight="bold" class="text-white text-base" />
                                    </div>
                                </div>
                                <span class="text-[#0A1131] font-medium text-base md:text-lg leading-snug">
                                    {{ rt(feature) }}
                                </span>
                            </li>
                        </ul>

                        <!-- Download Button -->
                        <div class="flex flex-wrap gap-4">
                            <NuxtLink to="#" class="inline-block transition-all hover:scale-105 active:scale-95">
                                <NuxtImg src="/images/Googleplay.png" class="h-12 w-auto object-contain"
                                    alt="Get it on Google Play" />
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Optional: Fine-tune the background circles if needed */
</style>
