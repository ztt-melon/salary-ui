import React, {PureComponent, Fragment} from 'react'
import {MyBreadcrumb, CrudTool, MyTable} from '../components'
import {Card} from 'antd'
import dicColumns from './column'
import {ajax, urls, Functions} from '../../util'
import PermissionButton from "../../util/PermissionButton"
import DicQuery from "./dicQuery"

class Dic extends PureComponent {
    state = {
        pageNum: 1,
        loading: true
    }
    getList = () => {
        ajax.get(urls.dic.list, {pageNum: this.state.pageNum,...this.state.searchParam}, this)
    }

    componentDidMount() {
        this.getList()
    }

    displayQuery=()=>{
        let index=PermissionButton.get(urls.dic.route).indexOf('查询')
        if(index>=0){
            return (
                <DicQuery
                    callback={this.getList}
                    setSearchParam={Functions.setSearchParam.bind(this)}
                />
            )
        }
    }

    render() {
        return (
            <Fragment>
                <MyBreadcrumb msg={'系统管理/数据字典'}/>
                {this.displayQuery()}
                <Card style={{marginTop: 10}}>
                    <CrudTool
                        selectedItem={this.state.selectedItem}
                        callback={this.getList}
                        info={urls.dic}
                    />
                    <MyTable
                        columns={dicColumns}
                        state={this.state}
                        setSelectedItem={Functions.setSelectedItem.bind(this)}
                        callback={this.getList}
                        info={urls.dic}
                    />
                </Card>
            </Fragment>
        )
    }
}

export default Dic

