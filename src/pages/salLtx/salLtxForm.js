import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore, Item} from 'noform'
import {DatePicker, Input} from 'nowrapper/lib/antd'
import {ajax, Constants, Functions, validate, urls} from '../../util'
import {Card, Col, Input as AntdInput, Row} from "antd"
import locale from "antd/lib/date-picker/locale/zh_CN"
import moment from "moment"
import {InlineRepeater, Selectify} from "nowrapper/lib/antd/repeater"

const {MonthPicker} = DatePicker
const {CREATE, DETAIL, monthFormat, yes_finish, no_finish, form_status_disabled, fontWeight} = Constants

let threeCol = Functions.getFormLayoutProps(3)
let fourCol = Functions.getFormLayoutProps(4)
let repeaterProps_100 = Functions.getReaterProps()
let repeaterProps_150 = Functions.getReaterProps(150)

const SelectInlineRepeater = Selectify(InlineRepeater)

class SalLtxForm extends PureComponent {
    state = {}

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate.salLtx});
        this.core.setStatus({
            'userName': form_status_disabled,
            'userNum': form_status_disabled,
            'userCategory': form_status_disabled,
            'finish': form_status_disabled,
            'yingfa': form_status_disabled,
            'yingkou': form_status_disabled,
            'shifa': form_status_disabled
        })
    }

    params = {...this.props.params}

    componentWillMount() {
        if (this.params.type === CREATE) {
            let date = new Date()
            //先重置，再初始化默认值
            this.core.reset()
            this.core.setValues({
                yearmonthString: moment(date.getFullYear() + '年' + (date.getMonth() + 1) + '月', monthFormat),
                finish: no_finish,
                sort: 0
            })
        } else {
            //获取页面数据
            const salLtxId = this.params.selectedItem.id
            ajax.get_callback(urls.salLtx.editView, {salLtxId}, (realData) => {
                if (this.params.type === DETAIL || this.params.selectedItem.finish === yes_finish) this.core.setGlobalStatus('preview')
                //日期
                let yearmonthString = realData.yearmonthString
                delete realData.yearmonthString
                //回显数据
                this.core.setValues({...realData})
                this.core.setValue('yearmonthString', moment(yearmonthString, monthFormat))

            })
        }
    }

    onSearch = (value) => {
        ajax.get_callback(urls.user.get, {nameOrNum: value, type: window.location.pathname.replace(Constants.projectName,"")}, (realData) => {
            //日期
            let yearmonthString = realData.yearmonthString
            delete realData.yearmonthString
            //回显数据
            this.core.setValues({...realData})
            this.core.setValue('yearmonthString', moment(yearmonthString, monthFormat))
        })
    }

    render() {
        const search = <AntdInput.Search onSearch={this.onSearch} placeholder='姓名' enterButton='填充'
                                         style={{width: 176}}/>
        return <Form core={this.core}>
            <FormItem className='hidden' name="id"><Input/></FormItem>
            <FormItem className='hidden' name="userCategory"><Input/></FormItem>
            <Card title='基本信息' headStyle={fontWeight} extra={<Item render={() => {
                return this.params.type === CREATE ? search : ''
            }}/>}>
                <Row gutter={8}>
                    <Col {...threeCol.ColProps}>
                        <FormItem label='职工姓名' name="userName" {...threeCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...threeCol.ColProps}>
                        <FormItem label="薪资日期" name="yearmonthString" {...threeCol.FormItemProps}><MonthPicker
                            locale={locale} format={monthFormat}
                            disabledDate={current => current && current < moment().endOf('day')}/></FormItem>
                    </Col>
                    <Col {...threeCol.ColProps}>
                        <FormItem label="月结状态" name="finish" {...threeCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
            </Card>
            <Card title='应发款项' className='marginTop' headStyle={fontWeight}>
                <Row gutter={8}>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="基本退休费" name="jiben" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="规范补贴" name="guifan" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="保留补贴" name="baoliu" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="171补贴" name="butie" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...fourCol.ColProps}>
                        <FormItem label="书报洗理费" name="shubao" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="提租" name="tizu" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="34-39调" name="tiao" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="站内补差" name="bucha" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...fourCol.ColProps}>
                        <FormItem label="1617增资" name="zengzi" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="物业补贴" name="wuye" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="其他" name="yingfaqita" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
            </Card>
            <Card title='其他薪金' className='marginTop' headStyle={fontWeight}>
                <FormItem name="yingfajiangjin_repeater">
                    <SelectInlineRepeater locale='zh' selectMode="multiple" multiple>
                        <FormItem label='名称' name="name" {...repeaterProps_150}><Input/></FormItem>
                        <FormItem label='金额' name="money"  {...repeaterProps_100} ><Input/></FormItem>
                    </SelectInlineRepeater>
                </FormItem>
            </Card>
            <Card title='应扣款项' className='marginTop' headStyle={fontWeight}>
                <Row gutter={8}>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="房租" name="fangzu" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="其他" name="yingkouqita" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
            </Card>
            {
                this.params.type === CREATE ? '' :
                    <Card title='合计' className='marginTop' headStyle={fontWeight}>
                        <Row gutter={8}>
                            <Col {...fourCol.ColProps}>
                                <FormItem label="应发合计" name="yingfa" {...fourCol.FormItemProps}><Input/></FormItem>
                            </Col>
                            <Col {...fourCol.ColProps}>
                                <FormItem label="应扣合计" name="yingkou" {...fourCol.FormItemProps}><Input/></FormItem>
                            </Col>
                            <Col {...fourCol.ColProps}>
                                <FormItem label="实发工资" name="shifa" {...fourCol.FormItemProps}><Input/></FormItem>
                            </Col>
                        </Row>
                    </Card>
            }
            <Card title='备注' className='marginTop' headStyle={fontWeight}>
                <FormItem name="comment"><Input.TextArea style={{width: 350}}/></FormItem>
            </Card>
        </Form>
    }
}

export default SalLtxForm