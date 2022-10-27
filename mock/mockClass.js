const Mock = require('mockjs')

const result = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'datas|16': [
        {
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            name: '第 @id 班',
            openDate: '@date'
        }
    ]
}).datas

const Class = require("../models/Class");
// 一次性创建
Class.bulkCreate(result);