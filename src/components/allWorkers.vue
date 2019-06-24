<template>
    <div>
        <NavBar></NavBar>
        <div style="position: absolute;left: 270px;right: 0;bottom: 0;top: 81px">
            <h2 style="margin: 1% 0 0 1%">全部员工</h2>
            <div style="margin: 3% 0 0 5%">
                选择角色：
                <select style="width: 15%;margin-right: 5%;display: inline-block;" class="form-control" v-model="selectType">
                    <option value="all" selected>全部</option>
                    <option value="admin">管理员</option>
                    <option value="normal">普通用户</option>
                </select>
                输入搜索：
                <input style="width: 15%;margin-right: 5%;display: inline-block;" type="text" class="form-control" placeholder="输入员工姓名或账号" v-model="selectString">
            </div>
            <div style="margin: 0 4% 0 5%;margin-top: 2%">
                <div class="row" style="margin-left:0px">
                    <h4 class="panel-title">员工列表</h4>
                    <div style="float:right;margin-right:30px">
                        <router-link :to="{path:'/editWorker'}" query="work_number:-1">
                            <button type="button" class="btn btn-default"><i class="fa fa-plus-square"></i> 新增员工 </button>
                        </router-link>
                    </div>
                </div>
                <div style="height:20px"></div>
                <Table stripe border :columns="columns" :data="showRows" ref="table" @on-selection-change="setSelectedData"></Table>
                <br>
                <div style="margin-bottom: 5%">
                    <Button class="btn btn-primary" @click="handleSelectAll()">全选</Button>
                    <Button class="btn btn-danger" @click="deleteSelected()">批量删除</Button>
                    <div style="float: right;vertical-align: center">
                        <Page style="font-size: 10px" simple :page-size="this.pageSize" :total="this.page_count" :current="1" @on-change="changePage"></Page>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from './navbar.vue'
export default {
  components: {
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
          key: 'number',
          width: '100%'
        },
        {
          title: '姓名',
          key: 'name',
          width: '150%'
        },
        {
          title: '手机',
          key: 'tel',
          width: '130%'
        },
        {
          title: '角色',
          key: 'type',
          width: '100%'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '添加时间',
          key: 'time',
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
                        number: params.row.number
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
                    this.deleteWorker(params.row.number)
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
            var selectTypeStr = '管理员'
            if (this.selectType === 'admin') {
              selectTypeStr = '管理员'
            } else {
              selectTypeStr = '普通用户'
            }
            if (item.type === selectTypeStr) {
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
        listDeleteNumber.push(item.number)
      })
      console.log(listDeleteNumber)
      this.refresh()
    },
    refresh () {
      this.$router.go(0)
    },
    deleteWorker (number) {
      alert(number)
    },
    getTableData () {
      this.$http.get('https://www.easy-mock.com/mock/5d0e50885f349b4d9c702f46/index/getAllWorkers').then(function (res) {
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
