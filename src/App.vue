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
              <input type="text" v-model="time" />
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
            <a href="#" @click="unselect">
              <i class="fa fa-chevron-left fa-lg"></i>
            </a>
          </div>
          <div class="header__column">
            <span class="header__text" v-if="editable('name')">
              <input type="text" v-model="user.name" />
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
            <input type="text" v-model="today" />
          </span>
          <span class="date-divider__text" v-else @click="select('today')">{{today}}</span>
        </div>
        <div v-for="(message, index) in messages" :key="index">
          <div v-if="!message.me" class="chat__message chat__message--to-me">
            <img :src="user.imageSrc" class="chat__message-avatar" />
            <div class="chat__message-center">
              <h3 class="chat__message-username">{{user.name}}</h3>
              <span v-if="editable(index)" class="chat__message-body">
                <textarea cols="27" v-model="message.content"></textarea>
              </span>
              <span
                v-else
                class="chat__message-body"
                style="white-space: pre-line"
                @click="select(index)"
              >{{message.content}}</span>
            </div>
            <span v-if="editable(index)" class="chat__message-time">
              <input type="text" v-model="message.time" />
            </span>
            <span v-else class="chat__message-time">{{message.time}}</span>
          </div>
          <div v-else class="chat__message chat__message-from-me">
            <span v-if="editable(index)" class="chat__message-time">
              <input type="text" v-model="message.time" />
            </span>
            <span v-else class="chat__message-time">{{message.time}}</span>
            <span v-if="editable(index)" class="chat__message-body">
              <textarea v-model="message.content"></textarea>
            </span>
            <span v-else class="chat__message-body" @click="select(index)">{{message.content}}</span>
          </div>
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
          />
          <i class="fa fa-smile-o fa-lg"></i>
          <span class="record-message">
            <i class="fa fa-microphone fa-lg"></i>
          </span>
        </div>
      </div>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">입력</h3>
      <div slot="body">
        <div class="form-group">
          <label for="img-src">프로필사진</label>
          <input
            class="form-control"
            id="img-src"
            name="img-src"
            type="text"
            v-model="user.imageSrc"
          />
        </div>
        <div class="form-group">
          <label for="message-content-input">메시지 입력</label>
          <input
            type="text"
            class="form-control"
            name="message-content-input"
            id="message-content-input"
            v-model="input.content"
          />
        </div>
        <div class="form-group">
          <label for="message-time-input">시간</label>
          <input
            type="text"
            class="form-control"
            id="message-time-input"
            placeholder="예: 오전 09:00"
            v-model="input.time"
          />
        </div>
        <div>
          <div class="form-group form-check">
            <input
              class="form-check-input"
              type="checkbox"
              name="me-input"
              id="me-id-input"
              v-model="input.me"
            />
            <label class="form-check-label" for="me-input">나</label>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-primary" type="button" @click="addMessageFromModal">입력</button>
        <button class="btn btn-primary" type="button" @click="remove">마지막 메시지 제거</button>
        <!-- <button class="btn btn-primary" type="button" @click="download">다운로드</button> -->
      </div>
    </modal>
  </div>
</template>
<script>
import Modal from "./components/Modal";
import { ref } from "@vue/composition-api";
import moment from "moment";
import { useSelected } from "./compositions/selected";
import { useInput } from "./compositions/input";

export default {
  name: "app",
  components: {
    Modal
  },
  setup() {
    const {
      input,
      messages,
      add,
      addOtherTalk,
      addMyTalk,
      initInput,
      remove
    } = useInput();
    const time = ref(
      moment()
        .locale("ko")
        .format("k:mm")
    );
    let showModal = ref(false);
    const today = ref(
      moment()
        .locale("ko")
        .format("LL")
    );
    const user = ref({
      imageSrc: "http://www.pororopark.com/images/sub/circle_pororo.png",
      name: "뽀로로"
    });

    const download = async () => {
      showModal.vaue = false;
      // const el = $refs.printMe;
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
    };

    const addMessageFromModal = () => {
      add();
      showModal.value = false;
    };

    return {
      time,
      showModal,
      today,
      user,
      ...useSelected(),
      addMessageFromModal,
      download,
      input,
      messages,
      add,
      addOtherTalk,
      addMyTalk,
      initInput,
      remove
    };
  },
  beforeMount() {
    if (window.confirm("튜토리얼을 확인하시겠습니까?")) {
      window.open("https://youtu.be/DSEOryKvISk", "_blank");
    }
  }
};
</script>