<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{'Amount' | local}}</th>
        <th>{{'Date' | local}}</th>
        <th>{{'Category' | local}}</th>
        <th>{{'Type' | local}}</th>
        <th>{{'Open' | local}}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="idx">
        <td>{{ idx + 1 }}</td>
        <td>{{ record.amount | currency('RUB') }}</td>
        <td>{{ record.date | date('datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{ record.typeText | local }}</span>
        </td>
        <td>
          <button v-tooltip="toolTip" class="btn-small btn" @click="$router.push('/Detail/' + record.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localFilter from '@/filters/local.filter'

export default {
  data: () => ({
    toolTip: localFilter('To_WatchRecording')
  }),
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>
