import React, { useState } from 'react';
import {Auth} from "aws-amplify";

export const useUser = () => {
  const [user, setUser] = useState<string | Object | null>('');
  const [userLoading, setUserLoading] = useState(false);

  React.useEffect(() => {
    setUserLoading(true);
    const userCheck = async () => {
     await Auth.currentAuthenticatedUser()
          .then(user => {
            setUser(user)
            setUserLoading(false);
          })
          .catch(() => {
            setUser(null);
            setUserLoading(false);
          });
    }
   userCheck();
  }, []);

  return { user, userLoading };
};
