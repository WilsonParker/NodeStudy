import React, {useState, useCallback, useMemo} from 'react';
import {Card, Avatar, Button} from "antd";

const UserProfile = ({setAuth}) => {
    const OnLogOut = useCallback(() => {
        setAuth(false);
    }, []);
    return (
        <Card
            actions={[
                <div key="instagram">instargram <br/> -</div>,
                <div key="following">following <br/> -</div>,
                <div key="follower">follower <br/> -</div>,
            ]}>
            <Card.Meta
                avater={<Avatar>dev</Avatar>}
                title="dev9163"
            />
            <Button onClick={OnLogOut}>LogOut</Button>
        </Card>
    )
}

export default UserProfile;