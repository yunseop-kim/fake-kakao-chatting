<template>
  <div>
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
          <span class="header__text">God</span>
        </div>
        <div class="header__column">
          <i class="fa fa-search"></i>
          <i class="fa fa-bars"></i>
        </div>
      </div>
    </header>
    <main class="chat">
      <div class="date-divider">
        <span class="date-divider__text">Tuesday, May 21, 2019</span>
      </div>
      <!-- <div class="chat__message chat__message-from-me">
        <span class="chat__message-time">17:55</span>
        <span class="chat__message-body">Hello! This is a test message.</span>
      </div> -->
      <div class="chat__message chat__message--to-me">
        <img src="https://is2-ssl.mzstatic.com/image/thumb/Purple128/v4/b7/74/60/b774609f-a95c-92bb-49e0-647c0ce9f1e0/source/512x512bb.jpg" class="chat__message-avatar">
        <div class="chat__message-center">
          <h3 class="chat__message-username">Jesus</h3>
          <span class="chat__message-body">Hello World!</span>
        </div>
        <span class="chat__message-time">오전 9:43</span>
      </div>
      <div class="chat__message chat__message-from-me">
        <span class="chat__message-time">오전 9:43</span>
        <span class="chat__message-body">헉...</span>
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
    <div class="bigScreenText">
      <span>Please make your screen smaller</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
</style>
