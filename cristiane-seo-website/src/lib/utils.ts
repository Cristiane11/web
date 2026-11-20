export const fmtDateTime = (ms: number) =>
  new Date(ms).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
export const fmtDate = (ms: number) => new Date(ms).toLocaleDateString('en-US', { dateStyle: 'long' })

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const errMsg = (e: unknown) => (e instanceof Error ? e.message.replace('Firebase: ', '') : String(e))

/** datetime-local input <-> epoch ms */
export const toLocalInput = (ms: number) => {
  const d = new Date(ms)
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}
export const fromLocalInput = (v: string) => new Date(v).getTime()

export function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\r\n')
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}
