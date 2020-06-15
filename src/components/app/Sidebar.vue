<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">

    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>
<script>
import localFilter from '@/filters/local.filter'
export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: localFilter('Bill'), url: '/', exact: true },
      { title: localFilter('History'), url: '/history' },
      { title: localFilter('Planing'), url: '/planing' },
      { title: localFilter('NewRecord'), url: '/record' },
      { title: localFilter('Categories'), url: '/categories' }
    ]

  })
}
</script>
