import "../styles/stylesheet.css";
import type { AppProps } from "next/app";
import awsconfig from "../src/aws-exports";
import Amplify, { Auth } from "aws-amplify";
import React from "react";
import { UserContext } from "../src/UserContext";
import Loading from "../src/components/global/loading";
import { useCheckUser } from "../src/hooks/useCheckUser";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalManager from "../src/components/modals/ModalManager";
import { ModalContext } from "../src/ModalContext";
import { useModal } from "../src/ModalContext";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);
// Create a client
const queryClient = new QueryClient();

type props = AppProps & {
  Component: any;
  pageProps: any;
};

function MyApp({ Component, pageProps }: props) {
  const { user, isLoading, setUser } = useCheckUser({ pageProps });
  const DashboardLayout = Component.Layout ? Component.Layout : React.Fragment;
  const { modalId, setModalId } = useModal();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ modalId, setModalId }}>
        <UserContext.Provider value={[user, setUser]}>
          <ToastContainer />
          <ModalManager />
          {isLoading ? (
            <div className={"absoluteCenter"}>
              <Loading style={"PulseLoader"} color={"white"} />
            </div>
          ) : (
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          )}
        </UserContext.Provider>
      </ModalContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
