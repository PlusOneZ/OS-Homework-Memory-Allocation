<template>
  <el-menu id="menu">
    <div
        class="instruction"
        v-for="i in amount"
        :key="i"
        :id="'inst'+i"
    >
      <el-menu-item :disabled="inst_list.executed[i-1]" @click="chooseInstruct(i-1)">
        <div class="flex" :style="{'text-decoration': (inst_list.executed[i-1] ? 'line-through' : '')}">
          <div class="w-8"> {{ i - 1 }}</div>
          <div class="w-24"> {{ typeName[inst_list['type'][i - 1]] }}</div>
          <div class="w-24 flex" :style="{'color': inst_list.executed[i-1] ? 'black' : ('#' + getColor(i-1).c)}">
            <p>
              <i v-if="!inst_list.executed[i-1]" class="el-icon-circle-plus"> </i>
              <i v-if="inst_list.executed[i-1]" class="el-icon-circle-check"> </i>
              Page#{{ Math.floor((i - 1) / frame_size) }}
            </p>
          </div>
        </div>
        <span v-if="inst_list.page_fault[i-1]" class="text-red-400" id="pf"> PF </span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>

const Forward = 1
const Backward = 2
const Sequential = 0

export default {
  name: "InstructionList",
  props: {
    amount: Number,
    frame_size: Number,
    forward_portion: Number,
    backward_portion: Number,
    colors: Array
  },
  data() {
    return {
      inst_list: {
        type: [],
        executed: [],
        page_fault: []
      },
      not_executed: [],
      typeName: ["顺序", "分支向前", "分支向后"]
    }
  },
  methods: {
    reset_list() {
      var ran = []

      for (let i = 0; i < this.amount; i++) {
        if (i < this.amount / 100 * this.forward_portion) {
          ran.push(Forward)
        } else if (i < this.amount / 100 * (this.forward_portion + this.backward_portion)) {
          ran.push(Backward)
        } else {
          ran.push(Sequential)
        }
      }
      ran.sort(() => {
        return .5 - Math.random()
      })
      this.not_executed = []

      for (let i = 0; i < this.amount; i++) {
        this.inst_list['type'][i] = ran.pop()
        this.inst_list['executed'][i] = false
        this.inst_list.page_fault[i] = false
        this.not_executed.push(i)
      }
    },

    chooseInstruct(i) {
      this.$emit("choose_inst", i)
      return i
    },

    executeInstruct(i) {
      console.log(i)
      this.inst_list.executed[i] = true
      return Math.floor(i / this.frame_size)
    },

    getNext(inst) {
      if (inst < 0 || inst > this.amount) {
        return undefined
      }
      let type = this.inst_list.type[inst]
      if (type === Forward) {
        let q = this.not_executed.filter(a => {
          return a < inst
        })
        if (q.length === 0) {
          for (const n of this.not_executed) {
            if (n !== inst) return n
          }
          return undefined
        }
        q.sort(() => {
          return 0.5 - Math.random()
        })
        return q[0]
      } else if (type === Backward) {
        let q = this.not_executed.filter(a => {
          return a > inst
        })
        if (q.length === 0) {
          for (const n of this.not_executed) {
            if (n !== inst) return n
          }
          return undefined
        }
        q.sort(() => {
          return 0.5 - Math.random()
        })
        return q[0]
      } else {
        inst += 1
        for (; inst < this.amount; inst++) {
          if (this.not_executed.indexOf(inst) >= 0) {
            return inst
          }
        }
        for (const n of this.not_executed) {
          if (n !== inst) return n
        }
        return undefined
      }
    },

    getColor(inst) {
      let page = Math.floor(inst / this.frame_size)
      let len = this.colors.length
      return this.colors[page % len]
    },

    didExecute(inst) {
      if (this.not_executed.indexOf(inst) >= 0) {
        this.not_executed.remove(inst)
        this.inst_list.executed[inst] = true
      }
      console.log("Execute " + inst)
      // console.log(this.not_executed)
    },

    didPageFault(inst) {
      this.inst_list.page_fault[inst] = true
    }
  },

  mounted() {
    this.reset_list()
  }
}
</script>

<style scoped>
.el-menu-item {
  @apply flex;
}

.el-menu-item.is-disabled {
  opacity: 0.6;
}

a {
  color: #333333;
}
</style>