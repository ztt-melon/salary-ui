import React, {PureComponent, Fragment} from 'react'
import {MyBreadcrumb, CrudTool, MyTable} from '../components'
import {Button, Card, Icon, message, Modal, Select, Upload, Input} from 'antd'
import SalLxQuery from './salLxQuery'
import salLxColumns from './column'
import {ajax, urls, Functions, PermissionButton,Constants} from '../../util'
import axios from "axios"

const Option = Select.Option

class SalLx extends PureComponent {
    state = {
        pageNum: 1,
        loading: true,
        //
        visible: false,
        fileList: [],
        uploading: false,
    }
    getList = () => {
        ajax.get(urls.salLx.list, {
            pageNum: this.state.pageNum,
            loginUserId: sessionStorage.getItem("userId"), ...this.state.searchParam
        }, this)
    }

    componentDidMount() {
        this.getList()
    }

    displaySearch = () => {
        let index = PermissionButton.get(urls.salLx.route).indexOf('查询')
        if (index >= 0) {
            return (
                <SalLxQuery
                    callback={this.getList}
                    setSearchParam={Functions.setSearchParam.bind(this)}
                />
            )
        }
    }

    showModal = () => {
        this.setState({visible: true})
    }


    handleCancel = () => {
        this.setState({visible: false})
    }

    handleSelectChange = (value) => {
        // alert(value)
        this.setState({type: value})
    }

    handleAreaChange = (e) => {
        this.setState({comment: e.target.value})
    }

    handleUpload = () => {
        const {fileList} = this.state
        const formData = new FormData()
        fileList.forEach((file) => {
            formData.append('files', file)
        })
        this.setState({uploading: true})
        formData.append("type", this.state.type)
        formData.append("comment", this.state.comment === undefined ? "" : this.state.comment)
        formData.append("path", window.location.pathname.replace(Constants.projectName,""))
        axios.post(Constants.baseURL+"/uploadFiles/upload", formData).then((res) => {
            this.setState({fileList: [], uploading: false, visible: false})
            if (res.data.flag) {
                Modal.success({title:'提示',content:'上传成功！'})
            } else {
                Modal.error({title:'错误提示！',content:res.data.msg})
            }
        })
    }

    render() {
        const {uploading, fileList} = this.state;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        }
        return (
            <Fragment>
                <MyBreadcrumb msg={'工资管理/离休工资'}/>
                {this.displaySearch()}
                <div>
                    <Modal
                        title="批量修改"
                        width={400}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={null}
                    >
                        <Select style={{width: 200}} onChange={this.handleSelectChange} placeholder="请选择类别">
                            <Option value="应发应扣">应发应扣</Option>
                            <Option value="其他薪金">其他薪金</Option>
                        </Select>
                        <div className="marginTop">
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload"/>上传文件
                                </Button>
                            </Upload>
                            <div>
                                <Input.TextArea className="marginTop" style={{width: 200}}
                                                onChange={this.handleAreaChange} placeholder="备注"/>
                            </div>
                            <Button
                                type="primary"
                                onClick={this.handleUpload}
                                disabled={fileList.length === 0}
                                loading={uploading}
                                style={{marginTop: 16}}
                            >
                                {uploading ? '上传中...' : '开始上传'}
                            </Button>
                        </div>
                    </Modal>
                </div>
                <Card style={{marginTop: 10}}>
                    <CrudTool
                        width={900}
                        selectedItem={this.state.selectedItem}
                        callback={this.getList}
                        info={urls.salLx}
                        showModal={this.showModal}
                    />
                    <MyTable
                        columns={salLxColumns}
                        state={this.state}
                        setSelectedItem={Functions.setSelectedItem.bind(this)}
                        width={900}
                        callback={this.getList}
                        info={urls.salLx}
                    />
                </Card>
            </Fragment>
        )
    }
}

export default SalLx

