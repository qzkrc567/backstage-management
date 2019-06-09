<template>
    <div>
        <NavBar></NavBar>
        <div style="position: absolute;left: 270px;right: 5%;bottom: 0;top: 81px">
            <h1 style="margin: 3% 0 0 3%">订单详情</h1>
            <Button primary style="position: fixed; right: 1%; top: 100px" @click="back">返回</Button>
            <div class="detailItem">
                <h3 style="margin-bottom: 15px">订单信息：</h3>
                <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">订单编号：{{this.orderId}}</div>
                <div style="display: inline">订单状态：{{this.orderStatus}}</div>
                <br><br>
                <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">下单时间：{{this.orderTime}}</div>
                <div style="display: inline">运费规则：{{this.rule}}</div>
                <br><br>
                <div>其他信息：{{this.otherInfo}}</div>
            </div>
            <div class="detailItem">
                <h3 style="margin-bottom: 15px">其他信息：</h3>
                <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">用户姓名：{{this.userName}}</div>
                <div style="display: inline">用户手机：{{this.userTel}}</div>
                <br><br>
                <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">用户地区：{{this.userPos}}</div>
                <div style="display: inline">发往地区：{{this.direction}}</div>
            </div>
            <div class="detailItem">
                <h3 style="margin-bottom: 15px">操作记录</h3>
                <Table :columns="columns" :data="rows"></Table>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from './navbar.vue'
    export default {
        components:{
            NavBar
        },
        data(){
            return{
                orderId: this.$route.query.orderId,
                orderStatus: '正常',
                orderTime: '2019-06-09 20:49',
                rule: '1',
                otherInfo: "其他信息",
                userName: '胡琦',
                userTel: '1xxxxxxxxx8',
                userPos: '北京-海淀',
                direction: '广西-南宁',
                columns:[
                    {
                        title: '操作人',
                        key: 'operName',
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
                rows:[
                    {
                        operName:'1',
                        orderStatus:'好',
                        payStatus:'好',
                        time:'好',
                        info:'好',
                    }
                ],
            }
        },
        name: "orderDetail",
        methods:{
            back(){
                this.$router.go(-1);
            },
        }
    }
</script>

<style scoped>
.detailItem{
    margin: 1% 0 2% 5%;
    border-bottom:1px silver solid;
}
</style>