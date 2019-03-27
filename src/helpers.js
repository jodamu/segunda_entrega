const hbs = require('hbs');
const fs = require('fs');
const listar = ()=>{
	try{


	//listacurso=[];
	listacurso=require('../views/cursos.json');
	
	//console.log(listacurso);
	//listacurso = JSON.parse(fs.readFileSinc('./views/cursos.json'));
}
catch(error){
		console.log(error);
		listacurso=[];
}
}




hbs.registerHelper('crearCurso', (idcurso, nombre, descripcion, valor, intencidad, modalidad, estado)=>{
	
listar();

let est = {
		idcurso: idcurso,
		nombre: nombre,
		descripcion: descripcion,
		valor: valor,
		intencidad: intencidad,
		modalidad: modalidad,
		estado: estado
	};

	let duplicado= listacurso.find(nom=>nom.idcurso==idcurso);
	if(!duplicado){
	listacurso.push(est);
	console.log(listacurso);
	guardar();
	
	return '<div class="alert alert-success" role="alert"> Registro Exitoso </div>';
		}	
		else 
			return '<div class="alert alert-danger" role="alert">  ya existe otro curso con ese id</div>';
	
})


hbs.registerHelper('listadoCursos',()=>{
	listadoCurso=require('../views/cursos.json')
	let texto="<table class='table table-bordered table-hover'>\
	<thead  class='thead-dark'>\
	<th>ID curso</th>\
	<th>Nombre</th>\
	<th>Descripcion</th>\
	<th>Valor</th>\
	<th>estado</th>\
	</thead>\
	<tbody>";

	listadoCurso.forEach(curso =>{
		texto=texto +
		'<tr>' +
		'<td>' + curso.idcurso + '</td>' +
		'<td>' + curso.nombre + '</td>' +
		'<td>' + curso.descripcion + '</td>' +
		'<td>' + curso.valor + '</td>' +
		'<td>' + curso.estado + '</td>' 

	});
	texto = texto + '</body> </table>';
	return texto;

})

hbs.registerHelper('listadoCursosSelect',()=>{
	listadoCurso=require('../views/cursos.json')
	let texto='<select class="form-control" name="curso" id="curso">';
		texto=texto +
		'<option value="">--Seleccionar Curso--</option>' ;
	listadoCurso.forEach(curso =>{
		if(curso.estado=='disponible'){
		texto=texto +
		'<option value="' + curso.idcurso + '">' + curso.nombre + '</option>' ;
	}

	});
	texto = texto + '</select>';
	return texto;

})
 

 hbs.registerHelper('Inscrito', (idcurso, nombre, descripcion, valor, intencidad, modalidad, estado)=>{
	
listarins();

let est = {
		idcurso: idcurso,
		nombre: nombre,
		descripcion: descripcion,
		valor: valor,
		intencidad: intencidad,
		modalidad: modalidad,
		estado: estado
	};

	let duplicado= listacurso.find(nom=>nom.idcurso==idcurso);
	if(!duplicado){
	listacurso.push(est);
	console.log(listacurso);
	guardar();
	
	return '<div class="alert alert-success" role="alert"> Registro Exitoso </div>';
		}	
		else 
			return '<div class="alert alert-danger" role="alert">  ya existe otro curso con ese id</div>';
	
})

 hbs.registerHelper('cambestado', (curso)=>{
 	if(curso!=""){
 		listar();
 		let camestado= listacurso.find(nom=>nom.idcurso==curso);
	if(camestado){
		camestado['estado']="cerrado";
	
	guardar();
	return '<div class="alert alert-success" role="alert"> Cambio Exitoso </div>';
		}
 }

 });

hbs.registerHelper('eliminar', (ident)=>{
	listarInscritos();
 	if(ident!=""){
 		
	let nuevo= listainscritos.filter(documen => documen.ident!=ident);
	if(nuevo.length==listainscritos.length){
		console.log('ningun existe el documento')
	} else {
		listainscritos=nuevo;
		guardarInscritos()
	}
		
 }

 });


const listarInscritos = ()=>{
	try{


	//listacurso=[];
	listainscritos=require('../views/inscritos.json');
	
	//console.log(listacurso);
	//listacurso = JSON.parse(fs.readFileSinc('./views/cursos.json'));
}
catch(error){
		console.log(error);
		listainscritos=[];
}
}

hbs.registerHelper('crearInscrito', (documento, nombre, correo, telefono, curso)=>{
	
listarInscritos();


let est = {
		documento: documento,
		nombre: nombre,
		correo: correo,
		telefono: telefono,
		curso: curso,
		ident: documento+curso
	};

	console.log(est);

	let duplicado= listainscritos.find(nom=>nom.documento==documento);
	if(!duplicado){
	listainscritos.push(est);
	console.log(listainscritos);
	guardarInscritos();
	
	return '<div class="alert alert-success" role="alert"> Registro Exitoso </div>';
		}	
		else 
			return '<div class="alert alert-danger" role="alert">  ya existe otra inscripcion con ese id</div>';
	
})

 hbs.registerHelper('listadoinscritos',()=>{
	listainscritos=require('../views/inscritos.json')
	let texto="<table class='table table-bordered table-hover'>\
	<thead  class='thead-dark'>\
	<th>Documento</th>\
	<th>Nombre</th>\
	<th>Correo</th>\
	<th>telefono</th>\
	<th>curso</th>\
	<th> </th>\
	</thead>\
	<tbody>";

	listainscritos.forEach(curso =>{
		texto=texto +
		'<tr>' +
		'<td>' + curso.documento + '</td>' +
		'<td>' + curso.nombre + '</td>' +
		'<td>' + curso.correo + '</td>' +
		'<td>' + curso.telefono + '</td>' +
		'<td>' + nombreCurso(curso.curso) + '</td>' +
		'<td><a href="/listainscritos?documento=' + curso.ident + '" class="btn btn-danger">Eliminar</a></td>' 

	});
	texto = texto + '</body> </table>';
	return texto;

})

const nombreCurso=(idcurso)=>{
	listar();
	let encontrado= listacurso.find(nom=>nom.idcurso==idcurso);
	if(encontrado){
		return encontrado.nombre;
	}
}


const guardarInscritos = ()=>{
	let datos=JSON.stringify(listainscritos);
	fs.writeFile('./views/inscritos.json', datos, (err)=>{
		if(err) throw (err);
		console.log('Archivo creado con exito');
	})
}



const guardar = ()=>{
	let datos=JSON.stringify(listacurso);
	fs.writeFile('./views/cursos.json', datos, (err)=>{
		if(err) throw (err);
		console.log('Archivo creado con exito');
	})
}


hbs.registerHelper('listadoCursosIndex',()=>{
	listadoCurso=require('../views/cursos.json')
	let texto='<div class="row">';

	listadoCurso.forEach(curso =>{
		if(curso.estado=='disponible'){
		texto=texto +
		'<div class="col-sm-4">' +
		'<div class="card"><div class="card-body">' +
		'<h5 class="card-title">' + curso.nombre + '</h5>' +
		'<h6 class="card-subtitle mb-2 text-muted">' + curso.descripcion + '</h6>'+
		'<a data-toggle="modal" data-target="#curso' + curso.idcurso + '" class="btn btn-primary">Leer más</a>' +
		'</div></div></div>';

	texto=texto +'<div id="curso' + curso.idcurso + '" class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">'+
  '<div class="modal-dialog modal-sm">'+
   ' <div class="modal-content">'+
      ' <ul class="list-group">' +
  '<li class="list-group-item active">' + curso.nombre + '</li>' +
  '<li class="list-group-item">Descripcion: ' + curso.descripcion + '</li>' +
  '<li class="list-group-item">Valor: ' + curso.valor + '</li>' +
  '<li class="list-group-item">Modalidad: ' + curso.modalidad + '</li>' +
 ' <li class="list-group-item">Intencidad: ' + curso.intencidad + ' Horas</li>' +
'  </ul>' +
    '</div>'+
  '</div>'+
'</div>'

}

		 });
	texto = texto + '</div>';
	return texto;

})