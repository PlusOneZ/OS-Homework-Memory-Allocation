<template>
  <div id="app">
    <Home
        :page_size="ps"
        :frame_amount="fa"
        :instruction_amount="ia"
        @set_inst_amount="setInstAmount"
        @set_frame_amount="setFrameAmount"
        @set_page_size="setPageSize"
    >

    </Home>
  </div>
</template>

<script>
import Home from "@/components/Home";

export default {
  name: 'App',
  components: {
    Home
  },
  data() {
    return {
      ps: 10,
      fa: 4,
      ia: 320
    }
  },
  methods: {
    setInstAmount(i) {
      this.ia = Number(i)
    },

    setFrameAmount(i) {
      this.fa = Number(i)
    },

    setPageSize(i) {
      this.ps = Number(i)
    }
  }
}
</script>

<style>

#app {
  width: 100%;
  min-height: 100%;
  height: 100%;
  max-height: 100%;
}

</style>
