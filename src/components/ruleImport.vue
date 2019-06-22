<template>
    <div>
        <Navbar></Navbar>
        <div class="block-main">
            <div class="title">
                <h2>规则导入</h2>
            </div>
            <Row>
                <div class="block">
                    <div class="block-title">
                        <Icon class="ivu-icon-ios-apps"></Icon>
                        规则导入
                    </div>
                    <div class="block-body">
                        <Button @click="importModal=true" class="btn-purple" size="large" >
                        <Icon class="ivu-icon-ios-funnel"></Icon>
                            导入规则文件
                        </Button>
                    </div>
                </div>
            </Row>
            <br>
            <Row>
                <div class="block">
                    <div class="block-title">
                        <Icon class="ivu-icon-md-menu"></Icon>
                        物理运费规则
                    </div>
                    <div class="block-body">
                        <Table :columns="format" :data="data1"></Table>
                        <div style="float: right">
                            <Page :total="dataAmount" :page-size="8" :current="currentPage" @on-change="changePage"></Page>
                        </div>
                    </div>
                </div>
            </Row>

            <Modal
                title="规则导入"
                v-model="importModal"
                :mask-closable="false"
                class="vertical-center-modal">
                <div class="modal-inline">
                    <label>
                        <Input placeholder="upload" v-model="filename" clearable size="large" class="modal-input">
                        </Input>
                    </label>
                    <label>
                        <Upload :before-upload="handleUpload">
                            <Button class="btn-purple" size="large">
                                <Icon class="ivu-icon-ios-funnel"></Icon>
                                选择文件
                            </Button>
                        </Upload>
                    </label>
                </div>
                <div style="margin-left: 33%">
                    <Button class="btn-purple" style="margin-right: 20px;"  @click="upload" :loading="loadingStatus">确认</Button>
                    <Button class="btn-cancel" style="margin-left: 20px;" @click="cancel">取消</Button>
                </div>
                <div slot="footer" style="display: none;"></div>
            </Modal>

        </div>
    </div>


</template>

<script>

     import Navbar from "./navbar";
     export default {
        name: "ruleImport",
         components: { Navbar},
         data(){
            return {
                format:[
                    {
                        type: 'index',
                        indexMethod:(row=>{
                            return (row._index+8*(this.currentPage-1)+1)
                        }),

                        width: 100,
                        align: 'center'
                    },
                    // {
                    //     title:"城市",
                    //     key:"city"
                    // },
                    // {
                    //     title:"在途天数",
                    //     key:"days"
                    // },
                    // {
                    //     title:"轻货/公斤",
                    //     key:"priceLight"
                    // },
                    // {
                    //     title:"重货/公斤",
                    //     key:"priceHeavy"
                    // },
                    // {
                    //     title:"最低收费",
                    //     key:"lowestPrice"
                    // }
                    {
                        title:'物流公司名称',
                        key:'companyName'
                    },
                    {
                        title:'折扣规则',
                        key:'discount'
                    }
                ],
                allData:[],
                data1:[],
                importModal:false,
                file: null,
                loadingStatus: false,
                filename:'',
                currentPage:1,
            }
         },
         mounted() {
             this.$http.get('https://www.easy-mock.com/mock/5d063c2b19efbf55ebd39b4f/logistics/freightRule')
                 .then((response)=>{
                     console.log(response)
                     this.allData=response.body.rdata
                     this.dataAmount=this.allData.length
                     for(let i=0;i<8;i++)
                     {
                         this.data1.push(this.allData[i])
                     }
                 }).catch(function (response) {
                    console.log(response)
             })
         },
         methods:{
             cancel:function () {
                 this.importModal=false
             },
             handleUpload (file) {
                 this.file = file;
                 this.filename=file.name
                 return false;
             },
             upload () {
                 if(this.file!=null)
                 {
                     this.loadingStatus = true;
                     this.file = null;
                     this.filename=''
                     this.loadingStatus = false;
                     this.$Message.success('Success')
                 }
                 this.importModal=false
             },
             changePage(index){
                 this.currentPage=index
                 this.data1=this.allData.slice((index-1)*8,index*8)
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
