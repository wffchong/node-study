import request from './request'

export const upload = (formData) => {
    return request().post('/api/upload', formData)
}
