<template>
    <div>
        <NavBar></NavBar>
        <div style="position: absolute;left: 270px;right: 5%;bottom: 0;top: 81px">
            <h1 style="margin: 3% 0 0 3%">订单详情（编号：{{this.order_number}}）</h1>
            <Button primary style="position: fixed; right: 1%; top: 100px" @click="back">返回</Button>
            <div class="detailItem">
                <h3 style="margin-bottom: 15px">订单基本信息：</h3>
                <div style="margin-right: 7%; min-width: 25%;display: inline;float: left">用户名称：{{this.client_name}}</div>
                <div style="margin-right: 7%; min-width: 25%;display: inline;float: left">用户类型：{{this.client_type}}</div>
                <div style="display: inline;">订单状态：{{this.order_status}}</div>
                <br><br>
                <div style="margin-right: 7%; min-width: 25%;display: inline;float: left">货物名称：{{this.goods_name}}</div>
                <div style="margin-right: 7%; min-width: 25%;display: inline;float: left">物流公司名称：{{this.express_company}}</div>
                <div style="display: inline;">产品名称：{{this.product_name}}</div>
                <br><br>
                <div style="margin-right: 7%; min-width: 25%;display: inline;float: left">货物数量：{{this.goods_count}}</div>
                <div style="margin-right: 7%; min-width: 25%;display: inline;float: left">货物重量：{{this.goods_weight}}</div>
                <div style="display: inline">货物体积：{{this.goods_volume}}</div>
                <br><br>
                <div>服务名称：{{this.service_name}}</div>
            </div>
            <div class="detailItem">
                <h3 style="margin-bottom: 15px">价格信息：</h3>
                <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">额外收取费用：{{this.extra_fee}}</div>
                <div style="display: inline">标准收取费用：{{this.nomal_fee}}</div>
                <br><br>
                <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">预估价格：{{this.estimated_price}}</div>
                <div style="display: inline">实际价格：{{this.actual_price}}</div>

            </div>
            <div class="detailItem">
                <h3 style="margin-bottom: 15px">发货人信息：</h3>
                <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">发货人姓名：{{this.receiver_name}}</div>
                <div style="display: inline">发货人手机：{{this.receiver_phone}}</div>
                <br><br>
                <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">发货人地区：{{this.receiver_area}}</div>
                <div style="display: inline">发货人详细信息：{{this.receiver_info}}</div>
            </div>
            <div class="detailItem">
                <h3 style="margin-bottom: 15px">收件人信息：</h3>
                <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">收件人姓名：{{this.sender_name}}</div>
                <div style="display: inline">收件人手机：{{this.sender_phone}}</div>
                <br><br>
                <div style="margin-right: 15%; min-width: 30%;display: inline;float: left">收件人地区：{{this.sender_area}}</div>
                <div style="display: inline">收件人详细信息：{{this.sender_info}}</div>
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
                order_number: '1782867',
                client_name: "yangqichao666",
                client_type: "非会员",
                goods_name: "压料器",
                express_company: "德邦快递",
                product_name: "精准汽运(长途)",
                order_status: '6',
                goods_count: 1,
                goods_weight: 20,
                goods_volume: '',
                service_name: '燃油附加费,开箱验货,货物保价,运费到付,短信通知服务',
                extra_fee: 100,
                nomal_fee: 60,
                estimated_price: 153,
                actual_price: 160,
                sender_area: '山东省-青岛市-黄岛区',
                sender_info: '王台镇',
                sender_name: '杨起超',
                sender_phone: '18354293345',
                receiver_info: '长兴岛街道办事处铭岛仕家',
                receiver_name: '陈雨',
                receiver_phone: '13322262933',
                receiver_area: '辽宁省-大连市-瓦房店市',

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
