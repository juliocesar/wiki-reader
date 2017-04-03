// JSONP adapter
// =============
//
// Straight from the didn’t-like-what-was-out-there department.

export default function jsonp(options = {}) {
  const functionName = `jsonp${Math.floor(Math.random() * 9999)}`

  window[functionName] = function(response) {
    if (options.complete) options.complete(response)
  }

  const script = document.createElement('script')
  script.src = `${options.url}&callback=${functionName}`

  script.onload = function() {
    document.body.removeChild(script)
    delete window[functionName]
  }

  document.body.appendChild(script)
}
