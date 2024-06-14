<template>
    <el-upload
        class="upload-demo"
        ref="upload"
        :http-request="uploadFile"
        :on-change="handleChange"
        :auto-upload="false"
        :before-upload="beforeUpload"
        :multiple="false"
    >
        <el-button slot="trigger" type="primary">选取文件</el-button>
        <el-button @click="submitUpload">上传</el-button>
    </el-upload>
</template>

<script setup lang="ts">
    import MD5 from 'crypto-js/md5';
    import { useMain } from '@/stores/home'
    import { storeToRefs } from 'pinia';
    import {ref, reactive} from 'vue';

    interface RawFile {
        raw: File;
    }
    const state = reactive({
        file: null,
        chunkSize: 2 * 1024 * 1024, // 2MB
        uploadedChunks: [],
        fileHash: '',
    });
    
    const calculateHash = (file: RawFile['raw']) => {
        const chunkSize = state.chunkSize;
        const chunks = Math.ceil(file.size / chunkSize);
        const spark = new SHA256.ArrayBuffer();
        let currentChunk = 0;

        const fileReader: FileReader = new FileReader();
        fileReader.onload = e => {
            spark.append(e.target.result);
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            }
            else {
                state.fileHash = spark.end();
                console.log('文件哈希值:', state.fileHash);
            }
        };

        const loadNext = () => {
            const start = currentChunk * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            fileReader.readAsArrayBuffer(file.slice(start, end));
        };

        loadNext();
    };
    const uploadFile = async () => {
        const response = await fetch(`http://localhost:3000/check-file?hash=${state.fileHash}`);
        const { exists } = await response.json();

        if (exists) {
            console.log('文件已存在，秒传成功');
            return;
        }

        const chunkCount = Math.ceil(state.file.size / state.chunkSize);
        const uploadedChunksResponse = await fetch(`http://localhost:3000/uploaded-chunks?fileName=${state.file.name}`);
        state.uploadedChunks = await uploadedChunksResponse.json();

        for (let i = 0; i < chunkCount; i++) {
            if (state.uploadedChunks.includes(i)) continue;

            const chunk = state.file.slice(i * state.chunkSize, (i + 1) * state.chunkSize);
            const formData = new FormData();
            formData.append('chunk', chunk);
            formData.append('index', i);
            formData.append('fileName', state.file.name);
            formData.append('hash', state.fileHash);
            await uploadChunk(formData);
        }
    };
    const uploadChunk = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            state.uploadedChunks.push(result.index);
            console.log(result);
        } catch (error) {
            console.error('上传失败:', error);
        }
    };
    const submitUpload = () => {
        uploadFile();
    };
    const handleChange = (file: RawFile) => {
        state.file = file.raw;
    };
    const beforeUpload = (file: RawFile['raw']) => {
        state.file = file;
        calculateHash(file);
        return false;
    };
</script>

<style scoped>
</style>
