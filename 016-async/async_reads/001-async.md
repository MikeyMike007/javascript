# Async learnings

Examples of callback-based style of asynchronous programming.


Callback-based style of asynchronous programming means that there is a function that does something asynchronous should
provide a callback argument where we put the function to run after its complete.

## Callback with one argument

```javascript
function loadScript(source, callback) {
  const script = document.createElement('script')
  // Same as addEventListener
  script.onload = () => callback(script)
  script.src = source
  document.head.append(script)
}

loadScript(
  'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js',
  function(script) {
    alert(`Cool! This script is loaded ${script.src}`)
  }
)
```

## Callback with error handling

```javascript
function loadScript(source, callback) {
  const script = document.createElement('script')
  // Same as addEventListener
  script.onload = callback(null, script)
  script.onerror = callback(
    new Error("Something went wrong - Probably didn't find the file")
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
```

## Callback-hell

Should be avoided

```javascript
loadScript('1.js', (err, script) => {
  if (err) alert(err.message)
  else
    loadScript('2.js', (err, script) => {
      if (err) alert(err.message)
      // Do something with script
      else
        loadScript('2.js', (err, script) => {
          if (err) alert(err.message)
          // Do something with script
          else
            loadScript('2.js', (err, script) => {
              if (err) alert(err.message)
              // Do something with script
              else loadScript('2.js', (err, script) => { })
            })
        })
    })
})
```
