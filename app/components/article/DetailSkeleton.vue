<template>
    <div class="w-full flex flex-col justify-start items-start bg-white">
        <!-- Breadcrumbs Skeleton -->
        <div class="w-full px-6 md:px-28 py-10 bg-white flex flex-col justify-center items-start gap-12 md:gap-16">
            <div class="flex items-center gap-2">
                <BaseSkeleton height="16px" width="60px" />
                <PhosphorIcon name="caret-right" class="text-gray-200" size="14" />
                <BaseSkeleton height="16px" width="80px" />
                <PhosphorIcon name="caret-right" class="text-gray-200" size="14" />
                <BaseSkeleton height="16px" width="150px" />
            </div>

            <!-- Header Info Skeleton -->
            <div class="w-full h-full flex flex-col justify-start items-start gap-6">
                <BaseSkeleton height="28px" width="100px" rounded="100px" />
                <div class="space-y-4 w-full h-full">
                    <BaseSkeleton height="48px" width="90%" />
                    <BaseSkeleton height="48px" width="40%" />
                </div>
                <div class="flex items-center gap-4">
                    <BaseSkeleton height="20px" width="120px" />
                    <div class="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    <BaseSkeleton height="20px" width="100px" />
                </div>
            </div>
        </div>

        <!-- Hero Image Skeleton -->
        <div class="w-full h-[320px] md:h-[600px]">
            <BaseSkeleton height="100%" width="100%" rounded="0" />
        </div>

        <!-- Content Section Skeleton -->
        <div class="w-full px-6 md:px-28 py-12 md:py-20 flex flex-col gap-10 max-w-5xl mx-auto">
            <div class="space-y-6">
                <BaseSkeleton v-for="i in 8" :key="i" height="20px" :width="i % 3 === 0 ? '70%' : '100%'" />
            </div>
        </div>

        <!-- Recommendations Section Skeleton -->
        <div class="w-full px-6 md:px-28 py-16 bg-[#FAFAFA] border-t border-gray-100">
            <div class="max-w-7xl mx-auto space-y-10">
                <div class="flex items-center justify-between">
                    <BaseSkeleton height="36px" width="250px" />
                    <BaseSkeleton height="40px" width="120px" rounded="12px" class="hidden md:block" />
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div v-for="i in 2" :key="i"
                        class="bg-white rounded-[20px] p-4 border border-gray-100 flex flex-row gap-6 h-40">
                        <div class="w-2/5 h-full">
                            <BaseSkeleton height="100%" width="100%" rounded="12px" />
                        </div>
                        <div class="flex-1 py-1 space-y-3">
                            <BaseSkeleton height="12px" width="60px" />
                            <BaseSkeleton height="24px" width="100%" />
                            <BaseSkeleton height="40px" width="100%" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
