// 区域打印方法, 传入参数是 element id

let printAreaCount = 0

function printArea(ele) {
  const printElement = document.getElementById(ele)
  if (!printElement) {
    throw new Error(`didn't find this element "#${ele}"`)
  }

  const idPrefix = 'printArea_'
  removePrintArea(idPrefix + printAreaCount)

  printAreaCount++

  const iframeId = idPrefix + printAreaCount
  const iframeStyle = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;'
  const iframe = document.createElement('IFRAME')
  iframe.setAttribute('id', iframeId)
  iframe.setAttribute('style', iframeStyle)
  document.body.appendChild(iframe)

  const doc = iframe.contentWindow.document
  doc.open()
  let css = ''
  const links = Array.from(document.querySelectorAll('head>link')).filter(link => link.getAttribute('rel').toLowerCase() === 'stylesheet')
  links.forEach(link => {
    css += link.outerHTML
  })
  const styles = Array.from(document.querySelectorAll('head>style'))
  styles.forEach(style => {
    css += style.outerHTML
  })
  doc.write(css + printElement.outerHTML)
  doc.close()

  iframe.onload = () => {
    const frameWindow = iframe.contentWindow
    frameWindow.focus()
    frameWindow.print()
  }
}

function removePrintArea(id) {
  const iframe = document.getElementById(id)
  iframe && iframe.parentNode.removeChild(iframe)
}

export default printArea
