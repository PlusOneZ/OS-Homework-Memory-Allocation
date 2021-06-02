<template>
 <div>
  <div
    v-for="i in rows"
    :key="i"
    class="flex mx-auto justify-center items-center content-center text-center gap-4 pb-4"
    >
    <div
      v-for="j in (Number(i) !== rows ? cols : (page_count - (rows-1)*cols))"
      :key="j"
      :ref="el => {if (el) page_arr[i-1]=el}"
      :style="{'background': '#' + block_color[(i-1)*cols+(j-1)]}"
      class="border-solid border rounded-2xl h-40 w-40 content-center"
    >
      <p class="text-xl">页号： {{(i-1)*cols+(j-1)}}</p>
    </div>
  </div>
 </div>
</template>

<script>
export default {
  name: "PageView",
  props: {
    page_count: Number
  },
  data() {
    return {
      page_arr: [],
      block_color: [],
    }
  },
  methods: {

  },
  computed: {
      rows() {
        return Math.ceil(this.page_count / this.cols)
      },
      cols(){
        if (this.page_count > 16) {
          return 4
        } else {
          return Math.ceil(Math.sqrt(this.page_count))
        }
      },
  }, mounted() {
    console.log(this.page_count)
    for (let i = 0; i < this.page_count; i++) {
      console.log(i)
      this.block_color[i] = 'cfccc9'
    }
    console.log(this.block_color)
  }
}
</script>

<style scoped>

</style>