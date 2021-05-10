/*
 * @Descripttion: 
 * @version: 
 * @Author: lintingting
 * @Date: 2020-08-21 17:38:56
 * @LastEditors: lintingting
 * @LastEditTime: 2020-08-24 16:00:38
 */
import request from '@/utils/request'

// 获取当前抽奖最新的轮次信息
export function getLatestRecord(projectId) {
  return request({
    url: '/lottery/record/getLatestRecord',
    method: 'get',
    params: {projectId}
  })
}

// 开始抽奖
export function partLotteryRecord(data) {
  return request({
    url: '/lottery/record/partLotteryRecord',
    method: 'post',
    data: data
  })
}

// 合并抽奖
export function mergeLotteryRecord(data) {
  return request({
    url: '/lottery/record/mergeLotteryRecord',
    method: 'post',
    data: data
  })
}

// 关闭摇号登记
export function closeLotteryRegister(data) {
  return request({
    url: '/lottery/record/closeLotteryRegister',
    method: 'post',
    data: data
  })
}
