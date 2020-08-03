import { useState, useEffect } from "react";
import axios from 'axios';
import endpoints from './endpoints';
// import useSWR, { mutate } from 'swr'

export function useAccountLogin(auth, params) {
    const [result, setResult] = useState();
    useEffect(() => {
        async function login() {
            const ticketRes = await axios.post(endpoints.login, {
                userName: params.userName,
                password: params.password
            });
            const res = await auth.signInWithTicket(ticketRes.data.ticket);
            setResult(res);
            console.log('result', res);
        }
        login();
    }, [params]);
    return result;
}
