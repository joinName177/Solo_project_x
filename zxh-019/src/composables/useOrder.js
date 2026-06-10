import { ref, computed } from 'vue'
import { randomProducts } from '../data/products.js'

const PAYMENT_OPTIONS = [50, 100]

export function useOrder() {
  const items = ref([])
  const totalPrice = ref(0)
  const payment = ref(0)
  const changeDue = ref(0)

  function generateOrder() {
    const count = Math.floor(Math.random() * 5) + 2
    items.value = randomProducts(count)
    totalPrice.value = parseFloat(
      items.value.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(2)
    )
    payment.value = PAYMENT_OPTIONS[Math.floor(Math.random() * PAYMENT_OPTIONS.length)]
    changeDue.value = parseFloat((payment.value - totalPrice.value).toFixed(2))
  }

  return {
    items,
    totalPrice,
    payment,
    changeDue,
    generateOrder,
  }
}
