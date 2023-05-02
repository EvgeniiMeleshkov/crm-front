/**
 * Headers object based on `auth`
 * in given storage
 */
export default (storage, headers) => {
  return !storage.auth
    ? headers
    : {
        ...headers,
        Authorization: `Bearer ${storage.auth}`
      }
}
