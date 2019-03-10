const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', function(e){
    const location = document.querySelector('#location').value;
    e.preventDefault()
    fetch(`http://localhost:3000/weather?address=${location}`).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            document.querySelector('#weatherInfo').innerHTML = data.error;
        }
        else{
            document.querySelector('#weatherInfo').innerHTML = data.forecast;
        }
        
    })
});
})


