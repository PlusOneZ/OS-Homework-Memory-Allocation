<template>
  <div id="app">
    <el-container>
      <el-aside width="300px">
      </el-aside>
      <el-container>
        <el-main>
          <PageView
              :page_count="4"
          >

          </PageView>
        </el-main>
        <el-footer>

        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import PageView from "@/components/PageView";

export default {
  name: 'App',
  components: {
    PageView
  }
}
</script>

<style>
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

</style>
