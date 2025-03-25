<template>
	<div class="data-list">
		<div class="calc-list">
			<div class="calc-tip">选择表格的计算类型</div>
			<el-checkbox-group v-model="state.checkList">
				<el-checkbox v-for="item in calcList" :key="item.type" :label="item.title"></el-checkbox>
			</el-checkbox-group>
			<el-select v-model="state.selectValue" placeholder="选择加权因子" :disabled="!state.checkList.includes('加权平均')" @change="selectChange">
				<el-option v-for="item in state.selectOptions" :key="item.Alias" :label="item.title" :value="item.Alias"> </el-option>
			</el-select>
		</div>
		<div class="table-list">
			<vxe-table
				ref="refVxeTable"
				size="mini"
				height="800"
				stripe
				border
				show-overflow
				show-footer
				auto-resize="true"
				highlight-current-row
				highlight-hover-row
				show-header-overflow
				show-footer-overflow
				:scroll-x="{enabled: true, gt: 15}"
				:scroll-y="{enabled: true, gt: 0}"
				:data="state.tableData"
				:merge-footer-items="footerItems"
				:footer-method="footerMethods"
			>
				<vxe-table-column
					v-for="item in head"
					:field="item.Alias"
					:title="item.title"
					:key="item.Alias"
					resizable
					:fixed="item.fixed ? 'left' : ''"
					:width="item.width ? item.width : 150"
				>
				</vxe-table-column>
			</vxe-table>
		</div>
	</div>
</template>

<script setup lang="ts" name="workerTable">
	import { reactive, ref, watch, onMounted, onUnmounted } from 'vue';
	import { head, calcList, table } from '../table-data';

	
	// import calcWorker from 'worker-loader!../worker/calc-worker.ts?inline=false';
	// import dataWorker from 'worker-loader!../worker/data-worker.ts?inline=false';
	// const worker = new Worker('../worker/canvas-worker.ts', {type: 'module'});

	interface IDataMap {
		[key: string]: Array<number | string>;
	}
	interface ICalcInfo {
		calcType: {
			title: string;
			type: string;
		};
		columnList: typeof head;
		dataMap: IDataMap;
		selectValue: string;
	}
	type IStrNum = number | string;

	const refVxeTable = ref();
	const footerItems = reactive<{
		row: number;
		col: number;
		rowspan: number;
		colspan: number;
	}[]>([
        { row: 0, col: 0, rowspan: 1, colspan: 1 },
        { row: 1, col: 0, rowspan: 1, colspan: 1 },
        { row: 2, col: 0, rowspan: 1, colspan: 1 },
        { row: 3, col: 0, rowspan: 1, colspan: 1 },
        { row: 4, col: 0, rowspan: 1, colspan: 1 },
        { row: 5, col: 0, rowspan: 1, colspan: 1 },
        { row: 6, col: 0, rowspan: 1, colspan: 1 },
        { row: 7, col: 0, rowspan: 1, colspan: 1 },
        { row: 8, col: 0, rowspan: 1, colspan: 1 },
        { row: 9, col: 0, rowspan: 1, colspan: 1 },
        { row: 10, col: 0, rowspan: 1, colspan: 1 },
        { row: 11, col: 0, rowspan: 1, colspan: 1 }
    ]);
	const state = reactive<{
		head: typeof head;
		calcList: typeof calcList;
		tableData: typeof table;
		checkList: IStrNum[];
		footerList: IStrNum[];
		selectValue: string;
		selectOptions: typeof head;
		workerList: {
			[key: string]: Worker;
		}[];
		dataMap: IDataMap;
		footerData: IStrNum[][]
	}>({
		head,
		calcList,
		tableData: table,
		checkList: [], // 已选计算类型的集合
		footerList: [], // 底部统计的数据
		selectValue: '', // 加权因子
		selectOptions: head.filter((item) => item.Alias !== 'key'), // 获取所有列的集合
		workerList: [], // 存放所有的worker
		dataMap: {},
		footerData: []
	});

	onMounted(() => {
		const worker = new Worker('../worker/data-worker.ts', {type: 'module'});
		worker.postMessage(table);
		worker.addEventListener('message', (e) => {
			worker.terminate();
			state.tableData = state.tableData.concat(e.data);
			getDataMap();
		});
	});
	

	watch(
		() => state.checkList,
		(newVal) => {
			console.log(newVal, refVxeTable.value);
			// 刷新列
			refVxeTable.value.refreshColumn?.();
			// 重新计算统计数据
			refVxeTable.value.handleDefaultMergeFooterItems?.();
		}
	);

	// 触发统计计算
    function footerMethods() {
		if (state.checkList.length) {
			const { dif, add } = getCalcChange();
			if (!add) {
				// 取消对应的选项，删除对应统计
				state.footerData.forEach((item, key) => {
					if (item[0] == dif) {
						state.footerData.splice(key, 1);
					}
				});
			}
			else {
				state.footerData.push([dif]);
				if (!(dif === '加权平均' && !state.selectValue)) {
					makeWorker({
						calcType: state.calcList.filter((item) => item.title == dif)[0],
						columnList: state.selectOptions,
						dataMap: state.dataMap,
						selectValue: state.selectValue
					});
				}
			}
		}
		else {
			state.footerData = [];
		}
		return state.footerData;
    }
    // 获取统计项发生变化 增加 or 减少（差集）
    function getCalcChange() {
		const footerList = state.footerData.map((item) => item[0]).filter((item) => item);
		let difList = [];
		if (state.checkList.length > footerList.length) {
			difList = state.checkList.filter((item) => !footerList.includes(item));
		}
		else {
			difList = footerList.filter((item) => !state.checkList.includes(item));
		}
		return {
			dif: difList[0],
			add: footerList.length > state.checkList.length ? false : true,
		};
    }
    function selectChange(val: string) {
		makeWorker({
			calcType: state.calcList.filter((item) => item.title === '加权平均')[0],
			columnList: state.selectOptions,
			dataMap: state.dataMap,
			selectValue: val
		});
    }
    // 创建计算worker
    function makeWorker(calcInfo: ICalcInfo) {
		const workerName = `worker${state.workerList.length}`;
		const worker = new Worker('../worker/calc-worker.ts', {type: 'module'})
		let start = performance.now();
		worker.postMessage(calcInfo);
		worker.addEventListener('message', (e) => {
			worker.terminate();
			state.footerData.forEach((data, key) => {
			if (data[0] == e.data[0]) {
				state.footerData.splice(key, 1, e.data); // 原位置替换
			}
			});
			let end = performance.now();
			let duration = end - start;
			console.log(`当前任务: ${e.data[0]}, 计算用时: ${duration} 毫秒`);
		});
		state.workerList.push({[workerName]: worker});
    }
    // 将所有数据按每个列进行统计
    function getDataMap() {
		const dataMap: IDataMap = {};
		state.selectOptions.forEach((item) => {
			dataMap[item.Alias] = state.tableData.map((val) => {
				return val[item.Alias as keyof typeof val];
			});
		});
		state.dataMap = dataMap;
    }
	function clearWorker() {
		if (state.workerList.length) {
			state.workerList.forEach((item, key) => {
				const val = `worker${key}`;
				const worker = item[val as keyof typeof item];
				if (worker) {
					worker.terminate(); // 终止所有线程
				}
			});
		}
	}
	onUnmounted(() => {
		// 销毁worker
		clearWorker();
	});
</script>

<style scoped lang="scss">
	@import url('./index.scss');
</style>

