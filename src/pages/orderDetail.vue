<template>
    <div>
        <NavBar></NavBar>
        <div class="content">
            <h2>订单详情（编号：{{this.orderInfo.orderNumber}}）</h2>
            <ContentBox>
                <Button primary style="position: fixed; right: 40px; top: 108px" @click="back">返回</Button>
                <div class="detailItem">
                    <h3>订单基本信息：</h3>
                    <div style="margin-right: 7%; min-width: 25%;display: inline;float: left">用户名称：{{this.orderInfo.clientName}}</div>
                    <div style="margin-right: 7%; min-width: 25%;display: inline;float: left">用户类型：{{this.orderInfo.clientType}}</div>
                    <div style="display: inline;">订单状态：{{this.orderInfo.orderStatus}}</div>
                    <br><br>
                    <div style="margin-right: 7%; min-width: 25%;display: inline;float: left">货物名称：{{this.orderInfo.goodsName}}</div>
                    <div style="margin-right: 7%; min-width: 25%;display: inline;float: left">物流公司名称：{{this.orderInfo.expressCompany}}</div>
                    <div style="display: inline;">产品名称：{{this.orderInfo.productName}}</div>
                    <br><br>
                    <div style="margin-right: 7%; min-width: 25%;display: inline;float: left">货物数量：{{this.orderInfo.goodsCount}}</div>
                    <div style="margin-right: 7%; min-width: 25%;display: inline;float: left">货物重量：{{this.orderInfo.goodsWeight}}</div>
                    <div style="display: inline">货物体积：{{this.orderInfo.goodsVolume}}</div>
                    <br><br>
                    <div>服务名称：{{this.orderInfo.serviceName}}</div>
                </div>
                <div class="detailItem">
                    <h3>价格信息：</h3>
                    <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">额外收取费用：{{this.orderInfo.extraFee}}</div>
                    <div style="display: inline">标准收取费用：{{this.orderInfo.nomalFee}}</div>
                    <br><br>
                    <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">预估价格：{{this.orderInfo.estimatedPrice}}</div>
                    <div style="display: inline">实际价格：{{this.orderInfo.actualPrice}}</div>

                </div>
                <div class="detailItem">
                    <h3>发货人信息：</h3>
                    <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">发货人姓名：{{this.orderInfo.receiverName}}</div>
                    <div style="display: inline">发货人手机：{{this.orderInfo.receiverPhone}}</div>
                    <br><br>
                    <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">发货人地区：{{this.orderInfo.receiverArea}}</div>
                    <div style="display: inline">发货人详细信息：{{this.orderInfo.receiverInfo}}</div>
                </div>
                <div class="detailItem">
                    <h3>收件人信息：</h3>
                    <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">收件人姓名：{{this.orderInfo.senderName}}</div>
                    <div style="display: inline">收件人手机：{{this.orderInfo.senderPhone}}</div>
                    <br><br>
                    <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">收件人地区：{{this.orderInfo.senderArea}}</div>
                    <div style="display: inline">收件人详细信息：{{this.orderInfo.senderInfo}}</div>
                </div>
                <div class="detailItem">
                    <h3>操作记录</h3>
                    <Table :columns="columns" :data="rows"></Table>
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
  data () {
    return {
      orderInfo: {
      },
      columns: [
        {
          title: '操作人',
          key: 'operName'
        },
        {
          title: '订单状态',
          key: 'orderStatus'
        },
        {
          title: '付款状态',
          key: 'payStatus'
        },
        {
          title: '操作时间',
          key: 'time'
        },
        {
          title: '备注',
          key: 'info'
        }
      ],
      rows: [
        {
          operName: '1',
          orderStatus: '好',
          payStatus: '好',
          time: '好',
          info: '好'
        }
      ]
    }
  },
  name: 'orderDetail',
  created () {
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail () {
      var that = this
      this.$http.get(this.$baseUrl + '/order/getDetail', {params: {orderNumber: this.$route.query.order_number}}).then(function (res) {
        console.log(res)
        that.orderInfo = res.body.data
      }, function (res) {
        console.log(res)
      })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.detailItem{
    padding: 0 0 25px 0;
    border-bottom:1px silver solid;
}
.detailItem:last-child{
    border-bottom: none;
}
.detailItem h3{
    border-left: 2px solid purple;
    padding-left: 20px;
    margin: 20px 0;
    font-size: 20px;
}
</style>
