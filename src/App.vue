<template>
  <div>
    <div ref="printMe">
      <header class="top-header chat-header">
        <div class="header__top">
          <div class="header__column">
            <i class="fa fa-fighter-jet"></i>
            <i class="fa fa-wifi"></i>
          </div>
          <div class="header__column">
            <span class="header__time" v-if="editable('time')">
              <input type="text" v-model="time">
              <button @click="unselect">수정</button>
            </span>
            <span class="header__time" v-else @click="select('time')">{{ time }}</span>
          </div>
          <div class="header__column">
            <i class="fa fa-moon-o"></i>
            <i class="fa fa-bluetooth-b"></i>
            <span class="header__battery">
              100%
              <i class="fa fa-battery-full"></i>
            </span>
          </div>
        </div>
        <div class="header__bottom">
          <div class="header__column">
            <a href="#">
              <i class="fa fa-chevron-left fa-lg"></i>
            </a>
          </div>
          <div class="header__column">
            <span class="header__text" v-if="editable('name')">
              <input type="text" v-model="user.name">
              <button @click="unselect">수정</button>
            </span>
            <span class="header__text" v-else @click="select('name')">{{ user.name }}</span>
          </div>
          <div class="header__column">
            <i class="fa fa-search"></i>
            &nbsp;
            <i class="fa fa-bars"></i>
          </div>
        </div>
      </header>
      <main class="chat">
        <div class="date-divider">
          <span class="date-divider__text" v-if="editable('today')">
            <input type="text" v-model="today">
            <button @click="unselect">수정</button>
          </span>
          <span class="date-divider__text" v-else @click="select('today')">{{today}}</span>
        </div>
        <div v-for="(message, index) in messages" :key="index">
          <To v-if="!message.me" :message="message" :name="user.name" :image="user.imageSrc"/>
          <From v-else :message="message"/>
        </div>
      </main>
      <div class="type-message">
        <i class="fa fa-plus fa-lg" @click="showModal = true"></i>
        <div class="type-message__input">
          <input
            type="text"
            v-model="input.content"
            @keyup.shift.enter.exact="addOtherTalk"
            @keyup.enter.exact="addMyTalk"
            @keyup.ctrl.enter.exact="remove"
          >
          <i class="fa fa-smile-o fa-lg"></i>
          <span class="record-message">
            <i class="fa fa-microphone fa-lg"></i>
          </span>
        </div>
      </div>
    </div>
    <modal v-if="showModal" @close="close">
      <h3 slot="header">입력</h3>
      <div slot="body">
        <div>
          <label for="img-src">프로필사진</label>
          <input id="img-src" name="img-src" type="text" v-model="user.imageSrc">
        </div>
        <div>
          <label for="message-content-input">메시지 입력</label>
          <input
            type="text"
            name="message-content-input"
            id="message-content-input"
            placeholder="메시지는 필수 입력입니다."
            v-model="input.content"
          >
        </div>
        <div>
          <label for="message-time-input">시간</label>
          <input type="text" id="message-time-input" placeholder="기본값: 현재 시간" v-model="input.time">
        </div>
        <div>
          <div>
            <input type="checkbox" name="me-input" id="me-id-input" v-model="input.me">
            <label for="me-input">나</label>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button type="button" @click="close">취소</button>
        <button type="button" @click="add">입력</button>
        <button type="button" @click="remove">마지막 메시지 제거</button>
      </div>
    </modal>
  </div>
</template>
<script>
import Modal from "./components/Modal";
import To from "./components/To";
import From from "./components/From";
import moment from "moment";

export default {
  name: "app",
  components: {
    Modal,
    To,
    From
  },
  data() {
    return {
      time: moment()
        .locale("ko")
        .format("k:mm"),
      showModal: false,
      selected: null,
      today: moment()
        .locale("ko")
        .format("LL"),
      input: { content: "", time: "", me: false },
      user: {
        imageSrc: "http://www.pororopark.com/images/sub/circle_pororo.png",
        name: "뽀로로"
      },
      messages: [
        {
          content: "친구야 안녕!",
          time: moment()
            .locale("ko")
            .format("A h:mm"),
          me: false
        }
      ]
    };
  },
  beforeMount() {
    if (window.confirm("튜토리얼을 확인하시겠습니까?")) {
      window.open("https://youtu.be/DSEOryKvISk", "_blank");
      this.$ga.event({
        eventCategory: "app",
        eventAction: "goTutorial",
        eventValue: true
      });
    }
  },
  methods: {
    add(event) {
      if (!this.input.content) return;
      if (!this.input.time)
        this.input.time = moment()
          .locale("ko")
          .format("A h:mm");
      this.messages.push(this.input);
      this.$ga.event({
        eventCategory: "app",
        eventAction: "add",
        eventValue: this.input
      });
      this.initInput();
      this.showModal = false;
    },
    addOtherTalk() {
      this.input.me = false;
      this.add();
    },
    addMyTalk() {
      this.input.me = true;
      this.add();
    },
    remove(event) {
      if (window.confirm("정말 제거하시겠습니까?")) {
        this.messages.pop();
        this.$ga.event({
          eventCategory: "app",
          eventAction: "remove",
          eventValue: true
        });
        this.initInput();
      }
    },
    initInput() {
      this.input = { content: "", time: "", me: false };
    },
    select(index) {
      console.log("select");
      this.selected = index;
      this.$ga.event({
        eventCategory: 'app',
        eventAction: 'select',
        eventValue: index
      })
    },
    unselect() {
      console.log("unselect");
      this.selected = null;
      this.$ga.event({
        eventCategory: 'app',
        eventAction: 'unselect',
        eventValue: index
      })
    },
    close() {
      this.showModal = false;
      this.$ga.event({
        eventCategory: 'app',
        eventAction: 'close',
        eventValue: null
      })
    },
    editable(index) {
      return this.selected === index;
    },
    async download() {
      this.showModal = false;
      // const el = this.$refs.printMe;
      const el = document.body;
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: "dataURL",
        useCORS: true
      };
      const MIME_TYPE = "image/png";
      // const imgURL = canvasElement.toDataURL(MIME_TYPE);
      const imgURL = await this.$html2canvas(el, options);
      const dlLink = document.createElement("a");

      dlLink.download = "capture";
      dlLink.href = imgURL;
      dlLink.dataset.downloadurl = [
        MIME_TYPE,
        dlLink.download,
        dlLink.href
      ].join(":");

      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);
    }
  }
};
</script>