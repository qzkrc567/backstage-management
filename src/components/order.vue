<template>
    <div>
        <NavBar></NavBar>
        <div style="position: absolute;left: 270px;right: 0;bottom: 0;top: 81px">
            <h2 style="margin: 1% 0 0 1%">订单管理</h2>
            <div style="margin-top: 3%">
                <Input style="width: 20%;margin-left: 5%" v-model="searchContent1" @on-change="handleSearch" placeholder="绑定名称搜索"/>
                <Input style="width: 20%;margin-left: 5%" v-model="searchContent2" @on-change="handleSearch" placeholder="绑定手机号搜索"/>

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
                        key: 'id',
                    },
                    {
                        title: '用户姓名',
                        key: 'name'
                    },
                    {
                        title: '用户手机',
                        key: 'tel'
                    },
                    {
                        title: '课程名称',
                        key: 'company'
                    },
                    {
                        title: '订单金额',
                        key: 'money'
                    },
                    {
                        title: '订单状态',
                        key: 'status'
                    },
                    {
                        title: '提交时间',
                        key: 'time'
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
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看订单'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, this.buttonName(params.row.status))
                            ]);
                        }
                    }
                ],
                rows: [],
                initRows:[],
            }
        },
        created(){
            this.getTableData()
        },
        methods: {
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
            handleSearch() {
                this.rows = this.initRows;
                this.rows = this.search(this.rows, {'name': this.searchContent1, 'tel': this.searchContent2});
            },
            buttonName(status){
                switch (status) {
                    case 1:
                        return '取消订单';
                        break;
                    case 2:
                        return '删除订单';
                        break;
                    case 3:
                        return '确认订单';
                        break;
                    case 4:
                        return '结束课程';
                        break;
                    case 5:
                        return '订单完成';
                        break;
                }
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
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.rows[index].name}<br>Age：${this.rows[index].age}<br>Address：${this.rows[index].address}`
                })
            },
            remove (index) {
                this.rows.splice(index, 1);
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
