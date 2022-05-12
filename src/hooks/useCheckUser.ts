import {Auth} from "aws-amplify";
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";

interface props {
    pageProps?: any
}

export const useCheckUser = ({pageProps}: props) => {

    const [user, setUser] = useState<any>({type: null});
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const pageProtected = pageProps.protected;

    const checkUser = useCallback(async () => {
        try {
            const userInfo = await Auth.currentAuthenticatedUser();
            setUser({...userInfo, type: 'authenticated'});
            if (router.pathname === '/login' || router.pathname === '/register') {
                router.push('/dashboard/overview').then(() => {
                    setIsLoading(false);
                });
            } else {
                setIsLoading(false);
            }
        } catch (e) {
            setUser({type: 'unauthenticated'});
            if (pageProtected) {
                router.push('/login').then(() => {
                    setIsLoading(false);
                });
            } else {
                setIsLoading(false);
            }
        }
    }, [pageProtected, router]);

    useEffect(() => {
        checkUser();
    }, [user.type, isLoading, checkUser]);

    return {user, isLoading, setUser};
}
