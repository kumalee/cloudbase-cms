const subdomain = process.env.NEXT_PUBLIC_ENV;
const host = `https://${subdomain}.service.tcloudbase.com`;
export default {
    login: `${host}/tcb-ext-cms-auth/login`
}