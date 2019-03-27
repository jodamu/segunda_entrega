const express = require('express');
const app = express();
const path = require('path');
const hbs =require('hbs'); 
const bodyParser = require("body-parser");

require('./helpers');

const directoriopublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname, '../partials');





app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'hbs');

app.get('/',(req,res)=>{
	res.render('index',{
		estudiante: 'jose daniel avendaño'
	});
});

app.post('/admin_coordinador',(req,res)=>{
	res.render('admin_coordinador',{
		idcurso: req.body.idcurso,
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		valor: req.body.valor,
		intencidad: req.body.intencidad,
		modalidad: req.body.modalidad,
		estado: req.body.estado
	});


});

app.post('/admin_inscritos',(req,res)=>{
	res.render('admin_inscritos',{
		documento: req.body.documento,
		nombre: req.body.nombre,
		correo: req.body.correo,
		telefono: req.body.telefono,
		curso: req.body.curso
	});


});

app.get('/coordinador',(req,res)=>{

	res.render('coordinador');
});

app.get('/listacurso',(req,res)=>{

	res.render('listacurso',{
		curso: req.query.curso
	});
});

app.get('/inscribir',(req,res)=>{

	res.render('inscribir');
});


app.get('/listainscritos',(req,res)=>{

	res.render('listainscritos', {
		documento: req.query.documento
	});
});

 
app.listen(3000, ()=>{
console.log('escuchando en el puerto 3000');
});

app.get('*', (req, res)=>{
	res.render('error', {
		estudiante: 'error'
	});
})