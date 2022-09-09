<template>
  <div class="canvas-idcard-maker-container">
    <div class="editor-box">
      <div class="title">制作名片</div>
      <div class="tip">定制请打开高级设置</div>
      <div class="tips" v-if="showSetting">
        <div class="tip">0. <span class="red-text">坐标系原点xy(0,0)在左上角</span> </div>
        <div class="tip">1.文字的xy坐标在<span class="red-text">左下角</span>, 图片的xy在<span class="red-text">左上角</span>, 可打开 <span class="red-text">辅助线观察</span></div>
        <div class="tip">2.font说明: 第一个normal不需要改动, 第二个可控制粗细度, 可选值:[normal, bold, bloder, 100, 200, 300, 400, 500, 600], 第三个为字号(必须带px单位), 第四个为字体(<span class="red-text">用户电脑上安装过的字体</span>都可); <span class="red-text">每个值之间有空格</span></div>
        <div class="tip">3.每次编辑完需要 <span class="red-text">点击生成名片</span>来刷新</div>
      </div>
      <div class="editor-item">
        <span class="label">姓名:</span>
        <input type="text" v-model="user.name">
        <div class="settings" v-if="showSetting">
          x:<input type="number" v-model="nameConfig.x">
          y:<input type="number" v-model="nameConfig.y">
          font: <input type="text" class="font-input" v-model="nameConfig.font">
        </div>
      </div>
      <div class="editor-item">
        <span class="label">身份:</span>
        <input type="text" v-model="user.title">
        <div class="settings" v-if="showSetting">
          x:<input type="number" v-model="titleConfig.x">
          y:<input type="number" v-model="titleConfig.y">
          font: <input type="text" class="font-input" v-model="titleConfig.font">
          color: <input type="text" v-model="titleConfig.color">
        </div>
      </div>
      <div class="editor-item" v-if="showSetting">
        <span class="label">分割线设置:</span>
        <div class="settings">
          x:<input type="number" v-model="spaceLineConfig.x">
          y:<input type="number" v-model="spaceLineConfig.y">
          宽:<input type="number" v-model="spaceLineConfig.width">
          高:<input type="number" v-model="spaceLineConfig.height">
          color: <input type="text" v-model="spaceLineConfig.color">
        </div>
      </div>
      <div class="editor-item">
        <span class="label">公司名称:</span>
        <input type="text" v-model="user.companyName" style="width: 300px">
        <div class="settings" v-if="showSetting">
          x:<input type="number" v-model="companyNameConfig.x">
          y:<input type="number" v-model="companyNameConfig.y">
          font: <input type="text" class="font-input" v-model="companyNameConfig.font">
          color: <input type="text" v-model="companyNameConfig.color">
        </div>
      </div>
      <div class="editor-item">
        <span class="label">第1行:</span>
        <input type="text" class="info-input" v-model="user.info1">
        <div class="settings" v-if="showSetting">
          x:<input type="number" v-model="info1Config.x">
          y:<input type="number" v-model="info1Config.y">
          font: <input type="text" class="font-input" v-model="info1Config.font">
          color: <input type="text" v-model="info1Config.color">
        </div>
      </div>
      <div class="editor-item">
        <span class="label">第2行:</span>
        <input type="text" class="info-input" v-model="user.info2">
        <div class="settings" v-if="showSetting">
          x:<input type="number" v-model="info2Config.x">
          y:<input type="number" v-model="info2Config.y">
          font: <input type="text" class="font-input" v-model="info2Config.font">
          color: <input type="text" v-model="info2Config.color">
        </div>
      </div>
      <div class="editor-item">
        <span class="label">第3行:</span>
         <input type="text" class="info-input" v-model="user.info3">
        <div class="settings" v-if="showSetting">
          x:<input type="number" v-model="info3Config.x">
          y:<input type="number" v-model="info3Config.y">
          font: <input type="text" class="font-input" v-model="info3Config.font">
          color: <input type="text" v-model="info3Config.color">
        </div>
      </div>
      <div class="editor-item">
        <span class="label">第4行:</span>
       <input type="text" class="info-input" v-model="user.info4">
        <div class="settings" v-if="showSetting">
          x:<input type="number" v-model="info4Config.x">
          y:<input type="number" v-model="info4Config.y">
          font: <input type="text" class="font-input" v-model="info4Config.font">
          color: <input type="text" v-model="info4Config.color">
        </div>
      </div>
      <div class="editor-item">
        <span class="label">二维码(图片):</span>
        <input type="file" class="info-input" @change="getImage">
        <div class="settings" v-if="showSetting">
          x:<input type="number" v-model="qrCodeConfig.x">
          y:<input type="number" v-model="qrCodeConfig.y">
          宽:<input type="number" v-model="qrCodeConfig.width">
          高:<input type="number" v-model="qrCodeConfig.height">
        </div>
      </div>
      <div class="editor-item" v-if="showSetting">
        <span class="label">更换名片背景图:</span>
        <input type="file" class="info-input" @change="getBgImage">
        <button @click="() => { this.bgImgBase64 = null; this.setCanvas() }">清除并重新生成</button>
      </div>
      <div class="editor-item">
        <button @click="setCanvas">生成名片</button>
        <button title="辅助线交叉点为xy坐标点" @click="showHelpLines">{{showTool ? '隐藏' : '显示'}}辅助线</button>
        <button @click="showSettings">{{showSetting ? '隐藏' : '显示'}}高级设置</button>
        <button @click="exportPNG">导出为图片</button>

      </div>
    </div>
    <div class="canvas-box">
      <canvas id="baseCanvas" :style="{
        width: canvasWidth + 'px',
        height: canvasHeight + 'px'
      }"></canvas>
      <canvas id="toolCanvas" v-if="showTool" :style="{
        width: canvasWidth + 'px',
        height: canvasHeight + 'px'
      }"></canvas>
    </div>
  </div>
</template>

<script>
import BgImg from 'assets/icons/idcard_bg.png'
import QRCodeImg from 'assets/icons/default_qrcode.jpeg'
export default {
  name: "",
  data() {
    return {
      showTool: false,
      canvas: null,
      ctx: null,
      toolCanvas: null,
      toolCtx: null,
      canvasHeight: 0,
      canvasWidth: 700,
      ratio: 1,
      baseCanvasRatio: 1134 / 709, // 名片比例
      dpr: 1,
      user: {
        name: '姓名👴🏻',
        title: '职位',
        companyName: '标信智链（杭州）科技发展有限公司',
        info1: '手机：',
        info2: '邮箱：',
        info3: '地址：北京市海淀区西北旺镇唐家岭村南2号院3幢房3109',
        info4: '地址：浙江省杭州市余杭区临平街道南苑街道西子国际金座2幢607室-1',
      },
      nameConfig: {
        x: 95,
        y: 230,
        font: 'normal normal 40px sans-serif',
        color: '#000000'
      },
      titleConfig: {
        x: 304,
        y: 230,
        font: 'normal normal 14px sans-serif',
        color: '#000000'
      },
      spaceLineConfig: {
        x: 95,
        y: 283,
        color: '#1e94d4',
        width: 50,
        height: 4,
      },
      companyNameConfig: {
        x: 95,
        y: 367,
        font: 'normal bold 20px sans-serif',
        color: '#000000'
      },
      info1Config: {
        x: 95,
        y: 440,
        font: 'normal normal 14px sans-serif',
        color: '#000000'
      },
      info2Config: {
        x: 95,
        y: 492,
        font: 'normal normal 14px sans-serif',
        color: '#000000'
      },
      info3Config: {
        x: 95,
        y: 540,
        font: 'normal normal 14px sans-serif',
        color: '#000000'
      },
      info4Config: {
        x: 95,
        y: 590,
        font: 'normal normal 14px sans-serif',
        color: '#000000'
      },
      qrCodeConfig: {
        x: 866,
        y: 420,
        width: 179,
        height: 179
      },
      qrCodebase64: QRCodeImg,
      bgImgBase64: null,
      showSetting: false
    }
  },
  created() {
    this.canvasHeight = this.canvasWidth / this.baseCanvasRatio;
    this.ratio = 700 / 1134;// 缩小的比例
    this.setInitialXY([
      this.nameConfig,
      this.titleConfig,
      this.companyNameConfig,
      this.info1Config,
      this.info2Config,
      this.info3Config,
      this.info4Config,
        this.qrCodeConfig,
        this.spaceLineConfig
    ], this.ratio)
  },
  methods: {
    showHelpLines() {
      this.showTool = !this.showTool;
      if (this.showTool) {
        this.$nextTick(() => {
          this.initTool();
        })
      }
    },
    showSettings() {
      this.showSetting = !this.showSetting
    },
    getImage(e) {
      console.log("file", e.target.files[0])
      let file = e.target.files[0]
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.qrCodebase64 = reader.result
      }
    },
    getBgImage(e) {
      let file = e.target.files[0]
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.bgImgBase64 = reader.result
      }
    },
    init() {
      this.canvas = document.getElementById('baseCanvas');
      let dpr = window.devicePixelRatio
      this.dpr = dpr;
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = dpr * this.canvasWidth;
      this.canvas.height = dpr * this.canvasHeight;
      this.setContent(BgImg)
    },
    initTool() {
      this.toolCanvas = document.getElementById('toolCanvas');
      this.toolCtx = this.toolCanvas.getContext('2d');
      this.toolCanvas.width = this.dpr * this.canvasWidth;
      this.toolCanvas.height = this.dpr * this.canvasHeight;
      this.setToolLines()
    },
    setInitialXY(list, ratio) {
      list.forEach( item => {
        item.x = Math.round(item.x * ratio);
        item.y = Math.round(item.y * ratio);
        if (item.width) item.width = Math.round(item.width * ratio);
        if (item.height) item.height = Math.round(item.height * ratio);
      })
    },
    setToolLines() {
      this.toolCtx.clearRect(0,0, this.canvasWidth, this.canvasHeight)
      this.setCommonLines(this.nameConfig)
      this.setCommonLines(this.titleConfig)
      this.setCommonLines(this.companyNameConfig)
      this.setCommonLines(this.info1Config)
      this.setCommonLines(this.info2Config)
      this.setCommonLines(this.info3Config)
      this.setCommonLines(this.info4Config)
      this.setCommonLines(this.qrCodeConfig)
    },
    setCommonLines(config) {
      this.toolCtx.beginPath();
      this.toolCtx.moveTo(config.x - 50, config.y);
      this.toolCtx.lineTo(config.x + 50, config.y);
      this.toolCtx.strokeStyle = '#0567fb'
      this.toolCtx.closePath();
      this.toolCtx.stroke();

      this.toolCtx.beginPath();
      this.toolCtx.moveTo(config.x, config.y - 50);
      this.toolCtx.lineTo(config.x, config.y + 50);
      this.toolCtx.strokeStyle = '#0567fb'
      this.toolCtx.closePath();
      this.toolCtx.stroke();
    },
    setBgImage(bgImg) {
      return new Promise( (resolve, reject) => {
        let x = 0;
        let y = 0
        let dw = this.canvas.width, dh = this.canvas.height;
        let img = new Image();
        img.src = bgImg;
        img.onload = () => {
          this.ctx.drawImage(img, x, y, dw, dh);
          resolve();
        }
      })
    },
    setTexts() {
      // 姓名栏
      if (this.user.name) {
        this.ctx.font = this.nameConfig.font
        this.ctx.fillStyle = this.nameConfig.color;
        this.ctx.fillText(this.user.name, this.nameConfig.x, this.nameConfig.y)
      }

      // 职位栏
      if (this.user.title) {
        this.ctx.font = this.titleConfig.font
        this.ctx.fillStyle = this.titleConfig.color;
        this.ctx.fillText(this.user.title, this.titleConfig.x, this.titleConfig.y)
      }

      // 公司
      if (this.user.companyName) {
        this.ctx.font = this.companyNameConfig.font
        this.ctx.fillStyle = this.companyNameConfig.color;
        this.ctx.fillText(this.user.companyName, this.companyNameConfig.x, this.companyNameConfig.y)
      }

      // 四行信息
      for (let i = 1; i < 5;i++) {
        this.ctx.font = this[`info${i}Config`].font
        this.ctx.fillStyle =  this[`info${i}Config`].color;
        this.ctx.fillText(this.user[`info${i}`],  this[`info${i}Config`].x,  this[`info${i}Config`].y)
      }
    },
    setSpaceLine() {
      let {x,y,width,height,color} = this.spaceLineConfig
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x,y,width,height)
    },
    async setContent(backgroundImage=BgImg) {
      console.log("重绘")
      // 清空画布
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      // 等待图片加载
      await this.setBgImage(this.bgImgBase64 || backgroundImage)
      // 设置文字
      this.setTexts()
      // 设置分割线
      this.setSpaceLine();
      // 设置二维码
      if (this.qrCodebase64) this.setQrcode()
    },
    setQrcode() {
      let {x, y, width, height} = this.qrCodeConfig
      let img = new Image();
      img.src = this.qrCodebase64;
      img.onload = () => {
        this.ctx.drawImage(img, x, y, width, height);
      }
    },
    setCanvas() {
      this.setContent();
      if ( this.showTool ) {
        this.setToolLines()
      }
    },
    exportPNG() {
      let a = document.createElement('a');
      a.href = this.canvas.toDataURL('image/png'); //下载图片
      a.download = '名片.png';
      a.click();
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style lang="less" scoped>
.canvas-idcard-maker-container {
  .canvas-box {
    margin: 0 auto;
    //border: 1px solid #0B0D1B;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    #baseCanvas {
      margin: 0 auto;
    }

    #toolCanvas {
      position: absolute;
      left: 50%;
      margin-left: -350px;
    }
  }

  .editor-box {
    width: 700px;
    margin: 0 auto;
    .tips {
      .red-text {
        color: red;
      }
    }
    .title {
      font-size: 20px;
      font-weight: bold;
    }
    .editor-item {
      padding: 10px;
      border-bottom: 1px dashed #0B0D1B;
      .label {
        margin-right: 10px;
      }
      input {
        border-bottom: 1px solid #0B0D1B;
        &.key {
          width: 50px;
        }

        &.info-input {
          width: 400px;
        }
      }

      .settings {
        input {
          width: 80px;
          &.font-input {
            width: 250px
          }
        }
      }

      button {
        margin-right: 20px;
      }
    }
  }
}
</style>