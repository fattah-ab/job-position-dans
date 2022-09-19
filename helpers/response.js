let response = {
    successRes : (message, data) => {
       return {
           success: true,
           message: message,
           data: data
       }
   }
}

module.exports = response