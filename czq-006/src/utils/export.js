/**
 * 导出工具
 * 支持将图书清单导出为文本或图片
 */

export function exportAsText(books, village) {
  const filtered = village ? books.filter(b => b.village === village) : books
  const header = `乡村图书漂流角 —— ${village || '全部村庄'}图书清单\n`
  const divider = `${'─'.repeat(40)}\n`
  const lines = filtered.map((b, i) =>
    `${i + 1}. 《${b.title}》 | ${b.category} | ${b.status}\n` +
    `   捐赠人: ${b.donor} | 存放: ${b.location}\n` +
    (b.borrower ? `   借阅人: ${b.borrower} | 预计归还: ${b.expectedReturnDate}\n` : '')
  )
  const content = header + divider + lines.join(divider) +
    `\n总计: ${filtered.length} 本图书 | 可借阅: ${filtered.filter(b => b.status === '可借阅').length} 本`

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  downloadBlob(blob, `图书清单_${village || '全部'}_${today()}.txt`)
}

export async function exportAsImage(element, filename) {
  const { default: html2canvas } = await import('html2canvas')
  const canvas = await html2canvas(element, {
    backgroundColor: '#f5e6d3',
    scale: 2
  })
  canvas.toBlob(blob => {
    downloadBlob(blob, `${filename}_${today()}.png`)
  }, 'image/png')
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
