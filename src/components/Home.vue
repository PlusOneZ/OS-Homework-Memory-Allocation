<template>
  <el-container style="max-height: 100%" id="page">
    <el-aside width="300px">
      <InstructionList
          ref="instList"
          :amount="instruction_amount"
          :frame_size="page_size"
          :backward_portion="randomness_backward"
          :forward_portion="randomness_forward"
          @choose_inst="chooseInst"
          :colors="colors"
      >

      </InstructionList>
    </el-aside>
    <el-container>

      <PageView
          :frame_count="frame_amount"
          ref="frames"
          @replace="replaceHappen"
      >

      </PageView>

      <el-footer>
        <div class="h-5"></div>
        <div class="flex">
          <div class="pt-2 w-56"><a :href="'#'+ current_instruction"> 当前指令：{{ current_instruction }} </a></div>
          <div class="pt-2 w-56"> 下条指令：{{ next_instruction }}</div>

          <el-button
              @click="stopTimer(); execute();"
              type="primary"
          >
            单步执行
          </el-button>
          <div class="w-12"></div>
          <el-button @click="continueExecute(1000)" :type="timer ? 'success' : 'default'" id="slow">
            {{ timer ? '暂停' : '连续执行（慢一点）' }}
          </el-button>
          <div class="w-12"></div>
          <el-button @click="continueExecute(100)" :type="timer ? 'success' : 'default'" id="fast">
            {{ timer ? '暂停' : '连续执行（快一点）' }}
          </el-button>
          <div class="w-12"></div>
          <el-button @click="resetVisible = true" type="danger"> 重置</el-button>
          <el-dialog
              title="确认重置"
              v-model="resetVisible"
              width="30%"
          >
            <span> 确认重置吗？这将会使指令重新生成。</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="resetVisible = false">取 消</el-button>
                <el-button type="warning" @click="resetVisible = false; reset()">确 定</el-button>
              </span>
            </template>
          </el-dialog>
          <div class="w-8"></div>
          <div>
            <el-radio v-model="algo" label="1"> 类LRU（Clock 实现）</el-radio>
            <el-radio v-model="algo" label="2"> FIFO</el-radio>
          </div>
        </div>
        <div class="h-5"></div>
        <div class="flex" @click="randomnessFormVisible = true" id="attribute">
          <p>顺序执行｜向前跳转｜向后跳转：
            {{ randomness_sequential + '%｜' + randomness_forward + '%｜' + randomness_backward + '%' }}
          </p>
          <div class="w-10"></div>
          <p> 指令总数：{{ instruction_amount }}</p>
          <div class="w-10"></div>
          <p> 页框数目：{{ frame_amount }}</p>
          <div class="w-10"></div>
          <p> 每页指令数：{{ page_size }}</p>
          <div class="w-10"></div>
          <p> 该进程所占页数：{{ Math.ceil(instruction_amount / page_size) }}</p>
        </div>

        <p id="id" class="text-sm text-gray-400"> Tongji SSE 2021 OS-Spring ©Zhengyi Zhuo</p>

        <el-dialog title="调整指令随机性" v-model="randomnessFormVisible">
          <div class="content-center align-middle text-center justify-center">
            <div class="inline-block">
              <label class="text-lg">向前跳转比例: </label>
              <el-input
                  type="text"
                  placeholder="向前跳转比例"
                  v-model="randomness_forward"
                  maxlength="3"
                  prefix-icon="el-icon-top"
              >
                {{ randomness_forward }}
              </el-input>
            </div>
            <div class="h-10"></div>
            <div class="inline-block">
              <label class="text-lg">向后跳转比例: </label>
              <el-input
                  type="text"
                  placeholder="向后跳转比例"
                  v-model="randomness_backward"
                  maxlength="3"
                  prefix-icon="el-icon-bottom"
              >
                {{ randomness_backward }}
              </el-input>
            </div>
            <div class="h-10"></div>
            <p> 顺序执行比例：{{ randomness_sequential }} </p>
            <div class="h-10"></div>
            <div class="inline-block">
              <label class="text-lg">指令总数: </label>
              <el-input
                  type="text"
                  placeholder="指令总数"
                  v-model="instruction_amount_ref"
                  maxlength="3"
                  prefix-icon="el-icon-pie-chart"
              >
                {{ instruction_amount }}
              </el-input>
            </div>
            <div class="h-10"></div>
            <div class="inline-block">
              <label class="text-lg">页框数目: </label>
              <el-input
                  type="text"
                  placeholder="向后跳转比例"
                  v-model="frame_amount_ref"
                  maxlength="2"
                  prefix-icon="el-icon-files"
              >
                {{ frame_amount }}
              </el-input>
            </div>
            <div class="h-10"></div>
            <div class="inline-block">
              <label class="text-lg">每页指令数: </label>
              <el-input
                  type="text"
                  placeholder="每页指令数"
                  v-model="page_size_ref"
                  maxlength="3"
                  prefix-icon="el-icon-bottom"
              >
                {{ page_size }}
              </el-input>
            </div>
            <div class="h-10"></div>
            <div class="dialog-footer">
              <el-button type="warning" @click="randomnessFormVisible = false; resetByRef()">确定重置</el-button>
              <el-button type="primary" @click="randomnessFormVisible = false;">取消</el-button>
            </div>
          </div>
        </el-dialog>

      </el-footer>

    </el-container>
  </el-container>
</template>

<script>
import PageView from "@/components/PageView";
import InstructionList from "@/components/InstructionList";
import {defineComponent, ref} from 'vue'

const WHITE = 1
const BLACK = 2

export default defineComponent({
  name: 'Home',
  components: {
    PageView,
    InstructionList
  },
  props: {
    page_size: Number,
    frame_amount: Number,
    instruction_amount: Number,
  },
  data() {
    return {
      current_instruction: Number,
      next_instruction: Number,
      randomnessFormVisible: false,
      timer: undefined,
      algo: '1',
      resetVisible: false,
      colors: [
        {c: "eea2a4", t: BLACK},
        {c: "5a191b", t: WHITE},
        {c: "a61b29", t: WHITE},
        {c: "894e54", t: WHITE},
        {c: "c27c88", t: WHITE},
        {c: "ec7696", t: WHITE},
        {c: "33141e", t: WHITE},
        {c: "cc5595", t: WHITE},
        {c: "681752", t: WHITE},
        {c: "7e1671", t: WHITE},
        {c: "302f4b", t: WHITE},
        {c: "61649f", t: WHITE},
        {c: "1661ab", t: WHITE},
        {c: "144a74", t: WHITE},
        {c: "4e7ca1", t: WHITE},
        {c: "11659a", t: WHITE},
        {c: "2f90b9", t: WHITE},
        {c: "134857", t: WHITE},
        {c: "63bbd0", t: WHITE},
        {c: "93d5dc", t: BLACK},
        {c: "1ba784", t: WHITE},
        {c: "57c3c2", t: WHITE},
        {c: "5dbe8a", t: WHITE},
        {c: "485b4d", t: WHITE},
        {c: "43b244", t: WHITE},
        {c: "fc6315", t: WHITE},
        {c: "b7511d", t: WHITE},
        {c: "fa5d19", t: WHITE},
        {c: "732e12", t: WHITE},
        {c: "862617", t: WHITE},
        {c: "483332", t: WHITE},
        {c: "5e5314", t: WHITE},
        {c: "55bb8a", t: WHITE},
        {c: "1f2623", t: WHITE},
        {c: "cad3c3", t: BLACK},
        {c: "f0f5e5", t: BLACK},
        {c: "867018", t: BLACK},
        {c: "fbecde", t: BLACK},
        {c: "f2481b", t: WHITE},
        {c: "f2b9b2", t: BLACK},
      ]
    }
  },

  methods: {
    getNext() {
      return this.$refs.instList.getNext(this.current_instruction)
    },

    reset() {
      this.current_instruction = '未载入'
      this.next_instruction = Math.floor(Math.random() * this.instruction_amount)
      this.$refs.frames.reset()
      this.$refs.instList.reset_list()
    },

    resetByRef() {
      let ia = Number(this.instruction_amount_ref)
      let ps = Number(this.page_size_ref)
      let fa = Number(this.frame_amount_ref)
      if (ia) {
        this.$emit("set_inst_amount", ia)
      }
      if (ps) {
        this.$emit("set_page_size", ps)
      }
      if (fa) {
        this.$emit("set_frame_amount", fa)
      }
      this.randomnessFormVisible = false
      setTimeout(this.reset, 500)
    },

    getPage(inst) {
      return Math.floor(inst / this.page_size)
    },

    getColor(page) {
      let len = this.colors.length
      return this.colors[page % len]
    },

    execute() {
      if (this.next_instruction === undefined) {
        alert("已经执行完毕，请重置或修改随机性")
        this.stopTimer()
        this.current_instruction = '已执行完毕'
        return
      }
      this.current_instruction = this.next_instruction
      this.next_instruction = this.getNext()
      this.$refs.instList.didExecute(this.current_instruction)
      let page = this.getPage(this.current_instruction)
      let color = this.getColor(page)
      this.$refs.frames.execute(
          page,
          this.current_instruction,
          color,
          Number(this.algo)
      )
    },

    continueExecute(t) {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = undefined
      } else {
        this.timer = setInterval(this.execute, t)
      }
    },

    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = undefined
      }
    },

    chooseInst(inst) {
      this.next_instruction = inst
    },

    replaceHappen(inst) {
      this.$refs.instList.didPageFault(inst)
    }
  },

  computed: {
    randomness_forward: {
      set(val) {
        val = Number(val)
        if (val < 0) return 0
        if (val > 100) return 100
        if (val + this.randomness_backward > 100) {
          this.randomness_backward = 100 - val
        }
        return val
      },
      get() {
        return this.randomness_forward
      }
    },

    randomness_backward: {
      set(val) {
        val = Number(val)
        if (val < 0) return 0
        if (val > 100) return 100
        if (this.randomness_forward + val > 100) {
          console.log(val)
          this.randomness_forward = 100 - val
        }
        return val
      },
      get() {
        return this.randomness_backward
      }
    },

    randomness_sequential() {
      return 100 - this.randomness_forward - this.randomness_backward
    }
  },

  mounted() {
    this.current_instruction = '未载入'
    this.next_instruction = Math.floor(Math.random() * this.instruction_amount)
    this.randomness_forward = 25
    this.randomness_backward = 25
    this.colors.sort(() => {
      return 0.5 - Math.random()
    })
  },

  setup() {
    return {
      randomness_forward: ref(25),
      randomness_backward: ref(25),
      instruction_amount_ref: ref(320),
      frame_amount_ref: ref(4),
      page_size_ref: ref(10)
    }
  }
})

</script>

<style scoped>
.el-aside {
  background: #D3DCE6;
  color: #333;
  text-align: center;
}

.el-footer {
  @apply bg-gray-300;
  min-height: 15vh;
  max-height: 15vh;
  position: fixed;
  bottom: 0;
}

.el-input {
  @apply w-36 p-0;
}

#attribute:hover {
  cursor: pointer;
}

#fast, #slow {
  @apply w-40;
}

#id {
  @apply text-gray-600 text-sm pt-1;
  align-self: center;
  text-align: center;
  justify-content: center;
}

#page {
  background-image: url('../assets/bg.png');
}
</style>