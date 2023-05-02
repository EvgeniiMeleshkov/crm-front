/** Prepare payload using form data */
export default function form2json (target) {
  const formData = new FormData(target)
  const obj = Object.fromEntries(formData.entries())
  return JSON.stringify(obj)
}
