<script setup lang="ts">
interface Props {
    variant?: 'primary' | 'outline'
    icon?: string
}

withDefaults(defineProps<Props>(), {
    variant: 'primary',
})
</script>

<template>
    <button :class="[
        'inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 gap-2 text-sm',
        variant === 'primary'
            ? 'text-white hover:opacity-90 shadow-md'
            : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-900'
    ]" :style="variant === 'primary' ? 'background-color: #141b4d;' : ''">
        <slot />
        <component :is="icon" v-if="icon" :size="18" weight="bold" />
    </button>
</template>
