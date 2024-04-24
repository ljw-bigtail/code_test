<template>
  <div class="money-input">
    <span class="money-pre" v-show="pre != ''">{{ pre }}</span>
    <div class="money-count">
      <input class="money-count-input" v-model="changeValue" type="digit" v-show="inputShow" :placeholder="placeholder"
        :focus="focus" @focus="openKeyBoard" @blur="closeKeyBoard" @input="replaceInput">
      <span class="money-count-input placeholder" v-show="!inputShow">{{ placeholder }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "money-input",
  components: {
  },
  props: {
    pre: {
      type: String,
      default: '',
    },
    edit: {
      type: Boolean,
      default: false,
    },
    focus: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '金额'
    }
  },
  data() {
    return {
      changeValue: '',
    }
  },
  computed: {
    inputShow: function () {
      return this.edit // && typeof this.value === 'number' && !Number.isNaN(this.value)
    },
  },
  methods: {
    replaceInput(event) {
      const value = event.target.value;
      if(value == '') return
      // 只有 空格 的
      if(value.trim() == ''){
        this.$nextTick(()=>{
          this.changeValue = '';
          this.$emit('update:value', '')
        })
        return
      }
      // 只有 0 的
      if(value.length > 1 && value.split('').every(e => e == '0')){
        this.$nextTick(()=>{
          this.changeValue = 0;
          this.$emit('update:value', 0)
        })
        return
      }
      // 不符合格式的
      const count = this.priceFormat(value)
      if (count !== value) {
        this.$nextTick(()=>{
          this.changeValue = count;
          this.$emit('update:value', count)
        })
      }
    },
    openKeyBoard() {
      this.$emit('update:focus', true)
    },
    closeKeyBoard() {
      this.$emit('update:focus', false)
    },
    priceFormat(value = '') {
      let price = value
      if (price.indexOf(".") == 0) {
        //'首位小数点情况'
        price = price.replace(/[^$#$]/g, "0.");
        // 这个正则表达式 /\.{2,}/g 匹配两个或更多连续的点。
        price = price.replace(/\.{2,}/g, ".");
      }
      //match()方法,检索一个字符串匹配正则表达式的结果,并将符合的字符串，按数组的形式返回。
      // /^\d*(\.?\d{0,2})/g 匹配以数字开头的字符串，后面可以跟一个可选的小数点和最多两位数字
      price = price.match(/^\d*(\.?\d{0,2})/g)[0] || 0;
      //赋值
      return price
    }
  },
}
</script>

<style lang="scss" scoped>
.money-input {
  padding: 0 $space-card;
  display: inline-flex;
  align-items: center;

  .money-pre {
    font-size: $font-size-paragraph;
    line-height: 23px;
  }

  .money-count {

    .money-count-input {
      height: 46px;
      line-height: 46px;
      font-size: $font-size-max;
      color: $font-color-max;

      &.placeholder {
        color: #808080;
      }
    }
  }
}
</style>