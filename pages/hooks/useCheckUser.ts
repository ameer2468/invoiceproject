import {Auth} from "aws-amplify";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

interface props {
    pageProps?: any
}

export const useCheckUser = ({pageProps}: props) => {

    const [user, setUser] = useState<any>({type: 'unauthenticated'});
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const checkUser = async () => {
        await Auth.currentAuthenticatedUser()
            .then(user => {
                setUser({...user, type: 'authenticated'});
                setIsLoading(false);
                if (!isLoading) {
                    if (pageProps.protected && user.type === 'unauthenticated') {
                        router.push('/login');
                    }
                }
            })
            .catch(() => {
                setUser({type: 'unauthenticated'});
                setIsLoading(false);
                if (!isLoading) {
                    if (pageProps.protected && user.type === 'unauthenticated') {
                        router.push('/login');
                    }
                }
            });
    }

    useEffect(() => {
        checkUser();
    }, [user.type, isLoading]);

    return {user, isLoading, setUser};
}
