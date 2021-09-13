import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import {Menu, Input, Row, Col} from 'antd';
import styled from 'styled-components';
import FormLogin from '../components/FormLogin';
import UserProfile from '../components/UserProfile';

const InputSearch = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout = ({children}) => {
    const [isAuth, setAuth] = useState(false);

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/">React Study</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item>
                    <InputSearch enterButton/>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup">SignUp</Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isAuth ? <UserProfile setAuth={setAuth}/> : <FormLogin setAuth={setAuth}/>}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    Made By dev9163
                </Col>
            </Row>
        </div>
    )
}

AppLayout.propType = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;