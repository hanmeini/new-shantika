<script setup lang="ts">
// Article list page – displays all news articles
useSeoMeta({ title: 'Berita & Artikel | Shantika' })
</script>

<template>
    <main>
        <ArticleHero />
        <ArticleLatest />
        <ArticleGrid />
    </main>
</template>
