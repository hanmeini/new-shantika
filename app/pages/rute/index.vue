<script setup lang="ts">
// Rute page – shows all available bus routes
useSeoMeta({ title: 'Rute | Shantika' })
</script>

<template>
    <div class="min-h-screen bg-white">
        <!-- Hero Section -->
        <RuteHero />

        <!-- Content Section -->
        <RuteList />
    </div>
</template>
