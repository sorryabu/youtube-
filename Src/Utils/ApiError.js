class apiError extends Error{
    constructor(
        statusCode,
        message="something went wrong",
        errors=[],
        statck=""
        
    )
    {
        super(message)
        this.  statusCode=  statusCode,
        this.data=null,
        this.errors=errors,
        this.message=message
        this.success=false

        if(statck){
        this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export {apiError}