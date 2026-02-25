<template>
    <div
        class="bg-white rounded-[20px] border border-gray-100 overflow-hidden flex flex-row md:flex-col h-auto md:h-full">
        <!-- Image Section -->
        <div class="w-2/5 md:w-full h-32 md:h-64 relative shrink-0">
            <BaseSkeleton height="100%" width="100%" rounded="0" />
        </div>

        <!-- Content Section -->
        <div class="w-3/5 md:w-full p-4 md:p-6 space-y-4 flex flex-col justify-center">
            <BaseSkeleton height="24px" width="70%" />
            <div class="space-y-2">
                <div class="flex items-center gap-3">
                    <BaseSkeleton height="14px" width="14px" variant="circle" />
                    <BaseSkeleton height="14px" width="80%" />
                </div>
                <div class="flex items-center gap-3">
                    <BaseSkeleton height="14px" width="14px" variant="circle" />
                    <BaseSkeleton height="14px" width="50%" />
                </div>
            </div>
        </div>
    </div>
</template>
