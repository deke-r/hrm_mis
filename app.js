var express=require('express')
var app= express()

app.set('view engine','ejs')
app.use('/static',express.static("public"))
// Serve files from the 'upload' directory
app.use('/static',express.static("uploads"))
app.use('/static/pdf',express.static("/hrm_documents/pdf"))
app.use('/static/image',express.static("/hrm_documents/image"))
app.use('/hrm_documents',express.static("/hrm_documents"))

var connection=require('./db/connection.js')
connection()










app.use('/',require('./routes/routes'))

app.listen(6600,()=>{
    console.log('port is running on 6600')
})