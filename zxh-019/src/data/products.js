export const products = [
  { name: '苹果', price: 5.50, unit: '斤' },
  { name: '香蕉', price: 3.20, unit: '斤' },
  { name: '牛奶', price: 19.90, unit: '盒' },
  { name: '面包', price: 8.80, unit: '个' },
  { name: '鸡蛋', price: 15.60, unit: '盒' },
  { name: '薯片', price: 7.50, unit: '袋' },
  { name: '可乐', price: 3.50, unit: '瓶' },
  { name: '矿泉水', price: 2.00, unit: '瓶' },
  { name: '牛肉', price: 42.80, unit: '斤' },
  { name: '白菜', price: 2.50, unit: '斤' },
  { name: '酱油', price: 12.00, unit: '瓶' },
  { name: '大米', price: 35.00, unit: '袋' },
  { name: '方便面', price: 5.00, unit: '包' },
  { name: '酸奶', price: 12.50, unit: '排' },
  { name: '火腿肠', price: 9.90, unit: '包' },
  { name: '洗衣液', price: 28.00, unit: '瓶' },
  { name: '纸巾', price: 18.50, unit: '提' },
  { name: '巧克力', price: 15.00, unit: '块' },
  { name: '饼干', price: 11.00, unit: '包' },
  { name: '果汁', price: 8.00, unit: '瓶' },
]

export function randomProducts(count) {
  const shuffled = [...products].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, count)
  return selected.map(p => ({
    ...p,
    quantity: Math.floor(Math.random() * 3) + 1,
  }))
}
