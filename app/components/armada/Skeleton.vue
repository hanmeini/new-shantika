<template>
    <div class="space-y-20 pb-10">
        <!-- Header Skeleton -->
        <div class="flex flex-col items-center text-center gap-6 px-6 md:px-0">
            <BaseSkeleton height="36px" width="120px" rounded="10px" />
            <div class="space-y-4 flex flex-col items-center">
                <BaseSkeleton height="48px" width="300px" />
                <div class="flex flex-col items-center gap-1">
                    <BaseSkeleton height="2px" width="112px" />
                    <BaseSkeleton height="2px" width="64px" />
                </div>
            </div>
        </div>

        <!-- Stats Grid Skeleton -->
        <div class="grid grid-cols-1 gap-6 px-6 md:px-0 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <div v-for="i in 6" :key="i" class="p-6 bg-white rounded-2xl border border-gray-50 flex flex-col gap-4">
                <BaseSkeleton height="56px" width="56px" rounded="12px" />
                <div class="space-y-2">
                    <BaseSkeleton height="20px" width="60%" />
                    <BaseSkeleton height="14px" width="100%" />
                    <BaseSkeleton height="14px" width="80%" />
                </div>
            </div>
        </div>

        <!-- Facilities Section Skeleton -->
        <div class="space-y-12">
            <div class="flex justify-center">
                <BaseSkeleton height="36px" width="250px" />
            </div>
            <div
                class="flex overflow-x-auto gap-6 px-6 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-5 max-w-6xl mx-auto">
                <div v-for="i in 5" :key="i"
                    class="min-w-[280px] md:min-w-0 bg-white rounded-3xl p-3 border border-gray-100 flex flex-col gap-6">
                    <BaseSkeleton height="240px" width="100%" rounded="24px" />
                    <div class="space-y-2 pb-2 px-2">
                        <BaseSkeleton height="24px" width="60%" />
                        <BaseSkeleton height="16px" width="100%" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
