<script setup lang="ts">
const { id } = defineProps<{ id: string }>()
const { t } = useI18n()
const localePath = useLocalePath()
const { articles, loading, fetchArticleById } = useArticles()

const article = ref<any>(null)
const recommendations = computed(() => articles.value.filter(a => a.id !== id).slice(0, 3))

onMounted(async () => {
    article.value = await fetchArticleById(id)
})

const categoryColors: Record<string, string> = {
    'Tips & Trik': 'bg-bg-fill-primary',
    'Armada': 'bg-bg-fill-success',
    'Rute': 'bg-bg-fill-danger'
}
</script>

<template>
    <div v-if="loading" class="w-full">
        <ArticleDetailSkeleton />
    </div>

    <div v-else-if="article" class="w-full flex flex-col justify-start items-start bg-white">
        <!-- Breadcrumbs -->
        <div class="w-full px-6 md:px-28 py-10 bg-white flex flex-col justify-center items-start gap-12 md:gap-16">
            <nav class="flex flex-wrap items-center gap-2 text-sm font-semibold">
                <NuxtLink :to="localePath('/')"
                    class="text-text-dark-tertiary hover:text-text-dark-primary transition-colors">
                    {{ t('articlesPage.detail.breadcrumbs.home') }}
                </NuxtLink>
                <PhosphorIcon name="caret-right" class="text-text-dark-tertiary" size="14" />
                <NuxtLink :to="localePath('/artikel')"
                    class="text-text-dark-tertiary hover:text-text-dark-primary transition-colors">
                    {{ t('articlesPage.detail.breadcrumbs.articles') }}
                </NuxtLink>
                <PhosphorIcon name="caret-right" class="text-text-dark-tertiary" size="14" />
                <span class="text-text-dark-primary line-clamp-1 flex-1">{{ article.title }}</span>
            </nav>

            <!-- Header Info -->
            <div class="w-full flex flex-col justify-start items-start gap-6">
                <span class="px-3 py-1 rounded-full text-sm font-medium text-white"
                    :class="categoryColors[article.category]">
                    {{ article.category }}
                </span>
                <h1 class="text-3xl md:text-5xl font-bold text-text-dark-primary leading-tight">
                    {{ article.title }}
                </h1>
                <div class="flex items-center gap-4 text-text-dark-secondary text-base">
                    <span>{{ article.publishedAt }}</span>
                    <div class="w-1.5 h-1.5 bg-text-dark-secondary rounded-full"></div>
                    <span>{{ t('articlesPage.detail.readingTime', { time: article.readingTime }) }}</span>
                </div>
            </div>
        </div>

        <!-- Hero Image -->
        <div class="w-full h-[320px] md:h-[600px] overflow-hidden">
            <NuxtImg :src="article.thumbnail" class="w-full h-full object-cover" :alt="article.title" />
        </div>

        <!-- Content Section -->
        <div class="w-full px-6 md:px-28 py-12 md:py-20 flex flex-col gap-10 max-w-5xl mx-auto">
            <div class="prose prose-lg max-w-none text-text-dark-primary whitespace-pre-line leading-relaxed">
                {{ article.content }}
            </div>
        </div>

        <!-- Recommendations Section -->
        <div class="w-full px-6 md:px-28 py-16 bg-[#FAFAFA] border-t border-gray-100">
            <div class="max-w-7xl mx-auto space-y-10">
                <div class="flex items-center justify-between">
                    <h2 class="text-3xl font-bold text-text-dark-primary">
                        {{ t('articlesPage.detail.recommendations') }}
                    </h2>
                    <NuxtLink :to="localePath('/artikel')"
                        class="hidden md:flex px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-text-dark-primary font-bold shadow-sm hover:bg-gray-50 transition-all items-center gap-2">
                        <span>{{ t('articlesPage.detail.seeMore') }}</span>
                        <PhosphorIcon name="arrow-right" weight="bold" />
                    </NuxtLink>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <NuxtLink v-for="item in recommendations" :key="item.id" :to="localePath(`/artikel/${item.id}`)"
                        class="bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-row gap-6 h-full items-center">
                        <div class="w-2/5 h-full overflow-hidden rounded-xl flex-shrink-0 relative">
                            <NuxtImg :src="item.thumbnail"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <!-- Mobile Badge -->
                            <span
                                class="md:hidden absolute top-2 left-2 px-2 py-0.5 rounded-full text-[8px] font-bold text-white"
                                :class="categoryColors[item.category]">
                                {{ item.category }}
                            </span>
                        </div>
                        <div class="flex-1 flex flex-col justify-between py-1">
                            <div class="space-y-2 md:space-y-3">
                                <!-- Desktop Badge -->
                                <span
                                    class="hidden md:block px-2.5 py-1 rounded-full text-[10px] font-bold text-white w-fit"
                                    :class="categoryColors[item.category]">
                                    {{ item.category }}
                                </span>
                                <h3
                                    class="text-sm md:text-lg font-bold text-text-dark-primary leading-tight group-hover:text-blue-900 transition-colors line-clamp-2">
                                    {{ item.title }}
                                </h3>
                                <p class="text-text-dark-secondary text-sm leading-relaxed line-clamp-2">
                                    {{ item.excerpt }}
                                </p>
                            </div>
                            <div class="pt-2 md:pt-4">
                                <span class="text-gray-400 text-[10px] md:text-xs font-medium">{{ item.publishedAt
                                }}</span>
                            </div>
                        </div>
                    </NuxtLink>
                </div>

                <!-- Bottom Button for Mobile -->
                <div class="flex md:hidden justify-center pt-4">
                    <NuxtLink :to="localePath('/artikel')"
                        class="w-full py-4 bg-white border border-gray-200 rounded-xl text-text-dark-primary font-bold shadow-sm flex items-center justify-center gap-2">
                        <span>{{ t('articlesPage.detail.seeMore') }}</span>
                        <PhosphorIcon name="arrow-right" weight="bold" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
