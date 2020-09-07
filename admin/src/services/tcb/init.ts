import tcb from 'tcb-js-sdk'

let app, auth;

export const initTcb = () => {
    if (app && auth) {
        return {
            app,
            auth,
        }
    }
    app = tcb.init({
        env: TCB_ENV
    })
    auth = app.auth({
        persistence: 'local'
    })
    return {
        app,
        auth,
    }
}
