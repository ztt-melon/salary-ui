import React from "react"
import {Modal} from 'antd'
import Constants from './constants'

export default {
    //分页组件
    pagination(res, callback) {
        return {
            onChange: (current) => {
                callback(current)
            },
            current: res.data.realData.pageNum,
            pageSize: res.data.realData.pageSize,
            total: res.data.realData.totalCount,
            showTotal: () => {
                return `共${res.data.realData.totalCount}条`
            },
            showQuickJumper: true,
            hideOnSinglePage: true
        }
    },
    //消息提醒
    msg(content) {
        Modal.info({
            title: '信息',
            content: content,
            okText: '确定'
        })
    },
    //state异步转同步
    setStateAsync(pointer, state) {
        return new Promise((resolve) => {
            pointer.setState(state, resolve)
        });
    },
    //noform的label和组件大小
    setFormLayout(label, control) {
        return {label, control}
    },
    //noform的3列布局和4列布局
    getFormLayoutProps(column) {
        let ColProps, FormItemProps
        if (column === 2) {
            ColProps = {
                className: 'gutter-row',
                span: 12
            }
            FormItemProps = {
                defaultMinWidth: false,
                layout: {label: 7, control: 17}
            }
        } else if (column === 3) {
            ColProps = {
                className: 'gutter-row',
                span: 8
            }
            FormItemProps = {
                defaultMinWidth: false,
                layout: {label: 7, control: 17}
            }
        } else if (column === 4) {
            ColProps = {
                className: 'gutter-row',
                span: 6
            }
            FormItemProps = {
                defaultMinWidth: false,
                layout: {label: 12, control: 12}
            }
        }
        return {ColProps, FormItemProps}
    },
    //repeater的组件属性
    getReaterProps(width = 100) {
        return {
            defaultMinWidth: false,
            style: {width}
        }
    },
    //table组件的选择项
    setSelectedItem(selectedRowKeys, selectedItem) {
        this.setState({selectedRowKeys, selectedItem})
    },
    //查询参数
    setSearchParam(searchParam, callback) {
        this.setState({searchParam}, () => {
            callback()
        })
    },
    //查询条件的日期处理
    getYearMonth_string(yearmonth_arr) {
        let yearmonth_string = []
        yearmonth_arr.map((item) => {
            yearmonth_string.push(item.format(Constants.monthFormat))
        })
        return yearmonth_string.join(",")
    }
}