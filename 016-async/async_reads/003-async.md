# Learnings - Promises chaining

## `then` chaining

```javascript
// The 'then()' method returns the result wrapped in a promise
new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000)
})
  .then((result) => {
    console.log(`Result: ${result}`) // 1
    return result * 2
  })
  .then((result) => {
    console.log(`Result: ${result}`) // 2
    return result * 2
  })
  .then((result) => {
    console.log(`Result: ${result}`) // 4
    return result * 2
  })
  .then((result) => {
    console.log(`Result: ${result}`) // 8
    return result * 2
  })
  .then((result) => {
    console.log(`Result: ${result}`) // 16
    return result * 2
  })
  .then((result) => {
    console.log(`Result: ${result}`) // 32
    return result * 2
  })
  .then((result) => {
    console.log(`Result: ${result}`) // 64
    return result * 2
  })
```

## Returning Promises

```javascript
new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000)
})
  .then((result) => {
    console.log(result) // 1
    return result * 2
  })
  .then((result) => {
    console.log(result) // 2
    return result * 2
  })
  .then((result) => {
    console.log(result) // 4
    return new Promise((resolve, reject) => { // New promise
      setTimeout(() => resolve(result * 5), 3000)
    })
  })
  .then((result) => console.log(result)) // 20 after 3 seconds

```

## Example with `fetch`

```javascript
fetch('/article/promise-chaining/user.json')
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise(function(resolve, reject) {
        let img = document.createElement('img')

        img.onload = () => {
          setTimeout(() => {
            img.remove()
            resolve(githubUser) // (**)
          }, 3000)
        }

        img.onerror = () => {
          reject(new Error('Somethign went wrong'))
        }

        img.src = githubUser.avatar_url
        img.className = 'promise-avatar-example'
        document.body.append(img)
      })
  )
  // triggers after 3 seconds
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`))
  .catch((err) => console.log(err.message))
```

Same code but refactored

```javascript
function loadJson(url) {
  return fetch(url).then((response) => response.json())
}

function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`)
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img')
    img.onload = () => {
      setTimeout(() => {
        img.remove()
        resolve(githubUser) // (**)
      }, 3000)
    }

    img.onerror = () => {
      reject(new Error('Something went wrong'))
    }

    img.src = githubUser.avatar_url
    img.className = 'promise-avatar-example'
    document.body.append(img)

    setTimeout(() => {
      img.remove()
      resolve(githubUser)
    }, 3000)
  })
}

// Use them:
loadJson('/article/promise-chaining/user.json')
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`))
// ...

```
