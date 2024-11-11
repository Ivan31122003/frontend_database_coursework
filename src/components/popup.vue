<template>
  <div
    class="absolute flex items-center justify-center w-screen h-screen bg-[#000000bb]"
  >
    <div
      class="background-custom flex flex-col justify-center items-center w-[600px] p-8 rounded-xl"
    >
      <div class="mb-4 w-[65%] text-slate-50">
        <div
          class="mb-4 w-full flex justify-between"
          v-for="(value, key) in state.newRow"
          :key="key"
        >
          <div class="mr-4 text-xl">{{ key }}:</div>
          <input
            class="float-right p-4 h-[25px] rounded-xl text-black"
            v-model="state.newRow[key]"
          />
        </div>
      </div>
      <div class="w-[80%] flex justify-between">
        <button
          class="w-[200px] px-[20px] py-[2px] text-xl text-slate-50 rounded-xl border-solid border-white border-[1px] hover:bg-white hover:text-black transition duration-200"
          @click="cancel"
        >
          Отмена
        </button>
        <button
          class="w-[200px] px-[20px] py-[2px] text-xl text-slate-50 rounded-xl border-solid border-white border-[1px] hover:bg-white hover:text-black transition duration-200"
          @click="emit('buttonClick')"
        >
          {{ props.buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import store from '@/store.js';
  const { state } = store;

  const props = defineProps({
    buttonText: {
      type: String,
      default: () => {},
    },
  });

  const emit = defineEmits(['buttonClick']);

  const cancel = () => {
    state.newRow = {};
    state.isButtonClick = false;
  };
</script>
