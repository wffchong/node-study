import request from './request'

export const login = (loginId, loginPwd) => {
    return request().post('/api/admin/login', { loginId, loginPwd })
}

export function loginOut() {
    localStorage.removeItem('token')
}

export async function whoAmI() {
    await delay(2000)
    const resp = await request().get('/api/admin/whoami')
    return resp.data
}
