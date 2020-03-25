//数据字典
export default [{
    title: '类目',
    dataIndex: 'flag',
    key: 'flag'
}, {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
}, {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.sort - b.sort,
}, {
    title: '更新时间',
    dataIndex: 'createTime',
    key: 'createTime'
}]