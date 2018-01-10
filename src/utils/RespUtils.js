const STATUS_CODE_SUCCESS = 200;

function isSuccess(statusCode) {
    return STATUS_CODE_SUCCESS === statusCode;
}

export {
    isSuccess
}