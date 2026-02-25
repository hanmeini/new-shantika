<script setup lang="ts">
const { t, tm, rt } = useI18n()

interface AboutFeature {
    title: string
    description: string
    icon: string
}

const aboutFeatures = tm('about.features') as AboutFeature[]
</script>

<template>
    <section class="w-full py-16 md:py-24 bg-gray-50/50 overflow-hidden">
        <div class="container mx-auto px-6">
            <!-- Header -->
            <div class="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                <h2 class="text-3xl md:text-4xl font-normal text-gray-900 mb-6 leading-tight">
                    {{ t('about.titlePrefix') }}
                    <span class="relative inline-block font-semibold">
                        {{ t('about.titleHighlight') }}
                        <!-- Decorative double underline -->
                        <div class="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#061148] rounded-full"></div>
                        <div class="absolute -bottom-3 left-[15%] w-2/3 h-[2px] bg-[#061148] rounded-full -rotate-1">
                        </div>
                    </span>
                    {{ t('about.titleSuffix') }}
                </h2>
                <p class="text-gray-600 leading-relaxed text-sm md:text-base">
                    {{ t('about.description') }}
                </p>
            </div>

            <!-- Features Cards - Horizontal Scroll on Mobile, Grid on Desktop -->
            <div
                class="-mx-6 px-6 flex overflow-x-auto pb-8 md:pb-0 md:mx-0 md:px-0 md:grid md:grid-cols-5 gap-6 snap-x no-scrollbar">
                <LandingAboutCard v-for="(item, index) in aboutFeatures" :key="index" :item="{
                    title: rt(item.title),
                    description: rt(item.description),
                    icon: rt(item.icon)
                }" />
            </div>
        </div>
    </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
