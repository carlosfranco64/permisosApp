const  convertirABase64=(text)=> {
    let base64 = Buffer.from(text, 'utf-8').toString('base64');
    return base64;
}


module.exports={convertirABase64}

