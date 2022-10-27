<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/vue.svg" />
        <h1>这是首页，能匿名访问</h1>
        <button @click="goProject">去受保护页面</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goProject = () => {
    router.push('/project')
}
</script>
