<template>
    <div>
        <NavBar></NavBar>
        <div class="content">
            <h2>全部员工</h2>
            <ContentBox icon="ios-apps" name="筛选">
                选择角色：
                <select style="width: 15%;margin-right: 5%;display: inline-block;" class="form-control" v-model="selectType">
                    <option value="all" selected>全部</option>
                    <option value="admin">管理员</option>
                    <option value="normal">普通用户</option>
                </select>
                输入搜索：
                <input style="width: 15%;margin-right: 5%;display: inline-block;" type="text" class="form-control" placeholder="输入员工姓名或账号" v-model="selectString">
            </ContentBox>
            <ContentBox icon="ios-menu" name="员工列表">
                <div style="width: 100%;margin-bottom: 10px;text-align: right">
                    <router-link :to="{path:'/editWorker'}" query="work_number:-1">
                        <button type="button" class="btn btn-default"><i class="fa fa-plus-square"></i> 新增员工 </button>
                    </router-link>
                </div>
                <Table stripe border :columns="columns" :data="showRows" ref="table" @on-selection-change="setSelectedData"></Table>
                <div style="margin: 10px">
                    <Button class="btn btn-primary" @click="handleSelectAll()">全选</Button>
                    <Button class="btn btn-danger" @click="deleteSelected()">批量删除</Button>
                    <div style="float: right;vertical-align: center">
                        <Page show-elevator style="font-size: 10px" simple :page-size="this.pageSize" :total="this.page_count" :current="1" @on-change="changePage"></Page>
                    </div>
                </div>
            </ContentBox>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import ContentBox from '../components/ContentBox'
export default {
  components: {
    ContentBox,
    NavBar
  },
  name: 'AllWorkers',
  data () {
    return {
      selectString: '',
      selectType: 'all',
      pageSize: 15,
      selectAll: false,
      page_num: 1,
      worker_count: 150,
      selectedData: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '工号',
          key: 'id',
          width: '100%'
        },
        {
          title: '姓名',
          key: 'name',
          width: '150%'
        },
        {
          title: '手机',
          key: 'phone',
          width: '130%'
        },
        {
          title: '角色',
          key: 'role',
          width: '100%',
          render: (h, params) => {
            return h('span', {}, params.row.role === 1 ? '管理员' : '普通用户')
          }
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '添加时间',
          key: 'createTime',
          width: '180%'
        },
        {
          title: '操作',
          key: 'oper',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/editWorker',
                      query: {
                        id: params.row.id
                      }
                    })
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.deleteWorker(params.row.id)
                    // this.$router.push({
                    //     path: '/editWorker',
                    //     query: {
                    //         number: params.row.number
                    //     }
                    // })
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      allRows: []
    }
  },
  created () {
    this.getTableData()
  },
  computed: {
    page_count () {
      return this.rows.length
    },
    rows () {
      if (this.selectString === '' && this.selectType === 'all') {
        return this.allRows
      } else {
        let listRes = []
        if (this.selectType === 'all') {
          this.allRows.forEach(item => {
            let strNumber = '' + item.number
            let strName = '' + item.name
            if (strNumber.indexOf(this.selectString) !== -1 || strName.indexOf(this.selectString) !== -1) {
              listRes.push(item)
            }
          })
        } else {
          this.allRows.forEach(item => {
            var selectType = -1
            if (this.selectType === 'admin') {
              selectType = 1
            } else {
              selectType = 0
            }
            if (item.role === selectType) {
              let strNumber = '' + item.number
              let strName = '' + item.name
              if (strNumber.indexOf(this.selectString) !== -1 || strName.indexOf(this.selectString) !== -1) {
                listRes.push(item)
              }
            }
          })
        }
        return listRes
      }
    },
    showRows () {
      return this.rows.slice((this.page_num - 1) * this.pageSize, this.page_num * this.pageSize)
    }
  },
  methods: {
    deleteSelected () {
      if (this.selectedData.length === 0) {
        return
      }
      let listDeleteNumber = []
      this.selectedData.forEach(item => {
        listDeleteNumber.push(item.id)
      })
      console.log(listDeleteNumber)
      this.deleteUsers(listDeleteNumber)
      this.getTableData()
    },
    refresh () {
      this.$router.go(0)
    },
    deleteWorker (id) {
      // TODO 让用户确认一下
      this.deleteUsers([id])
    },
    deleteUsers (ids) {
      this.$http.post(this.$baseUrl + '/user/deleteUsers',
        ids)
        .then((response) => {
          if (response.body.code === 1) {
            this.$Message.success(response.body.msg)
            this.getTableData()
          } else {
            this.$Message.error(response.body.msg)
          }
        }).catch(response => {
          console.log(response)
        })
    },
    getTableData () {
      this.$http.get(this.$baseUrl + '/user/getAll').then(function (res) {
        console.log(res)
        this.allRows = res.body.data
        this.worker_count = res.body.worker_count
      }, function (res) {
        console.log(res)
      })
    },
    changePage (pageNum) {
      this.page_num = pageNum
    },
    setSelectedData (selection) {
      this.selectedData = selection
    },
    compareObject (obj1, obj2) {
      let attrs1 = Object.keys(obj1)
      let attrs2 = Object.keys(obj2)
      console.log(obj1)
      console.log(obj2)
      if (attrs1.length !== attrs2.length) {
        return false
      }
      for (let j = 0; j < attrs1.length; j++) {
        let attrNames = attrs1[j]
        if (obj1[attrNames] !== obj2[attrNames]) {
          return false
        }
      }
      return true
    },
    handleSelectAll () {
      this.selectAll = !this.selectAll
      this.$refs.table.selectAll(this.selectAll)
    }
  }
}
</script>

<style scoped>

</style>
