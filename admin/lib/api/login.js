import endpoints from './endpoints';
export async function accountLogin(params) {
    const res = await request(endpoints.login, {
        method: 'POST',
        data: {
        userName: params.userName,
        password: params.password
        }
    });
    console.log('res', res);
    const res2 = await auth.signInWithTicket(res.data.ticket);
    console.log('res2', res2);
    return res2;
}