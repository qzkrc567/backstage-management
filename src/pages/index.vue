<template>
    <div>
        <NavBar></NavBar>
        <div class="content">
            <h2>首页</h2>
            <ContentBox icon="ios-apps" name="订单概况">
                <div class="row">
                    <div class="panel-body">
                        <div class="col-md-3">
                            <div class="metric">
                                <span class="icon"><i class="fa fa-calendar"></i></span>
                                <p>
                                    <span class="number">{{todayOrderNum}}</span>
                                    <span class="title">今日订单总数</span>
                                </p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="metric">
                                <span class="icon"><i class="fa fa-credit-card"></i></span>
                                <p>
                                    <span class="number">{{todayPredictIncome}}</span>
                                    <span class="title">今日预计收入</span>
                                </p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="metric">
                                <span class="icon"><i class="fa fa-eye"></i></span>
                                <p>
                                    <span class="number">{{todayUnusualOrder}}</span>
                                    <span class="title">今日异常订单总数</span>
                                </p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="metric">
                                <span class="icon"><i class="fa fa-database"></i></span>
                                <p>
                                    <span class="number">{{todayTotalOrderPrice}}</span>
                                    <span class="title">今日订单总金额</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentBox>
            <ContentBox icon="ios-trending-up" name="收入趋势">

                <div class="row" style="margin-top:25px">
                    <div v-show="showMonth === true">
                        <div style="float:left;margin-left:40px;font-weight: 800">
                            本月订单总数：{{monthOrderNum}}
                        </div>
                        <div style="float:left;margin-left:50px;font-weight: 800">
                            本月订单总额：{{monthOrderMoney}}
                        </div>
                    </div>
                    <div v-show="showMonth === false">
                        <div style="float:left;margin-left:40px;font-weight: 800">
                            本周订单总数：{{weekOrderNum}}
                        </div>
                        <div style="float:left;margin-left:50px;font-weight: 800">
                            本周订单总额：{{weekOrderMoney}}
                        </div>
                    </div>

                    <div style="float:right;margin-right:50px">
                        <Button type="text" @click="selectweek" :style="weekstyle">
                            本周
                        </Button> |
                        <Button type="text" @click="selectmonth" :style="monthstyle">
                            本月
                        </Button>
                    </div>
                </div>
                <div id="echart-month"
                     style="border-radius: 5px;margin-top: 25px;background: #fff" v-show="showMonth === true">
                    <chart ref="chart1" :options="monthOptions" :auto-resize="true" style="width:1100px;height:500px"></chart>
                </div>
                <div id="echart-week"
                     style="border-radius: 5px;margin-top: 25px;background: #fff" v-show="showMonth === false">
                    <chart ref="chart1" :options="weekOptions" :auto-resize="true" style="width:1100px;height:500px"></chart>
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
      weekstyle: {
        'color': 'black'
      },
      monthstyle: {
        'color': 'blue'
      },
      todayOrderNum: 0,
      todayPredictIncome: 0,
      todayUnusualOrder: 0,
      todayTotalOrderPrice: 0,
      monthOrderNum: 0,
      monthOrderMoney: 0,
      weekOrderNum: 0,
      weekOrderMoney: 0,
      showMonth: true,
      monthXAxis: [],
      weekXAxis: [],
      monthYData: [],
      weekYData: [],
      weekOptions: {},
      monthOptions: {}
    }
  },
  created () {
    this.getBasicInfo()
    this.getOrderTrend()
    this.getMonthData()
    this.getWeekData()
  },
  methods: {
    getMonthData () {
      this.$http.get('https://www.easy-mock.com/mock/5d0e50885f349b4d9c702f46/index/getMonthData').then(function (res) {
        console.log(res)
        this.monthXAxis = res.body.dateList
        this.monthYData = res.body.moneyList
        this.drawLine()
      }, function (res) {
        console.log(res)
      })
    },
    getWeekData () {
      this.$http.get('https://www.easy-mock.com/mock/5d0e50885f349b4d9c702f46/index/getWeekData').then(function (res) {
        console.log(res)
        this.weekXAxis = res.body.dateList
        this.weekYData = res.body.moneyList
        this.drawLine()
      }, function (res) {
        console.log(res)
      })
    },
    drawLine () {
      this.weekOptions = {
        xAxis: {
          type: 'category',
          data: this.weekXAxis
        },
        yAxis: {
          type: 'value',
          show: true
        },
        grid: {
          left: '15%', // 距离左边的距离
          right: '15%', // 距离右边的距离
          bottom: '10%', // 距离下边的距离
          top: '10%' // 距离上边的距离
        },
        series: [{
          data: this.weekYData,
          type: 'line',
          itemStyle: {normal: {label: {show: true}}}
        }]
      }
      this.monthOptions = {
        xAxis: {
          type: 'category',
          data: this.monthXAxis
        },
        yAxis: {
          type: 'value',
          show: true
        },
        grid: {
          left: '15%', // 距离左边的距离
          right: '15%', // 距离右边的距离
          bottom: '10%', // 距离下边的距离
          top: '10%' // 距离上边的距离
        },
        series: [{
          data: this.monthYData,
          type: 'line',
          itemStyle: {normal: {label: {show: true}}},
          smooth: true
        }]
      }
    },
    getBasicInfo () {
      this.$http.get('https://www.easy-mock.com/mock/5d0e50885f349b4d9c702f46/order_basic_info').then(function (res) {
        console.log(res)
        this.todayOrderNum = res.body.data.todayOrderNum
        this.todayPredictIncome = res.body.data.todayPredictIncome
        this.todayUnusualOrder = res.body.data.todayUnusualOrder
        this.todayTotalOrderPrice = res.body.data.todayTotalOrderPrice
      })
    },
    getOrderTrend () {
      this.$http.get('https://www.easy-mock.com/mock/5d0e50885f349b4d9c702f46/order_trend').then(function (res) {
        console.log(res)
        this.monthOrderNum = res.body.data[0].monthOrderNum
        this.monthOrderMoney = res.body.data[0].monthOrderMoney
        this.weekOrderNum = res.body.data[0].weekOrderNum
        this.weekOrderMoney = res.body.data[0].weekOrderMoney
      })
    },
    selectweek () {
      this.showMonth = false
      this.weekstyle = {
        'color': 'blue',
        'text-shadow': '0 0 1px black'
      }
      this.monthstyle = {
        'color': 'black'
      }
    },
    selectmonth () {
      this.showMonth = true
      this.monthstyle = {
        'color': 'blue',
        'text-shadow': '0 0 1px black'
      }
      this.weekstyle = {
        'color': 'black'
      }
    }
  }
}
</script>

<style scoped>

</style>
