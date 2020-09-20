import cloudbase from '@cloudbase/js-sdk'

let app, auth;

export const initTcb = () => {
    if (app && auth) {
        return {
            app,
            auth,
        }
    }
    app = cloudbase.init({
        env: TCB_ENV,
        timeout: 30000
    })
    auth = app.auth({
        persistence: 'local'
    })
    return {
        app,
        auth,
    }
}
