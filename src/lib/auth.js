/**
 * Simple storage repository
 */
export default {
  set (storage) {
    return function (token) {
      storage.auth = token
    }
  }
}
