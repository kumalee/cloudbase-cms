import tcb from 'tcb-js-sdk';
import endpoints from './endpoints';

const app = tcb({
    env: process.env.NEXT_PUBLIC_ENV
})
const auth = app.auth({
    persistence: 'local'
})

export async function accountLogin(params) {
    const res = await request(endpoints.login, {
        method: 'POST',
        data: {
            userName: params.userName,
            password: params.password
        }
    });
    const res2 = await auth.signInWithTicket(res.data.ticket);
    return res2;
}