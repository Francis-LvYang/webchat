<template>
    <div class="clear" :class="[isSelf ? 'right' : 'left']" ref="msg">
        <div class="item">
            <div class="name">
                <span v-if="mytime">{{getdate}}</span> &nbsp;&nbsp;{{name}}
            </div>
            <span class="head-place" ref="header" :id="id">
                <img :src="avatar" alt="" class="head">
            </span>
            <div v-if="img">
                <img
                    :src="pic"
                    alt=""
                    v-preview="img"
                    class="img"
                    preview-title-enable="true"
                    preview-nav-enable="true">
            </div>
            <span v-if="msg">
                <span v-html="linkMsg" class="msg"></span>
                <!-- {{msg | link}} -->
            </span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import dateFormat from "../../utils/date";
import Confirm from '@components/Confirm';
import { inHTMLData, uriInUnQuotedAttr } from "xss-filters-es6";
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      x: 0,
      y: 0,
      timer1: null
    };
  },
  props: ["name", "img", "msg", "head", "mytime", "is-self", "container", "isNeedScroll", "firstNode", "id"],
  computed: {
    getdate() {
      return dateFormat(new Date(this.mytime), "yyyy-MM-dd HH:mm:ss");
    },
    linkMsg() {
      // 防止xss
      const filterValue = inHTMLData(this.msg);
      return filterValue.replace(
        /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g,
        function($0, $1) {
          const url = $0;
          return `<a style="color: #b374ff" href="${uriInUnQuotedAttr(
            url
          )}" target="_blank">${uriInUnQuotedAttr(url)}</a>`;
        }
      );
    },
    avatar() {
      let avatar = this.head;
      const reg = /\.\/static\/img\/(\d+)\.jpg/;
      const matches = this.head.match(reg);
      if (matches) {
        avatar = `//s3.qiufengh.com/avatar/${matches[1]}.jpeg`;
      }
      return `${avatar}?imageView2/2/w/120/h/120`;
    },
    pic() {
      let pic = this.img;
      if (pic.indexOf("data:image") > -1) {
        return pic;
      }
      return `${pic}?imageView2/2/w/360`;
    }
  },
  methods: {
    ...mapActions([
      'clearOneMessageHistroy'
    ])
  },
  mounted() {
    this.$refs.msg.scrollIntoView();
    let oDiv = this.$refs.header;
    // 添加touchstart，手指触摸事件
    oDiv.addEventListener("touchstart", function(e) {
      if (e.preventDefault) e.preventDefault();
      else e.returnValue = false;
      if (e.touches.length > 1) {
        return false;
      }
      this.z = 0;
      this.timer1 = setTimeout(async () => {
        this.z = 1;
        await Confirm({
          title: '提示',
          content: '确定删除此条消息~',
          cancel: '取消',
          ok: '确定'
        }).then(res => {
          if (res === 'submit') {
            let userid = inHTMLData(e.path[1].id);
            this.$store.dispatch("clearOneMessageHistory", {_id: userid});
          }
        });
      }, 1500);
      this.x = e.touches[0].clientX;
      this.y = e.touches[0].clientY;
    }, false);
    // 添加第三个触摸事件touchend，这个事件的场景就是用户手指从屏幕拿开时触发
    oDiv.addEventListener("touchend", function(e) {
      if (e.preventDefault) e.preventDefault();
      else e.returnValue = false;
      if (this.z !== 1) {
        clearTimeout(this.timer1);
        this.x = 0;
        this.y = 0;
        return false;
      } else if (this.z === 1) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
      }
    }, false);
    // 添加触摸时间
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped src="./index.styl"></style>
