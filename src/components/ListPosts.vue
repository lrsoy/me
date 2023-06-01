<!-- ListPosts 文章列表-->

<script setup lang="ts">
import { formatDate } from '~/logics'


const props = defineProps<{
  address?: string
  type?: string
  posts?: []
}>()
console.log(props);

</script>
<template>
  <div class="ListPosts">
    创建组件
  </div>
</template>

<style  lang="scss">
.ListPosts {}
</style>
