import { defineStore } from 'pinia'

const useRootStore = defineStore('root', {
    state: () => {
        return {
            token: ''
        }
    },
    actions: {
        setToken(token) {
            this.token = token
        },
    },
    persist: true
})

export default useRootStore
