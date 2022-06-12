import React from 'react';
import Page from "../../../src/components/global/Page";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Input from '../../../src/components/global/Input';
import {useSettings} from "../../../src/hooks/useSettings";
import Loading from "../../../src/components/global/loading";
import {useForgot} from "../../../src/hooks/useForgot";

const Settings = () => {

    const {
        settings,
        handleInputChange,
        changeUserEmail,
        confirmCode,
        loading,
        error
    }
        = useSettings();
    const {
        forgotForm,
        forgotLoading,
        step,
        formError,
        confirmHandler,
        inputHandler,
        forgotHandler
    } = useForgot();
    const currentEmailLength = settings.currentEmail.length;
    const newEmailLength = settings.newEmail.length;
    const formLength = {
        ...forgotForm
    };

    return (
        <Page pageName={'settings'}>
            <h1>Settings</h1>
            <div className="content">
                <div className="box info">
                    <h2>Info</h2>
                    <h3>Banking</h3>
                    <Input
                        placeholder={'Account number'}
                        value={settings.accountNumber}
                        name={'accountNumber'}
                        required={true}
                        onChange={handleInputChange}
                        />
                    <Input
                        placeholder={'Sort code'}
                        value={settings.sortCode}
                        name={'sortCode'}
                        required={true}
                        onChange={handleInputChange}
                    />
                    <button className="button">Save</button>
                </div>
                <div className="box email">
                    <h2>Account</h2>
                    {settings.verifyStep === 3 ? '' : <h3>Email change</h3>}
                    {settings.verifyStep === 1 ?
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
                        :
                        settings.verifyStep === 2 ?
                            <>
                                <Input
                                    placeholder={'Verification code'}
                                    value={settings.verifyCode}
                                    required={true}
                                    name={'verifyCode'}
                                    onChange={handleInputChange}
                                />
                            </>
                            :
                        settings.verifyStep === 3 &&
                            <h2 style={{marginTop: '10rem'}}>Email changed successfully</h2>
                    }
                    {error.error &&
                    <p className="form-error">
                        {error.message}
                    </p>}
                    {settings.verifyStep === 1 || settings.verifyStep === 2 ?
                    <button
                        disabled={
                            loading.account
                            ||
                            newEmailLength < 5
                            ||
                             currentEmailLength < 5
                        }
                        onClick={async () => {
                            if (settings.verifyStep === 1) {
                                await changeUserEmail();
                            } else {
                                await confirmCode();
                            }
                        }}
                        className={`${newEmailLength < 5 || currentEmailLength < 5 ? 'button disabledButton' : 'button'}`}>
                        {loading.account ?
                            <Loading style={"PulseLoader"} />
                            :
                            'Confirm'}
                    </button> : ''}
                    <h3 style={{marginTop: '5rem'}}>Password change</h3>
                    {step === 0 ?
                    <>
                        <form onSubmit={forgotHandler}>
                            <Input
                                placeholder={'Email'}
                                value={forgotForm.email}
                                name={'email'}
                                required={true}
                                onChange={inputHandler}
                            />
                            {formError.length > 0 ? <p className="form-error">{formError}</p> : null}
                            <button
                                className={forgotForm.email.length < 5 && forgotForm.password.length < 6 ? 'button disabledButton' : 'button'}
                                disabled={forgotLoading}
                            >
                                {forgotLoading ? <Loading style={"PulseLoader"}/> : 'Confirm'}
                            </button>
                        </form>
                    </>
                        : step === 1 ?
                            <form onSubmit={confirmHandler}>
                                <input
                                    autoComplete="off"
                                    required={true}
                                    onChange={inputHandler}
                                    name="password"
                                    value={formLength.password}
                                    placeholder="New password"
                                    type="password"/>
                                <input
                                    autoComplete="off"
                                    required={true}
                                    onChange={inputHandler}
                                    name="code"
                                    value={formLength.code}
                                    maxLength={6}
                                    placeholder="Confirmation code"
                                    type="text"/>
                                {formError.length > 0 ? <p className="form-error">{formError}</p> : null}
                                <button
                                    className={forgotForm.code.length !== 6 ? 'button disabledButton' : 'button'}
                                    disabled={forgotLoading || forgotForm.code.length !== 6 }
                                >
                                    {forgotLoading ? <Loading style={"PulseLoader"}/> : 'Confirm'}
                                </button>
                            </form>
                            :
                            <h2 style={{marginTop: "3rem"}}>Password changed successfully</h2>
                    }
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
        }
    }
}
