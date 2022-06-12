import {ChangeEvent, useState} from "react";
import {Auth} from "aws-amplify";

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

    const updateLoading = (key: string, value: boolean) => {
        setLoading({
            ...loading,
            [key]: value,
        });
    }

    const updateSettings = (name: string, value: string | number) => {
        setSettings({
            ...settings,
            [name]: value,
        });
    }

        const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
           updateSettings(event.target.name, event.target.value);
        }

        const confirmCode = async () => {
         updateLoading('account', true);
        const user = await getUser();
        return await Auth.verifyUserAttributeSubmit(user, 'email', settings.newEmail).then(() => {
            updateLoading('account', false);
        })
        }

        const changeUserEmail = async () => {
            updateLoading('account', true);
            const user = await getUser();
            return await Auth.updateUserAttributes(user, {
                'email': settings.newEmail,
            }).then(() => {
                updateLoading('account', false);
                updateSettings('newEmail', '');
                updateSettings('verifyStep', 2);
            })
        }


        return {
            settings,
            loading,
            handleInputChange,
            changeUserEmail,
            confirmCode
        }
}
