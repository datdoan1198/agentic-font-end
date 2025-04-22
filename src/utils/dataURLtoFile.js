export const dataURLtoFile = (dataurl, filename) => {
  return new Promise((resolve) => {
    const arr = dataurl.split(",")
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    const file = new File([u8arr], filename, { type: mime })
    resolve(file)
  })
}
