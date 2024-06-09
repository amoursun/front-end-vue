<template>
    <div>counter:{{counter}}</div>
    <div>doubleCount:{{doubleCount}}</div>
    <el-button @click="main.randomizeCounter()">counter(round)</el-button>
    <el-button type="primary" @click="main.increment()">counter++</el-button>

    <div>{{name}}</div>
    <el-button @click="amend()">修改</el-button>
</template>

<script setup lang="ts">
    //引入想要的pinia文件 {} 里面就是对应导出的名字
    import { useMain } from '@/stores/home'
    import { storeToRefs } from 'pinia';
    import {ref} from 'vue';
    
    const main = useMain()
    // 解构main里面的state和getters的数据，
    // 使用storeToRefs解构才有响应式，响应式可以直接修改数据，这里只用来渲染
    let {counter, name, doubleCount} = storeToRefs(main);

    //（常用方法三种）
    //常用方法一： 使用数据
    console.log( counter );
    //使用方法(方法目前不能解构)
    main.increment()
    // 常用方法二：修改数据
    counter = 9999;

    //常用方法三：
    //进阶使用$patch，多个修改
    const amend= () => {
        main.$patch((state) => {
            state.counter += 10;
            state.name = '张三'
        })
    };

</script>

<style scoped>
</style>
