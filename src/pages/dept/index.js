import React, {PureComponent, Fragment} from 'react'
import {MyBreadcrumb, CrudTool, MyTable} from '../components'
import {Card} from 'antd'
import DeptQuery from './deptQuery'
import deptColumns from './column'
import {ajax, urls, Functions,PermissionButton} from '../../util'

class Dept extends PureComponent {
    state = {
        pageNum: 1,
        searchParam: {name: ''},
        loading: true
    }
    getList = () => {
        ajax.get(urls.dept.list, {pageNum: this.state.pageNum, ...this.state.searchParam}, this)
    }

    componentDidMount() {
        this.getList()
    }

    displayQuery=()=>{
        let index=PermissionButton.get(urls.dept.route).indexOf('查询')
        if(index>=0){
            return (
                <DeptQuery
                    callback={this.getList}
                    setSearchParam={Functions.setSearchParam.bind(this)}
                />
            )
        }
    }

    render() {
        return (
            <Fragment>
                <MyBreadcrumb msg={'系统管理/部门管理'}/>
                {this.displayQuery()}
                <Card style={{marginTop: 10}}>
                    <CrudTool
                        selectedItem={this.state.selectedItem}
                        callback={this.getList}
                        info={urls.dept}
                    />
                    <MyTable
                        columns={deptColumns}
                        state={this.state}
                        setSelectedItem={Functions.setSelectedItem.bind(this)}
                        callback={this.getList}
                        info={urls.dept}
                    />
                </Card>
            </Fragment>
        )
    }
}

export default Dept

