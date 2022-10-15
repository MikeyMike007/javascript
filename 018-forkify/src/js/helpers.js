import { API_ENDPOINT, TIMEOUT_SEC, API_KEY } from '../js/config.js'

export const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`))
    }, s * 1000)
  })
}

export const idEndpoint = (id) => {
  return `${API_ENDPOINT}/${id}?key=${API_KEY}`
}

export const searchEndpoint = (searchKey) => {
  return `${API_ENDPOINT}?search=${searchKey}&key=${API_KEY}`
}

export const postEndpoint = () => {
  return `${API_ENDPOINT}?key=${API_KEY}`
}


export const getJSON = async function(type, key) {
  try {
    let url = undefined
    if (type === 'id') {
      url = idEndpoint(key)
    } else if (type === 'search') {
      url = searchEndpoint(key)
    } else {
      throw new error('Wrong type in getJSON() query')
    }

    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)])
    const data = await response.json()

    if (!response.ok)
      throw new Error(`hahah (${response.status}) ${data.message}`)

    return data
  } catch (err) {
    throw err
  }
}

export const sendJSON = async function(uploadData) {
  try {
    const url = postEndpoint()

    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData)
    })

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])

    const data = await response.json()

    if (!response.ok)
      throw new Error(`hahah (${response.status}) ${data.message}`)

    return data
  } catch (err) {
    throw err
  }
}
