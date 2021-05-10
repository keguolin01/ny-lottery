/*
 * @Descripttion: 
 * @version: 
 * @Author: lintingting
 * @Date: 2020-08-18 09:18:42
 * @LastEditors: lintingting
 * @LastEditTime: 2020-08-20 15:07:36
 */
import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询摇号信息
export function projectDatail(projectId) {
  return request({
    url: '/lottery/project/'+ praseStrEmpty(projectId),
    method: 'get',
  })
}

// 查询中奖用户列表
export function getWinnerList(query) {
  return request({
    url: '/lottery/winner/getByProjectId',
    method: 'get',
    params: query
  })
}
// 查询参与人信息
export function getParticipantInfo(query) {
  return request({
    url: '/lottery/participant/getByProjectId',
    method: 'get',
    params: query
  })
}
// 取消资格接口
export function recusal(data) {
  return request({
    url: '/lottery/participant/cancelByPartNo',
    method: 'put',
    data: data
  })
}

// 导出
export function exportWinnerList(projectId,customUniqueId) {
  return request({
    url: '/lottery/winner/export/'+ praseStrEmpty(projectId)+'/'+praseStrEmpty(customUniqueId),
    method: 'get'
  })
}

// 新增参与人
export function addParticipant(data) {
  return request({
    url: '/lottery/participant/addParticipant',
    method: 'post',
    data: data
  })
}

// 修改参与人
export function updateParticipant(data) {
  return request({
    url: '/lottery/participant/updateParticipant',
    method: 'post',
    data: data
  })
}