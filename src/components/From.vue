<template>
  <div class="chat__message chat__message-from-me">
    <span
      v-if="editable"
      class="chat__message-time"
      :style="editable ? 'position:relative; bottom: 16px;' : ''"
    >
      <input type="text" v-model="message.time">
      <br>
      <button @click="complete" style="right: 0; position: absolute;">수정</button>
    </span>
    <span v-else class="chat__message-time">{{message.time}}</span>
    <span v-if="editable" class="chat__message-body">
      <textarea v-model="message.content"></textarea>
    </span>
    <span v-else class="chat__message-body" @click="edit">{{message.content}}</span>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
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
      this.editable = false;
    }
  }
};
</script>
