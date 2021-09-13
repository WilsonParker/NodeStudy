import React, {useCallback} from 'react'
import AppLayout from '../components/AppLayout';
import InputHook from '../hooks/InputHook';
import Head from 'next/head';
import styled from 'styled-components';

const ErrorMessage = styled.div`
    color:red;
`;

const SignUp = () => {
    const [id, onChangeID] = InputHook('');
    const [nickname, onChangeNickname] = InputHook('');
    const [password, onChangePassword] = InputHook('');

    const [passwordCheck, setPasswordCheck] = InputHook('');
    const [passwordError, setPasswordError] = InputHook(false);
    const onPasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    const [term, setTerm] = InputHook('');
    const [termError, setTermError] = InputHook(false);
    const onTermCheck = useCallback((e) => {
        setTerm(e.target.value);
        setTermError(e.target.value !== term);
    }, [term]);

    const OnSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
    }, [password, passwordCheck, term]);

    return (
        <AppLayout>
            <Head>
                <title>SignUp</title>
            </Head>
            <Form>

            </Form>
        </AppLayout>
    )
}

export default SignUp;