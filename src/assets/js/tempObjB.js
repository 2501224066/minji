/**
 * 判断数组对象中是否有某个对象，有则替换无则添加
 * @param {*} initialArr 源数组
 * @param {*} obj 判定的对象
 * @param {*} pro 对象中的某个属性名（唯一，通常为id）
 */
export const formateArrObjData = (initialArr, obj, pro) => {
    // 判定数据是否为数组
    if (!(initialArr instanceof Array)) {
        return '请传入正确格式的数组'
    }
    // 判定数据是否为对象
    if (!(obj instanceof Object)) {
        return '请传入正确格式的对象'
    }
    if (!pro) {
        return '请传入正确格式的属性名'
    }

    let index = initialArr.findIndex((val) => val[pro] === obj[pro])
    // 如果有就替换  没有就添加
    if (initialArr.findIndex((val) => val[pro] === obj[pro]) !== -1) {
        if (obj.num == 0) {
            initialArr.splice(index, 1)
        } else {
            initialArr.splice(index, 1, obj);
        }

    } else {
        initialArr.push(obj);
    }
    return initialArr
}