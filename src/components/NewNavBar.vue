<!-- NewNavBar -->
<script setup lang="ts">
</script>
<template>
  <header>
    <div class="title">
      <router-link class="w-10 h-10 absolute  select-none outline-none " to="/" focusable="false">
        <img src="/book.svg" alt="" class="w-10 h-10">
      </router-link>
      <nav class="nav">
        <div class="right">
          <router-link to="/" title="Blog">
            <span>
              <i class="i-fxemoji-books"></i>
              知识汇总
            </span>
          </router-link>
          <router-link to="/question" title="Blog">
            <span>
              <i class="i-icon-park-error"></i>
              问题合集
            </span>
          </router-link>
          <a href="https://github.com/lrsoy" target="_blank" title="github">
            <span>
              <i class="i-devicon-github"></i>
              Github
            </span>
          </a>
          <a href="https://www.instagram.com/lrsoy_" target="_blank" title="github">
            <span>
              <i class="i-skill-icons-instagram"></i>
              instagram
            </span>
          </a>
        </div>
      </nav>

    </div>
  </header>
</template>

<style  lang="scss">
header {
  width: 100%;
  height: auto;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;

  .title {
    height: 64px;
    box-sizing: border-box;
    border-bottom: 1px solid #d7d7d7;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    padding: 12px 20px;
    background-color: white;
  }

  .nav {
    width: 100%;
    display: grid;
    // grid-template-columns: auto max-content;

    .right {
      margin: auto;
      line-height: 40px;
      display: grid;
      grid-gap: 1.2rem;
      grid-auto-flow: column;
      font-weight: 500;
      white-space: nowrap;
      font-size: .9rem;
    }
  }
}
</style>
