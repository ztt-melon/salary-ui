import React, {PureComponent} from 'react'
import {message, Modal, Spin} from 'antd'
import {Dialog, Button} from 'nowrapper/lib/antd'
import {ajax, Constants, urls, PermissionButton} from '../../util'

const {CREATE, EDIT, DETAIL, RECOMBINE, BINDUSER, AUTHORIZE, FINISH} = Constants

class CrudTool extends PureComponent {
    state = {
        bindUserVisible: false
    }
    handleOperator2 = (type) => {
        if (RECOMBINE === type) {
            Dialog.show({
                locale: 'zh',
                enableValidate: true,
                width: 600,
                title: urls.changeSheetDept.title,
                content: <urls.changeSheetDept.form/>,
                onOk: (values, hide) => {
                    ajax.post(urls.changeSheetDept.saveOrUpdate, values, () => {
                    })
                    hide()
                }
            })
        } else if (BINDUSER === type) {
            if (!this.props.selectedItem) {
                message.error('请选择一个角色')
                return
            }
            //对话框需要的参数
            let params = {
                selectedItem: this.props.selectedItem || {}
            }
            Dialog.show({
                locale: 'zh',
                enableValidate: true,
                width: 1300,
                title: '绑定用户',
                content: <urls.role.bindForm params={params}/>,
                onOk: (values, hide) => {
                    let data = {
                        roleId: this.props.selectedItem.id,
                        userIds: []
                    }
                    for (let key in values) {
                        if (key.indexOf("userIds_") > -1) data.userIds.push(...values[key])
                    }
                    ajax.post(urls.roleUser.save, data, () => {
                    })
                    hide()
                }
            })
        } else if (AUTHORIZE === type) {
            if (!this.props.selectedItem) {
                message.error('请选择一个角色')
                return
            }
            //对话框需要的参数
            let params = {
                selectedItem: this.props.selectedItem || {}
            }
            Dialog.show({
                locale: 'zh',
                enableValidate: true,
                width: 700,
                title: '授权',
                content: <urls.role.authorizeForm params={params}/>,
                onOk: (values, hide) => {
                    let data = {
                        roleId: this.props.selectedItem.id,
                        permissionIds: []
                    }
                    for (let key in values) {
                        if (key.indexOf("permissionIds_") > -1) data.permissionIds.push(...values[key])
                    }
                    ajax.post(urls.rolePermission.save, data, () => {
                    })
                    hide()
                }
            })
        } else if (FINISH === type) {
            const thiz = this
            const pathname = window.location.pathname.replace(Constants.projectName, "")
            ajax.get_callback("/salNp/finishTip", {pathname}, (realData) => {
                Dialog.show({
                    locale: 'zh',
                    width: 400,
                    title: '提示',
                    content: `月结--${realData.year}年${realData.month}月--的工资数据吗?`,
                    onOk: (values, hide) => {
                        hide()
                        const modal = Modal.info({
                            title: '提示',
                            content: <div><Spin/>正在操作中...</div>,
                            okButtonProps: {disabled: true}
                        })
                        ajax.get_callback(pathname + "/finish", {}, (realData) => {
                            thiz.props.callback()
                            modal.update({content: '操作成功', okButtonProps: {disabled: false}})
                        }, Constants.TIP_TYPE_MODAL)
                        // ajax.post(pathname + "/finish", {}, thiz.props.callback, Constants.TIP_TYPE_MODAL)
                    }
                })
            }, Constants.TIP_TYPE_MODAL)
        }
    }
    handleOperator = (type) => {
        const props = this.props
        const info = this.props.info
        //对话框的标题
        let title = info.title
        if (type === CREATE) {
            title = '创建-' + title
        } else if (type === EDIT || type === DETAIL) {
            if (!props.selectedItem) {
                message.error('请选择一个' + title)
                return
            }
            title = type === EDIT ? '编辑-' + title : title + '-详情'
        }
        //对话框需要的参数
        let params = {
            type,
            selectedItem: props.selectedItem || {}
        }
        Dialog.show({
            locale: 'zh',
            enableValidate: true,
            width: props.width || 416,
            title: title,
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

    displayButtons = () => {
        let buttons = PermissionButton.get(this.props.info.route)
        return buttons.map(item => {
            if (item === '创建') {
                return <Button icon="plus" type="primary" onClick={() => this.handleOperator(CREATE)}>创建</Button>
            } else if (item === '编辑') {
                return <Button icon="edit" type="primary" onClick={() => this.handleOperator(EDIT)}>编辑</Button>
            } else if (item === '详情') {
                return <Button icon="scan" type="primary" onClick={() => this.handleOperator(DETAIL)}>详情</Button>
            } else if (item === '部门重组') {
                return <Button icon="retweet" type="primary"
                               onClick={() => this.handleOperator2(RECOMBINE)}>部门重组</Button>
            } else if (item === '绑定用户') {
                return <Button icon="edit" type="primary" onClick={() => this.handleOperator2(BINDUSER)}>绑定用户</Button>
            } else if (item === '授权') {
                return <Button icon="edit" type="primary" onClick={() => this.handleOperator2(AUTHORIZE)}>授权</Button>
            } else if (item === '批量修改') {
                return <Button icon="file" type="primary" onClick={this.props.showModal}>批量修改</Button>
            } else if (item === '导出报税数据') {
                return <Button icon="export" type="primary" style={{marginRight: 10}}
                               href={Constants.baseURL + window.location.pathname.replace(Constants.projectName, "") + "File/writeUpTaxExcel"}>导出报税数据</Button>
            } else if (item === '导出工行数据') {
                return <Button icon="export" type="primary" style={{marginRight: 10}}
                               href={Constants.baseURL + window.location.pathname.replace(Constants.projectName, "") + "File/writeExcel"}>导出工行数据</Button>
            } else if (item === '月结') {
                return <Button icon="lock" type="primary" onClick={() => this.handleOperator2(FINISH)}>月结</Button>
            }
        })
    }

    render() {
        return (
            <div className="crud-tool">
                {this.displayButtons()}
            </div>
        )
    }
}

export default CrudTool