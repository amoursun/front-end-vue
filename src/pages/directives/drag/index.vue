<template>
	<div class="content-box">
		<a-alert class="w-100 mb-20" message="拖拽指令 🍇🍇🍇🍓🍓🍓" type="info" />
		<div class="drag-box flx-center" v-draggable>我可以拖拽哦~</div>
	</div>
</template>

<script setup lang="ts" name="dragDirect"></script>

<style scoped lang="scss">
@import url("./index.scss");
</style>
