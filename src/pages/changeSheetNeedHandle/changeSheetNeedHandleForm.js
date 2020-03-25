import React, {PureComponent} from 'react'
import {Card, Col, Row, Table} from 'antd'
import Form, {FormCore, FormItem} from 'noform'
import {Button, DatePicker, Input} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from 'nowrapper/lib/antd/repeater'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import {ajax, Constants, Functions, urls} from '../../util'
import batchModifyColumn from "./batchModifyColumn"

const {MonthPicker} = DatePicker
const {GENERATE, AUDITING,EDIT, DETAIL, monthFormat, fontWeight} = Constants

let threeCol = Functions.getFormLayoutProps(3)
let repeaterProps_100 = Functions.getReaterProps()
let repeaterProps_120 = Functions.getReaterProps(120)
let repeaterProps_150 = Functions.getReaterProps(150)
let repeaterProps_200 = Functions.getReaterProps(200)

const SelectInlineRepeater = Selectify(InlineRepeater)

class ChangeSheetNeedHandleForm extends PureComponent {
    state = {}

    constructor(props) {
        super(props)
        this.core = new FormCore()
    }

    params = {...this.props.params}

    componentWillMount() {
        //获取batchModifyData
        ajax.get_callback(urls.changeSheetNeedHandle.batchModifyData, {}, (realData) => {
            this.setState({batchModifyData: realData})
        })
        if (this.params.type === GENERATE) {
            //日期
            /*            let date = new Date()
                        let pageDate = date.getFullYear() + '年' + (date.getMonth() + 2) + '月'*/
            ajax.get_callback(urls.changeSheetNeedHandle.editView, {}, (realData) => {
                //日期
                let yearmonthString = realData.yearmonthString
                delete realData.yearmonthString
                //回显数据
                this.core.setValues({...realData})
                this.core.setValues({
                    name: yearmonthString + "变动单",
                    yearmonthString: moment(yearmonthString, monthFormat)
                })
            })
        } else {
            const changeSheetId = this.params.selectedItem.id
            ajax.get_callback(urls.changeSheetNeedHandle.editView, {changeSheetId}, (realData) => {
                if (this.params.type === DETAIL) this.core.setGlobalStatus('preview')
                //日期
                let yearmonthString = realData.yearmonthString
                delete realData.yearmonthString
                //回显数据
                this.core.setValues({...realData})
                this.core.setValue('yearmonthString', moment(yearmonthString, monthFormat))
                if(this.params.type === AUDITING){
                    this.core.setGlobalStatus('preview')
                    this.core.setStatus("annotation",EDIT)
                }
            })
        }
    }


    render() {
        return <Form core={this.core}>
            <FormItem className='hidden' name="id"><Input/></FormItem>
            <Card title='基本信息' headStyle={fontWeight}>
                <Row gutter={8}>
                    <Col {...threeCol.ColProps}>
                        <FormItem label='变动单名称' name="name" {...threeCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...threeCol.ColProps}>
                        <FormItem label="变动单时间" name="yearmonthString" {...threeCol.FormItemProps}><MonthPicker
                            locale={locale} format={monthFormat}
                            disabledDate={current => current && current < moment().endOf('day')}/></FormItem>
                    </Col>
                </Row>
            </Card>
            <Card title='人员变动' className='marginTop' headStyle={fontWeight}>
                <FormItem name="user_repeater">
                    <SelectInlineRepeater locale='zh' selectMode="multiple" multiple>
                        <FormItem label='操作类型' name="type" {...repeaterProps_120}><Input/></FormItem>
                        <FormItem label='姓名' name="name"  {...repeaterProps_100} ><Input/></FormItem>
                        <FormItem label='旧部门' name="oldDept"  {...repeaterProps_200} ><Input/></FormItem>
                        <FormItem label='新部门' name="newDept"  {...repeaterProps_200} ><Input/></FormItem>
                        <FormItem label='备注' name="reason"  {...repeaterProps_150} ><Input/></FormItem>
                        {/*                        <FormItem label='排序' name="sort" defaultMinWidth={false}
                                  style={{width: 70}}><Input/></FormItem>*/}
                    </SelectInlineRepeater>
                </FormItem>
            </Card>
            <Card title='部门变动' className='marginTop' headStyle={fontWeight}>
                <FormItem name="dept_repeater">
                    <SelectInlineRepeater locale='zh' selectMode="multiple" multiple>
                        <FormItem label='操作类型' name="type" {...repeaterProps_100}><Input/></FormItem>
                        <FormItem label='旧部门' name="oldDept"  {...repeaterProps_200} ><Input/></FormItem>
                        <FormItem label='新部门' name="newDept"  {...repeaterProps_200} ><Input/></FormItem>
                        <FormItem label='备注' name="reason"  {...repeaterProps_150} ><Input/></FormItem>
                    </SelectInlineRepeater>
                </FormItem>
            </Card>
            <Card title='工资手工变动-内聘' className='marginTop' headStyle={fontWeight}>
                <FormItem name="salNp_repeater">
                    <SelectInlineRepeater locale='zh' selectMode="multiple" multiple>
                        <FormItem label='部门' name="deptName"  {...repeaterProps_150} ><Input/></FormItem>
                        <FormItem label='姓名' name="name"  {...repeaterProps_100} ><Input/></FormItem>
                        <FormItem label='变动项名称' name="changeName"  {...repeaterProps_100} ><Input/></FormItem>
                        <FormItem label='上月金额' name="lastMoney"  {...repeaterProps_100} ><Input/></FormItem>
                        <FormItem label='本月金额' name="currentMoney"  {...repeaterProps_100} ><Input/></FormItem>
                        <FormItem label='备注' name="reason"  {...repeaterProps_150} ><Input/></FormItem>
                    </SelectInlineRepeater>
                </FormItem>
            </Card>
            <Card title='工资手工变动-退休+离休' className='marginTop' headStyle={fontWeight}>
                <FormItem name="salTx_repeater">
                    <SelectInlineRepeater locale='zh' selectMode="multiple" multiple>
                        <FormItem label='姓名' name="name"  {...repeaterProps_100} ><Input/></FormItem>
                        <FormItem label='变动项名称' name="changeName"  {...repeaterProps_100} ><Input/></FormItem>
                        <FormItem label='上月金额' name="lastMoney"  {...repeaterProps_100} ><Input/></FormItem>
                        <FormItem label='本月金额' name="currentMoney"  {...repeaterProps_100} ><Input/></FormItem>
                        <FormItem label='备注' name="reason"  {...repeaterProps_150} ><Input/></FormItem>
                    </SelectInlineRepeater>
                </FormItem>
            </Card>
            <Card title='批量修改-内聘+退休+离休' className='marginTop' headStyle={fontWeight}>
                <Table dataSource={this.state.batchModifyData} columns={batchModifyColumn} bordered={true}/>
            </Card>
            <Card title='其他薪金变动-内聘+退休+离休' className='marginTop' headStyle={fontWeight}>
                <FormItem name="jiangjin_repeater">
                    <SelectInlineRepeater locale='zh' selectMode="multiple" multiple>
                        <FormItem label='名称' name="name"  {...repeaterProps_200} ><Input/></FormItem>
                        <FormItem label='累计金额' name="money"  {...repeaterProps_100} ><Input/></FormItem>
                        <FormItem label='备注' name="reason"  {...repeaterProps_150} ><Input/></FormItem>
                    </SelectInlineRepeater>
                </FormItem>
                <Button icon="scan" type="primary" style={{marginLeft: 45}}
                        href={Constants.baseURL + "/changeSheetFile/otherBonus"}>查看明细数据</Button>
            </Card>
            {
                this.params.type !== AUDITING ?
                    <Card title='备注' className='marginTop' headStyle={fontWeight}>
                        <FormItem name="comment"><Input.TextArea style={{width: 350}}/></FormItem>
                    </Card> : ""
            }
            {
                this.params.type === AUDITING ?
                    <Card title='批注' className='marginTop' headStyle={fontWeight}>
                        <FormItem name="annotation"><Input.TextArea style={{width: 350}}/></FormItem>
                    </Card> : ""
            }
        </Form>
    }
}

export default ChangeSheetNeedHandleForm