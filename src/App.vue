<!-- App -->

<script setup lang="ts">
</script>
<template>
  <!-- <ClientOnly>
    <Plum />
  </ClientOnly> -->
  <!-- <NavBar />
  <main>
    <router-view />
  </main> -->
  <footer>
    <div class="copyright">
      <a href="/" target="_blank">LauYing</a>&copy; 2023 made by love
      <MaterialSymbolsFavorite />
    </div>
  </footer>
  <NewNavBar />
  <main>
    <router-view />
  </main>
</template>

<style  lang="scss">
#app {
  width: 100vw;
  height: 100vh;

  footer {
    position: fixed;
    left: 0;
    top: 0;
    width: 48px;
    height: 100%;

    .copyright {
      position: absolute;
      left: 0;
      bottom: 0;
      display: block;
      letter-spacing: 1.7px;
      color: #c5c5c5;
      font-size: 15px;
      white-space: nowrap;
      margin: 0;
      line-height: 48px;
      transform-origin: left top;
      transform: rotate(-90deg);
    }
  }

  main {
    box-sizing: border-box;
    padding: 100px 48px 20px 48px;
    overflow: hidden;
  }
}
</style>
