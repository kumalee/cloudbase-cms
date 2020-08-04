export { getAuthTicket, signIn, signOut, getCurrentUser, hasLoginState } from './user';

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
