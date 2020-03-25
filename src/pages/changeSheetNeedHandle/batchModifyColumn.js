import React from 'react'
import {Constants} from '../../util'
//批量修改的显示列表
export default [{
    title: '类别',
    dataIndex: 'tName',
    key: 'tName',
    render: (text) => {
        if (text === 'sal_np') {
            return '內聘'
        } else if (text === 'sal_ltx') {
            return '退休'
        } else {
            return '离休'
        }
    }
}, {
    title: '文件名称',
    dataIndex: 'fileName',
    key: 'fileName',
    render: (text, record) => {
        let href = Constants.baseURL + '/changeSheetFile/salaryFile?id=' + record.id
        return <a href={href}>{text}</a>
    }
}, {
    title: '备注',
    dataIndex: 'comment',
    key: 'comment'
}, {
    title: '操作时间',
    dataIndex: 'operateTime',
    key: 'operateTime'
}]