const suffixMsg = '不能为空'
const validate = {
    dept: {
        name: {type: "string", required: true, message: '[部门名称]' + suffixMsg},
        pid: {type: "number", required: true, message: '[上级部门]' + suffixMsg}
    },
    dic: {
        flag: {type: "string", required: true, message: '[类目]' + suffixMsg},
        name: {type: "string", required: true, message: '[名称]' + suffixMsg}
    },
    role: {
        name: {type: "string", required: true, message: '[角色名称]' + suffixMsg}
    },
    user: {
        name: {type: "string", required: true, message: '[姓名]' + suffixMsg},
        num: {type: "string", required: true, message: '[职工编号]' + suffixMsg},
        category: {type: "string", required: true, message: '[职工类别]' + suffixMsg},
        bankAccount: {type: "string", required: true, message: '[银行账号]' + suffixMsg},
        deptName: {type: "string", required: true, message: '[所属部门]' + suffixMsg}
    },
    salNp: {
        userName: {type: "string", required: true, message: '[姓名]' + suffixMsg}
    },
    salLtx: {
        userName: {type: "string", required: true, message: '[姓名]' + suffixMsg}
    },
    salLx: {
        userName: {type: "string", required: true, message: '[姓名]' + suffixMsg}
    },
    permission: {
        name: {type: "string", required: true, message: '[权限名称]' + suffixMsg},
        pid: {type: "number", required: true, message: '[上级权限]' + suffixMsg}
    },
    login: {
        name: {type: "string", required: true, message: '[登录名]' + suffixMsg},
        pwd: {type: "string", required: true, message: '[密码]' + suffixMsg}
    }
}

export default validate