import React from 'react'
import {message, Table} from 'antd'
import {Dialog} from 'nowrapper/lib/antd'
import {ajax, Constants} from '../../util'

const {EDIT, DETAIL} = Constants

const MyTable = (props) => {
    const state = props.state
    const click = (record) => {
        return {
            onClick: () => {
                props.setSelectedItem([record.id], record)
            },
            onDoubleClick: () => {
                if(record.processStatus==='已完成审批'){
                    message.warning("该变动单已完成审批，不能编辑了！")
                    return
                }
                let pathname = window.location.pathname.replace(Constants.projectName,"")
                if (pathname === '/changeSheetNeedHandle') return
                const info = props.info
                //对话框需要的参数
                let tmp_title='详情-'
                let tmp = DETAIL
                let userName = sessionStorage.getItem("userName")
                if ('李燕妮' === userName || '沈亚超' === userName || 'admin' === userName) {
                    tmp_title='编辑-'
                    tmp = EDIT
                }
                let params = {
                    type: tmp,
                    selectedItem: record || {}
                }
                Dialog.show({
                    locale: 'zh',
                    enableValidate: true,
                    width: props.width || 416,
                    title: tmp_title + info.title,
                    content: <info.form params={params}/>,
                    onOk: (values, hide) => {
                        //将日期数据取出
                        if (values.yearmonthString) {
                            values.yearmonthString = values.yearmonthString._i
                        }
                        ajax.post(info.saveOrUpdate, values, props.callback)
                        hide()
                    }
                })
            }
        }
    }
    return <Table
        columns={props.columns}
        dataSource={state.dataSource || state.data}
        pagination={state.pagination}
        rowSelection={{
            selectedRowKeys: state.selectedRowKeys,
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                props.setSelectedItem(selectedRowKeys, selectedRows[0])
            }
        }}
        loading={state.loading}
        onRow={click}
    />
}

export default MyTable