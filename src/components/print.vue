<template>
  <el-button @click="doPrint">打印</el-button>
</template>

<script>
export default {
  name: 'printBtn',
  props: {
    contentId: {
      type: String,
      default: ''
    },
  },
  methods: {
    doPrint() {
      const printData = document.getElementById(this.contentId).innerHTML; // 根据id获取需要打印的内容
      const iframe = document.createElement('iframe'); 
      const f = document.body.appendChild(iframe);
      const w = f.contentWindow || f.contentDocument;
      const contentStyle = this.getStyle(); // 获取样式
      w.document.write(`<html> <head> <style> ${contentStyle} </style> </head> <body> ${printData} </body> </html>`);
      f.contentWindow.focus()
      f.contentWindow.print()
      setTimeout(function () {
        document.body.removeChild(iframe)
      }, 100)
    },
    getStyle() {
      const styleList  = document.getElementsByTagName('style');
      let styleStr = '';
      for(let i = 0; i < styleList.length; i++) {
        styleStr += styleList[i].innerHTML
      }
      return styleStr;
    }
  }
}
</script>
