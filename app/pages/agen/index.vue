<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
    title: `Agen Resmi | Shantika`,
    description: `Temukan informasi kontak agen bus terpercaya New Shantika di berbagai kota.`
})

const searchParams = ref({
    query: '',
    city: ''
})

const handleSearch = (params: { query: string; city: string }) => {
    searchParams.value = params
}
</script>

<template>
    <main>
        <AgentHero @search="handleSearch" />
        <AgentGrid :search-params="searchParams" />
    </main>
</template>
