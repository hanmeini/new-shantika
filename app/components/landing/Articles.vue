<script setup lang="ts">
const { t } = useI18n()
const { articles } = useArticles()

// Adjust dummy data to identify featured and secondary
const featuredArticle = computed(() => articles.value.find((_, index) => index === 0))
const secondaryArticles = computed(() => articles.value.filter((_, index) => index !== 0))

// Mapping for category colors
const categoryColors: Record<string, string> = {
    'Tips & Trik': 'bg-[#141B4D]',
    'Armada': 'bg-[#108B18]',
    'Rute': 'bg-[#990C21]'
}
</script>

<template>
    <section class="w-full py-16 md:py-24 bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col lg:flex-row gap-12 lg:gap-16">

                <!-- Left: Title & Secondary Articles -->
                <div class="w-full lg:w-[45%] flex flex-col">
                    <div class="mb-10 lg:mb-12">
                        <i18n-t keypath="articles.title" tag="h2"
                            class="text-4xl md:text-5xl font-bold text-[#0A1131] leading-[1.2] mb-6">
                            <template #highlight>
                                <span class="relative inline-block px-2 py-1 isolate">
                                    <!-- Brush Background Placeholder -->
                                    <NuxtImg src="/icons/backtext.svg"
                                        class="absolute inset-0 w-full h-full object-fill -z-10 scale-x-150 translate-y-1"
                                        aria-hidden="true" />
                                    <span class="text-white italic relative z-10 whitespace-nowrap">{{
                                        t('articles.highlight') }}</span>
                                </span>
                            </template>
                        </i18n-t>
                        <p class="text-gray-500 text-base md:text-lg max-w-md">
                            {{ t('articles.subtitle') }}
                        </p>
                    </div>

                    <!-- Secondary Articles (Desktop) -->
                    <div class="hidden lg:flex flex-col gap-6">
                        <div v-for="item in secondaryArticles" :key="item.id"
                            class="flex gap-6 p-4 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                            <div class="w-40 h-40 flex-shrink-0 overflow-hidden rounded-xl">
                                <NuxtImg :src="item.thumbnail"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    format="webp" />
                            </div>
                            <div class="flex flex-col justify-center py-1">
                                <span class="self-start px-3 py-1 rounded-full text-[10px] font-bold text-white mb-2"
                                    :class="categoryColors[item.category] || 'bg-gray-400'">
                                    {{ item.category }}
                                </span>
                                <h4 class="font-bold text-[#0A1131] text-base mb-1 line-clamp-2 leading-snug">
                                    {{ item.title }}
                                </h4>
                                <p class="text-gray-500 text-xs mb-2 line-clamp-2 leading-relaxed">
                                    {{ item.excerpt }}
                                </p>
                                <p class="text-gray-400 text-[10px]">{{ item.publishedAt }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Featured Article -->
                <div class="w-full lg:w-[45%]">
                    <div v-if="featuredArticle" class="h-full">
                        <div
                            class="bg-white rounded-xl border border-gray-100 p-3 flex flex-col group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                            <div class="w-full h-[280px] md:h-[400px] flex justify-center mb-4">
                                <div class="h-full w-full overflow-hidden rounded-lg">
                                    <NuxtImg :src="featuredArticle.thumbnail"
                                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        format="webp" />
                                </div>
                            </div>
                            <div class="flex flex-col flex-1 gap-3 px-6 pb-6 pt-2">
                                <span class="px-5 py-2 rounded-xl text-xs font-bold text-white w-fit"
                                    :class="categoryColors[featuredArticle.category]">
                                    {{ featuredArticle.category }}
                                </span>
                                <h3
                                    class="text-2xl md:text-3xl font-bold text-[#0A1131] leading-snug transition-colors">
                                    {{ featuredArticle.title }}
                                </h3>
                                <p class="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-3">
                                    {{ featuredArticle.excerpt }}
                                </p>
                                <div class="mt-auto pt-4 flex items-center justify-between">
                                    <span class="text-gray-400 text-sm">{{ featuredArticle.publishedAt }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Secondary Articles (Mobile) -->
                <div class="flex flex-col lg:hidden gap-6">
                    <div v-for="item in secondaryArticles" :key="item.id"
                        class="flex gap-4 p-3 rounded-3xl border border-gray-100 shadow-sm">
                        <div class="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-2xl">
                            <NuxtImg :src="item.thumbnail" class="w-full h-full object-cover" />
                        </div>
                        <div class="flex flex-col justify-center">
                            <span class="self-start px-2 py-0.5 rounded-full text-[8px] font-bold text-white mb-1"
                                :class="categoryColors[item.category]">
                                {{ item.category }}
                            </span>
                            <h4 class="font-bold text-[#0A1131] text-sm mb-0.5 line-clamp-1">
                                {{ item.title }}
                            </h4>
                            <p class="text-gray-500 text-[10px] mb-1 line-clamp-2 leading-tight">
                                {{ item.excerpt }}
                            </p>
                            <p class="text-gray-400 text-[8px]">{{ item.publishedAt }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer CTA -->
            <div class="mt-12 md:mt-16 flex justify-center">
                <NuxtLink to="/articles"
                    class="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-gray-200 text-[#0A1131] font-bold hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                    {{ t('articles.cta') }}
                    <PhosphorIcon name="arrow-right" weight="bold" />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
