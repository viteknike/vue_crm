<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Планирование</h3>
        <h4>{{ this.info.bill | currency('RUB')}}</h4>
      </div>

      <loader v-if="loading" />

      <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>

      <section v-else>
        <div>
          <p>
            <strong>Девушка:</strong>
            12 122 из 14 0000
          </p>
          <div class="progress">
            <div class="determinate green" style="width:40%"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'planing',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
    })

    this.loading = false
  }
}

</script>
