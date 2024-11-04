<template>
  <div class="p-4 flex justify-center">
    <table
      class="mt-4 w-[1200px] border-collapse border border-gray-300 text-gray-300"
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
