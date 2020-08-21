<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App"
  };
</script>
<style lang="scss">

  .el-message-box {
    width: 100%;
  }

  .el-message-box__btns .el-button:first-child {
    display: none;
  }
</style>