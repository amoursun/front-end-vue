<template>
	<div class="theme-setting">
		<i :class="'iconfont icon-zhuti'" class="toolBar-icon" @click="openDrawer" id="themeSettingGuide"></i>
	</div>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mitt-bus';
const openDrawer = () => {
	mittBus.emit('openThemeDrawer');
};
</script>