<script setup lang="ts">
// Component simplified to only show a centered image
</script>

<template>
    <section class="w-full py-10 md:py-20 bg-white">
        <div class="container mx-auto px-6 flex justify-center">
            <div class="w-full max-w-5xl relative">
                <div class="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group">
                    <NuxtImg src="/images/video.png" alt="Shantika Passenger Experience"
                        class="w-full h-auto object-cover aspect-video transform group-hover:scale-102 transition-transform duration-700"
                        format="webp" quality="80" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
