<script setup lang="ts">
// Article detail page – fetches article by dynamic [id]
const route = useRoute()
const articleId = computed(() => route.params.id as string)

useSeoMeta({ title: 'Detail Artikel | Shantika' })
</script>

<template>
    <main>
        <ArticleDetail :id="articleId" />
    </main>
</template>
