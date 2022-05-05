import '../styles/stylesheet.css'
import type { AppProps } from 'next/app'
import awsconfig from '../src/aws-exports';
import Amplify, {Auth} from "aws-amplify";
import React from "react";
import {UserContext} from "../src/UserContext";
import Loading from "../src/components/global/loading";
import {useCheckUser} from "../src/hooks/useCheckUser";


Amplify.configure(awsconfig)
Auth.configure(awsconfig);
type props = AppProps & {
  Component: any,
  pageProps: any
}

function MyApp({ Component, pageProps }: props) {

  const {user, isLoading, setUser} = useCheckUser({pageProps});
  const DashboardLayout = Component.Layout ? Component.Layout : React.Fragment;

  return (
      <UserContext.Provider value={[user, setUser]}>
          {isLoading ? <div className={"absoluteCenter"}>
              <Loading color={"black"}/>
          </div>
              :
              <DashboardLayout>
                  <Component {...pageProps} />
              </DashboardLayout>
              }
      </UserContext.Provider>
  )
}

export default MyApp
