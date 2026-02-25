<script setup lang="ts">
const { t, tm, rt } = useI18n()

interface TestimonialItem {
    name: string
    text: string
    rating: number
}

const testimonialItems = tm('testimonials.items') as TestimonialItem[]

const scrollContainer = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

const scrollToIndex = (index: number) => {
    if (!scrollContainer.value) return
    const container = scrollContainer.value
    const children = container.children
    if (children[index]) {
        const child = children[index] as HTMLElement
        container.scrollTo({
            left: child.offsetLeft - container.offsetLeft,
            behavior: 'smooth'
        })
        activeIndex.value = index
    }
}

const next = () => {
    if (activeIndex.value < testimonialItems.length - 1) {
        scrollToIndex(activeIndex.value + 1)
    } else {
        scrollToIndex(0)
    }
}

const prev = () => {
    if (activeIndex.value > 0) {
        scrollToIndex(activeIndex.value - 1)
    } else {
        scrollToIndex(testimonialItems.length - 1)
    }
}

const onScroll = () => {
    if (!scrollContainer.value) return
    const container = scrollContainer.value
    const scrollLeft = container.scrollLeft
    const width = container.offsetWidth
    const index = Math.round(scrollLeft / width)
    if (activeIndex.value !== index) {
        activeIndex.value = index
    }
}
</script>

<template>
    <section class="w-full py-16 md:py-24 bg-[#F8F9FB] overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-10 md:mb-16">
                <i18n-t keypath="testimonials.title" tag="h2" class="text-3xl md:text-4xl font-normal text-[#0A1131]">
                    <template #passenger>
                        <span class="font-semibold text-[#141B4D]">{{ t('testimonials.passenger') }}</span>
                    </template>
                </i18n-t>

                <div class="flex items-center gap-3">
                    <button @click="prev"
                        class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-all active:scale-95 bg-white">
                        <PhosphorIcon name="caret-left" weight="bold" />
                    </button>
                    <button @click="next"
                        class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-all active:scale-95 bg-white">
                        <PhosphorIcon name="caret-right" weight="bold" />
                    </button>
                </div>
            </div>

            <!-- Carousel -->
            <div class="relative">
                <div ref="scrollContainer" @scroll="onScroll"
                    class="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-6 px-6">
                    <div v-for="(item, index) in testimonialItems" :key="index"
                        class="flex-shrink-0 w-[calc(100vw-48px)] md:w-[380px] snap-center md:snap-start">
                        <div
                            class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-50 h-[320px] md:h-[380px] flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                            <div>
                                <div class="flex items-start justify-between mb-6">
                                    <div class="text-icon-primary rotate-180">
                                        <PhosphorIcon name="quotes" :size="48" />
                                    </div>
                                    <div class="flex gap-1">
                                        <PhosphorIcon v-for="i in 5" :key="i" name="star" weight="fill"
                                            :class="i <= item.rating ? 'text-yellow-400' : 'text-gray-200'"
                                            :size="18" />
                                    </div>
                                </div>
                                <p class="text-[#0A1131]/80 text-sm md:text-lg leading-relaxed line-clamp-6">
                                    {{ rt(item.text) }}
                                </p>
                            </div>

                            <div class="flex items-center gap-3 pt-6 border-t border-gray-50">
                                <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-50">
                                    <NuxtImg src="/icons/Jaxon Maddox.svg" class="w-full h-full object-cover" />
                                </div>
                                <span class="font-bold text-[#0A1131] text-sm md:text-base">{{ rt(item.name) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pagination Dots -->
                <div class="flex justify-center items-center gap-2 mt-4">
                    <button v-for="(_, index) in testimonialItems" :key="index" @click="scrollToIndex(index)"
                        class="w-2 h-2 rounded-full transition-all duration-300"
                        :class="activeIndex === index ? 'bg-[#324CF9] w-4' : 'bg-gray-200'"></button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
