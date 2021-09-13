import React, {useState, useCallback, useMemo} from 'react';
import {Button, Card, Form, Input, List} from "antd";
import PropTypes from 'prop-types';
import { StopOutlined} from '@ant-design/icons'

const ListFollow = ({header, data}) => {
    const style = useMemo(() => ({
        marginBottom: '20px',
        border: '1px solid #d9d9d9',
        padding: '5px',
    }));

    return (
        <List
            style={style}
            grid={{gutter: 4, xs: 2, md: 3}}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div style={{textAlign: 'center', margin: '10px 0'}}><Button>More</Button></div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={{marginTop: 20}}>
                    <Card actions={[<StopOutlined key="stop"/>]}>
                        <Card.Meta description={item.nickname}/>
                    </Card>
                </List.Item>
            )}
        />
    );
};

ListFollow.propTypes= {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
}

export default ListFollow;