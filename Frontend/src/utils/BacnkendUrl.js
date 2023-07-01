

let BackEndUrl = ''

    if (process.env.NODE_ENV === 'development') {
        BackEndUrl = 'http://localhost:5001'
    }
    else {
        BackEndUrl =  'https://nikebackend.vercel.app'
    }



export default BackEndUrl