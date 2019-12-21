import { ref } from '@vue/composition-api';

export const useSelected = () => {
  let selected = ref(null);
  const select = index => {
    console.log('select');
    selected.value = index;
  };
  const unselect = () => {
    console.log('unselect');
    selected.value = null;
  };
  const editable = index => selected.value === index;

  return {
    selected,
    select,
    unselect,
    editable
  };
};
