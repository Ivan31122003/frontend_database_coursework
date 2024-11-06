<template>
  <div class="w-[1200px] pt-8 flex flex-col items-center">
    <div class="w-full">
      <button
        class="px-[20px] py-[2px] text-xl text-slate-50 rounded-xl border-solid border-white border-[1px] hover:bg-white hover:text-black transition duration-200"
        @click="() => emit('createNewRow')"
      >
        Добавить
      </button>
    </div>
    <table
      class="w-[1200px] mt-4 border-collapse border border-gray-300 text-gray-300"
    >
      <thead>
        <tr>
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
  const emit = defineEmits(['createNewRow']);

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
</script>
