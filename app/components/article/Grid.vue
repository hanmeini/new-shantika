<script setup lang="ts">
const { t } = useI18n()
const { articles, loading, fetchArticles } = useArticles()

onMounted(() => {
    fetchArticles()
})

const categories = ['Semua Artikel', 'Tips & Trik', 'Armada', 'Rute']
const selectedCategory = ref('Semua Artikel')
const sortBy = ref('Terbaru')

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(9)

const allFilteredArticles = computed(() => {
    let result = [...articles.value]
    if (selectedCategory.value !== 'Semua Artikel') {
        result = result.filter(a => a.category === selectedCategory.value)
    }
    // Sorting: In a real app, this would be more complex
    if (sortBy.value === 'Terbaru') {
        // Assume they are already sorted or sort by date/id
    }
    return result
})

const totalItems = computed(() => allFilteredArticles.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return allFilteredArticles.value.slice(start, end)
})

const paginationStart = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const paginationEnd = computed(() => Math.min(currentPage.value * itemsPerPage.value, totalItems.value))

const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        // Optional: scroll to top of grid
        window.scrollTo({ top: document.getElementById('article-grid')?.offsetTop ?? 0, behavior: 'smooth' })
    }
}

// Reset page when category changes
watch(selectedCategory, () => {
    currentPage.value = 1
})

const categoryColors: Record<string, string> = {
    'Tips & Trik': 'bg-[#141B4D]',
    'Armada': 'bg-[#108B18]',
    'Rute': 'bg-[#990C21]'
}
</script>

<template>
    <section class="w-full bg-[#FAFAFA] py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-6">
            <!-- Filter & Sort Bar -->
            <div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                <!-- Categories -->
                <div class="flex flex-wrap items-center gap-3">
                    <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat"
                        class="px-5 py-2.5 rounded-xl font-medium transition-all text-sm" :class="selectedCategory === cat
                            ? 'bg-[#141B4D] text-white shadow-lg'
                            : 'bg-white border border-gray-100 text-[#0A1131] hover:bg-gray-50'">
                        {{ cat === 'Semua Artikel' ? t('articlesPage.grid.all') : cat }}
                    </button>
                </div>

                <!-- Sort -->
                <div class="w-full md:w-64 relative group">
                    <select v-model="sortBy"
                        class="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-[#0A1131] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 appearance-none shadow-sm cursor-pointer">
                        <option value="Terbaru">{{ t('articlesPage.grid.latest') }}</option>
                    </select>
                    <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <PhosphorIcon name="caret-down" weight="bold" />
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <ArticleSkeleton v-for="i in itemsPerPage" :key="i" />
            </div>

            <!-- Articles Grid -->
            <div v-else-if="paginatedArticles.length"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 min-h-[400px]">
                <NuxtLink v-for="item in paginatedArticles" :key="item.id" :to="$localePath(`/artikel/${item.id}`)"
                    class="bg-white rounded-[20px] p-3 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group flex flex-col h-full">
                    <div class="w-full h-64 md:h-72 overflow-hidden rounded-xl mb-6">
                        <NuxtImg :src="item.thumbnail"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            alt="Article Image" />
                    </div>
                    <div class="flex-1 px-3 flex flex-col justify-between">
                        <div class="space-y-4">
                            <span class="px-3 py-1 rounded-full text-[10px] font-bold text-white w-fit"
                                :class="categoryColors[item.category]">
                                {{ item.category }}
                            </span>
                            <h3
                                class="text-xl font-bold text-[#0A1131] leading-snug group-hover:text-blue-900 transition-colors">
                                {{ item.title }}
                            </h3>
                            <p class="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                {{ item.excerpt }}
                            </p>
                        </div>
                        <div class="pt-6 pb-2">
                            <span class="text-gray-400 text-xs font-medium">{{ item.publishedAt }}</span>
                        </div>
                    </div>
                </NuxtLink>
                <!-- Empty State -->
                <div v-if="paginatedArticles.length === 0"
                    class="col-span-full py-20 text-center text-gray-500 font-medium">
                    Tidak ada artikel ditemukan.
                </div>
            </div>

            <!-- Pagination (Mobile/Desktop adaptive) -->
            <div
                class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
                <!-- Info text -->
                <div class="text-sm font-medium text-gray-500">
                    {{ t('articlesPage.grid.paginationInfo', {
                        start: paginationStart, end: paginationEnd, total:
                            totalItems
                    }) }}
                </div>

                <!-- Page numbers -->
                <div class="flex items-center gap-2 md:gap-4 overflow-x-auto max-w-full pb-2 md:pb-0">
                    <!-- Prev -->
                    <button @click="setPage(currentPage - 1)" :disabled="currentPage === 1"
                        class="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <PhosphorIcon name="caret-left" weight="bold" />
                    </button>

                    <div class="flex items-center gap-1 md:gap-2">
                        <button v-for="n in totalPages" :key="n" @click="setPage(n)"
                            class="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all"
                            :class="n === currentPage
                                ? 'bg-[#141B4D] text-white shadow-lg'
                                : 'text-gray-400 hover:bg-gray-50'">
                            {{ n }}
                        </button>
                    </div>

                    <!-- Next -->
                    <button @click="setPage(currentPage + 1)" :disabled="currentPage === totalPages"
                        class="p-2 border border-blue-100 bg-blue-50 text-[#141B4D] rounded-lg hover:bg-blue-100 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                        <PhosphorIcon name="caret-right" weight="bold" />
                    </button>
                </div>

                <!-- Per page selector -->
                <div class="flex items-center gap-3">
                    <div
                        class="px-4 py-2 bg-[#141B4D] text-white rounded-lg text-xs font-bold shadow-md cursor-pointer flex items-center gap-2">
                        <span>{{ itemsPerPage }}</span>
                        <PhosphorIcon name="caret-down" weight="bold" size="12" />
                    </div>
                    <span class="text-sm font-medium text-gray-500">{{ t('articlesPage.grid.itemsPerPage') }}</span>
                </div>
            </div>
        </div>
    </section>
</template>
