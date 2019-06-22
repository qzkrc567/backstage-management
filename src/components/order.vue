<template>
    <div>
        <NavBar @refresh="refresh"></NavBar>
        <div style="position: absolute;left: 270px;right: 0;bottom: 0;top: 81px">
            <h2 style="margin: 1% 0 0 1%">订单管理</h2>
            <div style="margin: 3% 0 0 5%">
                名称：
                <Input style="width: 15%;margin-right: 5%" v-model="searchContent1" placeholder="绑定名称搜索"/>
                手机号：
                <Input style="width: 15%;margin-right: 5%" v-model="searchContent2" placeholder="绑定手机号搜索"/>
                时间：
                <DatePicker confirm split-panels type="daterange" :value="dateRange" placeholder="选择订单日期范围" style="width: 20%"></DatePicker>
                <Button style="margin-left: 5%" @click="searchOrders">搜索</Button>
            </div>
            <div style="margin: 0 4% 0 5%;margin-top: 2%">
                <Table stripe border :columns="columns" :data="rows" ref="table" @on-selection-change="setSelectedData"></Table>
                <br>
                <div style="margin-bottom: 5%">
                    <Button type="primary" @click="handleSelectAll(true)">全选</Button>
                    <Button type="primary" @click="handleSelectAll(false)">全不选</Button>
                    <Button type="primary" @click="exportData(1)"><Icon type="ios-download-outline"></Icon>导出全部数据</Button>
                    <Button type="primary" @click="exportData(2)"><Icon type="ios-download-outline"></Icon>导出选择数据</Button>
                    <div style="float: right;vertical-align: center">
                        <Page simple :total="100" :current="1" @on-change="changePage"></Page>
                    </div>
                </div>
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
        name: 'HelloWorld',
        data () {
            return {
                dateRange: [],
                orderType: this.$route.query.orderType,
                searchContent1:'',
                searchContent2:'',
                selectedData:[],
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '订单编号',
                        key: 'order_number',
                    },
                    {
                        title: '用户名称',
                        key: 'client_name',
                        width: 200
                    },
                    {
                        title: '货物名称',
                        key: 'goods_name'
                    },
                    {
                        title: '物流公司名称',
                        key: 'express_company'
                    },
                    {
                        title: '订单状态',
                        key: 'order_status',
                        width: 85
                    },
                    {
                        title: '实际价格',
                        key: 'actual_price'
                    },
                    {
                        title: '发货人区域',
                        key: 'sender_area',
                    },
                    {
                        title: '发货人姓名',
                        key: 'sender_name',
                    },
                    {
                        title: '收货人区域',
                        key: 'receiver_area',
                    },
                    {
                        title: '收货人姓名',
                        key: 'receiver_name',
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
                                                path:'/orderDetail',
                                                query:{
                                                    order_number: params.row.order_number
                                                }
                                            })
                                        }
                                    }
                                }, '查看订单')
                            ]);
                        }
                    }
                ],
                rows: [],
                initRows:[],
            }
        },
        created(){
            this.getTableData();
        },
        methods: {
            refresh(){
                this.$router.go(0);
            },
            search(data, argumentObj) {
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                return res;
            },
            searchOrders(){
                alert("search")
            },
            dateCompare(str1, str2){
                var a = str1.split('-');
                var b = str2.split('-');
                console.log(a,b)
                if(a[0] < b[0]) return true;
                else if(a[0] > b[0]) return false;
                else{
                    if (a[1] < b[1]) return true;
                    else if (a[1] > b[1]) return false;
                    else {
                        if(a[2] <= b[2]) return true;
                        else return false;
                    }
                }
            },
            searchDate(data, dateRange){
                let res = data;
                console.log(dateRange)
                if (dateRange[0] != "" && dateRange[1] != "")
                    res = res.filter(d => {
                        return this.dateCompare(dateRange[0], d['time']) && this.dateCompare(d['time'], dateRange[1])
                    })
                return res;
            },
            handleSearch() {
                this.rows = this.initRows;
                this.rows = this.search(this.rows, {'name': this.searchContent1, 'tel': this.searchContent2});
            },
            dateRangeChange(date){
                console.log(date);
                this.dateRange = date;
                this.rows = this.initRows;
                this.rows = this.searchDate(this.rows, this.dateRange)
            },
            getTableData(){
                this.$http.get("https://www.easy-mock.com/mock/5c833375e0e0f75c246237e4/example/mock").then(function (res) {
                    console.log(res)
                    this.rows = this.initRows = res.body.data;
                },function (res) {
                    console.log(res)
                })
            },
            changePage(){
                this.getTableData()
            },
            setSelectedData(selection){
              this.selectedData = selection
            },
            remove (index) {
                this.rows.splice(index, 1);
                alert("remove")
            },
            compareObject(obj1,obj2){
                let  attrs1 = Object.keys(obj1);
                let  attrs2 = Object.keys(obj2);
                console.log(obj1);
                console.log(obj2);
                if (attrs1.length != attrs2.length){
                    return false;
                }
                for (let j = 0; j < attrs1.length;j++){
                    let attrNames = attrs1[j];
                    if (obj1[attrNames] != obj2[attrNames]){
                        return  false;
                    }
                }
                return true;
            },
            exportData (type) {
                if (type == 1) {
                    this.$refs.table.exportCsv({
                        filename: '全部数据',
                        columns: this.columns.filter((col, index) => index  >  0 && index < 8)
                    });
                }
                else {
                    alert("in")
                    this.$refs.table.exportCsv({
                        filename: '选择的数据',
                        columns: this.columns.filter((col, index) => index  >  0 && index < 8),
                        data: this.rows.filter((data,index) =>{
                            var len = this.selectedData.length;
                            let i = 0;
                            for (;i < len;){
                                if (this.compareObject(data,this.selectedData[i])){
                                    console.log("Burning Test"+i);
                                    return  true;
                                }
                                i = i + 1;
                            }
                            return  false;
                        })
                    });
                }
            },
            handleSelectAll (status) {
                this.$refs.table.selectAll(status);
            }
        }
    }
</script>

<style scoped>

</style>
