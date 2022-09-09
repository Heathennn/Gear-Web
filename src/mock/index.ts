
export default [
    {
        url: '/toolWarn/getWarnLogConfigListByFieldCodes/',
        method: 'post',
        response: ({body}) => {
            console.log(body)
            return {
                list: [],
                total: 0
            }
        }
    }
]
