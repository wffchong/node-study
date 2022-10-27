<template>
    <div class="about">
        <h1>这是一个受保护的页面，必须要登录后才能访问</h1>
        <input type="text" name="a" v-model="valueA" />
        <input type="text" name="b" v-model="valueB" />
        <input type="file" name="img" accept="image/*" multiple @change="handleUpload" />
        <img :src="imgSrc" alt="" />
        <hr />
        <h2>下载</h2>
        <a :href="downloadSrc">下载</a>
        <hr />
        <button @click="logout">退出登录</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useRooterStore from '../store'
import { upload } from '../service/upload'
const rootStore = useRooterStore()

const imgSrc = ref('')
const valueA = ref('')
const valueB = ref('')
const downloadSrc = ref('../assets/vue.svg')

onMounted(() => {
    
})

const logout = () => {
    rootStore.setToken('')
    location.href = '/'
}

const handleUpload = async e => {
    console.log(e.target.files)
    const formData = new FormData()
    formData.append('a', valueA.value)
    formData.append('b', valueB.value)
    let idx = 0
    for (const file of e.target.files) {
        console.log(file)
        formData.append(`img`, file, file.name)
    }
    const res = await upload(formData)
    // 这里应该拿到的是服务器解析过后返回的url,但是暂时没有服务器，后续再处理
    imgSrc.value = res.data.data
}
</script>
