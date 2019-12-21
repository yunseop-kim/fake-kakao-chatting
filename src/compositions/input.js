import { ref } from '@vue/composition-api';
import moment from 'moment';

export const useInput = () => {
  let input = ref({ content: '', time: '', me: false });
  const messages = ref([
    {
      content: '친구야 안녕!',
      time: moment()
        .locale('ko')
        .format('A h:mm'),
      me: false
    }
  ]);

  const add = () => {
    if (!input.value.content) return;
    if (!input.value.time)
      input.value.time = moment()
        .locale('ko')
        .format('A h:mm');
    messages.value.push({ ...input.value });
    initInput();
    // showModal.value = false;
  };

  const addOtherTalk = () => {
    input.value.me = false;
    add();
  };

  const addMyTalk = () => {
    input.value.me = true;
    add();
  };

  const initInput = () => {
    input.value = { content: '', time: '', me: false };
  };

  const remove = () => {
    if (window.confirm('정말 제거하시겠습니까?')) {
      messages.value.pop();
      initInput();
    }
  };

  return {
    input,
    messages,
    add,
    addOtherTalk,
    addMyTalk,
    initInput,
    remove
  };
};
