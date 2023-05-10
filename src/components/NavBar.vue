<!-- NavBar -->

<script setup lang="ts">
</script>
<template>
  <header>
    <router-link class="w-10 h-10 absolute lg:fixed m-2 select-none outline-none" to="/" focusable="false">
      <img src="/book.svg" alt="" class="w-10 h-10">
    </router-link>
    <!-- [rgba(40,44,52,.5)] -->
    <nav class="w-full p-4 box-border flex justify-end gap-5">
      <router-link to="/" title="Blog">
        <span>/</span>
      </router-link>
      <router-link to="/homes" title="Blog">
        <span>知识汇总</span>
      </router-link>
      <router-link to="/about" title="Blog">
        <span>about</span>
      </router-link>
      <a href="https://www.instagram.com/lrsoy_/" target="_blank" title="Instagram">
        <Ins />
      </a>
      <a href="https://github.com/lrsoy" target="_blank" title="Github">
        <Github />
      </a>
    </nav>
  </header>
</template>

<style  scoped></style>
