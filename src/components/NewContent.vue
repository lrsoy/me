<!-- NewContent -->
<script setup lang="ts">
</script>
<template>
  <div class="NewContent">
    <div class="banner">
      <img src="/image/th.jpg" alt="">
    </div>
    <div class="content">
      <router-view #default="{ Component, route }">
        <Transition :appear="true" enter-active-class="admin_fadeInRight" leave-active-class="admin_fadeOutLeft">
          <component :is="Component" class="component-cls" />
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<style  lang="scss">
.NewContent {
  display: grid;
  grid-template-columns: 560px 1fr;
  height: 100%;
  overflow: hidden;


  .banner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 20px 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    box-sizing: border-box;
    margin: 40px 28px 40px 0;
    background-color: #121213;
    overflow-y: auto;
    position: relative;
    border: 3px solid #1c1c1d;
    border-left: none;
  }
}
</style>
