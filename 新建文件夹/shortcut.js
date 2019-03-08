
/*
我们并不打算在 输入框 和 文字区域
进行快捷键的操作
*/
const ignoreNode = [
  'INPUT',
  'TEXTAREA'
]

// 系统组合键
const systemKeyCode = [
  {
    // ctrl+r 刷新
    key: ['ctrlKey', 'metaKey'],
    code: 82
  },
  {
    // ctrl+alt+i 打开开发者
    key: ['ctrlKey', 'metaKey'],
    key2: ['altKey'],
    code: 73
  }
]

// 将初始值设置为 false
let hadDown = false

let shortcuts = {
  methods: {
    handleKeyDown (e) {
      // nodeName 一直是 BODY
      let nodeName = e.target.nodeName
      // 如果目标 DOM 属于
      //   1.可忽略元素中的一种
      //   2. 它是一个内容可编辑的 DIV
      // 那么它不适用于快捷键规则，函数终止
      if (ignoreNode.indexOf(nodeName) !== -1
          || (nodeName === 'DIV' && e.target.contentEditable === 'true')
      ) {
        return
      }
      // 如果目标 DOM 满足以下所有条件
      //  1.初始值为 false
      //  2.showMenuBg 为 false
      if (hadDown || this.showMenuBg) {
        // 阻止捕获和冒泡阶段中当前事件的进一步传播
        e.stopPropagation()
        // 阻止默认事件触发之后默认动作的发生
        e.preventDefault()
        // 跳出
        return
      }
      // hadDown 设置为 true
      hadDown = true
      // 如果我们按下 ctrl、alt、shift、meta 这四种键
      // hadDown 的值就为 false
      let ctrl = e.key === 'Control' || e.key === 'Meta'
      let alt = e.key === 'Alt'
      let shift = e.key === 'Shift'
      // dir 是 四个方向键任意一个
      let dir = e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40
      // 以上的都是特殊按键
      let specialKey = ctrl || alt || shift || dir
      if (specialKey || e.metaKey) {
        hadDown = false
      }
      // 我们使用 alt 键触发组合方法
      if (alt) {
        this.$store.dispatch('updateAltDown', true)
      }
      // 遍历数组
      // 返回数组中满足提供的测试函数的第一个元素的值。
      // 实际上就是遍历一遍两个数据
      // 每个对象判断一次，先判断 key 中有没有 ctrl/meta
      // 如果存在，则返回 true，跳出循环
      // 如果不在，则返回 false，继续循环
      let systemKey = systemKeyCode.find(item => {
        let f = false
        let f2 = false
        // 遍历 item 的 key 数组，对 key 进行判断
        for (let i = 0; i < item.key.length; i++) {
          // 调用 e 对象的 item.key[i] 属性
          // 将属性值赋值给 f
          f = e[item.key[i]]
          if (f) {
            break
          }
        }
        // key 中不存在 ctrl/meta，继续以下的循环
        // 遍历 key2，寻找 alt 的值
        if (item.key2) {
          for (let i = 0; i < item.key2.length; ++i) {
            f2 = e[item.key2[i]]
            if (f2) {
              break
            }
          }
        }
        // 经过两次判断，输出我们想要的结果
        // 只有 ctrl+r 和 ctrl+alt+i 组合可以执行
        return f && f2 && e.keyCode === item.code
      })
      // 如果存在 systemKey，则退出函数
      if (systemKey) {
        return
      }

      // 未知的代码块，看上去没有什么用
      let withCtrl = e.ctrlKey || e.metaKey
      if (withCtrl && !specialKey) {
        this.dealCtrl(e)
        return
      }
      let withAlt = e.altKey
      if (withAlt && !specialKey) {
        return
      }
      let withShift = e.shiftKey
      if (withShift && !specialKey) {
        return
      }
      // 活跃组件的 uuid 不为 -1 的时候
      // 仅执行一次
      if (this.dActiveElement.uuid === '-1') {
        return
      }
      e.stopPropagation()
      e.preventDefault()
      // 按了就是 10，没按就是 1
      // 我们使用 shift 键来控制步频
      let f = withShift ? 10 : 1
      switch (e.keyCode) {
        case 38:
          this.udlr('top', -1 * f)
          break
        case 40:
          this.udlr('top', 1 * f)
          break
        case 37:
          this.udlr('left', -1 * f)
          break
        case 39:
          this.udlr('left', 1 * f)
          break
        // delete
        case 46:
        // 后退键
        case 8:
          this.$store.dispatch('deleteWidget')
          break
      }
    },
    // 按下 alt 触发事件
    handleKeyUp (e) {
      hadDown = false
      if (e.key === 'Alt') {
        this.$store.dispatch('updateAltDown', false)
      }
    },
    // 键盘上下左右移动组件
    udlr (type, value) {
      let result = this.dActiveElement[type] + value
      // 对方向键进行判断，触发相应时间
      if (type === 'left') {
        result = Math.max(0, Math.min(this.dPage.width - this.dActiveElement.record.width, result))
      } else {
        result = Math.max(0, Math.min(this.dPage.height - this.dActiveElement.record.height, result))
      }
      // 将参数提交到变量的 updateWidgetData
      this.$store.dispatch('updateWidgetData', {
        uuid: this.dActiveElement.uuid,
        key: type,
        value: result
      })
    },
    // 根据不同的按键触发相应的事件
    // 复制、粘贴、撤销、
    dealCtrl (e) {
      // console.log(e.key, e.keyCode)
      switch (e.keyCode) {
        case 67: // c
          if (this.dActiveElement.uuid === '-1') {
            return
          }
          this.copyWidget()
          break
        case 86: // v
          if (this.dCopyElement.length === 0) {
            return
          }
          this.pasteWidget()
          break
        case 90: // z
          if (e.shiftKey) {
            if (!(this.dHistoryParams.index === this.dHistoryParams.length - 1)) {
              this.handleHistory('redo')
            }
          } else if (!(this.dHistoryParams.index === -1 || (this.dHistoryParams === 0 && this.dHistoryParams.length === 10))) {
            this.handleHistory('undo')
          }
          break
        case 83: // s
          // this.save()
          break
      }
    }
  }
}

export { shortcuts }