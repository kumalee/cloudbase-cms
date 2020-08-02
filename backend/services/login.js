import React, { useState, useEffect } from "react";
import tcb from 'tcb-js-sdk';
import axios from 'axios';
import endpoints from './endpoints';
import useSWR, { mutate } from 'swr'

const useAuth = function(envId) {
    const [app, setApp] = useState();
    const [auth, setAuth] = useState();
    useEffect(() => {
        setApp(tcb.init({
            env: envId
        }));
        setAuth(app.auth({
            persistence: 'local'
        }));
    }, [envId]);
    return [app, auth];
}


export async function useAccountLogin(params) {
    const [ticket, setTicket] = useState();
    const [result, setResult] = useState();
    useEffect(async () => {
        const ticketRes = await axios.post(endpoints.login, {
            userName: params.userName,
            password: params.password
        });
        setTicket(ticketRes.data.ticket);
        const [app, auth] = useAuth(process.env.NEXT_PUBLIC_ENV);
        const res = await auth.signInWithTicket(ticket);
        setResult(res);
        console.log('result', res);    
    }, [params]);
    return result;
}
