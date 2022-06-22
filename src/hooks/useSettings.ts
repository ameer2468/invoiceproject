import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { mutateUser, postBankingRequest } from "../services/user/user";
import { Settings } from "../../types/settings";
import { useUser } from "../UserContext";

export const useSettings = () => {
  const { user } = useUser();
  const getUser = async () => {
    return await Auth.currentAuthenticatedUser();
  };

  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const [loading, setLoading] = useState({
    saving: false,
    account: false,
  });

  const [settings, setSettings] = useState<Settings>({
    accountNumber: "",
    accountName: "",
    sortCode: "",
    newEmail: "",
    currentEmail: "",
    verifyCode: "",
    verifyStep: 1,
  });

  const updateLoading = (key: keyof typeof loading, value: boolean) => {
    setLoading({
      ...loading,
      [key]: value,
    });
  };

  const updateSettings = (key: keyof typeof settings, value: string | number) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const errorHandle = (error: boolean, message: string) => {
    setError({
      error: error,
      message: message,
    });
    setTimeout(() => {
      setError({
        error: false,
        message: "",
      });
    }, 3000);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSettings({ ...settings, [event.target.name]: event.target.value });
  };

  const bankingInfoHandler = (e: FormEvent) => {
    e.preventDefault();
    updateLoading("saving", true);
    postBankingRequest({
      user_subid: user[0].attributes.sub,
      account_number: settings.accountNumber,
      sort_code: settings.sortCode,
    })
      .then(() => {
        setSettings({
          ...settings,
          accountNumber: "",
          sortCode: "",
        });
      })
      .catch((err) => {})
      .finally(() => {
        updateLoading("saving", false);
      });
  };

  const changeUserEmail = async (e?: FormEvent<SubmitEvent>) => {
    e?.preventDefault();
    updateLoading("account", true);
    const user = await getUser();
    await Auth.updateUserAttributes(user, {
      email: settings.newEmail,
    })
      .then(() => {
        updateLoading("account", false);
        updateSettings("verifyStep", 2);
      })
      .catch((err) => {
        errorHandle(true, err.message);
        updateLoading("account", false);
      });
  };

  const confirmCode = async () => {
    const user = await getUser();
    updateLoading("account", true);
    await Auth.verifyUserAttributeSubmit(user, "email", settings.verifyCode)
      .then(async () => {
        setSettings({ ...settings, verifyStep: 3, newEmail: "", currentEmail: "" });
        await mutateUser({
          sub_id: user.attributes.sub,
          field: "email",
          value: settings.newEmail,
        });
        updateLoading("account", false);
      })
      .catch((err) => {
        errorHandle(true, err.message);
        updateLoading("account", false);
      });
  };

  useEffect(() => {
    let stepTime: NodeJS.Timeout;
    if (settings.verifyStep === 3) {
      stepTime = setTimeout(() => {
        updateSettings("verifyStep", 1);
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

    bankingInfoHandler,
    changeUserEmail,
    confirmCode,
    error,
  };
};
