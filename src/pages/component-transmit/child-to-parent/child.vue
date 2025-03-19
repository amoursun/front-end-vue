<template>
	<div class="child">
		<input type="text" v-model="msg" />
		<button @click="onHandler">发送信息给父级</button>
	</div>
</template>
<script setup lang="ts" name="Child">
	import {defineEmits, ref} from 'vue';
	const msg = ref('我是子组件');
	const emit = defineEmits(['handler']);
	function onHandler() {
		emit('handler', msg.value);
	}
</script>

<style scoped lang="scss">
	.child{
		margin-top: 20px;
		border: 1px solid #CCC;
		padding: 10px;
	}
</style>
