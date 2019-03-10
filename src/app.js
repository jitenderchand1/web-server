const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;


hbs.registerPartials(partialsPath);

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirPath));

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        description: 'Use this site to get weather information'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Page',
        imageSrc: './images/jitender.jpg'
    })
})

app.get('/weather',(req, res)=>{
    const { query } = req;
    const address = query.address;
    if(!address){
        res.send({
            error: 'You must provide a address tearm'
        })
    }
    else{
        geocode(address, (error, {latitude, longitude, location } = {}) => {
            if(error){
                return res.send({
                    error,
                })
            }

            forecast(latitude, longitude, (error,forecast)=>{
               if(error){
                   return res.send({
                       error,
                   })
               }
               return res.send({
                    forecast,
                    location,
                    address,
               })
           })
            
        })
    }
})

app.get('/product', (req,res) => {
    const { query } = req;
    if(!query.search){
        res.send({
            error: 'you must provide a search term'
        })
    }
    else{
        res.send({
            products: []
        })
    }
})

app.get('*',(req, res)=>{
    res.render('404')
})

// app.get('/about',(req, res)=>{
//     res.send('chand')
// })


app.listen(port, ()=> {
    console.log(`server is up on port ${port}`)
});

