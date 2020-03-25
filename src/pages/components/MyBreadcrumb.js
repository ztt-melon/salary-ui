import React from 'react'
import {Divider, Breadcrumb} from 'antd'

const MyBreadcrumb = (props) => {
    let list = (msg) => {
        const values = msg.split('/')
        return values.map((value) => <Breadcrumb.Item key={value}>{value}</Breadcrumb.Item>)
    }
    return <Divider orientation='left'>
        <Breadcrumb>{list(props.msg)}</Breadcrumb>
    </Divider>
}

export default MyBreadcrumb