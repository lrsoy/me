<!-- 
  components name: OperationPanel
  effect: 首页侧边内容 
-->

<script setup>
</script>
<template>
  <div class="operation_panel">
    <div class="sidebar-profile">
      <a href="#">
        <img src="/image/user_img.jpg" alt="">
      </a>
      <h4 class="sidebar-profile-name">Lau Ying</h4>
      <h5 class="sidebar-profile-bio">
        <p>
          I write code to enrich and ease life of others.
          <br />
          I also ride on two wheels.
        </p>
      </h5>
    </div>
  </div>
</template>

<style  lang="scss">
.operation_panel {
  position: relative;
  overflow: hidden;
  z-index: 1;
  width: 100%;
  height: 100%;


  &::after {
    content: "";
    background-position: center center;
    background-size: cover;
    // background-image: url(/image/aside.jpg);
    background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
    // background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
    position: absolute;
    top: -30px;
    bottom: -30px;
    left: -30px;
    right: -30px;
    filter: blur(10px);
    z-index: -1;
  }

  .sidebar-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    a {
      position: relative;
      display: block;
      width: 100px;
      height: 100px;
      overflow: hidden;
      box-sizing: border-box;
      border-radius: 50%;
      border: 2px solid #fff;
      box-sizing: border-box;
      margin: 20px 0;
    }

    .sidebar-profile-name {
      font-size: 1.1em;
      color: #ebebeb;
      font-family: "Open Sans", sans-serif;
      font-weight: 700;
      text-align: center;

    }

    .sidebar-profile-bio {
      font-weight: 400;
      font-size: 14px;
      color: #ebebeb;
      text-align: center;

    }
  }
}
</style>
