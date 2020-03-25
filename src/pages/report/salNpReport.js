import React, {PureComponent, Fragment} from 'react'
import {Button, Card, Col, Row} from 'antd'
import {Input, DatePicker, Select, TreeSelect} from 'nowrapper/lib/antd'
import Form, {FormItem, FormCore} from 'noform'
import moment from 'moment'
import locale from "antd/lib/date-picker/locale/zh_CN"
import 'moment/locale/zh-cn'
import {Constants, ajax, urls} from "../../util"
import {MyBreadcrumb} from '../components'

const {RangePicker} = DatePicker

const {QUERY, RESET, EXPORT, baseURL, monthFormat, FALSE} = Constants

//内聘职工工资清单表
class SalNpReport extends PureComponent {
    state = {
        src: '',
        clientHeight: '0px',
        displayReport: 'none',
        displayButton: 'none',
        giveModeOptions: [{label: "站发", value: "站发"}, {label: "院发", value: "院发"}],
        data: []
    }

    constructor(props) {
        super(props);
        this.core = new FormCore()
        //日期
        let yearmonth = []
        yearmonth.push(moment(sessionStorage.getItem('salNpYearMonth'), monthFormat))
        yearmonth.push(moment(sessionStorage.getItem('salNpYearMonth'), monthFormat))
        this.core.setValue("yearmonth", yearmonth)
    }

    handleOperator = (type) => {
        if (RESET === type) {
            this.core.setValue('name', '')
            this.core.setValue('dept', '')
            this.core.setValue('giveMode', '')
            return
        }
        //拼接查询和导出条件
        let values = this.core.getValues()
        let condition = ''
        //时间
        condition += '&start=' + values.yearmonth[0].format('YYYYMM')
        condition += '&end=' + values.yearmonth[1].format('YYYYMM')
        //姓名
        let name = values.name
        if (name) {
            condition += '&userName=' + name
        }
        //部门
        if (values.dept) {
            condition += '&deptIds=' + values.dept.join(',').substring(1)
        }
        //发放方式
        if (values.giveMode) {
            condition += '&giveMode=' + values.giveMode
        }
        let src = ''
        if (QUERY === type) {
            src = baseURL + '/ureport/preview?_t=0&_u=file:salNp.ureport.xml' + condition
        } else {
            src = baseURL + '/ureport/excel?_u=file:salNp.ureport.xml' + '&_n=' + sessionStorage.getItem('salNpYearMonth') + '内聘职工工资清单表' + condition
        }
        this.setState({
            src,
            clientHeight: this.state.endClientHeight,
            displayReport: 'block',
            displayButton: 'inline-block'
        })
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleEnterKey)
        //设置iframe的高度
        this.setState({endClientHeight: document.body.clientHeight - 100})
        //部门
        ajax.get(urls.dept.treeSelectData, {}, this)
    }

    handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            this.handleOperator(QUERY)
        }
    }

    onSelect = (value, node, extra, columnName) => {
        const oldValue = this.core.getValue(columnName)
        if (oldValue) {
            this.core.setValue(columnName, value + oldValue)
        } else {
            this.core.setValue(columnName, value)
        }
    }

    render() {
        return <Fragment>
            <MyBreadcrumb msg={'报表管理/内聘职工清单表'}/>
            <Card>
                <Form core={this.core} inline defaultMinWidth={false}>

                    <FormItem label="姓名" name="name"><Input style={{width: 150}}/></FormItem>
                    <FormItem className="marginLeft30" label="时间" name="yearmonth">
                        <RangePicker
                            locale={locale}
                            format={monthFormat}
                            mode={['month', 'month']}
                            showTime
                        />
                    </FormItem>
                    <FormItem className="marginLeft30" label="发放方式" name="giveMode"><Select
                        options={this.state.giveModeOptions}
                        style={{width: 150}}/></FormItem>
                    <br/>
                    <FormItem className="marginTop" label="部门" name="dept" defaultMinWidth={FALSE}><TreeSelect
                        treeData={this.state.data}
                        treeCheckable={true}
                        treeDefaultExpandAll multiple
                        style={{width: 575}}
                        onSelect={(value, node, extra,) => this.onSelect(value, node, extra, 'dept')}/></FormItem>

                    <Button className="marginTop marginLeft30" type="primary" icon="search"
                            onClick={() => this.handleOperator(QUERY)}>查询</Button>
                    <Button className="marginLeft20" type="primary" icon="close"
                            onClick={() => this.handleOperator(RESET)}>重置</Button>
                    <Button style={{display: this.state.displayButton}} className="marginLeft20" type="primary"
                            icon="export"
                            onClick={() => this.handleOperator(EXPORT)}>导出Excel</Button>

                </Form>
            </Card>
            <Card className='marginTop' style={{display: this.state.displayReport}}>
                <iframe src={this.state.src}
                        style={{border: 0, width: '100%', height: this.state.clientHeight}}
                        frameBorder="0"/>
            </Card>
        </Fragment>
    }
}

export default SalNpReport
