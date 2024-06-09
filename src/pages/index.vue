
<template>
  <div class="home-index">
    home-index
    <div>5555</div>
    <template v-for="(item, index) in icons" :key="index">
      <component :is="item.icon" />
    </template>
  </div>
</template>
<script setup lang="ts">
  import { useIconRender } from '@/utils/icons';
  const { iconRender } = useIconRender();

  const icons = [
    {
      icon: iconRender({ localIcon: '18', color: 'green', fontSize: 30 }),
    },
    {
      icon: iconRender({
        icon: 'material-symbols-light:18mp-outline-rounded',
        color: 'red',
        fontSize: 30,
      }),
    },
  ];
</script>

<style scoped lang="scss">
  .home-index {
    div {
      color: $myScssColor;
    }
  }
</style>

<route lang="json5">
  {
    meta: {
      title: '首页',
      layout: false,
    },
  }
</route>
