<template>
  <el-container>
    <el-header>
      <div class="flex content-center text-center justify-center">
        <p class="pr-8"> 当前执行条数：{{ inst_count }}</p>
        <p class="pr-8"> 缺页次数：{{ page_fault_count }}</p>
        <p> 缺页率：{{ page_fault_rate }}%</p>
      </div>
    </el-header>
    <el-main>
      <div class="mx-auto max-h-full">
        <div
            v-for="i in rows"
            :key="i"
            class="flex mx-auto justify-center items-center content-center text-center gap-4 pb-4"
        >
          <div
              v-for="j in (Number(i) !== rows ? cols : (frame_count - (rows-1)*cols))"
              :key="j"
              :ref="el => {if (el) frame_arr[(i-1)*cols+(j-1)]=el}"
              :style="{'background': '#' + frame_color[(i-1)*cols+(j-1)]}"
              class="border-solid border rounded-2xl h-40 w-40 content-center"
              @click="pageModify((i - 1) * cols + (j - 1))"
          >
            <p class="text-xl">页框号： {{ (i - 1) * cols + (j - 1) }}</p>
            <p> 当前页面：
              {{ (pages_loaded[(i - 1) * cols + (j - 1)]) ? frame_page[(i - 1) * cols + (j - 1)] : "空闲" }}
            </p>

            <p> 指令号：
              {{ (pages_loaded[(i - 1) * cols + (j - 1)]) ? frame_inst[(i - 1) * cols + (j - 1)] : "无" }}
            </p>

            <p> ub:
              {{ used_bits[(i - 1) * cols + (j - 1)] }}
            </p>

            <p> mb:
              {{ modified_bits[(i - 1) * cols + (j - 1)] }}
            </p>

            <p v-if="(i - 1) * cols + (j - 1) === clock_pointer"> point </p>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>

const LRU = 1
const FIFO = 2

Array.prototype.remove = function (x) {
  let index = this.indexOf(x)
  this.splice(index, 1)
}

export default {
  name: "PageView",
  props: {
    frame_count: Number
  },

  data() {
    return {
      frame_arr: [],
      frame_color: [],
      pages_loaded: [],
      frame_page: [],
      frame_inst: [],

      inst_queue: [],
      clock_pointer: 0,
      used_bits: [],
      modified_bits: [],
      inst_count: 0,
      page_fault_count: 0,
    }
  },

  methods: {
    pageModify(i) {
      if (this.pages_loaded[i]) {
        this.modified_bits[i] = !this.modified_bits[i]
      }
    },

    findLruReplacement() {
      for (let i = 0; i < this.frame_count; i++) {
        if (!this.pages_loaded[i]) {
          return i
        }
      }
      do {
        // first & third scan
        console.log("First Scan")
        for (let i = 0; i < this.frame_count; i++) {
          if (!this.used_bits[this.clock_pointer] && !this.modified_bits[this.clock_pointer]) {
            let r = this.clock_pointer
            this.clockNext()
            return r
          }
          this.clockNext()
        }
        // second & last scan
        console.log("Second Scan")
        for (let i = 0; i < this.frame_count; i++) {
          if (!this.used_bits[this.clock_pointer]) {
            let r = this.clock_pointer
            this.clockNext()
            return r
          } else {
            this.used_bits[this.clock_pointer] = false
            this.clockNext()
          }
        }
        // eslint-disable-next-line no-constant-condition
      } while (true)
    },

    findFifoReplacement() {
      for (let i = 0; i < this.frame_count; i++) {
        if (!this.pages_loaded[i]) {
          return i
        }
      }
      let r = this.inst_queue[0]
      this.inst_queue.remove(r)
      return r
    },

    clockNext() {
      this.clock_pointer = (this.clock_pointer + 1) % this.frame_count
    },

    executeLRU(page, inst, pageColor) {
      let frame = -1
      let replace = false
      for (let i = 0; i < this.frame_count; i++) {
        if (this.pages_loaded[i]) {
          if (this.frame_page[i] === page) {
            frame = i
          }
        }
      }
      if (frame < 0) {
        frame = this.findLruReplacement()
        replace = true
        this.page_fault_count++
      }

      this.pages_loaded[frame] = true
      this.frame_page[frame] = page
      this.frame_inst[frame] = inst
      this.frame_color[frame] = pageColor

      if (this.inst_queue.indexOf(frame) >= 0) {
        this.inst_queue.remove(frame)
      }
      this.inst_queue.push(frame) // reorder
      this.used_bits[frame] = true
      if (replace) {
        this.modified_bits[frame] = false
      }
    },

    executeFIFO(page, inst, pageColor) {
      let frame = -1
      let replace = false
      for (let i = 0; i < this.frame_count; i++) {
        if (this.pages_loaded[i]) {
          if (this.frame_page[i] === page) {
            frame = i
          }
        }
      }
      if (frame < 0) {
        frame = this.findFifoReplacement()
        replace = true
        this.page_fault_count++
      }

      this.pages_loaded[frame] = true
      this.frame_page[frame] = page
      this.frame_inst[frame] = inst
      this.frame_color[frame] = pageColor

      this.inst_queue.push(frame) // reorder
      this.used_bits[frame] = true
      if (replace) {
        this.modified_bits[frame] = false
      }
    },

    execute(page, inst, pageColor, algo) {
      this.inst_count++
      if (algo === LRU) {
        this.executeLRU(page, inst, pageColor)
      } else if (algo === FIFO) {
        this.executeFIFO(page, inst, pageColor)
      }
    },

    reset() {
      console.log(this.frame_count)
      for (let i = 0; i < this.frame_count; i++) {
        console.log(i)
        this.frame_color[i] = 'cfccc9'
        this.pages_loaded[i] = false
        this.frame_inst[i] = 0
        this.frame_page[i] = 0

        this.used_bits[i] = false
        this.modified_bits[i] = false
      }
      this.clock_pointer = 0
      this.inst_queue = []
      console.log(this.frame_color)
      this.page_fault_count = 0
      this.inst_count = 0
    }
  },
  computed: {
    rows() {
      return Math.ceil(this.frame_count / this.cols)
    },

    cols() {
      if (this.frame_count > 16) {
        return 4
      } else {
        return Math.ceil(Math.sqrt(this.frame_count))
      }
    },

    page_fault_rate() {
      if (this.inst_count === 0) return '0'
      let r = (this.page_fault_count / this.inst_count) * 100
      return r.toFixed(2)
    }
  },

  mounted() {
    this.reset()
  }
}
</script>

<style scoped>
.el-header {
  line-height: 60px;
  @apply bg-gray-300;
}
</style>