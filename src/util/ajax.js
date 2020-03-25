import {Modal, message} from 'antd'
import axios from 'axios'
import Constants from './constants'
import Functions from './functions'

const baseURL = Constants.baseURL
const modalTip = Constants.TIP_TYPE_MODAL

export default class Ajax {
    static post(uri, data, callback, tipType) {
        axios.post(baseURL + uri, data, callback)
            .then((res) => {
                if (res.data.flag) {
                    callback()
                    modalTip === tipType ? Modal.success({
                        title: '提示！',
                        content: '操作成功！'
                    }) : message.success('操作成功！')
                } else {
                    modalTip === tipType ? Modal.error({
                        title: '错误提示！',
                        content: res.data.msg
                    }) : message.error(res.data.msg)
                }
            })
            .catch((err) => {
                message.error('系统错误！')
            })
    }

    static get(uri, params = {}, pointer) {
        axios.get(baseURL + uri, {params})
            .then((res) => {
                const resData = res.data
                let _this = pointer
                if (params.pageNum) {
                    _this.setState({
                        dataSource: resData.realData.list.map((item, index) => {
                            item.key = item.id
                            return item
                        }),
                        pagination: Functions.pagination(res, (pageNum) => {
                            _this.state.pageNum = pageNum
                            _this.getList()
                        }),
                        loading: false
                    })
                }
                _this.setState({
                    data: resData.realData,
                    loading: false
                })
                //清空table的选中项
                _this.setState({selectedRowKeys: []}, () => {
                    _this.setState({selectedItem: undefined})
                })
            }).catch((err) => {
            message.error('系统错误！')
        })
    }

    static get_callback(uri, params = {}, callback, tipType) {
        axios.get(baseURL + uri, {params})
            .then((res) => {
                if (!res.data.flag) {
                    modalTip === tipType ? Modal.error({
                        title: '错误提示！',
                        content: res.data.msg
                    }) : message.error(res.data.msg)
                    return
                }
                callback(res.data.realData)
            })
    }

    static get_noCallBack(uri, params = {}, tipType) {
        axios.get(baseURL + uri, {params})
            .then((res) => {
                if (!res.data.flag) {
                    modalTip === tipType ? Modal.error({
                        title: '错误提示！',
                        content: res.data.msg
                    }) : message.error(res.data.msg)
                }
            })
    }

}