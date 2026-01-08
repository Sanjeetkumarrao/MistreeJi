class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400 // Agar code 400 se kam hai toh success true hoga
    }
}

export { ApiResponse }