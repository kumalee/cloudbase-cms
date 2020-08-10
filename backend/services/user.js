import axios from 'axios'
import { initTcb } from './init'
import endpoints from './endpoints'

export const getAuthTicket = async (values) => {
    const ticketRes = await axios.post(endpoints.login, {
        userName: values.userName,
        password: values.password
    });
    return ticketRes;
}

export const signIn = async (ticket) => {
    const { auth } = initTcb();
    const res = await auth.signInWithTicket(ticket);
}

export const signOut = async () => {
    const { auth } = initTcb();
    return await auth.signOut();
}

export const getCurrentUser = () => {
    const { auth } = initTcb();
    return auth.currentUser;
}

export const hasLoginState = () => {
    const { auth } = initTcb();
    return auth.hasLoginState();
}