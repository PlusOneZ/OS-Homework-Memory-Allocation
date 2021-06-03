<template>
  <el-menu>
    <div
        class="instruction"
        v-for="i in amount"
        :key="i"
        :id="'inst'+i"
    >
      <el-menu-item :disabled="inst_list.executed[i-1]" @click="chooseInstruct(i)">

        <div class="flex" :style="{'text-decoration': (inst_list.executed[i-1] ? 'line-through' : '')}">
          <div class="w-8"> {{ i - 1 }}</div>
          <div class="w-24"> {{ typeName[inst_list['type'][i - 1]] }}</div>
          <div class="w-36"> Page#{{ Math.floor((i-1) / frame_size) }}</div>
        </div>

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
    backward_portion: Number
  },
  data() {
    return {
      inst_list: {
        type: [],
        executed: []
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
        this.not_executed.push(i)
      }
    },

    chooseInstruct(i) {
      return i
      // console.log(this.inst_list)
      // console.log(this.inst_list['type'][i - 1])
      // console.log(this.typeName[this.inst_list['type'][i - 1]])
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
        let q = this.not_executed.filter(a => {return a < inst})
        if (q.length === 0) {
          return this.not_executed[0]
        }
        q.sort(()=>{return 0.5 - Math.random()})
        return q[0]
      } else if (type === Backward) {
        let q = this.not_executed.filter(a => {return a > inst})
        if (q.length === 0) {
          return this.not_executed[0]
        }
        q.sort(()=>{return 0.5 - Math.random()})
        return q[0]
      } else {
        inst += 1
        for (; inst < this.amount; inst++) {
          if (inst in this.not_executed) {
            return inst
          }
        }
        return this.not_executed[0]
      }
    },

    didExecute(inst) {
      if (inst in this.not_executed) {
        this.not_executed.remove(inst)
      }
      console.log("Execute "+inst)
    }
  },

  mounted() {
    this.reset_list()
  }
}
</script>

<style scoped>
.instruction {

}

a {
  color: #333333;
}
</style>