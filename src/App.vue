<template>
  <div style="display: flex; flex-wrap: wrap;">
    <div style="width: 360px;">
      <header class="top-header chat-header">
        <div class="header__top">
          <div class="header__column">
            <i class="fa fa-fighter-jet"></i>
            <i class="fa fa-wifi"></i>
          </div>
          <div class="header__column">
            <span class="header__time">18:38</span>
          </div>
          <div class="header__column">
            <i class="fa fa-moon-o"></i>
            <i class="fa fa-bluetooth-b"></i>
            <span class="header__battery">
              66%
              <i class="fa fa-battery-full"></i>
            </span>
          </div>
        </div>
        <div class="header__bottom">
          <div class="header__column">
            <a href="chats.html">
              <i class="fa fa-chevron-left fa-lg"></i>
            </a>
          </div>
          <div class="header__column">
            <span class="header__text">{{ user.name }}</span>
          </div>
          <div class="header__column">
            <i class="fa fa-search"></i>
            &nbsp;
            <i class="fa fa-bars"></i>
          </div>
        </div>
      </header>
      <main class="chat" @click="unselect">
        <div class="date-divider">
          <span class="date-divider__text">{{today}}</span>
        </div>
        <div v-for="(message, index) in messages" :key="index">
          <div v-if="!message.me" class="chat__message chat__message--to-me">
            <img :src="user.imageSrc" class="chat__message-avatar">
            <div class="chat__message-center">
              <h3 class="chat__message-username">{{user.name}}</h3>
              <span v-if="editable(index)" class="chat__message-body">
                <input type="text" v-model="message.content">
              </span>
              <span v-else class="chat__message-body" @dblclick="select(index)">{{message.content}}</span>
            </div>
            <span v-if="editable(index)" class="chat__message-time">
              <input type="text" v-model="message.time">
            </span>
            <span v-else class="chat__message-time">{{message.time}}</span>
          </div>
          <div v-else class="chat__message chat__message-from-me">
            <span v-if="editable(index)" class="chat__message-time">
              <input type="text" v-model="message.time">
            </span>
            <span v-else class="chat__message-time">{{message.time}}</span>
            <span v-if="editable(index)" class="chat__message-body">
              <input type="text" v-model="message.content">
            </span>
            <span v-else class="chat__message-body" @dblclick="select(index)">{{message.content}}</span>
          </div>
        </div>
      </main>
      <div class="type-message">
        <i class="fa fa-plus fa-lg"></i>
        <div class="type-message__input">
          <input type="text">
          <i class="fa fa-smile-o fa-lg"></i>
          <span class="record-message">
            <i class="fa fa-microphone fa-lg"></i>
          </span>
        </div>
      </div>
      <!-- <div class="bigScreenText">
        <span>Please make your screen smaller</span>
      </div>-->
    </div>
    <div style="margin: 20px;">
      <div class="form-group">
        <label for="img-src">프로필사진</label>
        <input class="form-control" id="img-src" name="img-src" type="text" v-model="user.imageSrc">
      </div>
      <div class="form-group">
        <label for="message-content-input">메시지 입력</label>
        <input
          type="text"
          class="form-control"
          name="message-content-input"
          id="message-content-input"
          v-model="input.content"
        >
      </div>
      <div class="form-group">
        <label for="message-time-input">시간</label>
        <input type="text" class="form-control" id="message-time-input" placeholder="예: 오전 09:00" v-model="input.time">
      </div>
      <div>
        <div class="form-group form-check">
          <input class="form-check-input" type="checkbox" name="me-input" id="me-id-input" v-model="input.me">
          <label class="form-check-label" for="me-input">나</label>
        </div>
        <button class="btn btn-primary" type="button" @click="add">입력</button>
        <button class="btn btn-primary" type="button" @click="remove">마지막 메시지 제거</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      selected: null,
      today: "Tuesday, May 21, 2019",
      input: { content: "", time: "", me: false },
      user: {
        imageSrc:
          "https://is2-ssl.mzstatic.com/image/thumb/Purple128/v4/b7/74/60/b774609f-a95c-92bb-49e0-647c0ce9f1e0/source/512x512bb.jpg",
        name: "Jesus",
      },
      messages: [
        { content: "Hello World!", time: "오전 9:43", me: false },
        { content: "반갑습니다", time: "오전 9:43", me: true }
      ]
    };
  },
  methods: {
    add(event) {
      if (!this.input.content || !this.input.time) return;
      this.messages.push(this.input)
      this.initInput()
    },
    remove(event) {
      if(window.confirm("정말 제거하시겠습니까?")){
        this.messages.pop()
        this.initInput()
      }
    },
    initInput() {
      this.input = { content: "", time: "", me: false }
    },
    select(index) {
      this.selected = index
    },
    unselect() {
      this.selected = null
    },
    editable(index) {
      return this.selected === index
    }
  }
};
</script>