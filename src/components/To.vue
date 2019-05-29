<template>
  <div class="chat__message chat__message--to-me">
    <img :src="image" class="chat__message-avatar">
    <div class="chat__message-center">
      <h3 class="chat__message-username">{{name}}</h3>
      <span v-if="editable" class="chat__message-body">
        <textarea cols="27" v-model="message.content"></textarea>
      </span>
      <span
        v-else
        class="chat__message-body"
        style="white-space: pre-line"
        @click="edit"
      >{{message.content}}</span>
    </div>
    <span
      v-if="editable"
      class="chat__message-time"
      :style="editable ? 'position:relative; bottom: 16px;' : ''"
    >
      <input type="text" v-model="message.time">
      <br>
      <button @click="complete" style="left: 0; position: absolute;">수정</button>
    </span>
    <span v-else class="chat__message-time">{{message.time}}</span>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: false,
      default: "사용자"
    },
    image: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      editable: false
    };
  },
  methods: {
    edit() {
      this.editable = true;
    },
    complete() {
      this.editable = false
    }
  }
};
</script>
