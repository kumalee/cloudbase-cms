export { useAccountLogin } from './login';

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
