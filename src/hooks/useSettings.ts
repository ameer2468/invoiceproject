import {ChangeEvent, useEffect, useState} from "react";
import {Auth} from "aws-amplify";
import {verify} from "crypto";

export const useSettings = () => {

    const getUser = async () => {
        return await Auth.currentAuthenticatedUser();
    }

    const [loading, setLoading] = useState({
        saving: false,
        account: false,
    });

    const [settings, setSettings] = useState({
        accountNumber: '',
        accountName: '',
        sortCode: '',
        newEmail: '',
        currentEmail: '',
        verifyCode: '',
        verifyStep: 1,
    })

    const updateLoading = (key: keyof typeof loading, value: boolean) => {
        setLoading({
            ...loading,
            [key]: value,
        });
    }

    const updateSettings = (key: keyof typeof settings, value: string | number) => {
        setSettings({
            ...settings,
            [key]: value,
        })
    }


        const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
           setSettings({...settings, [event.target.name]: event.target.value})
        }

        const changeUserEmail = async () => {
            updateLoading('account', true);
            const user = await getUser();
            await Auth.updateUserAttributes(user, {
                'email': settings.newEmail,
            }).then(() => {
                updateLoading('account', false);
                updateSettings('verifyStep', 2);
            }).catch(() => {
                updateLoading('account', false);
            })
        }

        const confirmCode = async () => {
            const user = await getUser();
            updateLoading('account', true);
            await Auth.verifyUserAttributeSubmit(user, 'email', settings.verifyCode).then(() => {
                setSettings({...settings,
                   verifyStep: 3,
                   newEmail: '',
                   currentEmail: ''
                })
                updateLoading('account', false);
            }).catch(() => {
                updateLoading('account', false);
            })
        }

        useEffect(() => {
            let stepTime: NodeJS.Timeout;
            if (settings.verifyStep === 3) {
                stepTime = setTimeout(() => {
                    updateSettings('verifyStep', 1)
                }, 3000)
            }
            return () => {
                clearTimeout(stepTime)
            }
        }, [settings.verifyStep])


        return {
            settings,
            loading,
            handleInputChange,
            changeUserEmail,
            confirmCode,
        }
}
