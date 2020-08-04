import { useEffect } from "react"
import { useRouter } from "next/router";
import { signOut } from "../services";

export default function Logout() {
    const route = useRouter();
    useEffect(() => {
        async function exit() {
            await signOut();
            route.push('/login');
        }
        exit();
    }, []);
    return (
        <div>登出</div>
    )
}
