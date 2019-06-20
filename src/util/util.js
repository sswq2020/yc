export const resolveTreeDate = (dataTree)=>{
    const _resloveData = (data)=>{
        data.label = data.name;
        if(data.children){
            data.children.forEach((target)=>{
                _resloveData(target)
            })
        }
    }
    dataTree.forEach(target=>{
        _resloveData(target)
    })
    dataTree.forEach(target=>{
        target.disabled =true
    })
    return dataTree
}

export const getCheckId = (data) =>{
    let ids = [];
    const getId = (obj)=>{
        if(obj.checked){
            ids.push(obj.id)
        }
        if(obj.children){
            obj.children.forEach(target=>{
                getId(target)
            })
        }
    }
    data.forEach(target=>{
        getId(target)
    })
    return ids
}


export const add = (arr,obj,prop)=>{
    let processC = true;
    arr.forEach(target=>{
        if(target[prop] == obj[prop]){
            Object.keys(obj).forEach(tar=>{
                target[tar] = obj[tar]
            })
            processC = false
        }
    })
    if(processC){
        arr.push(obj)
    }
    return arr
}

export const getUrlRelativePath = () => {
    let url = document.location.toString();
    let arrUrl = url.split("//");

    let start = arrUrl[1].indexOf("/");
    let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if(relUrl.indexOf("?") != -1){
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

export const setglobelPermissions = (id) => {
    let token = JSON.parse(localStorage.getItem('token'))
    if(token.additionalInformation!==undefined && token.additionalInformation.permissions!==undefined && Object.prototype.toString.call(token.additionalInformation.permissions) == '[object Array]'){
        window.globelPermissions = token.additionalInformation.permissions.filter(target=>{return target.systemId == id})
        window.globelPermissionsType1 = window.globelPermissions.filter(target=>{return target.type==1})
        window.globelPermissionsType2 = window.globelPermissions.filter(target=>{return target.type==2})
        window.globelPermissionsType3 = window.globelPermissions.filter(target=>{return target.type==3}).map(target=>target.permissionValue)
    }else{
        localStorage.clear()
    }
}