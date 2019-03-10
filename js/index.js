fetch('http://puzzle.mead.io/puzzle').then((res)=>{
    res.json().then((data)=>{
        console.log(data);
    })
})