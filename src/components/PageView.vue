<template>
  <el-container>
    <el-header>
      <div class="h-4"></div>
      <div class="flex content-center text-center justify-center text-lg">
        <p class="pr-8"> 当前执行条数：{{ inst_count }}</p>
        <p class="pr-8"> 缺页次数：{{ page_fault_count }}</p>
        <p> 缺页率：{{ page_fault_rate }}%</p>
      </div>
    </el-header>
    <el-main>
      <div class="mx-auto min-h-full" id="mid">
        <div v-if="rows === 1" id="row1"></div>
        <div v-if="rows === 2" id="row2"></div>
        <div v-if="rows === 3" id="row3"></div>
        <div v-if="rows === 4" id="row4"></div>
        <div
            v-for="i in rows"
            :key="i"
            class="flex mx-auto justify-center items-center content-center text-center align-middle gap-4 pb-4 min-h-full"
        >
          <div
              v-for="j in (Number(i) !== rows ? cols : (frame_count - (rows-1)*cols))"
              :key="j"
              :ref="el => {if (el) frame_arr[(i-1)*cols+(j-1)]=el}"
              :style="{
                'background': '#' + frame_color[(i-1)*cols+(j-1)] + 'aa',
                'color': text_color[(i-1)*cols+(j-1)],
                'backdrop-filter': 'blur(20px)'
              }"
              class="rounded-2xl h-40 w-40 content-center shadow-md"
              @click="pageModify((i - 1) * cols + (j - 1))"
          >
            <el-popover
                placement="bottom"
                :title="'Frame#'+((i - 1) * cols + (j - 1))"
                :width="300"
                trigger="hover"
            >
              <p> 状态：{{ (active_frame === (i - 1) * cols + (j - 1)) ? "执行" : "等待" }}</p>
              <p v-if="(pages_loaded[(i - 1) * cols + (j - 1)])">
                来自第# {{ frame_page[(i - 1) * cols + (j - 1)] }} 页
              </p>
              <p v-if="(pages_loaded[(i - 1) * cols + (j - 1)])">
                使用位:
                <span
                    :class="{
                      'text-red-400': used_bits[(i - 1) * cols + (j - 1)],
                      'text-green-400': !used_bits[(i - 1) * cols + (j - 1)]
                }">
                  {{ used_bits[(i - 1) * cols + (j - 1)] ? "1" : "0"}}
                </span>
              </p>
              <p v-if="(pages_loaded[(i - 1) * cols + (j - 1)])">
                改变位：
                <span
                    :class="{
                      'text-red-400': modified_bits[(i - 1) * cols + (j - 1)],
                      'text-green-400': !modified_bits[(i - 1) * cols + (j - 1)]
                }">
                  {{ modified_bits[(i - 1) * cols + (j - 1)] ? "1" : "0"}}
                </span>
              </p>
              <p v-if="(pages_loaded[(i - 1) * cols + (j - 1)])">
                队列中位置：{{ inst_queue[(i - 1) * cols + (j - 1)] }}
              </p>
              <p v-if="clock_pointer === (i - 1) * cols + (j - 1)" class="text-red-400">
                Clock 指针正指向这一页框！
              </p>
              <template #reference>
                <div>
                  <div class="h-4"></div>
                  <p class="text-md"
                     :style="{'color': (active_frame===(i - 1) * cols + (j - 1)) ? '#f8df70' : ''}"
                  >
                    Frame# {{ (i - 1) * cols + (j - 1) }}
                  </p>
                  <p class="text-xl"> Page#
                    {{ (pages_loaded[(i - 1) * cols + (j - 1)]) ? frame_page[(i - 1) * cols + (j - 1)] : "空闲" }}
                  </p>

                  <p> 指令号：
                    {{
                      (pages_loaded[(i - 1) * cols + (j - 1)])
                          ? frame_inst[(i - 1) * cols + (j - 1)]
                          : "无"
                    }}
                  </p>

                  <div class="h-8">
                    {{
                      inst_queue.indexOf((i - 1) * cols + (j - 1)) >= 0
                          ? inst_queue.indexOf((i - 1) * cols + (j - 1))
                          : ''
                    }}
                  </div>

                  <div class="flex text-center justify-center content-center">
                    <i
                        class="el-icon-error"
                        v-if="!used_bits[(i - 1) * cols + (j - 1)]"
                        style="color: #ae804b;"
                    ></i>
                    <i
                        class="el-icon-success"
                        v-if="used_bits[(i - 1) * cols + (j - 1)]"
                        style="color: #f8df70"
                    ></i>
                    <div class="w-20 content-center text-center justify-center flex">
                      <div class="w-1/12"></div>
                      <i
                          class="w-4"
                          v-if="(i - 1) * cols + (j - 1) === clock_pointer"
                      >
                        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M553.5 908.2c-1.2 0-2.2-0.1-3.5-0.2-10.9-1.5-19.5-10.1-21.1-21.1l-48.1-343.7L137.6 495c-11-1.5-19.5-10.1-21.1-21.1s4.3-21.6 14.5-26.1l741.8-329.9c9.4-4.1 20.3-2.1 27.6 5.1 7.3 7.3 9.3 18.2 5.1 27.6l-329.4 743c-4.1 9-13 14.6-22.6 14.6z" fill="red"></path></svg>
                      </i>
                    </div>
                    <i
                        class="el-icon-warning-outline"
                        v-if="!modified_bits[(i - 1) * cols + (j - 1)]"
                        style="color: #ae804b;"
                    ></i>
                    <i
                        class="el-icon-warning"
                        v-if="modified_bits[(i - 1) * cols + (j - 1)]"
                        style="color: #f8df70"
                    ></i>
                  </div>
                </div>
              </template>
            </el-popover>
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
    frame_count: Number,
  },

  data() {
    return {
      frame_arr: [],
      frame_color: [],
      text_color: [],
      pages_loaded: [],
      frame_page: [],
      frame_inst: [],
      active_frame: undefined,

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
      return this.inst_queue[0]
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
        this.$emit("replace", inst)
        this.page_fault_count++
      }

      this.active_frame = frame
      this.pages_loaded[frame] = true
      this.frame_page[frame] = page
      this.frame_inst[frame] = inst
      this.frame_color[frame] = pageColor.c
      this.text_color[frame] = pageColor.t === 1 ? 'white' : 'black'

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
        this.$emit("replace", inst)
        this.page_fault_count++
      }

      this.active_frame = frame
      this.pages_loaded[frame] = true
      this.frame_page[frame] = page
      this.frame_inst[frame] = inst
      this.frame_color[frame] = pageColor.c
      this.text_color[frame] = pageColor.t === 1 ? 'white' : 'black'

      if (this.inst_queue.indexOf(frame) >= 0) {
        this.inst_queue.remove(frame)
      }
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
        this.frame_color[i] = 'eeeeee'
        this.text_color[i] = 'black'
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
      this.active_frame = undefined
    },
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
  line-height: 5vh;
  backdrop-filter: blur(20px);
  min-height: 5vh;
  max-height: 5vh;
  @apply bg-gray-300 bg-opacity-80 shadow-2xl;
}

.el-main {
  max-height: 80vh;
}

#row1 {
  height: 30vh;
}

#row2 {
  height: 18vh;
}

#row3 {
  height: 10vh;
}

</style>

