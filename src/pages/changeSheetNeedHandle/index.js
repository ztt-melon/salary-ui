import React, {PureComponent, Fragment} from 'react'
import {message,Table} from 'antd'
import {MyBreadcrumb, MyTable} from '../components'
import {Card} from 'antd'
import {Dialog, Button,Message} from 'nowrapper/lib/antd'
import changeSheetColumns from './column'
import annotationColumns from './annotationColumn'
import {ajax, urls, Functions, Constants} from '../../util'
import PermissionButton from "../../util/PermissionButton"
import changeSheetPng from '../../assets/changeSheet.png'
import  './changeSheet.less'

const {GENERATE,BACK,VALIDATE,CONFIRM,AUDITING,VIEW_DIAGRAM,VIEW_STEP} = Constants

class ChangeSheetNeedHandle extends PureComponent {
    state = {
        pageNum: 1,
        loading: true
    }
    getList = () => {
        ajax.get(urls.changeSheetNeedHandle.list, {pageNum: this.state.pageNum,flag:'ChangeSheetNeedHandle',userName:sessionStorage.getItem("userName")}, this)
    }

    componentDidMount() {
        this.getList()
    }
    //返回弹出框的操作按钮
    dialogButtons=(type)=>{

    }
    //退回处理、校对、确认、审批
    handleOperator1 = (type) => {
        if((VALIDATE===type || CONFIRM ===type || AUDITING===type || BACK===type) && !this.state.selectedItem){
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
            title: '变动单',
            content: <urls.changeSheetNeedHandle.form params={params}/>,
            footer: (hide, {ok, cancel, ctx}) => {
                const cancelFunction=()=>{
                    hide()
                }
                const handle = (buttonName) => {
                    if("提交"===buttonName || "退回"===buttonName || "提交给人事领导"===buttonName){
                        let values=ctx.getValues()
                        values.userName=sessionStorage.getItem("userName")
                        values.type=type
                        values.buttonName=buttonName
                        //将日期数据取出
                        if (values.yearmonthString) {
                            values.yearmonthString = values.yearmonthString._i
                        }
                        ajax.post(urls.changeSheetNeedHandle.saveOrUpdate,values,this.getList)
                        hide()
                    }else if("同意"===buttonName || "退回"===buttonName){
                        let values={}
                        values.userName=sessionStorage.getItem("userName")
                        values.type=type
                        values.buttonName=buttonName
                        values.id=ctx.getValue("id")
                        values.annotation=ctx.getValue("annotation")
                        console.log(values)
                        ajax.post(urls.changeSheetNeedHandle.saveOrUpdate,values,this.getList)
                        hide()
                    }
                }
                if(BACK===type){
                    return (
                        <div className="footerButtons" style={{textAlign:'right'}}>
                            <Button onClick={()=>{handle("提交")}} type="primary">提交</Button>
                            <Button onClick={()=>{handle("提交给人事领导")}} type="primary">提交给人事领导</Button>
                            <Button onClick={cancelFunction}>取消</Button>
                        </div>
                    )
                }else if(GENERATE===type){
                    return (
                        <div className="footerButtons" style={{textAlign:'right'}}>
                            <Button onClick={()=>{handle("提交")}} type="primary">提交</Button>
                            <Button onClick={()=>{handle("提交给人事领导")}} type="primary">提交给人事领导</Button>
                            <Button onClick={cancelFunction}>取消</Button>
                        </div>
                    )
                } else if(VALIDATE===type || CONFIRM===type){
                    return (
                        <div className="footerButtons" style={{textAlign:'right'}}>
                            <Button onClick={()=>{handle("提交")}} type="primary">提交</Button>
                            <Button onClick={()=>{handle("退回")}} type="primary">退回</Button>
                            <Button onClick={cancelFunction}>取消</Button>
                        </div>
                    )
                }else if(AUDITING===type){
                    return (
                        <div className="footerButtons" style={{textAlign:'right'}}>
                            <Button onClick={()=>{handle("同意")}} type="primary">同意</Button>
                            <Button onClick={()=>{handle("退回")}} type="primary">退回</Button>
                            <Button onClick={cancelFunction}>取消</Button>
                        </div>
                    )
                }
            }
        })
    }
    //查看流程图、查看审批过程
    handleOperator2 = (type) => {
        if(!this.state.selectedItem){
            message.error("请选择一个变动单")
            return
        }
        if(VIEW_DIAGRAM===type){
            ajax.get_callback(urls.changeSheetNeedHandle.viewDiagram, {changeSheetId:this.state.selectedItem.id}, (realData) => {
                let content
                if(realData.x){
                    content=<div style={{background:`url(${changeSheetPng}) no-repeat`,width:1250,height:320,position:'relative'}}>
                        <div style={{borderRadius:'10px',border:'3px solid red',position:'absolute',width:`${realData.width}px`,height:`${realData.height}px`,left:`${realData.x}px`,top:`${realData.y}px`}}/>
                    </div>
                }else{
                    content=<div style={{background:`url(${changeSheetPng}) no-repeat`,width:1250,height:320}}/>
                }
                Dialog.show({
                    locale: 'zh',
                    width: 1300,
                    title: '变动单',
                    content: content,
                    footer:()=>{}
                })
            })
        }else if(VIEW_STEP===type){
            ajax.get_callback(urls.changeSheetNeedHandle.viewStep, {changeSheetId:this.state.selectedItem.id}, (realData) => {
                let content=<Table dataSource={realData} columns={annotationColumns} bordered={true}/>
                Dialog.show({
                    locale: 'zh',
                    width: 1000,
                    title: '审核记录',
                    content: content,
                    footer:()=>{}
                })
            })
        }
    }

    //操作按钮
    displayButtons=()=>{
        let buttons = PermissionButton.get(urls.changeSheetNeedHandle.route)
        return buttons.map(item => {
            if (item === '退回处理') {
                return <Button icon="plus" type="primary" onClick={() => this.handleOperator1(BACK)}>退回处理</Button>
            } else if (item === '校对') {
                return <Button icon="edit" type="primary" onClick={() => this.handleOperator1(VALIDATE)}>校对</Button>
            } else if (item === '确认') {
                return <Button icon="search" type="primary" onClick={() => this.handleOperator1(CONFIRM)}>确认</Button>
            } else if(item==='审批'){
                return <Button icon="search" type="primary" onClick={() => this.handleOperator1(AUDITING)}>审批</Button>
            } else if (item === '查看流程图') {
                return <Button icon="edit" type="primary" onClick={() => this.handleOperator2(VIEW_DIAGRAM)}>查看流程图</Button>
            } else if (item === '查看审批记录') {
                return <Button icon="edit" type="primary" onClick={() => this.handleOperator2(VIEW_STEP)}>查看审批记录</Button>
            }
        })
    }
    render() {
        return (
            <Fragment>
                <MyBreadcrumb msg={'工资管理/待处理的变动单'}/>
                <Card className="marginTop">
                    <div className="crud-tool">
                        {this.displayButtons()}
                    </div>
                    <MyTable
                        columns={changeSheetColumns}
                        state={this.state}
                        setSelectedItem={Functions.setSelectedItem.bind(this)}
                    />
                </Card>
            </Fragment>
        )
    }
}

export default ChangeSheetNeedHandle

