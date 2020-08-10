import tcb from 'tcb-js-sdk'

let app, auth, db, uploadFile, callFunction;

export const initTcb = () => {
    if (app && auth && db && uploadFile && callFunction) {
        return {
            app,
            auth,
            db,
            uploadFile,
            callFunction
        }
    }
    app = tcb.init({
        env: process.env.NEXT_PUBLIC_ENV
    })
    auth = app.auth({
        persistence: 'local'
    })
    db = app.database()
    uploadFile = app.uploadFile
    callFunction = app.callFunction
    return {
        app,
        auth,
        db,
        uploadFile,
        callFunction,
    }
}
