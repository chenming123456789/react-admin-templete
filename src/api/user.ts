import service from '@/utils/request'

// 获取用户列表
export const getUserList = (params: any) => {
	return service.get('/user/list', { params })
}

// 删除用户
export const deleteUser = (id: number) => {
	return service.delete(`/user/${id}`)
}

// 新增用户
export const addUser = (data: any) => {
	return service.post('/user', data)
}
