import setHeaders from '@/lib/setHeaders.js'

const baseURL = '/api'
const makeURL = url => baseURL + url
// Some mime types
const contentJson = { 'content-type': 'application/json' }

// Functional-style api maker
const api = method => answer =>
  headers => url => async body => {
    const res = await fetch(makeURL(url), {
      headers: setHeaders(localStorage, headers),
      method,
      body
    })

    if (res.ok) return res[answer]()

    else throw new Error(await res[answer]())
  }

// POST
const post = api('POST')
const postText = post('text')
const postTextContentJson = postText(contentJson)

const register = postTextContentJson('/auth/register')
const login = postTextContentJson('/auth/login')
const recovery = postTextContentJson('/auth/recovery')

// GET
const get = api('GET')
const getJson = get('json')
const getJsonContentJson = getJson(contentJson)

const me = getJsonContentJson('/auth/me')

const getCustomers = getJsonContentJson('/user/customers')

export default {
  recovery,
  register,
  login,
  me,
  getCustomers
}