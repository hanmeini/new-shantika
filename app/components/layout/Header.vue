<script setup lang="ts">
import { gsap } from 'gsap'

const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

const navLinks = computed(() => [
    { label: t('nav.home'), to: localePath('/') },
    { label: t('nav.agent'), to: localePath('/agen') },
    { label: t('nav.fleet'), to: localePath('/armada') },
    { label: t('nav.article'), to: localePath('/artikel') },
    { label: t('nav.route'), to: localePath('/rute') },
    { label: t('nav.contact'), to: localePath('/kontak') },
])
const langOpen = ref(false)
const menuOpen = ref(false)
const mobileMenuRef = ref(null)
const menuLinksRef = ref([])

const availableLangs = computed(() =>
    locales.value.map((l: { code: string }) => ({
        code: l.code,
        label: l.code.toUpperCase(),
    }))
)

async function switchLang(code: string) {
    await setLocale(code as 'id' | 'en')
    langOpen.value = false
}

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value

    if (menuOpen.value) {
        // Lock body scroll
        document.body.style.overflow = 'hidden'

        // Open Animation
        nextTick(() => {
            const tl = gsap.timeline()
            tl.fromTo(mobileMenuRef.value,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
            )
            tl.fromTo('.mobile-link',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
                '-=0.2'
            )
        })
    } else {
        // Restore body scroll
        document.body.style.overflow = ''

        // Close Animation
        gsap.to(mobileMenuRef.value, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: () => {
                // menuOpen.value = false is already set
            }
        })
    }
}

const closeMenu = () => {
    if (menuOpen.value) toggleMenu()
}

// Close dropdown on outside click
onMounted(() => {
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        if (!target.closest('#lang-switcher')) {
            langOpen.value = false
        }
    })
})

onUnmounted(() => {
    document.body.style.overflow = ''
})
</script>

<template>
    <header class="sticky top-0 z-[100] bg-white border-b border-gray-100 shadow-sm">
        <nav class="container mx-auto px-6 h-16 flex items-center justify-between gap-8">

            <!-- Logo -->
            <NuxtLink :to="localePath('/')" class="flex-shrink-0" @click="closeMenu">
                <NuxtImg src="/images/New Shantika Logo.png" alt="New Shantika" class="h-9 w-auto object-contain"
                    format="webp" quality="80" />
            </NuxtLink>

            <!-- Nav Links (center) -->
            <ul class="hidden md:flex items-center gap-7 flex-1 justify-center">
                <li v-for="link in navLinks" :key="link.to">
                    <NuxtLink :to="link.to"
                        class="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors"
                        active-class="text-blue-700 font-semibold">
                        {{ link.label }}
                    </NuxtLink>
                </li>
            </ul>

            <!-- Language Switcher & Hamburger -->
            <div class="flex items-center gap-4">
                <div id="lang-switcher" class="relative flex-shrink-0 hidden md:flex">
                    <button @click.stop="langOpen = !langOpen"
                        class="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors select-none">
                        {{ locale.toUpperCase() }}
                        <PhosphorIcon name="caret-down" :size="13" weight="bold"
                            class="transition-transform duration-200" :class="{ 'rotate-180': langOpen }" />
                    </button>

                    <!-- Dropdown -->
                    <Transition name="fade">
                        <ul v-if="langOpen"
                            class="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden min-w-[72px] py-1">
                            <li v-for="lang in availableLangs" :key="lang.code">
                                <button @click="switchLang(lang.code)"
                                    class="w-full px-4 py-2 text-sm text-left transition-colors" :class="lang.code === locale
                                        ? 'text-blue-700 font-semibold bg-blue-50'
                                        : 'text-gray-700 hover:bg-gray-50'">
                                    {{ lang.label }}
                                </button>
                            </li>
                        </ul>
                    </Transition>
                </div>

                <!-- Mobile Hamburger Button -->
                <button @click="toggleMenu"
                    class="md:hidden relative z-[101] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none group">
                    <span class="w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 transform origin-center"
                        :class="{ 'rotate-45 translate-y-2': menuOpen, 'group-hover:w-7': !menuOpen }"></span>
                    <span class="w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 transform origin-center"
                        :class="{ 'opacity-0 scale-0': menuOpen, 'group-hover:w-5': !menuOpen }"></span>
                    <span class="w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 transform origin-center"
                        :class="{ '-rotate-45 -translate-y-2': menuOpen, 'group-hover:w-7': !menuOpen }"></span>
                </button>
            </div>
        </nav>

        <!-- Mobile Menu Overlay -->
        <Transition>
            <div v-if="menuOpen" ref="mobileMenuRef"
                class="fixed inset-0 z-[99] bg-white/95 backdrop-blur-md md:hidden flex flex-col pt-24 px-8">
                <ul class="flex flex-col gap-6">
                    <li v-for="(link, idx) in navLinks" :key="link.to" class="mobile-link">
                        <NuxtLink :to="link.to"
                            class="text-3xl font-bold text-[#111847] hover:text-blue-700 transition-colors flex items-center justify-between group"
                            active-class="text-blue-700" @click="toggleMenu">
                            {{ link.label }}
                            <PhosphorIcon name="arrow-right" :size="24" weight="bold"
                                class="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </NuxtLink>
                    </li>
                </ul>

                <div class="mt-auto mb-12 flex flex-col gap-6 mobile-link border-t border-gray-100 pt-8">
                    <div class="flex flex-wrap gap-4">
                        <button v-for="lang in availableLangs" :key="lang.code"
                            @click="switchLang(lang.code); closeMenu()"
                            class="px-6 py-2 rounded-full text-base font-bold transition-all border-2" :class="lang.code === locale
                                ? 'bg-[#111847] text-white border-[#111847]'
                                : 'bg-white text-gray-400 border-gray-100'">
                            {{ lang.label }}
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
