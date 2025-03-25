<template>
	<div class="canvas-demo">
		<button @click="makeWorker">开始绘图</button>
		<canvas :ref="refCanvas" width="300" height="150"></canvas>
	</div>
</template>

<script setup lang="ts" name="workerCanvas">
	import { reactive, ref } from 'vue';
	// import Worker from 'worker-loader!../worker/canvas-worker.ts?inline=false';

	const refCanvas = ref();
	const makeWorker = () => {
		const worker = new Worker('../worker/canvas-worker.ts', {type: 'module'});
		// 使用canvas的transferControlToOffscreen函数获取一个OffscreenCanvas对象
		const offscreen = refCanvas.value.transferControlToOffscreen?.();
		// 注意：第二个参数不能省略
		worker.postMessage({ canvas: offscreen }, [offscreen]);
    };
</script>

<style scoped lang="scss">
	@import url('./index.scss');
</style>

