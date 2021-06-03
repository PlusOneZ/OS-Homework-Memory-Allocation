<template>
  <div id="app">
    <Home
        :page_size="10"
        :frame_amount="4"
        :instruction_amount="320"
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
