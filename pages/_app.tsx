import '../styles/stylesheet.css'
import type { AppProps } from 'next/app'
import awsconfig from '../src/aws-exports';
import Amplify, {Auth} from "aws-amplify";
import {useUser} from "./hooks/useUser";
import {useRouter} from "next/router";
import React, {useEffect} from "react";

Amplify.configure(awsconfig)
Auth.configure(awsconfig);
type props = AppProps & {
  Component: any,
  pageProps: any
}

function MyApp({ Component, pageProps }: props) {

  const DashboardLayout = Component.Layout ? Component.Layout : React.Fragment;
  const {user, userLoading} = useUser();
  const authRoutes = ['/dashboard/overview'];
  const router = useRouter();
  useEffect(() => {
    if (!userLoading) {
     if (user === null && authRoutes.includes(router.pathname)) {
       router.push('/login')
     }
    }
  }, [user])
  return (
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
  )
}

export default MyApp
