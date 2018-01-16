function isNullOrEmpty(value) {
    return value === undefined || value === null || value === "";
}

function isEmpty(obj){
    if(typeof (obj) != 'number' && (!obj || obj == null || obj == ' ' || obj == undefined || typeof (obj) == 'undefined')){
        return true;
    }
    return false;
}

//判断对象不为空
function isNotEmpty(obj){
    if(!this.isEmpty(obj)){
        return true;
    }
    return false;
}

function format() {
    let args = arguments;
    return args[0].replace(/\{(\d+)\}/g,function(s,i){
        return args[i];
    });
}


String.prototype.format = function(){
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function(m,i){
            return args[i];
        });
}

export {
    isNullOrEmpty, format, isEmpty, isNotEmpty
}