<template>
  <div>
    <loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <a href="/history" class="breadcrumb">История</a>
        <span class="breadcrumb">{{ record.type === 'income' ? 'Доход' : 'Расход' }}</span>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
            'red': record.type === 'outcome',
            'green': record.type === 'income'
            }">
            <div class="card-content white-text">
              <p>{{"Description" | local}}: {{record.description}}</p>
              <p>{{"Amount" | local}}: {{record.amount | currency}}</p>
              <p>{{"Category" | local }}: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Записи с id={{$route.params.id}} не найдено</p>
  </div>
</template>

<script>
export default {
  name: 'detail',
  metaInfo () {
    return {
      title: this.$title('Detail')
    }
  },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  }
}
</script>
<style scoped>
  .breadcrumb-wrap span, .breadcrumb-wrap span:before {
    display: inline-flex;
    color: rgba(0,0,0,.7)!important;
    line-height: initial;}
</style>
