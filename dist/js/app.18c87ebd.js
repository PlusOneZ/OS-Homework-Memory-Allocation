(function(t){function e(e){for(var c,o,s=e[0],a=e[1],u=e[2],f=0,d=[];f<s.length;f++)o=s[f],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&d.push(i[o][0]),i[o]=0;for(c in a)Object.prototype.hasOwnProperty.call(a,c)&&(t[c]=a[c]);l&&l(e);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],c=!0,s=1;s<n.length;s++){var a=n[s];0!==i[a]&&(c=!1)}c&&(r.splice(e--,1),t=o(o.s=n[0]))}return t}var c={},i={app:0},r=[];function o(e){if(c[e])return c[e].exports;var n=c[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=c,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var c in t)o.d(n,c,function(e){return t[e]}.bind(null,c));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/OS-Homework-Memory-Allocation/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],a=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=a;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"1e93":function(t,e,n){},4744:function(t,e,n){"use strict";n("f79e")},"48fa":function(t,e,n){"use strict";n("5c1d")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var c=n("7a23"),i={id:"app"};function r(t,e,n,r,o,s){var a=Object(c["M"])("Home");return Object(c["D"])(),Object(c["i"])("div",i,[Object(c["m"])(a,{page_size:o.ps,frame_amount:o.fa,instruction_amount:o.ia,onSet_inst_amount:s.setInstAmount,onSet_frame_amount:s.setFrameAmount,onSet_page_size:s.setPageSize},null,8,["page_size","frame_amount","instruction_amount","onSet_inst_amount","onSet_frame_amount","onSet_page_size"])])}var o=Object(c["fb"])("data-v-059a7312");Object(c["G"])("data-v-059a7312");var s=Object(c["m"])("div",{class:"h-5"},null,-1),a={class:"flex"},u={class:"pt-2 w-56"},l={class:"pt-2 w-56"},f=Object(c["l"])(" 单步执行 "),d=Object(c["m"])("div",{class:"w-12"},null,-1),m=Object(c["l"])(" 连续执行（慢一点）"),b=Object(c["m"])("div",{class:"w-12"},null,-1),_=Object(c["l"])(" 连续执行（快一点）"),h=Object(c["m"])("div",{class:"w-12"},null,-1),O=Object(c["l"])(" 重置"),j=Object(c["m"])("div",{class:"w-8"},null,-1),p=Object(c["l"])(" 类LRU（Clock 实现）"),v=Object(c["l"])(" FIFO"),x=Object(c["m"])("div",{class:"h-5"},null,-1),g=Object(c["m"])("div",{class:"w-10"},null,-1),w=Object(c["m"])("div",{class:"w-10"},null,-1),k=Object(c["m"])("div",{class:"w-10"},null,-1),y={class:"content-center align-middle text-center justify-center"},M={class:"inline-block"},V=Object(c["m"])("label",{class:"text-lg"},"向前跳转比例: ",-1),N=Object(c["m"])("div",{class:"h-10"},null,-1),I={class:"inline-block"},z=Object(c["m"])("label",{class:"text-lg"},"向后跳转比例: ",-1),Q=Object(c["m"])("div",{class:"h-10"},null,-1),F=Object(c["m"])("div",{class:"h-10"},null,-1),C={class:"inline-block"},D=Object(c["m"])("label",{class:"text-lg"},"指令总数: ",-1),S=Object(c["m"])("div",{class:"h-10"},null,-1),P={class:"inline-block"},q=Object(c["m"])("label",{class:"text-lg"},"页框数目: ",-1),L=Object(c["m"])("div",{class:"h-10"},null,-1),U={class:"inline-block"},E=Object(c["m"])("label",{class:"text-lg"},"每页指令数: ",-1),R=Object(c["m"])("div",{class:"h-10"},null,-1),$={class:"dialog-footer"},A=Object(c["l"])("确定重置"),T=Object(c["l"])("取消");Object(c["E"])();var H=o((function(t,e,n,i,r,H){var G=Object(c["M"])("InstructionList"),K=Object(c["M"])("el-aside"),B=Object(c["M"])("PageView"),J=Object(c["M"])("el-button"),W=Object(c["M"])("el-radio"),X=Object(c["M"])("el-input"),Y=Object(c["M"])("el-dialog"),Z=Object(c["M"])("el-footer"),tt=Object(c["M"])("el-container");return Object(c["D"])(),Object(c["i"])(tt,{style:{"max-height":"100%"}},{default:o((function(){return[Object(c["m"])(K,{width:"300px"},{default:o((function(){return[Object(c["m"])(G,{ref:"instList",amount:t.instruction_amount,frame_size:t.page_size,backward_portion:t.randomness_backward,forward_portion:t.randomness_forward,onChoose_inst:t.chooseInst,colors:t.colors},null,8,["amount","frame_size","backward_portion","forward_portion","onChoose_inst","colors"])]})),_:1}),Object(c["m"])(tt,null,{default:o((function(){return[Object(c["m"])(B,{frame_count:t.frame_amount,ref:"frames"},null,8,["frame_count"]),Object(c["m"])(Z,null,{default:o((function(){return[s,Object(c["m"])("div",a,[Object(c["m"])("div",u,[Object(c["m"])("a",{href:"#"+t.current_instruction}," 当前指令："+Object(c["Q"])(t.current_instruction),9,["href"])]),Object(c["m"])("div",l," 下条指令："+Object(c["Q"])(t.next_instruction),1),Object(c["m"])(J,{onClick:e[1]||(e[1]=function(e){t.stopTimer(),t.execute()}),type:"primary"},{default:o((function(){return[f]})),_:1}),d,Object(c["m"])(J,{onClick:e[2]||(e[2]=function(e){return t.continueExecute(1e3)})},{default:o((function(){return[m]})),_:1}),b,Object(c["m"])(J,{onClick:e[3]||(e[3]=function(e){return t.continueExecute(100)})},{default:o((function(){return[_]})),_:1}),h,Object(c["m"])(J,{onClick:t.reset,type:"danger"},{default:o((function(){return[O]})),_:1},8,["onClick"]),j,Object(c["m"])("div",null,[Object(c["m"])(W,{modelValue:t.algo,"onUpdate:modelValue":e[4]||(e[4]=function(e){return t.algo=e}),label:"1"},{default:o((function(){return[p]})),_:1},8,["modelValue"]),Object(c["m"])(W,{modelValue:t.algo,"onUpdate:modelValue":e[5]||(e[5]=function(e){return t.algo=e}),label:"2"},{default:o((function(){return[v]})),_:1},8,["modelValue"])])]),x,Object(c["m"])("div",{class:"flex",onClick:e[6]||(e[6]=function(e){return t.randomnessFormVisible=!0}),id:"attribute"},[Object(c["m"])("p",null,"顺序执行｜向前跳转｜向后跳转： "+Object(c["Q"])(t.randomness_sequential+"%｜"+t.randomness_forward+"%｜"+t.randomness_backward+"%"),1),g,Object(c["m"])("p",null," 指令总数："+Object(c["Q"])(t.instruction_amount),1),w,Object(c["m"])("p",null," 页框数目："+Object(c["Q"])(t.frame_amount),1),k,Object(c["m"])("p",null," 每页指令数："+Object(c["Q"])(t.page_size),1)]),Object(c["m"])(Y,{title:"调整指令随机性",modelValue:t.randomnessFormVisible,"onUpdate:modelValue":e[14]||(e[14]=function(e){return t.randomnessFormVisible=e})},{default:o((function(){return[Object(c["m"])("div",y,[Object(c["m"])("div",M,[V,Object(c["m"])(X,{type:"text",placeholder:"向前跳转比例",modelValue:t.randomness_forward,"onUpdate:modelValue":e[7]||(e[7]=function(e){return t.randomness_forward=e}),maxlength:"3","prefix-icon":"el-icon-top"},{default:o((function(){return[Object(c["l"])(Object(c["Q"])(t.randomness_forward),1)]})),_:1},8,["modelValue"])]),N,Object(c["m"])("div",I,[z,Object(c["m"])(X,{type:"text",placeholder:"向后跳转比例",modelValue:t.randomness_backward,"onUpdate:modelValue":e[8]||(e[8]=function(e){return t.randomness_backward=e}),maxlength:"3","prefix-icon":"el-icon-bottom"},{default:o((function(){return[Object(c["l"])(Object(c["Q"])(t.randomness_backward),1)]})),_:1},8,["modelValue"])]),Q,Object(c["m"])("p",null," 顺序执行比例："+Object(c["Q"])(t.randomness_sequential),1),F,Object(c["m"])("div",C,[D,Object(c["m"])(X,{type:"text",placeholder:"指令总数",modelValue:t.instruction_amount_ref,"onUpdate:modelValue":e[9]||(e[9]=function(e){return t.instruction_amount_ref=e}),"prefix-icon":"el-icon-pie-chart"},{default:o((function(){return[Object(c["l"])(Object(c["Q"])(t.instruction_amount),1)]})),_:1},8,["modelValue"])]),S,Object(c["m"])("div",P,[q,Object(c["m"])(X,{type:"text",placeholder:"向后跳转比例",modelValue:t.frame_amount_ref,"onUpdate:modelValue":e[10]||(e[10]=function(e){return t.frame_amount_ref=e}),maxlength:"2","prefix-icon":"el-icon-files"},{default:o((function(){return[Object(c["l"])(Object(c["Q"])(t.frame_amount),1)]})),_:1},8,["modelValue"])]),L,Object(c["m"])("div",U,[E,Object(c["m"])(X,{type:"text",placeholder:"每页指令数",modelValue:t.page_size_ref,"onUpdate:modelValue":e[11]||(e[11]=function(e){return t.page_size_ref=e}),maxlength:"3","prefix-icon":"el-icon-bottom"},{default:o((function(){return[Object(c["l"])(Object(c["Q"])(t.page_size),1)]})),_:1},8,["modelValue"])]),R,Object(c["m"])("div",$,[Object(c["m"])(J,{type:"warning",onClick:e[12]||(e[12]=function(e){t.randomnessFormVisible=!1,t.resetByRef()})},{default:o((function(){return[A]})),_:1}),Object(c["m"])(J,{type:"primary",onClick:e[13]||(e[13]=function(e){t.randomnessFormVisible=!1})},{default:o((function(){return[T]})),_:1})])])]})),_:1},8,["modelValue"])]})),_:1})]})),_:1})]})),_:1})})),G=(n("a9e3"),Object(c["fb"])("data-v-2d0fdf12"));Object(c["G"])("data-v-2d0fdf12");var K=Object(c["m"])("div",{class:"h-4"},null,-1),B={class:"flex content-center text-center justify-center text-xl"},J={class:"pr-8"},W={class:"pr-8"},X={class:"mx-auto min-h-full",id:"mid"},Y=Object(c["m"])("div",{class:"h-4"},null,-1),Z={class:"text-md"},tt={class:"text-xl"},et={class:"h-8"},nt={class:"flex text-center justify-center content-center"},ct={key:0,class:"el-icon-error"},it={key:1,class:"el-icon-success"},rt={class:"w-20"},ot={key:0,class:"el-icon-position"},st={key:2,class:"el-icon-warning-outline"},at={key:3,class:"el-icon-warning"};Object(c["E"])();var ut=G((function(t,e,n,i,r,o){var s=Object(c["M"])("el-header"),a=Object(c["M"])("el-main"),u=Object(c["M"])("el-container");return Object(c["D"])(),Object(c["i"])(u,null,{default:G((function(){return[Object(c["m"])(s,null,{default:G((function(){return[K,Object(c["m"])("div",B,[Object(c["m"])("p",J," 当前执行条数："+Object(c["Q"])(r.inst_count),1),Object(c["m"])("p",W," 缺页次数："+Object(c["Q"])(r.page_fault_count),1),Object(c["m"])("p",null," 缺页率："+Object(c["Q"])(o.page_fault_rate)+"%",1)])]})),_:1}),Object(c["m"])(a,null,{default:G((function(){return[Object(c["m"])("div",X,[(Object(c["D"])(!0),Object(c["i"])(c["b"],null,Object(c["K"])(o.rows,(function(t){return Object(c["D"])(),Object(c["i"])("div",{key:t,class:"flex mx-auto justify-center items-center content-center text-center align-middle gap-4 pb-4 min-h-full"},[(Object(c["D"])(!0),Object(c["i"])(c["b"],null,Object(c["K"])(Number(t)!==o.rows?o.cols:n.frame_count-(o.rows-1)*o.cols,(function(e){return Object(c["D"])(),Object(c["i"])("div",{key:e,ref:function(n){n&&(r.frame_arr[(t-1)*o.cols+(e-1)]=n)},style:{background:"#"+r.frame_color[(t-1)*o.cols+(e-1)],color:r.text_color[(t-1)*o.cols+(e-1)]},class:"border-solid border rounded-2xl h-40 w-40 content-center",onClick:function(n){return o.pageModify((t-1)*o.cols+(e-1))}},[Y,Object(c["m"])("p",Z,"Frame# "+Object(c["Q"])((t-1)*o.cols+(e-1)),1),Object(c["m"])("p",tt," Page# "+Object(c["Q"])(r.pages_loaded[(t-1)*o.cols+(e-1)]?r.frame_page[(t-1)*o.cols+(e-1)]:"空闲"),1),Object(c["m"])("p",null," 指令号： "+Object(c["Q"])(r.pages_loaded[(t-1)*o.cols+(e-1)]?r.frame_inst[(t-1)*o.cols+(e-1)]:"无"),1),Object(c["m"])("div",et,Object(c["Q"])(r.inst_queue.indexOf((t-1)*o.cols+(e-1))>=0?r.inst_queue.indexOf((t-1)*o.cols+(e-1)):""),1),Object(c["m"])("div",nt,[r.used_bits[(t-1)*o.cols+(e-1)]?Object(c["j"])("",!0):(Object(c["D"])(),Object(c["i"])("i",ct)),r.used_bits[(t-1)*o.cols+(e-1)]?(Object(c["D"])(),Object(c["i"])("i",it)):Object(c["j"])("",!0),Object(c["m"])("div",rt,[(t-1)*o.cols+(e-1)===r.clock_pointer?(Object(c["D"])(),Object(c["i"])("i",ot)):Object(c["j"])("",!0)]),r.modified_bits[(t-1)*o.cols+(e-1)]?Object(c["j"])("",!0):(Object(c["D"])(),Object(c["i"])("i",st)),r.modified_bits[(t-1)*o.cols+(e-1)]?(Object(c["D"])(),Object(c["i"])("i",at)):Object(c["j"])("",!0)])],12,["onClick"])})),128))])})),128))])]})),_:1})]})),_:1})})),lt=(n("a434"),n("b680"),1),ft=2;Array.prototype.remove=function(t){var e=this.indexOf(t);this.splice(e,1)};var dt={name:"PageView",props:{frame_count:Number},data:function(){return{frame_arr:[],frame_color:[],text_color:[],pages_loaded:[],frame_page:[],frame_inst:[],inst_queue:[],clock_pointer:0,used_bits:[],modified_bits:[],inst_count:0,page_fault_count:0}},methods:{pageModify:function(t){this.pages_loaded[t]&&(this.modified_bits[t]=!this.modified_bits[t])},findLruReplacement:function(){for(var t=0;t<this.frame_count;t++)if(!this.pages_loaded[t])return t;do{console.log("First Scan");for(var e=0;e<this.frame_count;e++){if(!this.used_bits[this.clock_pointer]&&!this.modified_bits[this.clock_pointer]){var n=this.clock_pointer;return this.clockNext(),n}this.clockNext()}console.log("Second Scan");for(var c=0;c<this.frame_count;c++){if(!this.used_bits[this.clock_pointer]){var i=this.clock_pointer;return this.clockNext(),i}this.used_bits[this.clock_pointer]=!1,this.clockNext()}}while(1)},findFifoReplacement:function(){for(var t=0;t<this.frame_count;t++)if(!this.pages_loaded[t])return t;return this.inst_queue[0]},clockNext:function(){this.clock_pointer=(this.clock_pointer+1)%this.frame_count},executeLRU:function(t,e,n){for(var c=-1,i=!1,r=0;r<this.frame_count;r++)this.pages_loaded[r]&&this.frame_page[r]===t&&(c=r);c<0&&(c=this.findLruReplacement(),i=!0,this.page_fault_count++),this.pages_loaded[c]=!0,this.frame_page[c]=t,this.frame_inst[c]=e,this.frame_color[c]=n.c,this.text_color[c]=1===n.t?"white":"black",this.inst_queue.indexOf(c)>=0&&this.inst_queue.remove(c),this.inst_queue.push(c),this.used_bits[c]=!0,i&&(this.modified_bits[c]=!1)},executeFIFO:function(t,e,n){for(var c=-1,i=!1,r=0;r<this.frame_count;r++)this.pages_loaded[r]&&this.frame_page[r]===t&&(c=r);c<0&&(c=this.findFifoReplacement(),i=!0,this.page_fault_count++),this.pages_loaded[c]=!0,this.frame_page[c]=t,this.frame_inst[c]=e,this.frame_color[c]=n.c,this.text_color[c]=1===n.t?"white":"black",this.inst_queue.indexOf(c)>=0&&this.inst_queue.remove(c),this.inst_queue.push(c),this.used_bits[c]=!0,i&&(this.modified_bits[c]=!1)},execute:function(t,e,n,c){this.inst_count++,c===lt?this.executeLRU(t,e,n):c===ft&&this.executeFIFO(t,e,n)},reset:function(){console.log(this.frame_count);for(var t=0;t<this.frame_count;t++)console.log(t),this.frame_color[t]="eeeeee",this.text_color[t]="black",this.pages_loaded[t]=!1,this.frame_inst[t]=0,this.frame_page[t]=0,this.used_bits[t]=!1,this.modified_bits[t]=!1;this.clock_pointer=0,this.inst_queue=[],console.log(this.frame_color),this.page_fault_count=0,this.inst_count=0}},computed:{rows:function(){return Math.ceil(this.frame_count/this.cols)},cols:function(){return this.frame_count>16?4:Math.ceil(Math.sqrt(this.frame_count))},page_fault_rate:function(){if(0===this.inst_count)return"0";var t=this.page_fault_count/this.inst_count*100;return t.toFixed(2)}},mounted:function(){this.reset()}};n("48fa");dt.render=ut,dt.__scopeId="data-v-2d0fdf12";var mt=dt,bt=Object(c["fb"])("data-v-1ada4ef0");Object(c["G"])("data-v-1ada4ef0");var _t={class:"w-8"},ht={class:"w-24"},Ot={key:0,class:"el-icon-circle-plus"},jt={key:1,class:"el-icon-circle-check"};Object(c["E"])();var pt=bt((function(t,e,n,i,r,o){var s=Object(c["M"])("el-menu-item"),a=Object(c["M"])("el-menu");return Object(c["D"])(),Object(c["i"])(a,null,{default:bt((function(){return[(Object(c["D"])(!0),Object(c["i"])(c["b"],null,Object(c["K"])(n.amount,(function(t){return Object(c["D"])(),Object(c["i"])("div",{class:"instruction",key:t,id:"inst"+t},[Object(c["m"])(s,{disabled:r.inst_list.executed[t-1],onClick:function(e){return o.chooseInstruct(t-1)}},{default:bt((function(){return[Object(c["m"])("div",{class:"flex",style:{"text-decoration":r.inst_list.executed[t-1]?"line-through":""}},[Object(c["m"])("div",_t,Object(c["Q"])(t-1),1),Object(c["m"])("div",ht,Object(c["Q"])(r.typeName[r.inst_list["type"][t-1]]),1),Object(c["m"])("div",{class:"w-18 flex",style:{color:"#"+n.colors[Math.floor((t-1)/n.frame_size)].c}},[Object(c["m"])("p",null,[r.inst_list.executed[t-1]?Object(c["j"])("",!0):(Object(c["D"])(),Object(c["i"])("i",Ot)),r.inst_list.executed[t-1]?(Object(c["D"])(),Object(c["i"])("i",jt)):Object(c["j"])("",!0),Object(c["l"])(" Page#"+Object(c["Q"])(Math.floor((t-1)/n.frame_size)),1)])],4)],4)]})),_:2},1032,["disabled","onClick"])],8,["id"])})),128))]})),_:1})})),vt=n("b85c"),xt=(n("4de4"),1),gt=2,wt=0,kt={name:"InstructionList",props:{amount:Number,frame_size:Number,forward_portion:Number,backward_portion:Number,colors:Array},data:function(){return{inst_list:{type:[],executed:[]},not_executed:[],typeName:["顺序","分支向前","分支向后"]}},methods:{reset_list:function(){for(var t=[],e=0;e<this.amount;e++)e<this.amount/100*this.forward_portion?t.push(xt):e<this.amount/100*(this.forward_portion+this.backward_portion)?t.push(gt):t.push(wt);t.sort((function(){return.5-Math.random()})),this.not_executed=[];for(var n=0;n<this.amount;n++)this.inst_list["type"][n]=t.pop(),this.inst_list["executed"][n]=!1,this.not_executed.push(n)},chooseInstruct:function(t){return this.$emit("choose_inst",t),t},executeInstruct:function(t){return console.log(t),this.inst_list.executed[t]=!0,Math.floor(t/this.frame_size)},getNext:function(t){if(!(t<0||t>this.amount)){var e=this.inst_list.type[t];if(e===xt){var n=this.not_executed.filter((function(e){return e<t}));if(0===n.length){var c,i=Object(vt["a"])(this.not_executed);try{for(i.s();!(c=i.n()).done;){var r=c.value;if(r!==t)return r}}catch(m){i.e(m)}finally{i.f()}return}return n.sort((function(){return.5-Math.random()})),n[0]}if(e===gt){var o=this.not_executed.filter((function(e){return e>t}));if(0===o.length){var s,a=Object(vt["a"])(this.not_executed);try{for(a.s();!(s=a.n()).done;){var u=s.value;if(u!==t)return u}}catch(m){a.e(m)}finally{a.f()}return}return o.sort((function(){return.5-Math.random()})),o[0]}for(t+=1;t<this.amount;t++)if(this.not_executed.indexOf(t)>=0)return t;var l,f=Object(vt["a"])(this.not_executed);try{for(f.s();!(l=f.n()).done;){var d=l.value;if(d!==t)return d}}catch(m){f.e(m)}finally{f.f()}}},didExecute:function(t){this.not_executed.indexOf(t)>=0&&(this.not_executed.remove(t),this.inst_list.executed[t]=!0),console.log("Execute "+t)}},mounted:function(){this.reset_list()}};n("4744");kt.render=pt,kt.__scopeId="data-v-1ada4ef0";var yt=kt,Mt=1,Vt=2,Nt=Object(c["n"])({name:"Home",components:{PageView:mt,InstructionList:yt},props:{page_size:Number,frame_amount:Number,instruction_amount:Number},data:function(){return{current_instruction:Number,next_instruction:Number,randomnessFormVisible:!1,timer:void 0,algo:"1",colors:[{c:"eea2a4",t:Vt},{c:"5a191b",t:Mt},{c:"a61b29",t:Mt},{c:"894e54",t:Mt},{c:"c27c88",t:Mt},{c:"ec7696",t:Mt},{c:"33141e",t:Mt},{c:"cc5595",t:Mt},{c:"681752",t:Mt},{c:"7e1671",t:Mt},{c:"302f4b",t:Mt},{c:"61649f",t:Mt},{c:"1661ab",t:Mt},{c:"144a74",t:Mt},{c:"4e7ca1",t:Mt},{c:"11659a",t:Mt},{c:"2f90b9",t:Mt},{c:"134857",t:Mt},{c:"63bbd0",t:Mt},{c:"93d5dc",t:Vt},{c:"1ba784",t:Mt},{c:"57c3c2",t:Mt},{c:"5dbe8a",t:Mt},{c:"485b4d",t:Mt},{c:"43b244",t:Mt},{c:"fc6315",t:Mt},{c:"b7511d",t:Mt},{c:"fa5d19",t:Mt},{c:"732e12",t:Mt},{c:"862617",t:Mt},{c:"483332",t:Mt},{c:"5e5314",t:Mt},{c:"55bb8a",t:Mt},{c:"1f2623",t:Mt},{c:"cad3c3",t:Vt},{c:"f0f5e5",t:Vt},{c:"867018",t:Vt},{c:"fbecde",t:Vt},{c:"f2481b",t:Mt},{c:"f2b9b2",t:Vt}]}},methods:{getNext:function(){return this.$refs.instList.getNext(this.current_instruction)},reset:function(){this.current_instruction="未载入",this.next_instruction=Math.floor(Math.random()*this.instruction_amount),this.$refs.frames.reset(),this.$refs.instList.reset_list()},resetByRef:function(){var t=Number(this.instruction_amount_ref),e=Number(this.page_size_ref),n=Number(this.frame_amount_ref);t&&this.$emit("set_inst_amount",t),e&&this.$emit("set_page_size",e),n&&this.$emit("set_frame_amount",n),setTimeout(this.reset,500)},getPage:function(t){return Math.floor(t/this.page_size)},getColor:function(t){var e=this.colors.length;return this.colors[t%e]},execute:function(){if(void 0===this.next_instruction)return alert("已经执行完毕，请重置或修改随机性"),this.stopTimer(),void(this.current_instruction="已执行完毕");this.current_instruction=this.next_instruction,this.next_instruction=this.getNext(),this.$refs.instList.didExecute(this.current_instruction);var t=this.getPage(this.current_instruction),e=this.getColor(t);this.$refs.frames.execute(t,this.current_instruction,e,Number(this.algo))},continueExecute:function(t){this.timer?(clearInterval(this.timer),this.timer=void 0):this.timer=setInterval(this.execute,t)},stopTimer:function(){this.timer&&(clearInterval(this.timer),this.timer=void 0)},chooseInst:function(t){this.next_instruction=t}},computed:{randomness_forward:{set:function(t){return t=Number(t),t<0?0:t>100?100:(t+this.randomness_backward>100&&(this.randomness_backward=100-t),t)},get:function(){return this.randomness_forward}},randomness_backward:{set:function(t){return t=Number(t),t<0?0:t>100?100:(this.randomness_forward+t>100&&(console.log(t),this.randomness_forward=100-t),t)},get:function(){return this.randomness_backward}},randomness_sequential:function(){return 100-this.randomness_forward-this.randomness_backward}},mounted:function(){this.current_instruction="未载入",this.next_instruction=Math.floor(Math.random()*this.instruction_amount),this.randomness_forward=25,this.randomness_backward=25,this.colors.sort((function(){return.5-Math.random()}))},setup:function(){return{randomness_forward:Object(c["I"])(25),randomness_backward:Object(c["I"])(25),instruction_amount_ref:Object(c["I"])(320),frame_amount_ref:Object(c["I"])(4),page_size_ref:Object(c["I"])(10)}}});n("6c72");Nt.render=H,Nt.__scopeId="data-v-059a7312";var It=Nt,zt={name:"App",components:{Home:It},data:function(){return{ps:10,fa:4,ia:320}},methods:{setInstAmount:function(t){this.ia=t},setFrameAmount:function(t){this.fa=t},setPageSize:function(t){this.ps=t}}};n("7ca3");zt.render=r;var Qt=zt,Ft=n("3fd4"),Ct=(n("7dd6"),n("ba8c"),Object(c["h"])(Qt));Ct.use(Ft["a"]),Ct.mount("#app")},"5c1d":function(t,e,n){},"6c72":function(t,e,n){"use strict";n("1e93")},"7ca3":function(t,e,n){"use strict";n("c055")},ba8c:function(t,e,n){},c055:function(t,e,n){},f79e:function(t,e,n){}});
//# sourceMappingURL=app.18c87ebd.js.map