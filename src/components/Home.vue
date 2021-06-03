<template>
  <el-container style="max-height: 100%">
    <el-aside width="300px">
      <InstructionList
          ref="instList"
          :amount="instruction_amount"
          :frame_size="page_size"
          :backward_portion="randomness_backward"
          :forward_portion="randomness_forward"
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
        <div class="flex">
          <div class="w-72"><a :href="'#'+ current_instruction"> 当前指令：{{ current_instruction }} </a></div>
          <div class="w-72"> 下条指令：{{ next_instruction }}</div>
          <el-button @click="execute"> 单步执行</el-button>
          <el-button @click="reset"> 重置</el-button>
        </div>
        <div></div>
        <div class="flex" @click="randomnessFormVisible = true">
          <p>顺序执行｜向前跳转｜向后跳转：
            {{ randomness_sequential + '%｜' + randomness_forward + '%｜' + randomness_backward + '%' }} </p>
        </div>

        <el-dialog title="调整指令随机性" v-model="randomnessFormVisible">

          <el-input
              type="text"
              placeholder="向前跳转比例"
              v-model="randomness_forward"
              maxlength="3"
              prefix-icon="el-icon-top"
          >
            {{ randomness_forward }}
          </el-input>
          <div class="w-20"></div>
          <el-input
              type="text"
              placeholder="向后跳转比例"
              v-model="randomness_backward"
              maxlength="3"
              prefix-icon="el-icon-bottom"
          >
            {{ randomness_backward }}
          </el-input>
          <div class="w-20"></div>
          <p> 顺序执行比例：{{ randomness_sequential }} </p>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="randomnessFormVisible = false">确 定</el-button>
            </span>
          </template>
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
      randomnessFormVisible: false
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

    execute() {
      this.current_instruction = this.next_instruction
      this.next_instruction = this.getNext()
      this.$refs.instList.didExecute(this.current_instruction)
      this.$refs.frames.execute(
          this.getPage(this.current_instruction),
          this.current_instruction,
          'eea08c',
          LRU
      )

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
  },

  setup() {
    return {
      randomness_forward: ref(25),
      randomness_backward: ref(25),
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
  min-height: 160px;
  line-height: 60px;
}

.el-input {
  @apply w-36;
}
</style>