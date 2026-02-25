<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { articles } = useArticles()

// Adjust dummy data to identify featured and secondary
const latestBig = computed(() => articles.value[0])
const latestSmall = computed(() => articles.value.slice(1, 3))

const categoryColors: Record<string, string> = {
    'Tips & Trik': 'bg-[#141B4D]',
    'Armada': 'bg-[#108B18]',
    'Rute': 'bg-[#990C21]'
}
</script>

<template>
    <section id="latest-articles" class="w-full bg-white py-16 md:py-24 overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <!-- Section Header -->
            <div class="flex flex-col gap-4 mb-12">
                <span
                    class="inline-flex items-center px-4 py-1.5 bg-blue-50 text-[#141B4D] text-sm font-semibold rounded-full w-fit">
                    {{ t('articlesPage.latest.badge') }}
                </span>
                <h2 class="text-3xl md:text-5xl font-normal text-[#0A1131] leading-tight">
                    <span class="font-normal">{{ t('articlesPage.latest.title').split(' ').slice(0, 1).join(' ') }}
                    </span>
                    <span class="font-bold">{{ t('articlesPage.latest.title').split(' ').slice(1, 3).join(' ') }}</span>
                    <span class="font-normal"> {{ t('articlesPage.latest.title').split(' ').slice(3, 4).join(' ') }}
                    </span>
                    <span class="font-bold">{{ t('articlesPage.latest.title').split(' ').slice(4, 6).join(' ') }}</span>
                    <span class="font-normal"> {{ t('articlesPage.latest.title').split(' ').slice(6).join(' ') }}</span>
                </h2>
            </div>

            <!-- Featured Articles Grid -->
            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Left: Big Horizontal Card -->
                <NuxtLink v-if="latestBig" :to="localePath(`/artikel/${latestBig.id}`)"
                    class="flex-1 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col-reverse md:flex-row gap-8 hover:shadow-xl transition-all duration-500 cursor-pointer group">
                    <div class="flex-1 flex flex-col justify-between py-4">
                        <div class="space-y-4">
                            <span class="px-3 py-1.5 rounded-full text-xs font-bold text-white w-fit"
                                :class="categoryColors[latestBig.category]">
                                {{ latestBig.category }}
                            </span>
                            <h3
                                class="text-2xl md:text-3xl font-bold text-[#0A1131] leading-tight group-hover:text-blue-900 transition-colors">
                                {{ latestBig.title }}
                            </h3>
                        </div>
                        <div class="space-y-4 pt-6">
                            <span class="text-gray-400 text-sm font-medium">{{ latestBig.publishedAt }}</span>
                            <p class="text-gray-500 text-base leading-relaxed line-clamp-4">
                                {{ latestBig.excerpt }}
                            </p>
                        </div>
                    </div>
                    <div class="flex-1 h-[280px] md:h-auto overflow-hidden rounded-2xl">
                        <NuxtImg :src="latestBig.thumbnail"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            alt="Latest Article" />
                    </div>
                </NuxtLink>

                <!-- Right: Two Small Horizontal Cards -->
                <div class="w-full lg:w-[480px] flex flex-col gap-6">
                    <NuxtLink v-for="item in latestSmall" :key="item.id" :to="localePath(`/artikel/${item.id}`)"
                        class="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex gap-6 hover:shadow-xl transition-all duration-500 cursor-pointer group">
                        <div class="w-1/2 h-[180px] overflow-hidden rounded-2xl flex-shrink-0">
                            <NuxtImg :src="item.thumbnail"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div class="flex-1 flex flex-col justify-between py-2">
                            <div class="space-y-2">
                                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold text-white w-fit"
                                    :class="categoryColors[item.category]">
                                    {{ item.category }}
                                </span>
                                <h4
                                    class="text-base font-bold text-[#0A1131] line-clamp-2 leading-snug group-hover:text-blue-900 transition-colors">
                                    {{ item.title }}
                                </h4>
                                <p class="text-gray-500 text-xs line-clamp-3 leading-relaxed">
                                    {{ item.excerpt }}
                                </p>
                            </div>
                            <span class="text-gray-400 text-[10px]">{{ item.publishedAt }}</span>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
