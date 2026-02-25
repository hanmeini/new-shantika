<script setup lang="ts">
const { t } = useI18n()

// Set page meta
useHead({
    title: `${t('nav.fleet')} - New Shantika`,
    meta: [
        { name: 'description', content: t('hero.description') }
    ]
})
</script>

<template>
    <div>
        <ArmadaHero />
        <ArmadaContent />
    </div>
</template>
