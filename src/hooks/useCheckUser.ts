import { Auth } from 'aws-amplify';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface props {
  pageProps?: any;
}

/*A hook that checks if the user is logged in or not
 * We redirect the user if they are logged in, otherwise
 * redirect to relevant page*/

export const useCheckUser = ({ pageProps }: props) => {
  const [user, setUser] = useState<any>({ type: 'unauthenticated' });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pageProtected = pageProps.protected;
  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const checkUser = useCallback(async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      setUser({
        ...userInfo,
        attributes: {
          ...userInfo.attributes,
          ['custom:firstname']: capitalize(
            userInfo.attributes['custom:firstname']
          ),
        },
        type: 'authenticated',
      });
      if (router.pathname === '/login' || router.pathname === '/register') {
        router.push('/dashboard/overview').then(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setUser({ type: 'unauthenticated' });
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
  }, [user?.type, isLoading, checkUser]);

  return { user, isLoading, setUser };
};
