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
                <input style="width: 15%;margin-right: 5%;display: inline-block;" type="text" class="form-control" placeholder="输入员工姓名或账号">
                <Button style="margin-left: 5%" @click="searchOrders">搜索</Button>
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
                <Table stripe border :columns="columns" :data="rows" ref="table" @on-selection-change="setSelectedData"></Table>
                <br>
                <div style="margin-bottom: 5%">
                    <Button type="primary" @click="handleSelectAll()">全选</Button>
                    <div style="float: right;vertical-align: center">
                        <Page style="font-size: 10px" simple :total="this.worker_count" :current="1" @on-change="changePage"></Page>
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
                selectType:'all',
                selectAll:false,
                page_num: 1,
                worker_count: 150,
                dateRange: [],
                searchContent1: '',
                searchContent2: '',
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
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        width: 200
                    },
                    {
                        title: '手机',
                        key: 'tel'
                    },
                    {
                        title: '角色',
                        key: 'type'
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        width: 85
                    },
                    {
                        title: '添加时间',
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
                                        type: 'error',
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
                            ]);
                        }
                    }
                ],
                rows: [],
                initRows: [],
            }
        },
        created () {
            this.getTableData(1);
        },
        methods: {
            refresh () {
                this.$router.go(0);
            },
            search (data, argumentObj) {
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
            deleteWorker(number){
                alert(number)
            },
            searchOrders () {
                alert("search")
            },
            dateCompare (str1, str2) {
                var a = str1.split('-');
                var b = str2.split('-');
                console.log(a, b)
                if (a[0] < b[0]) return true;
                else if (a[0] > b[0]) return false;
                else {
                    if (a[1] < b[1]) return true;
                    else if (a[1] > b[1]) return false;
                    else {
                        if (a[2] <= b[2]) return true;
                        else return false;
                    }
                }
            },
            searchDate (data, dateRange) {
                let res = data;
                console.log(dateRange)
                if (dateRange[0] != "" && dateRange[1] != "")
                    res = res.filter(d => {
                        return this.dateCompare(dateRange[0], d['time']) && this.dateCompare(d['time'], dateRange[1])
                    })
                return res;
            },
            handleSearch () {
                this.rows = this.initRows;
                this.rows = this.search(this.rows, {'name': this.searchContent1, 'tel': this.searchContent2});
            },
            dateRangeChange (date) {
                console.log(date);
                this.dateRange = date;
                this.rows = this.initRows;
                this.rows = this.searchDate(this.rows, this.dateRange)
            },
            getTableData (page_num) {
                this.$http.get("https://www.easy-mock.com/mock/5d0e50885f349b4d9c702f46/index/getAllWorkers", {
                    params: {
                        page_num: page_num,
                    }
                }).then(function (res) {
                    console.log(res)
                    this.rows = this.initRows = res.body.data;
                    this.worker_count = res.body.worker_count;
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
                let attrs1 = Object.keys(obj1);
                let attrs2 = Object.keys(obj2);
                console.log(obj1);
                console.log(obj2);
                if (attrs1.length != attrs2.length) {
                    return false;
                }
                for (let j = 0; j < attrs1.length; j++) {
                    let attrNames = attrs1[j];
                    if (obj1[attrNames] != obj2[attrNames]) {
                        return false;
                    }
                }
                return true;
            },
            handleSelectAll () {
                this.selectAll=!this.selectAll
                this.$refs.table.selectAll(this.selectAll);
            }
        }
    }
</script>

<style scoped>

</style>
