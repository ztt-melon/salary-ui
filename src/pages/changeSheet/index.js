import React, {PureComponent, Fragment} from 'react'
import {MyBreadcrumb, MyTable} from '../components'
import {Card, message, Table} from 'antd'
import {Dialog, Button} from 'nowrapper/lib/antd'
import changeSheetColumns from './column'
import {ajax, urls, Functions, Constants} from '../../util'
import changeSheetPng from "../../assets/changeSheet.png"
import annotationColumns from "../changeSheetNeedHandle/annotationColumn"
import PermissionButton from "../../util/PermissionButton"
import ChangeSheetQuery from "./changeSheetQuery"

const {GENERATE, EDIT, DETAIL, VIEW_DIAGRAM, VIEW_STEP} = Constants

class ChangeSheet extends PureComponent {
    state = {
        pageNum: 1,
        loading: true
    }
    getList = () => {
        ajax.get(urls.changeSheetNeedHandle.list, {pageNum: this.state.pageNum, ...this.state.searchParam}, this)
    }

    componentDidMount() {
        this.getList()
    }

    //生成
    handleOperator1 = (type) => {
        const thiz = this
        //对话框需要的参数
        let params = {
            type,
            selectedItem: this.state.selectedItem || {}
        }
        Dialog.show({
            locale: 'zh',
            enableValidate: true,
            width: 1150,
            title: '生成-变动单',
            content: <urls.changeSheetNeedHandle.form params={params}/>,
            footer: (hide, {ok, cancel, ctx}) => {
                const cancelFunction = () => {
                    hide()
                }
                const handle = (buttonName) => {
                    if ("提交" === buttonName || "提交给人事领导" === buttonName) {
                        let values = ctx.getValues()
                        values.userName = sessionStorage.getItem("userName")
                        values.type = type
                        values.buttonName = buttonName
                        //将日期数据取出
                        if (values.yearmonthString) {
                            values.yearmonthString = values.yearmonthString._i
                        }
                        ajax.post(urls.changeSheetNeedHandle.saveOrUpdate, values, () => {
                            thiz.getList()
                        })
                        hide()
                    }
                }
                return (
                    <div className="footerButtons" style={{textAlign: 'right'}}>
                        <Button onClick={() => {
                            handle("提交")
                        }} type="primary">提交</Button>
                        <Button onClick={() => {
                            handle("提交给人事领导")
                        }} type="primary">提交给人事领导</Button>
                        <Button onClick={cancelFunction}>取消</Button>
                    </div>
                )
            }
        })
    }
    //查看流程图、查看审批过程
    handleOperator2 = (type) => {
        if (!this.state.selectedItem) {
            message.error("请选择一个变动单")
            return
        }
        if (VIEW_DIAGRAM === type) {
            ajax.get_callback(urls.changeSheetNeedHandle.viewDiagram, {changeSheetId: this.state.selectedItem.id}, (realData) => {
                let content
                if (realData.x) {
                    content = <div style={{
                        background: `url(${changeSheetPng}) no-repeat`,
                        width: 1250,
                        height: 320,
                        position: 'relative'
                    }}>
                        <div style={{
                            borderRadius: '10px',
                            border: '3px solid red',
                            position: 'absolute',
                            width: `${realData.width}px`,
                            height: `${realData.height}px`,
                            left: `${realData.x}px`,
                            top: `${realData.y}px`
                        }}/>
                    </div>
                } else {
                    content = <div style={{background: `url(${changeSheetPng}) no-repeat`, width: 1250, height: 320}}/>
                }
                Dialog.show({
                    locale: 'zh',
                    width: 1300,
                    title: '变动单',
                    content: content,
                    footer: () => {
                    }
                })
            })
        } else if (VIEW_STEP === type) {
            ajax.get_callback(urls.changeSheetNeedHandle.viewStep, {changeSheetId: this.state.selectedItem.id}, (realData) => {
                let content = <Table dataSource={realData} columns={annotationColumns} bordered={true}/>
                Dialog.show({
                    locale: 'zh',
                    width: 1000,
                    title: '审核记录',
                    content: content,
                    footer: () => {
                    }
                })
            })
        }
    }
    //编辑、详情
    handleOperator3 = (type) => {
        if (EDIT === type && this.state.selectedItem.processStatus === '已完成审批') {
            message.warning("该变动单已完成审批，不能编辑了！")
            return
        }
        if (!this.state.selectedItem) {
            message.error("请选择一个变动单")
            return
        }
        //对话框需要的参数
        let params = {
            type,
            selectedItem: this.state.selectedItem || {}
        }
        Dialog.show({
            locale: 'zh',
            enableValidate: true,
            width: 1150,
            title: (type === EDIT ? '编辑' : '详情') + "-变动单",
            content: <urls.changeSheetNeedHandle.form params={params}/>,
            onOk: (values, hide) => {
                //将日期数据取出
                if (values.yearmonthString) {
                    values.yearmonthString = values.yearmonthString._i
                }
                ajax.post(urls.changeSheetNeedHandle.saveOrUpdate, values, () => {
                })
                hide()
            }
        })
    }
    //操作按钮
    displayButtons = () => {
        let buttons = PermissionButton.get(urls.changeSheet.route)
        return buttons.map(item => {
            if (item === '生成') {
                return <Button icon="plus" type="primary" onClick={() => this.handleOperator1(GENERATE)}>生成</Button>
            } else if (item === '编辑') {
                return <Button icon="edit" type="primary" onClick={() => this.handleOperator3(EDIT)}>编辑</Button>
            } else if (item === '详情') {
                return <Button icon="search" type="primary" onClick={() => this.handleOperator3(DETAIL)}>详情</Button>
            } else if (item === '查看流程图') {
                return <Button icon="edit" type="primary"
                               onClick={() => this.handleOperator2(VIEW_DIAGRAM)}>查看流程图</Button>
            } else if (item === '查看审批记录') {
                return <Button icon="edit" type="primary"
                               onClick={() => this.handleOperator2(VIEW_STEP)}>查看审批记录</Button>
            }
        })
    }

    displayQuery = () => {
        let index = PermissionButton.get(urls.changeSheet.route).indexOf('查询')
        if (index >= 0) {
            return (
                <ChangeSheetQuery
                    callback={this.getList}
                    setSearchParam={Functions.setSearchParam.bind(this)}
                />
            )
        }
    }

    render() {
        return (
            <Fragment>
                <MyBreadcrumb msg={'工资管理/变动单管理'}/>
                {this.displayQuery()}
                <Card className="marginTop">
                    <div className="crud-tool">
                        {this.displayButtons()}
                    </div>
                    <MyTable
                        columns={changeSheetColumns}
                        state={this.state}
                        setSelectedItem={Functions.setSelectedItem.bind(this)}
                        width={1150}
                        callback={this.getList}
                        info={urls.changeSheetNeedHandle}
                    />
                </Card>
            </Fragment>
        )
    }
}

export default ChangeSheet

