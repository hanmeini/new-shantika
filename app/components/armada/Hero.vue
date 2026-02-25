<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
    <section class="relative bg-[#001740] pt-20 pb-24 lg:py-0 lg:min-h-[800px] flex items-center overflow-hidden">
        <div class="container mx-auto px-6 relative z-10">
            <div class="flex flex-col lg:flex-row items-center gap-28 lg:gap-12">

                <!-- Content Section (Left) -->
                <div class="w-full lg:w-[48%] space-y-8 order-2 lg:order-1 text-center lg:text-left">
                    <!-- Badge -->
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 rounded-full mx-auto lg:mx-0">
                        <PhosphorIcon name="bus" size="12" class="text-white" weight="bold" />
                        <span class="text-white text-xs font-medium">{{ t('fleet.hero.badge') }}</span>
                    </div>

                    <!-- Title & Description -->
                    <div class="space-y-4 max-w-[511px] mx-auto lg:mx-0">
                        <h1 class="text-white text-5xl font-extrabold leading-[1.05] tracking-tight">
                            <i18n-t keypath="fleet.hero.title" tag="span">
                                <template #highlight>
                                    <span class="text-white">{{ t('fleet.hero.highlight') }}</span>
                                </template>
                            </i18n-t>
                        </h1>
                        <p class="text-white/60 text-lg font-light leading-7">
                            {{ t('fleet.hero.description') }}
                        </p>
                    </div>

                    <!-- Satisfied Passengers -->
                    <div class="inline-flex items-center gap-4 justify-center lg:justify-start">
                        <div class="flex -space-x-3">
                            <div v-for="i in 3" :key="i"
                                class="w-10 h-10 rounded-full border-2 border-[#001740] bg-gray-300 overflow-hidden">
                                <img :src="`https://i.pravatar.cc/150?u=p${i}`" alt="User"
                                    class="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div class="text-left">
                            <div class="text-white text-lg font-bold leading-7">{{ t('fleet.hero.satisfied.count') }}
                            </div>
                            <div class="text-white/50 text-sm font-light leading-5">{{ t('fleet.hero.satisfied.label')
                            }}</div>
                        </div>
                    </div>
                </div>

                <!-- Collage Section (Right) — exact positions from design (1440px total, collage starts ~783px, ends ~1320px = 537px wide) -->
                <div class="w-full lg:w-[52%] relative min-h-[580px] lg:min-h-[650px] order-1 lg:order-2">

                    <!-- Image 1: top-left, narrow (design: left-[843], top-[124], w-48 h-60) → relative: left=843-783=60px, top=124-75=49px -->
                    <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"
                        class="absolute rounded-xl object-cover shadow-2xl transition-all duration-700 hover:scale-105
                               w-[46%] h-60 left-0 top-4
                               lg:w-48 lg:h-60 lg:left-[60px] lg:top-[49px] z-10" alt="Bus" />

                    <!-- Image 2: top-right, wide (design: left-[1055], top-[169], w-72 h-60) → relative: left=1055-783=272px, top=169-75=94px -->
                    <img src="https://plus.unsplash.com/premium_photo-1664302152991-d013ff125f3f?w=800&auto=format&fit=crop"
                        class="absolute rounded-xl object-cover shadow-2xl transition-all duration-700 hover:scale-105
                               w-[52%] h-52 right-0 top-12
                               lg:w-72 lg:h-60 lg:left-[272px] lg:top-[94px] z-10" alt="Bus" />

                    <!-- Image 3: bottom-left, wide (design: left-[789], top-[374], w-64 h-52) → relative: left=789-783=6px, top=374-75=299px -->
                    <img src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop"
                        class="absolute rounded-xl object-cover shadow-2xl transition-all duration-700 hover:scale-105
                               w-[55%] h-52 left-0 top-64
                               lg:w-64 lg:h-52 lg:left-[6px] lg:top-[299px] z-20" alt="Bus" />

                    <!-- Image 4: bottom-right, narrow (design: left-[1055], top-[414], w-48 h-60) → relative: left=1055-783=272px, top=414-75=339px -->
                    <img src="https://plus.unsplash.com/premium_photo-1661963208071-9a65b048ebaf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVzfGVufDB8fDB8fHww"
                        class="absolute rounded-xl object-cover shadow-2xl transition-all duration-700 hover:scale-105
                               w-[42%] h-56 right-0 top-[285px]
                               lg:w-48 lg:h-60 lg:left-[272px] lg:top-[339px] z-10" alt="Bus" />

                    <!-- Floating Card: "34 Provinsi" (design: left-[769], top-[215.19]) → relative: left=769-783=-14px, top=215-75=140px -->
                    <div
                        class="absolute -left-4 top-44 lg:-left-[14px] lg:top-[140px] bg-white rounded-xl shadow-lg p-4 z-30 hover:-translate-y-1 transition-transform duration-300">
                        <div class="text-[#001740] text-lg font-semibold leading-7">{{
                            t('fleet.hero.stats.provinces.value') }}</div>
                        <div class="text-gray-500 text-xs font-normal leading-4">{{
                            t('fleet.hero.stats.provinces.label') }}</div>
                    </div>

                    <!-- Floating Card: "1000+" top-right (design: left-[1104], top-[120]) → relative: left=1104-783=321px, top=120-75=45px -->
                    <div
                        class="absolute -right-2 top-0 lg:left-[321px] lg:top-[45px] bg-white rounded-xl shadow-lg p-4 z-30 hover:-translate-y-1 transition-transform duration-300">
                        <div class="text-[#001740] text-lg font-semibold leading-7">{{
                            t('fleet.hero.stats.agents.value') }}</div>
                        <div class="text-gray-500 text-xs font-normal leading-4">{{ t('fleet.hero.stats.agents.label')
                        }}</div>
                    </div>

                    <!-- Floating Card: "1000+" with avatars (design: left-[833], top-[602]) → relative: left=833-783=50px, top=602-75=527px -->
                    <div
                        class="absolute left-4 bottom-0 md:-bottom-8 lg:left-[50px] lg:top-[527px] bg-white rounded-xl shadow-lg px-5 py-2 h-16 z-40 flex items-center gap-2.5 hover:-translate-y-1 transition-transform duration-300">
                        <div class="flex -space-x-2">
                            <div v-for="i in 3" :key="i"
                                class="w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                                <img :src="`https://i.pravatar.cc/150?u=b${i + 3}`" alt="User"
                                    class="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div>
                            <div class="text-[#001740] text-sm font-semibold leading-none">{{
                                t('fleet.hero.stats.agents.value') }}
                            </div>
                            <div class="text-gray-500 text-[10px] font-normal leading-none mt-0.5">{{
                                t('fleet.hero.stats.agents.label')
                            }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Any specific hero styles */
</style>
