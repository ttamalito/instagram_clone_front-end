


function some() {
    console.log('Every second')
    setTimeout(()=>{
        some()
    }, 1000)
}

export default some;

