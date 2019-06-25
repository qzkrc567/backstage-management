<template>
    <div>
        <NavBar @refresh="refresh"></NavBar>
        <div class="content">
            <h2>订单管理</h2>
            <ContentBox icon="ios-apps" name="筛选">
                名称：
                <Input style="width: 15%;margin-right: 5%" v-model="searchContent1" placeholder="绑定名称搜索"/>
                时间：
                <DatePicker confirm split-panels type="daterange" v-model="dateRange" placeholder="选择订单日期范围" style="width: 20%"></DatePicker>
                <Button style="margin-left: 5%" @click="searchOrders">搜索</Button>
            </ContentBox>
            <ContentBox icon="ios-menu" name="订单列表">
                <Table stripe border :columns="columns" :data="rows" ref="table" @on-selection-change="setSelectedData"></Table>
                <br>
                <div style="margin-bottom: 5%">
                    <Button type="primary" @click="handleSelectAll(true)">全选</Button>
                    <Button type="primary" @click="handleSelectAll(false)">全不选</Button>
                    <Button type="primary" @click="exportData(1)"><Icon type="ios-download-outline"></Icon>导出全部数据</Button>
                    <Button type="primary" @click="exportData(2)"><Icon type="ios-download-outline"></Icon>导出选择数据</Button>
                    <div style="float: right;vertical-align: center">
                        <Page style="font-size: 10px" show-elevator :total="this.order_count" :current="1" @on-change="changePage"></Page>
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
  name: 'HelloWorld',
  data () {
    return {
      page_num: 0,
      order_count: 150,
      dateRange: [],
      orderType: this.$route.query.orderType,
      searchContent1: '',
      selectedData: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '订单编号',
          key: 'orderNumber'
        },
        {
          title: '用户名称',
          key: 'clientName',
          width: 200
        },
        {
          title: '货物名称',
          key: 'goodsName'
        },
        {
          title: '物流公司名称',
          key: 'expressCompany'
        },
        {
          title: '订单状态',
          key: 'orderStatus',
          width: 85
        },
        {
          title: '实际价格',
          key: 'actualPrice'
        },
        {
          title: '发货人区域',
          key: 'senderArea'
        },
        {
          title: '发货人姓名',
          key: 'senderName'
        },
        {
          title: '收货人区域',
          key: 'receiverArea'
        },
        {
          title: '收货人姓名',
          key: 'receiverName'
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
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/orderDetail',
                      query: {
                        order_number: params.row.orderNumber
                      }
                    })
                  }
                }
              }, '查看订单')
            ])
          }
        }
      ],
      rows: [],
      initRows: []
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    refresh () {
      this.$router.go(0)
    },
    search (data, argumentObj) {
      let res = data
      let dataClone = data
      for (let argu in argumentObj) {
        if (argumentObj[argu].length > 0) {
          res = dataClone.filter(d => {
            return d[argu].indexOf(argumentObj[argu]) > -1
          })
          dataClone = res
        }
      }
      return res
    },
    searchOrders () {
      this.getTableData()
    },
    dateCompare (str1, str2) {
      var a = str1.split('-')
      var b = str2.split('-')
      console.log(a, b)
      if (a[0] < b[0]) return true
      else if (a[0] > b[0]) return false
      else {
        if (a[1] < b[1]) return true
        else if (a[1] > b[1]) return false
        else {
          if (a[2] <= b[2]) return true
          else return false
        }
      }
    },
    searchDate (data, dateRange) {
      let res = data
      console.log(dateRange)
      if (dateRange[0] !== '' && dateRange[1] !== '') {
        res = res.filter(d => {
          return this.dateCompare(dateRange[0], d['time']) && this.dateCompare(d['time'], dateRange[1])
        })
      }
      return res
    },
    handleSearch () {
      this.rows = this.initRows
      this.rows = this.search(this.rows, {'name': this.searchContent1, 'tel': this.searchContent2})
    },
    dateRangeChange (date) {
      console.log(date)
      this.dateRange = date
      this.rows = this.initRows
      this.rows = this.searchDate(this.rows, this.dateRange)
    },
    getTableData () {
      this.$http.post(this.$baseUrl + '/order/getOrder',
        {
          pageNum: this.page_num,
          orderType: this.$route.query.order_type,
          size: 10,
          orderNumber: this.searchContent1,
          startDate: this.dateRange[0],
          endDate: this.dateRange[1]
        }).then(function (res) {
        console.log(res)
        this.rows = this.initRows = res.body.data.content
        this.order_count = res.body.data.totalElements
      }, function (res) {
        console.log(res)
      })
    },
    changePage (value) {
      this.getTableData(value)
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
    exportData (type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: '全部数据',
          columns: this.columns.filter((col, index) => index > 0 && index < 8)
        })
      } else {
        alert('in')
        this.$refs.table.exportCsv({
          filename: '选择的数据',
          columns: this.columns.filter((col, index) => index > 0 && index < 8),
          data: this.rows.filter((data, index) => {
            var len = this.selectedData.length
            let i = 0
            for (;i < len;) {
              if (this.compareObject(data, this.selectedData[i])) {
                console.log('Burning Test' + i)
                return true
              }
              i = i + 1
            }
            return false
          })
        })
      }
    },
    handleSelectAll (status) {
      this.$refs.table.selectAll(status)
    }
  }
}
</script>

<style scoped>

</style>
