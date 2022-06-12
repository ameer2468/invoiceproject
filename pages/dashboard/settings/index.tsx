import React from 'react';
import Page from "../../../src/components/global/Page";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Input from '../../../src/components/global/Input';
import {useSettings} from "../../../src/hooks/useSettings";
import Loading from "../../../src/components/global/loading";

const Settings = () => {

    const {
        settings,
        handleInputChange,
        changeUserEmail,
        loading
    }
        = useSettings();

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
                    <h3>Email change</h3>
                    {settings.verifyStep === 1 ?
                        <>
                            <Input
                                placeholder={'Current email'}
                                value={settings.newEmail}
                                name={'newEmail'}
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
                        <>
                            <Input
                                placeholder={'Verification code'}
                                value={settings.verifyCode}
                                required={true}
                                name={'verifyCode'}
                                onChange={handleInputChange}
                            />
                        </>
                    }

                    <button
                        onClick={changeUserEmail}
                        className="button">
                        {loading.account ?
                            <Loading style={"PulseLoader"} />
                            :
                            'Save'}
                    </button>
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
