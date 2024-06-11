<template>
    <a-layout class="antd-layout">
        <a-layout-sider v-model:collapsed="collapsed" collapsible class="antd-sider">
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item key="1">
                    <user-outlined />
                    <span>nav 1</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <video-camera-outlined />
                    <span>nav 2</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <upload-outlined />
                    <span>nav 3</span>
                </a-menu-item>
            </a-menu>
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
import { ref, computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/modules/auth';
import SubMenu from '@/layout/components/menu/sub-menu.vue';
import MainAntd from '@/layout/components/main/antd.vue';

const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);

const route = useRoute();
const authStore = useAuthStore();
const activeMenu = ref<Array<string>>([]);
const menuList = computed(() => authStore.showMenuListGet);

watchEffect(() => {
	let key = route.meta.activeMenu ? route.meta.activeMenu : route.path;
	activeMenu.value = [key + ''];
});

const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
	if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank');
	router.push(subItem.path);
};
</script>

<style scoped lang="scss">
@import url("./index.scss");
</style>


