<template>
  <el-container style="max-height: 100%">
    <el-aside width="300px">
      <InstructionList
          ref="instList"
          :amount="instruction_amount"
          :frame_size="page_size"
          :backward_portion="randomness_backward"
          :forward_portion="randomness_forward"
          @choose_inst="chooseInst"
      >

      </InstructionList>
    </el-aside>
    <el-container>

      <PageView
          :frame_count="frame_amount"
          ref="frames"
      >

      </PageView>

      <el-footer>
        <div class="h-5"></div>
        <div class="flex">
          <div class="pt-2"><a :href="'#'+ current_instruction"> 当前指令：{{ current_instruction }} </a></div>
          <div class="w-36"></div>
          <div class="pt-2"> 下条指令：{{ next_instruction }}</div>
          <div class="w-36"></div>
          <el-button
              @click="stopTimer(); execute();"
              type="primary"
          >
            单步执行
          </el-button>
          <div class="w-12"></div>
          <el-button @click="continueExecute(1000)"> 连续执行（慢一点） </el-button>
          <div class="w-12"></div>
          <el-button @click="continueExecute(100)"> 连续执行（快一点） </el-button>
          <div class="w-12"></div>
          <el-button @click="reset" type="danger"> 重置</el-button>
        </div>
        <div class="h-5"></div>
        <div class="flex" @click="randomnessFormVisible = true">
          <p>顺序执行｜向前跳转｜向后跳转：
            {{ randomness_sequential + '%｜' + randomness_forward + '%｜' + randomness_backward + '%' }} </p>
        </div>

        <el-dialog title="调整指令随机性" v-model="randomnessFormVisible">
          <div class="content-center align-middle text-center justify-center">
            <el-input
                type="text"
                placeholder="向前跳转比例"
                v-model="randomness_forward"
                maxlength="3"
                prefix-icon="el-icon-top"
            >
              {{ randomness_forward }}
            </el-input>
            <div class="h-10"></div>
            <el-input
                type="text"
                placeholder="向后跳转比例"
                v-model="randomness_backward"
                maxlength="3"
                prefix-icon="el-icon-bottom"
            >
              {{ randomness_backward }}
            </el-input>
            <div class="h-10"></div>
            <p> 顺序执行比例：{{ randomness_sequential }} </p>
            <div class="h-10"></div>
            <span class="dialog-footer">
              <el-button type="warning" @click="randomnessFormVisible = false; reset()">确定重置</el-button>
              <el-button type="primary" @click="randomnessFormVisible = false;">取消</el-button>
            </span>
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

const LRU = 1

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
      timer: undefined
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

    getPage(inst) {
      return Math.floor(inst / this.page_size)
    },

    getColor(page) {
      let len = colors.length
      return colors[page % len]
    },

    execute() {
      if (this.next_instruction === undefined) {
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
          LRU
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
    colors.sort(() => {
      return 0.5 - Math.random()
    })
  },

  setup() {
    return {
      randomness_forward: ref(25),
      randomness_backward: ref(25),
    }
  }
})

const WHITE = 1
const BLACK = 2

const colors = [
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
</script>

<style scoped>
.el-aside {
  background: #D3DCE6;
  color: #333;
  text-align: center;
}

.el-footer {
  @apply bg-gray-300;
  min-height: 160px;
}

.el-input {
  @apply w-36 p-0;

}
</style>