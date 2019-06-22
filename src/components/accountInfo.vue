<template>
    <div>
        <Navbar></Navbar>
        <div class="block-main">
            <div class="title">
                <h2>对账信息</h2>
            </div>
            <Row>
                <div class="block">
                    <div class="block-title">
                        <Icon class="ivu-icon-ios-apps" size="large"></Icon>
                        导入
                    </div>
                    <div class="block-body">
                        <Button @click="smartModal=true" class="btn-purple" size="large" >
                            <Icon class="ivu-icon-ios-funnel"></Icon>
                            导入聪慧网对账单
                        </Button>
                        <Button @click="logisticsModal=true" class="btn-purple" size="large" >
                            <Icon class="ivu-icon-ios-funnel"></Icon>
                            导入华宇物流对账单
                        </Button>
                        <Button @click="createInfo" class="btn-purple" size="large" >
                            <Icon class="ivu-icon-ios-funnel"></Icon>
                            生成对账信息
                        </Button>
                    </div>
                </div>
            </Row>
            <br>
            <Row>
                <div class="block">
                    <div class="block-body">
                        <Tabs  :animated="false" @on-click="changeTab">
                            <TabPane label="聪慧网对账" >
                                <Table :columns="format" :data="data1"></Table>
                                <div style="float: right;">
                                    <Page :current="currentPage" :total="dataAmount1" :page-size="8" @on-change="changePage1"></Page>
                                </div>
                            </TabPane>
                            <TabPane label="华宇物流对账单">
                                <Table :columns="format" :data="data2"></Table>
                                <div style="float: right;">
                                    <Page :current="currentPage" :total="dataAmount2" :page-size="8" @on-change="changePage2"></Page>
                                </div>
                            </TabPane>
                            <TabPane label="对账信息">
                                <Table :columns="format" :data="data3"></Table>
                                <div style="float: right;">
                                    <Page :current="currentPage" :total="dataAmount3" :page-size="8" @on-change="changePage3"></Page>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Row>

            <Modal
                title="规则导入"
                v-model="smartModal"
                :mask-closable="false"
                class="vertical-center-modal">
                <div class="ivu-form-inline modal-inline">
                    <label>
                        <Input v-model="filesmart" size="large" class="modal-input" placeholder="upload">
                        </Input>
                    </label>
                    <label>
                        <Upload :before-upload="handleUploadsmart">
                            <Button class="btn-purple" size="large">
                                <Icon class="ivu-icon-ios-funnel"></Icon>
                                选择文件
                            </Button>
                        </Upload>
                    </label>
                </div>
                <div style="margin-left: 33%">
                    <Button class="btn-purple" style="margin-right: 20px;" @click="uploadsmart">确认</Button>
                    <Button class="btn-cancel" style="margin-left: 20px;" @click="cancelsmart">取消</Button>
                </div>
                <div slot="footer" style="display: none;"></div>
            </Modal>
            <Modal
                title="规则导入"
                v-model="logisticsModal"
                :mask-closable="false"
                class="vertical-center-modal">
                <div class="ivu-form-inline modal-inline">
                    <label>
                        <Input v-model="filelogistics" size="large" class="modal-input" placeholder="upload">
                        </Input>
                    </label>
                    <label>
                        <Upload :before-upload="handleUploadlogistics">
                            <Button class="btn-purple" size="large">
                                <Icon class="ivu-icon-ios-funnel"></Icon>
                                选择文件
                            </Button>
                        </Upload>
                    </label>
                </div>
                <div style="margin-left: 33%">
                    <Button class="btn-purple" style="margin-right: 20px;" @click="uploadlogistics">确认</Button>
                    <Button class="btn-cancel" style="margin-left: 20px;" @click="cancellogistics">取消</Button>
                </div>
                <div slot="footer" style="display: none;"></div>
            </Modal>

        </div>
    </div>

</template>

<script>
    import Navbar from "./navbar";
    export default {
        name: "accountInfo",
        components: { Navbar},
        data(){
            return{
                format:[
                    {
                        title:"订单编号",
                        key:"id"
                    },
                    {
                        title:"订单分类",
                        key:"type"
                    },
                    {
                        title:"标题",
                        key:"title"
                    },
                    {
                        title:"订单金额",
                        key:"amount"
                    },
                    {
                        title:"订单状态",
                        key:"status"
                    },
                    {
                      title:"下单时间",
                      key:"ordertime"
                    }
                ],
                filesmart:'',
                filelogistics:'',
                loadingStatus:false,
                smartModal:false,
                logisticsModal:false,
                data1:[],
                data2:[],
                data3:[],
                allData1:[],
                allData2:[],
                allData3:[],
                currentPage:1,
                dataAmount1:0,
                dataAmount2:0,
                dataAmount3:0
            }
        },
        mounted() {
            this.$http.get('https://www.easy-mock.com/mock/5d063c2b19efbf55ebd39b4f/logistics/smart')
                .then((response)=>{
                    console.log(response)
                    this.allData1=response.body.data
                    this.dataAmount1=this.allData1.length
                    this.data1=this.allData1.slice(0,8)
                }).catch(function (response) {
                console.log(response)
                })
            this.$http.get('https://www.easy-mock.com/mock/5d063c2b19efbf55ebd39b4f/logistics/logistics')
                .then((response)=>{
                    this.allData2=response.body.data
                    this.dataAmount2=this.allData2.length
                    this.data2=this.allData2.slice(0,8)
                }).catch(function (response) {
                console.log(response)
            })
            this.$http.get('https://www.easy-mock.com/mock/5d063c2b19efbf55ebd39b4f/logistics/exception')
                .then((response)=>{
                    this.allData3=response.body.data
                    this.dataAmount3=this.allData3.length
                    this.data3=this.allData3.slice(0,8)
                }).catch(function (response) {
                    console.log(response)

            })
        },
        methods:{
            changePage1(index){
                this.currentPage=index
                this.data1=this.allData1.slice((index-1)*8,index*8)
            },
            changePage2(index){
                this.currentPage=index
                this.data2=this.allData2.slice((index-1)*8,index*8)
            },
            changePage3(index){
                this.currentPage=index
                this.data3=this.allData3.slice((index-1)*8,index*8)
            },
            changeTab(){
                this.currentPage=1
                this.data1=this.allData1.slice(0,8)
                this.data2=this.allData2.slice(0,8)
                this.data3=this.allData3.slice(0,8)
            },
            handleUploadsmart (file) {
                this.file = file;
                this.filesmart=file.name
                return false;
            },
            handleUploadlogistics(file){
                this.file=file
                this.filelogistics=file.name
                return false
            },
            uploadsmart(){
                if(this.file!=null)
                {
                    this.loadingStatus=true
                    this.file = null;
                    this.filesmart=''
                    this.loadingStatus=false
                    this.$Message.success('Success')
                }
              this.smartModal=false
            },
            uploadlogistics () {
                if(this.file!=null)
                {
                    this.loadingStatus=true
                    this.file = null;
                    this.filelogistics=''
                    this.loadingStatus=false
                    this.$Message.success('Success')
                }
                this.logisticsModal=false
            },
            cancelsmart(){
                this.smartModal=false
            },
            cancellogistics(){
                this.logisticsModal=false
            },
            createInfo(){
                this.$Message.success('success')
            }
        }
    }
</script>

<style scoped>

    .block-main{
        position: absolute;
        left: 270px;
        bottom: 0;
        right: 0;
        top: 81px

    }

    .btn-purple{
        background-color: #9137F3;
        color: #FFFFFF
    }

    .btn-cancel{
        background-color: #8D99A8;
        color: #FFFFFF;
    }

    .title{
        margin-left: 50px;
    }

    .block{
        background-color: white;
        margin: 10px 0 0 50px;
        padding: 10px;
    }

    .block-title{
        color: #8D99A8;
        padding: 20px;
    }

    .block-body{
        padding: 10px;
    }


    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-input{
        width: 350px;
        margin-right: 0
    }
    .modal-inline{
        padding: 10px 10px 20px 10px;
    }

</style>
