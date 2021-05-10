<!--
 * @Descripttion:
 * @version:
 * @Author: lintingting
 * @Date: 2020-08-18 09:18:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-06 17:31:27
-->
<template>
  <el-row v-loading="loading">
    <el-col :span="22" :offset="1" style="margin-top: 30px;min-width: 1150px">
      <el-row>
        <el-tag style="font-weight: 600;width: 100%;height: 50px;font-size: 20px;line-height: 2.3;padding-left: 20px">
          公证摇号项目查询
        </el-tag>
      </el-row>
      <el-row class="mt30">
        <el-col :span="24">
          <el-form :model="queryParams" ref="queryForm" label-width="120px">
            <el-col :span="8">
              <el-form-item label="项目编号" prop="projectNo">
                <el-input v-model="queryParams.projectNo" placeholder="请输入项目编号" clearable size="small"
                  style="width: 240px" @keyup.enter.native="handleQuery" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="摇号项目主题" prop="projectTheme">
                <el-input v-model="queryParams.projectTheme" placeholder="请输入摇号项目主题" clearable size="small"
                  style="width: 240px" @keyup.enter.native="handleQuery" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目状态" prop="projectStatus">
                <el-select v-model="queryParams.projectStatus" placeholder="请选择下拉选择" clearable size="small"
                  style="width: 240px">
                  <el-option v-for="item in statusOptions" :key="item.dictValue" :label="item.dictLabel"
                    :value="item.dictValue" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="委托企业" prop="entrustedEnterprise">
                <el-input v-model="queryParams.entrustedEnterprise" placeholder="请输入委托企业" clearable size="small"
                  style="width: 240px" @keyup.enter.native="handleQuery" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="8">
              <el-button class="fr" icon="el-icon-refresh" size="small" @click="resetQuery">重置</el-button>
              <el-button class="fr mr20" type="primary" icon="el-icon-search" size="small" @click="handleQuery">搜索
              </el-button>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="mt20">
        <el-table :data="projectList">
          <el-table-column label="项目编号" align="center" prop="projectNo" />
          <el-table-column label="摇号项目主题" align="center" prop="projectTheme" :show-overflow-tooltip="true" />
          <el-table-column label="委托企业" align="center" prop="entrustedEnterprise" :show-overflow-tooltip="true" />
          <el-table-column label="创建时间" align="center" prop="createTime" :show-overflow-tooltip="true" />
          <el-table-column label="项目状态" align="center" prop="projectStatus" :formatter="statusFormat"
            :show-overflow-tooltip="true" />
          <el-table-column label="操作" align="center" width="350" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" v-if="scope.row.projectStatus === 10"
                @click="editProject(scope.row)">修改
              </el-button>
              <el-button size="mini" type="text" icon="el-icon-s-operation" @click="detail(scope.row)">详情
              </el-button>
              <el-button v-if="scope.row.userId !== 1 && scope.row.projectStatus !== 40" size="mini" type="text"
                icon="el-icon-odometer" @click="lotteryPage(scope.row)">摇号
              </el-button>
              <el-button v-if="scope.row.projectStatus === 10" icon="el-icon-circle-close" size="mini" type="text"
                @click="closeLottery(scope.row)">关闭摇号
              </el-button>
              <el-button size="mini" type="text" icon="el-icon-delete" @click="deleteLottery(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="mb30">
          <el-col :span="8" :offset="8">
            <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum"
              :limit.sync="queryParams.pageSize" @pagination="getProjects" />
          </el-col>
        </el-row>
      </el-row>
    </el-col>
    <lottery-dialog ref="lotteryDialog" @lotteryDialogClose="lotteryDialogClose"></lottery-dialog>
  </el-row>
</template>

<script>
  import {
    changeProjectStatus,
    deleteProject,
    listProject
  } from '../../../api/lottery/project'

  export default {
    name: 'index',
    data() {
      return {
        // 总条数
        total: 0,
        loading: false,
        projectList: [],
        // 状态数据字典
        statusOptions: [{
            dictLabel: '全部',
            dictValue: undefined
          }, {
            dictLabel: '待摇号',
            dictValue: '10'
          },
          {
            dictLabel: '摇号中',
            dictValue: '20'
          },
          {
            dictLabel: '已摇号',
            dictValue: '30'
          },
          {
            dictLabel: '已关闭',
            dictValue: '40'
          }
        ],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          projectNo: undefined,
          projectTheme: undefined,
          projectStatus: undefined,
          entrustedEnterprise: undefined
        }
      }
    },
    created() {
      this.getProjects()
    },
    methods: {
      //删除摇号项目
      deleteLottery(row) {
        let projectId = row.id
        let that = this
        this.$confirm('是否删除该项目?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.loading = true
          return deleteProject(projectId)
        }).then(response => {
          if (response.code === 200) {
            this.msgSuccess(response.msg)
            that.loading = false
            this.getProjects()
          }
        }).catch(function () {
          that.loading = false
        })
      },
      //摇号页面关闭时间触发
      lotteryDialogClose() {
        this.$router.go(0)
      },
      // 字典状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.projectStatus.toString())
      },
      /** 查询项目列表 */
      getProjects() {
        this.loading = true
        listProject(this.queryParams).then(response => {
          this.projectList = response.rows
          this.total = response.total
          this.loading = false
        })
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm')
        this.handleQuery()
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.page = 1
        this.getProjects()
      },
      /** 详情页面 */
      detail(row) {
        this.$router.push({
          path: '/project/detail',
          query: {
            projectId: row.id
          }
        })
      },
      /** 摇号页面 */
      lotteryPage(row) {
        this.$refs.lotteryDialog.init(row.id, row.lotteryWay)
      },

      /** 关闭摇号*/
      closeLottery(row) {
        const that = this
        this.$confirm('确认要关闭摇号吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.loading = true
          changeProjectStatus(row.id, 40).then(response => {
            that.loading = false
            that.getProjects()
          })
        })
      },
      /** 修改项目*/
      editProject(row) {
        this.$router.push({
          path: '/project/establish',
          query: {
            projectId: row.id
          }
        })
      }
    }
  }

</script>

<style>

</style>
