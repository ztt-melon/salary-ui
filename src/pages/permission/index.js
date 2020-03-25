import React, {PureComponent, Fragment} from 'react'
import {MyBreadcrumb, CrudTool, MyTable} from '../components'
import {Card} from 'antd'
import permissionColumns from './column'
import {ajax, urls, Functions} from '../../util'
import PermissionButton from "../../util/PermissionButton";
import PermissionQuery from './permissionQuery'

class Permission extends PureComponent {
    state = {
        pageNum: 1,
        loading: true,
        searchParam: {name: '',pname:''},
    }
    getList = () => {
        ajax.get(urls.permission.list, {pageNum: this.state.pageNum,...this.state.searchParam}, this)
    }

    componentDidMount() {
        this.getList()
    }

    displayQuery=()=>{
        let index=PermissionButton.get(urls.permission.route).indexOf('查询')
        if(index>=0){
            return (
                <PermissionQuery
                    callback={this.getList}
                    setSearchParam={Functions.setSearchParam.bind(this)}
                />
            )
        }
    }
    render() {
        return (
            <Fragment>
                <MyBreadcrumb msg={'系统管理/权限管理'}/>
                {this.displayQuery()}
                <Card style={{marginTop: 10}}>
                    <CrudTool
                        selectedItem={this.state.selectedItem}
                        callback={this.getList}
                        info={urls.permission}
                    />
                    <MyTable
                        columns={permissionColumns}
                        state={this.state}
                        setSelectedItem={Functions.setSelectedItem.bind(this)}
                        callback={this.getList}
                        info={urls.permission}
                    />
                </Card>
            </Fragment>
        )
    }
}

export default Permission

