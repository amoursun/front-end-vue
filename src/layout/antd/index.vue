<template>
    <a-layout class="antd-layout">
        <a-layout-sider v-model:collapsed="collapsed" collapsible class="antd-sider">
            <div class="logo" />
            <a-menu
                v-model:selectedKeys="selectedKeys"
                mode="inline"
                theme="dark"
                :items="items"
                @click="handleClick"
            ></a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="antd-header">
                Header
            </a-layout-header>
            <a-layout-content>
                <!-- <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item>Bill</a-breadcrumb-item>
                </a-breadcrumb> -->
                <div class="main-content">
                    <MainAntd />
                </div>
            </a-layout-content>
            <a-layout-footer class="antd-footer">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts" name="layoutTransverse">
import { ref, computed, watchEffect, reactive, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {routes} from '@/router/pages';
import {
    MailOutlined, AppstoreOutlined, SettingOutlined,
} from '@ant-design/icons-vue';
import type {MenuProps, ItemType} from 'ant-design-vue';
import { useAuthStore } from '@/stores/modules/auth';
import SubMenu from '@/layout/components/menu/sub-menu.vue';
import MainAntd from '@/layout/components/main/antd.vue';

const iconMap = {
    0: MailOutlined,
    1: AppstoreOutlined,
    2: SettingOutlined,
};
const items = reactive(
    routes.filter(item => {
        return item.meta?.notMenu !== true;
    }).map((item, index) => {
        const {path, name, meta} = item;
        const Icon = iconMap[index % 3];
        return {
            key: path,
            icon: () => h(Icon),
            label: meta?.title || name,
            title: meta?.title,
            // children,
        };
    })
);

const selectedKeys = ref<string[]>([routes[0].path]);
const collapsed = ref<boolean>(false);

const route = useRoute();
const authStore = useAuthStore();
const router = useRouter();

const handleClick: MenuProps['onClick'] = (e) => {
	router.push(e.key);
};

// watch(
//   () => state.openKeys,
//   (_val, oldVal) => {
//     state.preOpenKeys = oldVal;
//   },
// );
// watchEffect(() => {
	
// });
</script>

<style scoped lang="scss">
@import url("./index.scss");
</style>


