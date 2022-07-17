import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import {
  deleteBankingRequest,
  getBankingRequest,
  mutateUser,
  postBankingRequest,
} from '../services/user/user';
import { BankingInfo, Settings } from '../../types/settings';
import { useUser } from '../UserContext';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { errorToast } from '../helpers';

export const useSettings = () => {
  const [bankingInfo, setBankingInfo] = useState<BankingInfo | null>(null);
  const { user } = useUser().user;
  const getUser = async () => {
    return await Auth.currentAuthenticatedUser();
  };

  const [error, setError] = useState({
    error: false,
    message: '',
  });

  const [loading, setLoading] = useState({
    saving: false,
    account: false,
    banking: false,
  });

  const [settings, setSettings] = useState<Settings>({
    accountNumber: '',
    accountName: '',
    sortCode: '',
    newEmail: '',
    currentEmail: '',
    verifyCode: '',
    verifyStep: 1,
  });

  /*A function that makes it easier to update an object key within the loading state*/

  const updateLoading = (key: keyof typeof loading, value: boolean) => {
    setLoading({
      ...loading,
      [key]: value,
    });
  };

  /* A function that makes it easier to update the settings state */

  const updateSettings = (
    key: keyof typeof settings,
    value: string | number
  ) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  /*This is an error handler function
   * to update the error message and display based on boolean*/

  const errorHandle = (error: boolean, message: string) => {
    setError({
      error: error,
      message: message,
    });
    setTimeout(() => {
      setError({
        error: false,
        message: '',
      });
    }, 3000);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSettings({ ...settings, [event.target.name]: event.target.value });
  };

  const deleteBankingInfo = () => {
    updateLoading('banking', true);
    deleteBankingRequest(user.attributes.sub)
      .then(() => {
        setBankingInfo(null);
      })
      .catch((err) => {
        toast(err.message, errorToast);
      })
      .finally(() => {
        updateLoading('banking', false);
      });
  };

  const bankingInfoHandler = (e: FormEvent) => {
    e.preventDefault();
    updateLoading('saving', true);
    postBankingRequest({
      user_subid: user.attributes.sub,
      account_number: settings.accountNumber,
      sort_code: settings.sortCode,
    })
      .then(() => {
        setSettings({
          ...settings,
          accountNumber: '',
          sortCode: '',
        });
        setBankingInfo({
          account_number: settings.accountNumber,
          sort_code: settings.sortCode,
        });
      })
      .catch((err) => {
        toast(err.message, errorToast);
      })
      .finally(() => {
        updateLoading('saving', false);
      });
  };

  const getBankingInfo = () => {
    return getBankingRequest(user.attributes.sub);
  };

  const changeUserEmail = async (e?: FormEvent<SubmitEvent>) => {
    e?.preventDefault();
    updateLoading('account', true);
    const user = await getUser();
    await Auth.updateUserAttributes(user, {
      email: settings.newEmail,
    })
      .then(() => {
        updateSettings('verifyStep', 2);
      })
      .catch((err) => {
        errorHandle(true, err.message);
      })
      .finally(() => {
        updateLoading('account', false);
      });
  };

  const confirmCode = async () => {
    const user = await getUser();
    updateLoading('account', true);
    await Auth.verifyUserAttributeSubmit(user, 'email', settings.verifyCode)
      .then(async () => {
        setSettings({
          ...settings,
          verifyStep: 3,
          newEmail: '',
          currentEmail: '',
        });
        await mutateUser({
          sub_id: user.attributes.sub,
          field: 'email',
          value: settings.newEmail,
        });
      })
      .catch((err) => {
        errorHandle(true, err.message);
      })
      .finally(() => {
        updateLoading('account', false);
      });
  };

  /*If user is on the last step of the form
   * a timer will clear and reset the form */

  useEffect(() => {
    let stepTime: NodeJS.Timeout;
    if (settings.verifyStep === 3) {
      stepTime = setTimeout(() => {
        updateSettings('verifyStep', 1);
      }, 3000);
    }
    return () => {
      clearTimeout(stepTime);
    };
  }, [settings.verifyStep]);

  return {
    settings,
    loading,
    handleInputChange,
    getBankingInfo,
    setBankingInfo,
    deleteBankingInfo,
    bankingInfo,
    updateSettings,
    bankingInfoHandler,
    changeUserEmail,
    confirmCode,
    error,
  };
};

export const useFetchBankingInfo = (
  bankingInfo?: BankingInfo | null,
  setBankingInfo?: (bankingInfo: BankingInfo) => void
) => {
  const { getBankingInfo } = useSettings();
  const { data, isLoading } = useQuery<BankingInfo>(
    'bankingInfo',
    () => getBankingInfo(),
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      if (setBankingInfo) {
        setBankingInfo(data);
      }
    }
  }, [data]);
  return { bankingInfo, isLoading, data };
};
