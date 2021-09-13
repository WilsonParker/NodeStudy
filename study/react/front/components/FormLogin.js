import React, {useState, useCallback, useMemo} from 'react';
import {Button, Form, Input} from "antd";
import Link from 'next/link';
import styled from 'styled-components';
import InputHook from '../hooks/InputHook';

const ButtonWrapper = styled.div`
    marginTop :10px
`;

const FormLogin = ({setAuth}) => {
    const [id, onChangeID] = InputHook('');
    const [password, onChangePassword] = InputHook('');

    const OnSubmitForm = useCallback(() => {
        console.log(id, password);
        setAuth(true);
    }, []);

    return (
        <Form onFinish={OnSubmitForm}>
            <div>
                <label htmlFor="id">ID</label><br/>
                <Input name="id" value={id} onChange={onChangeID} required/>
            </div>
            <div>
                <label htmlFor="password">Password</label><br/>
                <Input name="password" type="password" value={password} onChange={onChangePassword} required/>
            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={false}>Login</Button>
                <Link href="/signup"><Button>SignUp</Button></Link>
            </ButtonWrapper>
        </Form>
    )
}

export default FormLogin;