export { getAuthTicket, signIn, signOut, getCurrentUser, hasLoginState } from './user'
export { getCollections } from './content'

export async function fakeAccountLogin(params) {
  return {
      status: 'ok'
  }
}
export async function getFakeCaptcha(mobile) {
  return {
      code: 'xxx'
  }
}
