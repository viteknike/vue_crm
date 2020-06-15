<template>
  <div>
    <div class="page-title">
      <h3>{{'Profile' | local}}</h3>
    </div>

    <form @submit.prevent="submitHandler" class="form">
      <div class="input-field">
        <input id="description" type="text" v-model="name" :class="{ invalid: $v.name.$dirty && !$v.name.required }"/>
        <label for="description">{{'Name' | local}}</label>
        <small class="helper-text invalid" v-if="($v.name.$dirty && !$v.name.required)">{{'EnterName' | local}}</small>
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | local}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import M from 'materialize-css'
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
export default {
  metaInfo () {
    return {
      title: this.$title('Profile')
    }
  },
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: { required }
  },
  mounted () {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      };

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch {}
    }
  }
}
</script>
<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
