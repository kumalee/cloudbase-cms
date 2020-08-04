import axios from 'axios'
import tcb from 'tcb-js-sdk'
import endpoints from './endpoints'

const initTcb = () => {
    const app = tcb.init({
        env: process.env.NEXT_PUBLIC_ENV
    })
    const auth = app.auth({
        persistence: 'local'
    })
    return {
        app,
        auth,
    }
}

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