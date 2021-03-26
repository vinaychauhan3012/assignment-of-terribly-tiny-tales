const express = require('express')
const axios = require('axios') // to make http request

const app= express()
let rollNo=[]

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.set('view engine', 'hbs') //handlebars as a templating engine

app.get('/', (req,res)=>{
  res.render('index')
})

async function getData(){        //it fetches value from api ,i.e, pass/fail and store it in key value pairs 
  let keys={}                     // roll no as keys and pass/fail as values
  for(let i=0;i<rollNo.length;i++){
    const res = await axios.get(`https://terriblytinytales.com/testapi?rollnumber=${rollNo[i]}`)
    keys[rollNo[i]] = res.data;
  }
  return keys
}

app.get('/results',async (req,res)=>{
  const keys = await getData()
  
  res.render('results', {keys}) //showing results.hbs and passing the data in the variable keys to frontend


})

app.post('/',(req,res)=>{
  rollNo = (req.body.rollNo).split(',').map(Number) //converting string into array of numbers
  res.redirect('results') //making get req for performing further actions
})


app.listen(3366,()=>{
  console.log('Server started at localhost:3366')
})
