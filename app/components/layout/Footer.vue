<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
    <footer class="bg-[#F8F9FB] text-[#0A1131] py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                <!-- Branding & About -->
                <div class="lg:col-span-5 flex flex-col items-start">
                    <!-- Mobile: Dark Logo Box -->
                    <div
                        class="lg:hidden w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-lg">
                        <NuxtImg src="/images/New Shantika Logo.png" alt="Shantika Logo"
                            class="h-10 w-auto brightness-200 contrast-200" />
                    </div>

                    <!-- Desktop: Original Logo -->
                    <div class="hidden lg:block mb-8">
                        <NuxtImg src="/images/New Shantika Logo.png" alt="Shantika Logo" class="h-16 w-auto" />
                    </div>

                    <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                        {{ t('about.description') }}
                    </p>

                    <NuxtLink to="/about"
                        class="inline-flex items-center justify-center px-8 lg:px-6 py-3 bg-white border border-gray-200 rounded-2xl lg:rounded-xl text-[#0A1131] font-bold lg:font-semibold text-base lg:text-sm transition-all hover:bg-gray-50 hover:shadow-sm">
                        {{ t('footer.learnMore') }}
                    </NuxtLink>
                </div>

                <!-- Spacer for layout on desktop -->
                <div class="hidden lg:block lg:col-span-2"></div>

                <!-- Site Map -->
                <div class="lg:col-span-2 space-y-8 lg:space-y-6">
                    <h4 class="text-xl lg:text-lg font-bold text-[#111847]">{{ t('footer.sitemap') }}</h4>
                    <ul class="flex flex-wrap lg:flex-col items-center lg:items-start gap-x-6 gap-y-4 lg:gap-y-4">
                        <li v-for="link in [
                            { label: t('nav.home'), to: '/' },
                            { label: t('footer.about'), to: '/about' },
                            { label: t('footer.help'), to: '/help' },
                            { label: t('nav.contact'), to: '/contact' }
                        ]" :key="link.to">
                            <NuxtLink :to="link.to"
                                class="text-base lg:text-sm font-bold text-[#111847] hover:text-blue-700 transition-colors underline underline-offset-4 decoration-current/30 hover:decoration-current">
                                {{ link.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Social Media -->
                <div class="lg:col-span-3 space-y-8 lg:space-y-6">
                    <h4 class="text-xl lg:text-lg font-bold text-[#111847]">{{ t('footer.social') }}</h4>
                    <ul class="flex flex-wrap lg:flex-col items-center lg:items-start gap-x-8 gap-y-5 lg:gap-y-4">
                        <li v-for="soc in [
                            { icon: 'phone', label: '9827639163', href: 'tel:9827639163' },
                            { icon: 'facebook-logo', label: '@NewShantika', href: '#' },
                            { icon: 'instagram-logo', label: '@NewShantika', href: '#' },
                            { icon: 'tiktok-logo', label: 'NewShantika123', href: '#' },
                            { icon: 'youtube-logo', label: 'NewShantika123', href: '#' }
                        ]" :key="soc.label">
                            <a :href="soc.href"
                                class="flex items-center gap-3 text-base lg:text-sm font-bold text-[#111847] hover:text-blue-700 transition-colors group">
                                <div class="w-5 flex justify-center">
                                    <PhosphorIcon :name="soc.icon" weight="bold" size="20" />
                                </div>
                                <span
                                    class="underline underline-offset-4 decoration-current/20 group-hover:decoration-current">
                                    {{ soc.label }}
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Copyright -->
            <div
                class="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                <p>© {{ new Date().getFullYear() }} New Shantika. {{ t('footer.copyright') }}</p>
            </div>
        </div>
    </footer>
</template>
