<script setup lang="ts">
import {} from "vue";
</script>

<template>
  <div class="h-[100vh] flex flex-col">
    <div class="header h-[50px] bg-pink text-center">Header</div>
    <div class="main flex flex-1 bg-[lavenderblush]">
      <router-view />
    </div>
    <div class="footer h-[50px] bg-[paleturquoise] text-center">Footer</div>
  </div>
</template>

<style></style>
