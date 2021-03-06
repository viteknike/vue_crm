<template>
  <div>
    <div class="page-title">
      <h3>{{"NewRecord" | local}}</h3>
    </div>

    <loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>

    <form v-else @submit.prevent="handlerSubmit" class="form">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
          v-for="c in categories"
          :key="c.id"
          :value="c.id">
            {{c.title}}
          </option>
        </select>
        <label>{{"Selected_category" | local}}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>{{"Income" | local}}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>{{"Outcome" | local}}</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number" v-model.number="amount" :class="{invalid: !$v.amount.required || !$v.amount.minValue}" />
        <label for="amount">{{"Amount" | local}}</label>
        <span v-if="!$v.amount.required || !$v.amount.minValue" class="helper-text invalid" >
          {{"Min_value" | local}} {{$v.amount.$params.minValue.min}}
        </span>
      </div>

      <div class="input-field">
        <input id="description" type="text" v-model="description" :class="{invalid: !$v.description.required}" />
        <label for="description">{{"Description" | local}}</label>
        <span
            v-if="!$v.description.required"
            class="helper-text invalid">
            {{"Enter_title" | local}}
          </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{"Create" | local}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from 'materialize-css'
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'record',
  metaInfo () {
    return {
      title: this.$title('NewRecord')
    }
  },
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    description: { required },
    amount: { required, minValue: minValue(1) }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async handlerSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`Недостаточно средств на счёте (${this.amount - this.info.bill})`)
      }
    }
  }
}
</script>
