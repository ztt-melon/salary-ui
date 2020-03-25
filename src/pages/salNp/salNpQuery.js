import React, {PureComponent} from 'react'
import {Button, Card} from 'antd'
import {Input, DatePicker} from 'nowrapper/lib/antd'
import Form, {FormItem, FormCore} from 'noform'
import moment from 'moment'
import locale from "antd/lib/date-picker/locale/zh_CN"
import 'moment/locale/zh-cn'
import {Constants, Functions} from "../../util/index"

const {RangePicker} = DatePicker
const {monthFormat} = Constants

class SalNpQuery extends PureComponent {
    state = {
        rangeYearMonth: []
    }

    constructor(props) {
        super(props);
        this.core = new FormCore()
        //日期
        let yearmonth = []
        let date = new Date()
        yearmonth.push(moment(sessionStorage.getItem('salNpYearMonth'), monthFormat))
        yearmonth.push(moment(sessionStorage.getItem('salNpYearMonth'), monthFormat))
        this.core.setValue("yearmonth", yearmonth)
    }

    handleOperator = (text) => {
        if("重置"===text){
            this.core.setValue("name","")
        }
        let values = this.core.getValues()
        values.yearmonth = Functions.getYearMonth_string(values.yearmonth)
        this.props.setSearchParam(values, this.props.callback)
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleEnterKey)
    }
    handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            this.handleOperator("查询")
        }
    }

    render() {
        return <Card>
            <Form core={this.core} inline defaultMinWidth={false}>
                <FormItem label="姓名" name="name"><Input style={{width: 135}}/></FormItem>
                <FormItem className="marginLeft20" label="时间" name="yearmonth">
                    <RangePicker
                        locale={locale}
                        format={monthFormat}
                        mode={['month', 'month']}
                        showTime
                    />
                </FormItem>
                <Button className="marginLeft30" type="primary" icon="search" onClick={()=>this.handleOperator("查询")}>查询</Button>
                <Button className="marginLeft10" type="primary" icon="close" onClick={()=>this.handleOperator("重置")}>重置</Button>
            </Form>
        </Card>
    }
}

export default SalNpQuery
