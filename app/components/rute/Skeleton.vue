<template>
    <div class="space-y-6 md:space-y-8">
        <div v-for="i in 3" :key="i" class="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div class="flex flex-col md:flex-row justify-between gap-6">
                <!-- Trip Info -->
                <div class="flex gap-4 items-start">
                    <BaseSkeleton height="48px" width="48px" rounded="12px" />
                    <div class="space-y-2">
                        <BaseSkeleton height="20px" width="150px" />
                        <BaseSkeleton height="14px" width="200px" />
                    </div>
                </div>
                <!-- Price info -->
                <div class="flex flex-col items-end gap-2">
                    <BaseSkeleton height="24px" width="100px" />
                    <BaseSkeleton height="14px" width="60px" />
                </div>
            </div>

            <!-- Trip Details Divider -->
            <div class="border-t border-dashed border-gray-100 pt-6 flex justify-between">
                <div class="flex gap-8">
                    <div v-for="j in 2" :key="j" class="space-y-1">
                        <BaseSkeleton height="12px" width="60px" />
                        <BaseSkeleton height="18px" width="80px" />
                    </div>
                </div>
                <BaseSkeleton height="36px" width="120px" rounded="10px" />
            </div>
        </div>
    </div>
</template>
