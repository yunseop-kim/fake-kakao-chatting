<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">OK</button>
            </slot>
            <div>
              <span style="font-size: 10px;">아래 광고를 눌러주시면 운영에 큰 힘이 됩니다. (_ _)</span>
              <a :href="ad.href" target="_blank">
                <img :src="ad.src">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  computed: {
    ad() {
      const random = Math.floor(Math.random() * this.ads.length - 1);
      return this.ads[random];
    }
  },
  data() {
    return {
      ads: [
        {
          src:
            "https://static.coupangcdn.com/image/affiliate/category/20180610/coupang0516-150-x-60.jpg",
          href: "https://coupa.ng/bhgtRg"
        },
        {
          src:
            "https://static.coupangcdn.com/image/affiliate/category/20180610/gold-box-150-x-60.jpg",
          href: "https://coupa.ng/bhgtRP"
        },
        {
          src:
            "https://static.coupangcdn.com/image/affiliate/category/20180610/rocket-w0218-150-x-60.jpg",
          href: "https://coupa.ng/bhgtR2"
        },
        {
          src:
            "https://static.coupangcdn.com/image/affiliate/category/20180610/sns-150-x-60.jpg",
          href: "https://coupa.ng/bhgtSg"
        },
        {
          src:
            "https://static.coupangcdn.com/image/affiliate/category/20180610/jikgu1114-150-x-60.jpg",
          href: "https://coupa.ng/bhgtSs"
        },
        {
          src:
            "https://static.coupangcdn.com/image/affiliate/category/20180610/fashion-women-150-x-60.jpg",
          href: "https://coupa.ng/bhgtSK"
        },
        {
          src:
            "https://static.coupangcdn.com/image/affiliate/category/20180610/fashion-men-150-x-60.jpg",
          href: "https://coupa.ng/bhgtTj"
        },
        {
          src:
            "https://static.coupangcdn.com/image/affiliate/category/20180610/beauty-150-x-60.jpg",
          href: "https://coupa.ng/bhgtTG"
        },
        {
          src:
            "https://static.coupangcdn.com/image/affiliate/category/20180610/food-150-x-60.jpg",
          href: "https://coupa.ng/bhgtTW"
        },
        {
          src:
            "https://static.coupangcdn.com/image/affiliate/category/20180610/kitchen-150-x-60.jpg",
          href: "https://coupa.ng/bhgtUb"
        },
        {
          src:
            "https://static.coupangcdn.com/image/affiliate/category/20180610/electronic-150-x-60.jpg",
          href: "https://coupa.ng/bhgtUK"
        },
        {
          src:
            "https://static.coupangcdn.com/image/affiliate/category/20180610/sports-150-x-60.jpg",
          href: "https://coupa.ng/bhgtV0"
        },
        {
          src:
            "https://static.coupangcdn.com/image/affiliate/category/20180610/toy-150-x-60.jpg",
          href: "https://coupa.ng/bhgtWl"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
