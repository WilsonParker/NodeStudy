import React from 'react'
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import FormNickname from '../components/FormNickname';
import ListFollow from '../components/ListFollow';

const Profile = () => {
    const followingList = [
        {nickname : 'dev9163'},
        {nickname : 'dev9163'},
        {nickname : 'dev9163'},
    ];
    const followerList = [
        {nickname : 'dev9163'},
        {nickname : 'dev9163'},
        {nickname : 'dev9163'},
    ];

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <AppLayout>
                <FormNickname/>
                <ListFollow header="Following List" data={followingList}/>
                <ListFollow header="Follower List" data={followerList}/>
            </AppLayout>
        </>
    )
}

export default Profile;