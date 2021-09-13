import React, {useState, useCallback, useMemo} from 'react';
import {Form, Input} from "antd";

const FormNickname = () => {
    const style = useMemo(() => ({
        marginBottom: '20px',
        border: '1px solid #d9d9d9',
        padding: '5px',
    }));

    return (
        <Form style={style}>
            <Input.Search addonBefore="NickName" enterButton="Edit"/>
        </Form>
    )
}

export default FormNickname;