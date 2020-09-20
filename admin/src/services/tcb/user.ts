import axios from 'axios'
import { initTcb } from './init'
import endpoints from './endpoints'

export const getAuthTicket = async (values) => {
  const ticketRes = await axios.post(endpoints.login, {
      userName: values.username,
      password: values.password,
  })
  return ticketRes
}

export const signIn = async (ticket) => {
  const { auth } = initTcb()
  const loginState = await auth.getLoginState();
  // 1. 建议登录前检查当前是否已经登录
  if(!loginState){
    // 3. 登录 CloudBase
    await auth.customAuthProvider().signIn(ticket);
  }
}

export const signOut = async () => {
  const { auth } = initTcb()
  return await auth.signOut()
}

export const getCurrentUser = () => {
  const { auth } = initTcb()
  return auth.currentUser
}

export const hasLoginState = () => {
    const { auth } = initTcb()
    return auth.hasLoginState()
}

export const getAuthHeader = async () => {
  const { auth } = initTcb()
  return await auth.getAuthHeaderAsync()
}
