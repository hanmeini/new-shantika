<template>
    <div class="bg-white rounded-[20px] p-3 border border-gray-100 shadow-sm flex flex-col h-full">
        <div class="w-full h-64 md:h-72 overflow-hidden rounded-xl mb-6">
            <BaseSkeleton height="100%" width="100%" rounded="0" />
        </div>
        <div class="px-3 space-y-4">
            <BaseSkeleton height="20px" width="80px" rounded="100px" />
            <div class="space-y-2">
                <BaseSkeleton height="24px" width="100%" />
                <BaseSkeleton height="24px" width="60%" />
            </div>
            <div class="space-y-1">
                <BaseSkeleton height="14px" width="100%" />
                <BaseSkeleton height="14px" width="100%" />
                <BaseSkeleton height="14px" width="40%" />
            </div>
            <div class="pt-6 pb-2">
                <BaseSkeleton height="12px" width="100px" />
            </div>
        </div>
    </div>
</template>
