import request from '@/utils/request'

// 查询参与人数
export function participantNum(projectId) {
  const data = {
    projectId
  }
  return request({
    url: '/lottery/participant/total',
    method: 'get',
    params: data
  })
}
