function isNullOrEmpty(value) {
    return value === undefined || value === null || value === "";
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
    isNullOrEmpty, format
}