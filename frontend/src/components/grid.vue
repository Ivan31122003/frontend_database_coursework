<template>
  <div class="background-custom w-[1200px] pt-8 flex flex-col items-center">
    <div class="w-full">
      <button
        class="px-[20px] py-[2px] text-xl text-slate-50 rounded-xl border-solid border-white border-[1px] hover:bg-white hover:text-black transition duration-200"
        @click="emit('createRow')"
      >
        Добавить
      </button>
      <button
        class="ml-4"
        :class="{
          'px-[20px] py-[2px] text-xl text-slate-50 rounded-xl border-solid border-white border-[1px] cursor-pointer hover:bg-white hover:text-black transition duration-200':
            state.selectedRows.length === 1,
          'px-[20px] py-[2px] text-xl text-gray-600 rounded-xl border-solid border-gray-600 border-[1px]':
            state.selectedRows.length !== 1,
        }"
        @click="emit('updateRow')"
        :disabled="state.selectedRows.length !== 1"
      >
        Редактировать
      </button>
      <button
        class="ml-4"
        :class="{
          'px-[20px] py-[2px] text-xl text-slate-50 rounded-xl border-solid border-white border-[1px] cursor-pointer hover:bg-white hover:text-black transition duration-200':
            state.selectedRows.length > 0,
          'px-[20px] py-[2px] text-xl text-gray-600 rounded-xl border-solid border-gray-600 border-[1px]':
            state.selectedRows.length === 0,
        }"
        @click="emit('deleteRow')"
        :disabled="state.selectedRows.length === 0"
      >
        Удалить
      </button>
    </div>
    <table
      class="w-[1200px] mt-4 border-collapse border border-gray-300 text-gray-300"
    >
      <thead>
        <tr>
          <th class="w-10 flex justify-center items-center"></th>
          <th
            class="border border-gray-300 px-4 py-2"
            v-for="(header, index) in props.headers"
            :key="index"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in props.rows"
          :key="rowIndex"
          class="border border-gray-300"
        >
          <td class="text-center">
            <input
              type="checkbox"
              class="cursor-pointer transform scale-150"
              :checked="state.selectedRows.includes(row.id)"
              @click="select($event, row)"
              :disabled="state.isButtonClick"
            />
          </td>
          <td
            v-for="(header, index) in props.headers"
            :key="index"
            class="border border-gray-300 px-4 py-2 text-center"
          >
            {{ row[header] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import store from '@/store.js';
  const { state } = store;
  const emit = defineEmits(['createRow', 'updateRow', 'deleteRow']);

  const props = defineProps({
    headers: {
      type: Array,
      default: () => {},
    },
    rows: {
      type: Array,
      default: () => {},
    },
  });

  const select = (event, row) => {
    if (event.target.checked) {
      state.selectedRows.push(row.id);
    } else {
      state.selectedRows = state.selectedRows.filter(
        (rowId) => rowId !== row.id
      );
    }
  };
</script>
