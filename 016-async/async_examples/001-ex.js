// function loadScript(source, callback) {
//   const script = document.createElement('script')
//   script.onload = () => callback(script)
//   script.src = source
//   document.head.append(script)
// }

// loadScript(
//   'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js',
//   function(script) {
//     alert(`Cool! This script is loaded ${script.src}`)
//     alert(_)
//   }
// )

function loadScript2(source, callback) {
  const script = document.createElement('script')
  script.onload = callback(null, script)
  script.onerror = callback(
    new Error('Something went wrong - Probably didnt find the file')
  )
  script.src = source
  document.head.append(script)
}

loadScript2('1.js', (err, script) => {
  if (err) {
    alert(`Error: ${err.message}`)
  } else {
    alert(`Script: ${script.src}`)
  }
})

// Callback hell

loadScript2('1.js', (err, script) => {
  if (err) alert(err.message)
  else
    loadScript2('2.js', (err, script) => {
      if (err) alert(err.message)
      else

      // Do something with script
        loadScript2('2.js', (err, script) => {
          if (err) alert(err.message)
          else

          // Do something with script
            loadScript2('2.js', (err, script) => {
              if (err) alert(err.message)
              else 

              // Do something with script
        loadScript2('2.js', (err, script) => { })
            })
        })
    })
})
