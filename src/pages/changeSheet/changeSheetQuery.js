import React, { PureComponent } from 'react'
import {Card } from 'antd'
import {Button,Input,DatePicker} from 'nowrapper/lib/antd'
import Form, { FormItem, FormCore } from 'noform'
import moment from 'moment'
import locale from "antd/lib/date-picker/locale/zh_CN"
import 'moment/locale/zh-cn'
import {Constants, Functions} from "../../util/index"

const {RangePicker} = DatePicker
const {monthFormat} = Constants

class ChangeSheetQuery extends PureComponent{
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
    handleOperator = ()=>{
        let values = this.core.getValues()
        values.yearmonth = Functions.getYearMonth_string(values.yearmonth)
        this.props.setSearchParam(values, this.props.callback)
    }
    componentDidMount() {
        document.addEventListener("keydown", this.handleEnterKey)
    }
    handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            this.handleOperator()
        }
    }

    render(){
        return <Card>
            <Form core={this.core} inline defaultMinWidth={false}>
                <FormItem label="时间" name="yearmonth">
                    <RangePicker
                        locale={locale}
                        format={monthFormat}
                        mode={['month', 'month']}
                        showTime
                    />
                </FormItem>
                <Button className="marginLeft30" type="primary" icon="search" onClick={this.handleOperator}>查询</Button>
            </Form>
        </Card>
    }
}

export default ChangeSheetQuery
