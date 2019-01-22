import {AjaxGet, AjaxDic, AjaxPost} from '../../../api/index'

function getUserList(config, success, fail){
    let url = 'user/list'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getUserDetail(config, success, fail){
    let url = 'user/detail'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getDictionary(params){
    return new Promise((resolve, reject)=>{
        resolve(AjaxDic(params))
    }).catch((err)=>{
        return err
    })
}

function postUpdateUser(config, success, fail){
    let url = 'user/updateUser'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

export {
    getUserDetail,
    getDictionary,
    postUpdateUser,
    getUserList
}