import { ref } from 'vue'

const CUSTOMER_NAMES = [
  '张阿姨', '李大爷', '王女士', '赵先生', '刘奶奶',
  '陈小姐', '周叔叔', '吴老师', '郑医生', '孙师傅',
  '林同学', '黄经理', '马大叔', '胡大姐', '郭小妹',
]

const FIRST_NAMES = ['张', '李', '王', '赵', '刘', '陈', '周', '吴', '郑', '孙']
const LAST_NAMES = ['阿姨', '大爷', '女士', '先生', '奶奶', '叔叔', '老师', '医生', '同学', '大姐']

const SPECIAL_TYPES = [
  { type: 'no_coins', label: '不要硬币', description: '顾客说：请给我整钱，不要硬币！' },
  { type: 'all_five', label: '全部5元', description: '顾客说：全给我换成5元纸币！' },
  { type: 'overpaid', label: '多找修正', description: '顾客说：你多找了我2元！' },
]

export function useCustomer() {
  const customer = ref(null)
  const regularCustomer = ref(null)
  const customerHistory = ref(new Map())

  function generateCustomer() {
    const id = Math.floor(Math.random() * 10000)
    const name = CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)]
    const special = SPECIAL_TYPES[Math.floor(Math.random() * SPECIAL_TYPES.length)]
    return { id, name, special }
  }

  function nextCustomer() {
    if (regularCustomer.value) {
      customer.value = regularCustomer.value
      regularCustomer.value = null
      return
    }

    const newCustomer = generateCustomer()
    const history = customerHistory.value.get(newCustomer.id) || 0
    customerHistory.value.set(newCustomer.id, history + 1)

    if (history + 1 >= 3) {
      regularCustomer.value = {
        ...newCustomer,
        isRegular: true,
        preference: newCustomer.special,
      }
      customerHistory.value.set(newCustomer.id, 0)
      customer.value = generateCustomer()
    } else {
      customer.value = newCustomer
    }
  }

  function getCustomerPreference(cust) {
    if (!cust) return null
    return cust.special
  }

  return {
    customer,
    regularCustomer,
    nextCustomer,
    getCustomerPreference,
  }
}
