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
                        <Button @click="hcModal=true" class="btn-purple" size="large" >
                            <Icon class="ivu-icon-ios-funnel"></Icon>
                            导入慧聪网对账单
                        </Button>
                        <Button @click="huayuModal=true" class="btn-purple" size="large" >
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
                            <TabPane label="慧聪网对账" >
                                <Table :columns="format" :data="datahc"></Table>
                                <div style="float: right;margin-top: 10px">
                                    <Page :current="currentPage" :total="dataAmounthc" :page-size="8" @on-change="changePagehc"></Page>
                                </div>
                            </TabPane>
                            <TabPane label="华宇物流对账单">
                                <Table :columns="format" :data="datahuayu"></Table>
                                <div style="float: right;margin-top: 10px">
                                    <Page :current="currentPage" :total="dataAmounthuayu" :page-size="8" @on-change="changePagehuayu"></Page>
                                </div>
                            </TabPane>
<!--                            <TabPane label="对账信息">-->
<!--                                <div v-if="allDataerror.length!==0">对账完成，以下为异常账单</div>-->
<!--                                <Table :columns="format" :data="dataerror"></Table>-->
<!--                                <div style="float: right;">-->
<!--                                    <Page :current="currentPage" :total="dataAmounterror" :page-size="8" @on-change="changePageerror"></Page>-->
<!--                                </div>-->
<!--                            </TabPane>-->
                        </Tabs>
                    </div>
                </div>
            </Row>

            <Modal
                title="选择文件"
                v-model="hcModal"
                :mask-closable="false"
                class="vertical-center-modal">
                <div class="ivu-form-inline modal-inline">
                    <label>
                        <Input v-model="filehc" size="large" class="modal-input" placeholder="选择文件..."/>
                    </label>
                    <label>
                        <Upload action="https://www.easy-mock.com/mock/5d063c2b19efbf55ebd39b4f/logistics/upload" :before-upload="handleUploadhc">
                            <Button class="btn-purple" size="large">
                                <Icon class="ivu-icon-ios-funnel"></Icon>
                                选择文件
                            </Button>
                        </Upload>
                    </label>
                </div>
                <div style="margin-left: 33%">
                    <Button class="btn-confirm" @click="uploadhc">确认</Button>
                    <Button class="btn-cancel" @click="cancelhc">取消</Button>
                </div>
                <div slot="footer" style="display: none;"></div>
            </Modal>
            <Modal
                title="选择文件"
                v-model="huayuModal"
                :mask-closable="false"
                class="vertical-center-modal">
                <div class="ivu-form-inline modal-inline">
                    <label>
                        <Input v-model="filehuayu" size="large" class="modal-input" placeholder="选择文件..."/>
                    </label>
                    <label>
                        <Upload action="https://www.easy-mock.com/mock/5d063c2b19efbf55ebd39b4f/logistics/upload" :before-upload="handleUploadhuayu">
                            <Button class="btn-purple" size="large">
                                <Icon class="ivu-icon-ios-funnel"></Icon>
                                选择文件
                            </Button>
                        </Upload>
                    </label>
                </div>
                <div style="margin-left: 33%">
                    <Button class="btn-confirm"  @click="uploadhuayu">确认</Button>
                    <Button class="btn-cancel"  @click="cancelhuayu">取消</Button>
                </div>
                <div slot="footer" style="display: none;"></div>
            </Modal>

        </div>
    </div>

</template>

<script>
import Navbar from '../components/navbar'
export default {
  name: 'accountInfo',
  components: {Navbar},
  data () {
    return {
      format: [
        {
          title: '订单编号',
          key: 'logisticCode'
        },
        {
          title: '订单分类',
          key: 'type'
        },
        {
          title: '标题',
          key: 'cargoName'
        },
        {
          title: '订单金额',
          key: 'totalPrice'
        },
        {
          title: '订单状态',
          key: 'orderStatusType',
          render (h, params) {
            let status = ''
            switch (params.row.orderStatusType) {
              // case "WAITACCEPT":status='待受理';break;
              // case 'ACCEPT':status='已受理';break;
              // case 'UNACCEPT':status='拒绝受理';break;
              // case 'CANCELLED':status='已撤销';break;
              // case 'GOT':status='揽收成功';break;
              // case 'NOGET':status='揽收失败';break;
              // case 'SIGNSUCCESS':status='签收成功';break;
              // case 'SIGNFAILED':status='签收异常';break;
              case 0:status = '待受理'; break
              case 1:status = '已受理'; break
              case 3:status = '拒绝受理'; break
              case 2:status = '已撤销'; break
              case 4:status = '揽收成功'; break
              case 5:status = '揽收失败'; break
              case 6:status = '签收成功'; break
              case 7:status = '签收异常'; break
              default:status = 'unknown'; alert(params.row.orderStatusType)
            }
            return h('div', {}, status)
          }
        },
        {
          title: '下单时间',
          key: 'gmtTime'
        }
      ],
      filehc: '',
      filehuayu: '',
      loadingStatus: false,
      hcModal: false,
      huayuModal: false,
      datahc: [],
      datahuayu: [],
      dataerror: [],
      allDatahc: [],
      allDatahuayu: [],
      allDataerror: [],
      currentPage: 1,
      dataAmounthc: 0,
      dataAmounthuayu: 0,
      dataAmounterror: 0
    }
  },
  mounted () {

  },
  methods: {
    changePagehc (index) {
      this.currentPage = index
      this.datahc = this.allDatahc.slice((index - 1) * 8, index * 8)
    },
    changePagehuayu (index) {
      this.currentPage = index
      this.datahuayu = this.allDatahuayu.slice((index - 1) * 8, index * 8)
    },
    changePageerror (index) {
      this.currentPage = index
      this.dataerror = this.allDataerror.slice((index - 1) * 8, index * 8)
    },
    changeTab () {
      this.currentPage = 1
      this.datahc = this.allDatahc.slice(0, 8)
      this.datahuayu = this.allDatahuayu.slice(0, 8)
      this.dataerror = this.allDataerror.slice(0, 8)
    },
    handleUploadhc (file) {
      this.file = file
      this.filehc = file.name
      return false
    },
    handleUploadhuayu (file) {
      this.file = file
      this.filehuayu = file.name
      return false
    },
    uploadhc () {
      if (this.file != null) {
        this.loadingStatus = true
        this.file = null
        this.filehc = ''
        this.loadingStatus = false
        this.$Message.success('Success')
        this.importfile('hc')
      }
      this.hcModal = false
    },
    importfile (type) {
      if (type === 'huayu') {
        this.$http.get('https://www.easy-mock.com/mock/5d063c2b19efbf55ebd39b4f/logistics/huayu/list')
          .then((response) => {
            this.allDatahuayu = response.body.data
            this.dataAmounthuayu = this.allDatahuayu.length
            this.datahuayu = this.allDatahuayu.slice(0, 8)
          }).catch(function (response) {
            console.log(response)
          })
      } else if (type === 'hc') {
        this.$http.get('https://www.easy-mock.com/mock/5d063c2b19efbf55ebd39b4f/logistics/hc/list')
          .then((response) => {
            console.log(response)
            this.allDatahc = response.body.data
            this.dataAmounthc = this.allDatahc.length
            this.datahc = this.allDatahc.slice(0, 8)
          }).catch(function (response) {
            console.log(response)
          })
      }
    },
    uploadhuayu () {
      if (this.file != null) {
        this.loadingStatus = true
        this.file = null
        this.filehuayu = ''
        this.loadingStatus = false
        this.$Message.success('Success')
        this.importfile('huayu')
      }
      this.huayuModal = false
    },
    cancelhc () {
      this.hcModal = false
    },
    cancelhuayu () {
      this.huayuModal = false
    },
    createInfo () {
      this.$Message.success('success')
      this.$http.get('https://www.easy-mock.com/mock/5d063c2b19efbf55ebd39b4f/logistics/exception')
        .then((response) => {
          this.allDataerror = response.body.data
          this.dataAmounterror = this.allDataerror.length
          this.dataerror = this.allDataerror.slice(0, 8)
        }).catch(function (response) {
          console.log(response)
        })
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
        color: #FFFFFF;
        font-size: small;
        padding: 8px 15px 8px 15px;
        margin-right: 10px;
    }
    .btn-confirm{
        margin-right: 20px;
        background-color: #9137F3;
        color: #FFFFFF;
    }
    .btn-cancel{
        background-color: #8D99A8;
        color: #FFFFFF;
        margin-left: 20px;
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
    .block-body>>>.ivu-tabs-ink-bar{
        background-color: #9137F3;
    }
    .block-body>>>.ivu-tabs-nav .ivu-tabs-tab:hover{
        color: #9137F3;
    }
    .block-body>>>.ivu-tabs-nav .ivu-tabs-tab-active{
        color: #9137F3;
    }
    .block-body>>>.ivu-tabs-nav .ivu-tabs-tab{
        padding-bottom: 13px;
    }

    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-input{
        width: 350px;
        margin-right: 0;
        font-weight: normal;
    }
    .modal-inline{
        padding: 10px 10px 20px 10px;
    }

</style>
