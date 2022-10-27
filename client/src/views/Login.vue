<template>
    <div>
        <p>账号：<input type="text" v-model="user.loginId" autocomplete="new-password" /></p>
        <p>密码：<input type="password" v-model="user.loginPwd" autocomplete="new-password" /></p>
        <p>
            <button @click="handleClick">登录</button>
        </p>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { login } from '../service/login'
import { useRouter } from 'vue-router'
import useRootStore from '../store'
const rootStore = useRootStore()
const router = useRouter()
const user = reactive({
    loginId: 'wff',
    loginPwd: '123456'
})
const handleClick = async () => {
    const res = await login(user.loginId, user.loginPwd)

    if (res.data.data) {
        rootStore.setToken(res.data.data)
        router.push('/')
    }
}
</script>

<style></style>
