<script setup lang="ts">
interface Props {
    width?: string
    height?: string
    rounded?: string
    variant?: 'box' | 'circle' | 'text'
    pulse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    width: '100%',
    height: '20px',
    rounded: '0.5rem',
    variant: 'box',
    pulse: true
})

const classes = computed(() => [
    'bg-gray-200 overflow-hidden relative',
    props.variant === 'circle' ? 'rounded-full' : '',
    props.variant === 'text' ? 'rounded-md' : '',
    !props.variant || props.variant === 'box' ? '' : '',
    props.pulse ? 'animate-shimmer' : ''
])

const styles = computed(() => ({
    width: props.width,
    height: props.height,
    borderRadius: props.variant === 'box' ? props.rounded : undefined
}))
</script>

<template>
    <div :class="classes" :style="styles">
        <!-- Shimmer Effect Overlay -->
        <div
            class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent shimmer-overlay">
        </div>
    </div>
</template>

<style scoped>
.shimmer-overlay {
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}

.animate-shimmer {
    background: linear-gradient(90deg,
            rgba(229, 231, 235, 1) 25%,
            rgba(243, 244, 246, 1) 50%,
            rgba(229, 231, 235, 1) 75%);
    background-size: 200% 100%;
    animation: pulse-bg 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-bg {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}
</style>
