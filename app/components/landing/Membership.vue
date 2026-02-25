<script setup lang="ts">
const { t, tm, rt } = useI18n()

interface MemberFeature {
    title: string
    description: string
    icon: string
}

const membershipFeatures = tm('membership.features') as MemberFeature[]

// Mapping for local icons to ensure we only use specific files
const iconMap: Record<string, string> = {
    'ticket': '/icons/ic-sn_pemesanan online.svg',
    'wallet': '/icons/ic-sn_anggaran terkendali.svg',
    'user-gear': '/icons/ic-sn_staf profesional.svg',
    'shield-check': '/icons/ic-sn_pembayaran aman.svg'
}
</script>

<template>
    <section class="w-full py-16 md:py-24 bg-white overflow-hidden">
        <div class="px-6">
            <div
                class="bg-bg-fill-primary rounded-2xl md:rounded-4xl p-8 md:p-10 lg:py-12 lg:px-16 relative overflow-hidden group">

                <!-- Background decorative elements -->
                <div
                    class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none">
                </div>
                <div
                    class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none">
                </div>

                <div class="relative z-10 flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-16">

                    <!-- Content Header (Mobile: Top, Desktop: Right Top) -->
                    <div class="w-full lg:hidden text-center mb-4">
                        <i18n-t keypath="membership.title" tag="h2"
                            class="text-3xl font-normal leading-tight text-white">
                            <template #member>
                                <span class="italic font-semibold">{{ t('membership.member') }}</span>
                            </template>
                        </i18n-t>
                    </div>

                    <!-- Left: App Image Preview -->
                    <div class="w-full lg:w-[48%] xl:w-[45%] relative aspect-square">
                        <div
                            class="relative w-full rounded-2xl md:rounded-3xl overflow-hidden transition-transform duration-700">
                            <div class="w-full h-full relative">
                                <NuxtImg src="/images/member.png" alt="New Shantika App"
                                    class="w-full h-full object-cover" format="webp" quality="90" />

                                <!-- CTA Button (Desktop: Inside Image, Mobile: Hidden) -->
                                <div class="hidden lg:flex absolute bottom-4 right-4 justify-end">
                                    <button
                                        class="bg-white text-[#0A1131] font-bold px-6 py-3 rounded-2xl flex items-center gap-2.5 shadow-xl hover:bg-gray-50 hover:scale-105 transition-all active:scale-95 text-xs md:text-sm">
                                        {{ t('membership.cta') }}
                                        <PhosphorIcon name="arrow-right" weight="bold" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Content -->
                    <div class="w-full lg:w-1/2 text-white py-2">
                        <!-- Desktop Title -->
                        <div class="hidden lg:block space-y-4 mb-8">
                            <i18n-t keypath="membership.title" tag="h2"
                                class="text-3xl md:text-5xl font-normal leading-tight">
                                <template #member>
                                    <span class="italic font-semibold">{{ t('membership.member') }}</span>
                                </template>
                            </i18n-t>
                        </div>

                        <!-- Subtitle (Always visible, centered on mobile) -->
                        <div class="space-y-4 mb-8 text-center lg:text-left">
                            <p class="text-blue-100/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                {{ t('membership.subtitle') }}
                            </p>

                            <!-- CTA Button (Mobile Only: Below Subtitle) -->
                            <div class="lg:hidden flex justify-center pt-2">
                                <button
                                    class="bg-white text-[#0A1131] font-bold px-8 py-3 rounded-2xl flex items-center gap-2.5 shadow-xl active:scale-95 text-sm">
                                    {{ t('membership.cta') }}
                                    <PhosphorIcon name="arrow-right" weight="bold" />
                                </button>
                            </div>

                            <div class="h-0.5 w-full bg-white/10 rounded-full max-w-xl mx-auto lg:mx-0"></div>
                        </div>

                        <!-- Features List -->
                        <div class="grid gap-5 md:gap-6">
                            <div v-for="(item, index) in membershipFeatures" :key="index" class="flex gap-5 group">
                                <div
                                    class="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center transition-all duration-300">
                                    <NuxtImg :src="iconMap[rt(item.icon)] || '/icons/membership/placeholder.svg'"
                                        class="w-6 h-6 object-contain brightness-0" />
                                </div>
                                <div class="space-y-0.5">
                                    <h4 class="text-lg font-bold text-white">{{ rt(item.title) }}</h4>
                                    <p class="text-blue-100/60 text-xs md:text-sm leading-relaxed max-w-md">
                                        {{ rt(item.description) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>
