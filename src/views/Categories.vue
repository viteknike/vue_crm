<template>
  <div>
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>{{"Categories"}}</h3>
        </div>
        <section>
          <loader v-if="loading" />
          <div v-else class="row">
            <CategoryCreate @created="addNewCategory" />

            <CategoryEdit v-if="categories.length" :categories="categories" :key="categories.lenth + updateCount" @updated="updateCategories"/>
            <p v-else class="center">{{"No_categories" | local}}</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
  name: 'categories',
  metaInfo () {
    return {
      title: this.$title('Categories')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategories (category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>
