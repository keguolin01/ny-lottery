/*
 * @Author: your name
 * @Date: 2020-11-06 09:00:41
 * @LastEditTime: 2020-11-06 17:26:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /notarization-lottery-admin-web/src/api/lottery/project.js
 */
import request from '@/utils/request'
import { praseStrEmpty } from "../../utils/ruoyi";

// 查询项目列表
export function listProject(query) {
  return request({
    url: '/lottery/project/list',
    method: 'get',
    params: query
  })
}

// 获取当个项目信息
export function getProject(query) {
  return request({
    url: '/lottery/project',
    method: 'get',
    params: query
  })
}

// 新增项目
export function addProject(data) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
    },
    url: '/lottery/project',
    method: 'post',
    timeout: 1200000,
    data: data
  })
}

// 项目状态修改
export function changeProjectStatus(id, projectStatus) {
  const data = {
    id,
    projectStatus
  }
  return request({
    url: '/lottery/project/projectStatus',
    method: 'put',
    data: data
  })
}

// 删除当个项目信息
export function deleteProject(query) {
  return request({
    url: '/lottery/project/delete/' + praseStrEmpty(query),
    method: 'get',
  })
}

// 更新项目
export function updateProject(data) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
    },
    url: '/lottery/project',
    method: 'put',
    timeout: 1200000,
    data: data
  })
}

// 获取项目流水号
export function projectSerialNo(query) {
  return request({
    url: '/lottery/project/serialNo',
    method: 'get',
    params: query
  })
}

// 查询项目创建进度值
export function projectProgress(query) {
  return request({
    url: '/lottery/project/progress?serialNo=' + query,
    method: 'get'
  })
}