import React, { useEffect } from 'react';
import Page from '../../../src/components/global/Page';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Input from '../../../src/components/global/Input';
import {
  useFetchBankingInfo,
  useSettings,
} from '../../../src/hooks/useSettings';
import Loading from '../../../src/components/global/loading';
import { useForgot } from '../../../src/hooks/useForgot';
import { button } from 'aws-amplify';

const Settings = () => {
  const {
    settings,
    handleInputChange,
    changeUserEmail,
    bankingInfo,
    setBankingInfo,
    confirmCode,
    updateSettings,
    loading,
    error,
    deleteBankingInfo,
    bankingInfoHandler,
  } = useSettings();
  const {
    forgotForm,
    forgotLoading,
    step,
    formError,
    confirmHandler,
    inputHandler,
    forgotHandler,
  } = useForgot();
  const { isLoading } = useFetchBankingInfo(bankingInfo, setBankingInfo);
  const currentEmailLength = settings.currentEmail.length;
  const newEmailLength = settings.newEmail.length;
  const accountLength = settings.accountNumber.toString().length;
  const sortCodeLength = settings.sortCode.toString().length;
  const formLength = {
    ...forgotForm,
  };
  const disabled = loading.saving || accountLength < 13 || sortCodeLength < 6;
  const bankingInfoLength = bankingInfo && Object.keys(bankingInfo).length;

  const emailSubmitHandler = () => {
    if (settings.verifyStep === 1) {
      changeUserEmail();
    } else {
      confirmCode();
    }
  };

  /*UseEffect to prevent users from inputting a
 length that exceeds the length for banking info
   */

  useEffect(() => {
    if (accountLength > 13) {
      updateSettings('accountNumber', settings.accountNumber.slice(0, 13));
    }
    if (sortCodeLength > 6) {
      updateSettings('sortCode', settings.sortCode.slice(0, 6));
    }
  }, [settings.accountNumber, settings.sortCode]);

  return (
    <Page pageName={'settings'}>
      <h1>Settings</h1>
      <div className="content">
        <div className="box info">
          <h2>Info</h2>
          <h3>Banking</h3>
          {isLoading ? (
            <Loading style="PulseLoader" />
          ) : (
            !bankingInfo && (
              <form onSubmit={bankingInfoHandler}>
                <Input
                  type="number"
                  placeholder={'Account number'}
                  value={settings.accountNumber}
                  name={'accountNumber'}
                  required={true}
                  onChange={handleInputChange}
                />
                <Input
                  type="number"
                  placeholder={'Sort code'}
                  value={settings.sortCode}
                  name={'sortCode'}
                  required={true}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  disabled={disabled}
                  className={`button ${disabled ? 'disabledButton' : ''}`}
                >
                  {loading.saving ? <Loading style={'PulseLoader'} /> : 'Save'}
                </button>
              </form>
            )
          )}
          <div className="account-details">
            {isLoading
              ? ''
              : bankingInfo && (
                  <>
                    <p>Account number: {bankingInfo.account_number}</p>
                    <p>Sort code: {bankingInfo.sort_code}</p>
                  </>
                )}
            {bankingInfoLength! > 0 && !isLoading && (
              <button
                disabled={loading.banking}
                onClick={deleteBankingInfo}
                className={`button ${loading.banking && 'disabledButton'}`}
              >
                {loading.banking ? <Loading style="PulseLoader" /> : 'Delete'}
              </button>
            )}
          </div>
        </div>
        <div className="box email">
          <h2>Account</h2>
          {settings.verifyStep === 3 ? '' : <h3>Email change</h3>}
          <>
            <form onSubmit={emailSubmitHandler}>
              {settings.verifyStep === 1 ? (
                <>
                  <Input
                    placeholder={'Current email'}
                    value={settings.currentEmail}
                    name={'currentEmail'}
                    required={true}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={'New email'}
                    value={settings.newEmail}
                    required={true}
                    name={'newEmail'}
                    onChange={handleInputChange}
                  />
                </>
              ) : settings.verifyStep === 2 ? (
                <>
                  <Input
                    placeholder={'Verification code'}
                    value={settings.verifyCode}
                    required={true}
                    name={'verifyCode'}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                settings.verifyStep === 3 && (
                  <h2
                    style={{
                      marginTop: '10rem',
                    }}
                  >
                    Email changed successfully
                  </h2>
                )
              )}
              {error.error && <p className="form-error">{error.message}</p>}
              {settings.verifyStep === 1 || settings.verifyStep === 2 ? (
                <button
                  disabled={
                    loading.account ||
                    newEmailLength < 5 ||
                    currentEmailLength < 5
                  }
                  className={`${
                    newEmailLength < 5 || currentEmailLength < 5
                      ? 'button disabledButton'
                      : 'button'
                  }`}
                >
                  {loading.account ? (
                    <Loading style={'PulseLoader'} />
                  ) : (
                    'Confirm'
                  )}
                </button>
              ) : (
                ''
              )}
            </form>
          </>
          <h3 style={{ marginTop: '5rem' }}>Password change</h3>
          {step === 0 ? (
            <>
              <form onSubmit={forgotHandler}>
                <Input
                  placeholder={'Email'}
                  value={forgotForm.email}
                  name={'email'}
                  required={true}
                  onChange={inputHandler}
                />
                {formError.length > 0 ? (
                  <p className="form-error">{formError}</p>
                ) : null}
                <button
                  className={
                    forgotForm.email.length < 5 &&
                    forgotForm.password.length < 6
                      ? 'button disabledButton'
                      : 'button'
                  }
                  disabled={forgotLoading}
                >
                  {forgotLoading ? (
                    <Loading style={'PulseLoader'} />
                  ) : (
                    'Confirm'
                  )}
                </button>
              </form>
            </>
          ) : step === 1 ? (
            <form onSubmit={confirmHandler}>
              <input
                autoComplete="off"
                required={true}
                onChange={inputHandler}
                name="password"
                value={formLength.password}
                placeholder="New password"
                type="password"
              />
              <input
                autoComplete="off"
                required={true}
                onChange={inputHandler}
                name="code"
                value={formLength.code}
                maxLength={6}
                placeholder="Confirmation code"
                type="text"
              />
              {formError.length > 0 ? (
                <p className="form-error">{formError}</p>
              ) : null}
              <button
                className={
                  forgotForm.code.length !== 6
                    ? 'button disabledButton'
                    : 'button'
                }
                disabled={
                  forgotForm.email.length < 5 ||
                  forgotLoading ||
                  forgotForm.code.length !== 6
                }
              >
                {forgotLoading ? <Loading style={'PulseLoader'} /> : 'Confirm'}
              </button>
            </form>
          ) : (
            <h2
              style={{
                marginTop: '3rem',
              }}
            >
              Password changed successfully
            </h2>
          )}
        </div>
      </div>
    </Page>
  );
};

export default Settings;
Settings.Layout = DashboardLayout;

export async function getStaticProps(context: any) {
  return {
    props: {
      protected: true,
    },
  };
}
