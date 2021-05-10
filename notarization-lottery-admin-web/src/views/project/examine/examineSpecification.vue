<!--
 * @Descripttion: 
 * @version: 
 * @Author: lintingting
 * @Date: 2020-08-21 10:40:51
 * @LastEditors: lintingting
 * @LastEditTime: 2020-08-28 16:35:33
-->
<template>
  <embed :src=url type="application/pdf" style="position: absolute;width: 100%;height: 100%;">
</template>
<script>
  export default {
    components: {},
    props: [],
    data() {
      return {
        fileId: '',
        url: ''
      }
    },
    computed: {},
    watch: {},
    created() {
      this.fileId = this.$route.query.fileId
      var base_url = process.env.VUE_APP_BASE_API
      let url = base_url + '/accessory/' + this.fileId
      this.url = url
    },
    mounted() {},
    methods: {}
  }

</script>
<style lang="scss" scoped>
</style>
