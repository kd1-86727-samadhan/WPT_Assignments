// If any error occurs in application we need to send user info to the user with status code as a error information
function createErrorResult(error) {
    return { status: 'error', error }
}

//  When request(get) process successfully we need to send data along with status code as a success.
function createSuccessResult(data) {
    return { status: 'success', data }
}

// Creating the final result depending on status 
function createResult(error, data) {
    return error ? createErrorResult(error) :
        createSuccessResult(data)
}

// To make available all three function in other js file
module.exports = {
    createResult,
    createSuccessResult,
    createErrorResult,
}