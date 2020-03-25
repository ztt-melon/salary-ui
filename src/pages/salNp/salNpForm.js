import React, {PureComponent} from 'react'
import {Card, Row, Col, Input as AntdInput} from 'antd'
import Form, {FormItem, FormCore, Item} from 'noform'
import {Input, DatePicker, Select} from 'nowrapper/lib/antd'
import {InlineRepeater, Selectify} from 'nowrapper/lib/antd/repeater'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import {ajax, Constants, Functions, urls, validate} from '../../util'

const {MonthPicker} = DatePicker
const {CREATE, DETAIL, monthFormat, yes_finish, no_finish, form_status_disabled, form_status_preview, fontWeight} = Constants

let threeCol = Functions.getFormLayoutProps(3)
let fourCol = Functions.getFormLayoutProps(4)
let repeaterProps_100 = Functions.getReaterProps()
let repeaterProps_150 = Functions.getReaterProps(150)

let repeaterProps_230 = Functions.getReaterProps(230)

const SelectInlineRepeater = Selectify(InlineRepeater)

class SalNpForm extends PureComponent {
    state = {
        jishuiOptions: []
    }

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate.salNp});
        this.core.setStatus({
            'userName': form_status_disabled,
            'userGiveMode': form_status_disabled,
            'userCategory': form_status_disabled,
            'userDeptName': form_status_disabled,
            'finish': form_status_disabled,
            'yingfa': form_status_disabled,
            'yingkou': form_status_disabled,
            'jiangjin': form_status_disabled,
            'shifa': form_status_disabled
        })
    }

    params = {...this.props.params}

    componentWillMount() {
        //预加载数据
        ajax.get_callback(urls.dic.flagData, {flag: '计税类别'}, (category) => {
            this.setState({'jishuiOptions': category})
        })
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
            const salNpId = this.params.selectedItem.id
            ajax.get_callback(urls.salNp.editView, {salNpId}, (realData) => {
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
        ajax.get_callback(urls.user.get, {
            nameOrNum: value,
            type: window.location.pathname.replace(Constants.projectName, "")
        }, (realData) => {
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
            <FormItem className='hidden' label="部门id" name="userDeptId"><Input/></FormItem>
            <Card title='基本信息' headStyle={fontWeight} extra={<Item render={() => {
                return this.params.type === CREATE ? search : ''
            }}/>}>
                <Row gutter={8}>
                    <Col {...threeCol.ColProps}>
                        <FormItem label='职工姓名' name="userName" {...threeCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...threeCol.ColProps}>
                        <FormItem label="职工类别" name="userCategory" {...threeCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...threeCol.ColProps}>
                        <FormItem label="部门名称" name="userDeptName" {...threeCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...threeCol.ColProps}>
                        <FormItem label="发放方式" name="userGiveMode" {...threeCol.FormItemProps}><Input/></FormItem>
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
                        <FormItem label="岗位工资" name="gangwei" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="薪级工资" name="xinji" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="补差" name="bucha" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="部内" name="bunei" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...fourCol.ColProps}>
                        <FormItem label="浮动" name="fudong" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="航龄" name="hangling" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="工补" name="gongbu" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="书洗" name="shuxi" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...fourCol.ColProps}>
                        <FormItem label="菜磨" name="caimo" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="职补1-9" name="zhibu" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="10%保留" name="baoliu" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="季度效益" name="jidu" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...fourCol.ColProps}>
                        <FormItem label="水电燃补" name="shuidian" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="效益补贴" name="xiaoyi" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="岗津" name="gangjin" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="单身补" name="danshengbu" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...fourCol.ColProps}>
                        <FormItem label="物业补贴" name="wuye" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="其他" name="qita" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
            </Card>
            <Card title='其他薪金' className='marginTop' headStyle={fontWeight}>
                <FormItem name="yingfajiangjin_repeater">
                    <SelectInlineRepeater locale='zh' selectMode="multiple" multiple>
                        <FormItem label='名称' name="name" {...repeaterProps_150}><Input/></FormItem>
                        <FormItem label="计税类别" name="type" defaultMinWidth={false} defaultValue={'应发计税'}><Select
                            options={this.state.jishuiOptions} style={{width: 120}}/></FormItem>
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
                        <FormItem label="养老保险" name="yanglao" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="职业年金" name="nianjin" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="住房" name="zhufang" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...fourCol.ColProps}>
                        <FormItem label="失业保险" name="shiye" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="扣款" name="koukuan" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="医疗保险" name="yiliao" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                    <Col {...fourCol.ColProps}>
                        <FormItem label="站发税款" name="shuikuan1" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    < Col {...fourCol.ColProps} offset={18}>
                        <FormItem label="院发税款" name="shuikuan2" {...fourCol.FormItemProps}><Input/></FormItem>
                    </Col>
                </Row>
            </Card>
            <Card title='计税专用-加项' className='marginTop' headStyle={fontWeight}>
                <FormItem name="jishui_add_repeater">
                    <SelectInlineRepeater locale='zh' selectMode="multiple" multiple>
                        <FormItem label='名称' name="name" {...repeaterProps_150}><Input/></FormItem>
                        <FormItem label='金额' name="money"  {...repeaterProps_100} ><Input/></FormItem>
                    </SelectInlineRepeater>
                </FormItem>
            </Card>
            <Card title='计税专用-减项' className='marginTop' headStyle={fontWeight}>
                <FormItem name="jishui_subtract_repeater">
                    <SelectInlineRepeater locale='zh' selectMode="multiple" multiple>
                        <FormItem label='名称' name="name"><Input style={{width: 200}}/></FormItem>
                        <FormItem label='金额' name="money"  {...repeaterProps_100} ><Input/></FormItem>
                    </SelectInlineRepeater>
                </FormItem>
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
                                <FormItem label="其他奖金合计" name="jiangjin" {...fourCol.FormItemProps}><Input/></FormItem>
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

export default SalNpForm