const url = 'http://localhost:8084/api/docente'

const listarDatos= async()=>{
    let respuesta=''
    let body = document.getElementById('contenido')
    //url de donde se tiene la api
    //consultar/ trabajar apis desde javascript
    fetch (url, {
        method:'GET',
        mode:'cors',
        headers:{"Content-type": "application/json; charset=UTF-8"}
    })

    //obtener la respuesta y convertirla a json 

    .then((resp)=> resp.json())
    //data contiene la informacion
    .then(function(data){
        //devuelve los datos
        let listaDocentes = data.docentes
        //manera de llevar  rapido la lista
        return listaDocentes.map(function(docente){
            
            respuesta+=`<tr><td>${docente.nombre}</td>`+
            `<td>${docente.apellidos}</td>`+
            `<td>${docente.password}</td>`+
            `<td>${docente.correo}</td>`+
            `<td>${docente.estado}</td>`+
            `<td> <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar( ${JSON.stringify(docente)})'>Editar</a><td><a class="waves-effect waves-light btn modal-danger red" href='#' onclick='eliminar(${JSON.stringify(docente)})'>Eliminar</a></td></tr>` 
        
            body.innerHTML= respuesta 
            
        })
    })
}

const registrar = async() =>{

    let _nombre = document.getElementById('nombre').value
    let _apellidos = document.getElementById('apellidos').value
    let _correo = document.getElementById('correo').value
    let _estado = document.getElementById('estado').value

    let _password = document.getElementById('pass').value
    let _confirmarPassword = document.getElementById('confirmPass').value

    if ((_password.length>0 && _confirmarPassword.length>0)&& _password == _confirmarPassword){
        let _docente = {
            nombre : _nombre,
            apellidos: _apellidos,
            correo: _correo,
            password : _password,
            estado : _estado
        }
        fetch (url,{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(_docente),//Convertir el objeto _usuario a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
         //   alert(json.msg)// mensaje que retorna la api
         Swal.fire(
            json.msg,
            '',
            'success'
          )
    })
        
    }else{
       // alert('La contraseña y la confirmación de contraseña no coinciden')
       Swal.fire(
        'La contraseña y la confirmación de contraseña no coinciden, por favor corregir',
        '',
        'error'
      )
    } 

    
// Validación del nombre
if (_nombre.trim() === '') {
    Swal.fire(
      'Por favor ingresa tu nombre',
      '',
      'error'
    );
    return; // Detener el flujo de ejecución en caso de error
  }
  
  // Validación de los apellidos
  if (_apellidos.trim() === '') {
    Swal.fire(
      'Por favor ingresa tus apellidos',
      '',
      'error'
    );
    return;
  }
  
  // Validación del correo electrónico
  if (_correo.trim() === '') {
    Swal.fire(
      'Por favor ingresa tu correo electrónico',
      '',
      'error'
    );
    return;
  } else if (!validarCorreoElectronico(_correo)) {
    Swal.fire(
      'Por favor ingresa un correo electrónico válido',
      '',
      'error'
    );
    return;
  }
  
  // Validación del estado
  if (_estado.trim() === '') {
    Swal.fire(
      'Por favor selecciona tu estado',
      '',
      'error'
    );
    return;
  }
  
  // Validación de las contraseñas
  if (_password.length === 0) {
    Swal.fire(
      'Por favor ingresa una contraseña',
      '',
      'error'
    );
    return;
  } else if (_confirmarPassword.length === 0) {
    Swal.fire(
      'Por favor confirma tu contraseña',
      '',
      'error'
    );
    return;
  } else if (_password !== _confirmarPassword) {
    Swal.fire(
      'La contraseña y la confirmación de contraseña no coinciden, por favor corrige',
      '',
      'error'
    );
    return;
  }

}

const editar=(docente)=>{
  document.getElementById('nombre').value= ''
  document.getElementById('apellidos').value= ''
  document.getElementById('pass').value=''
  document.getElementById('correo').value= ''
  document.getElementById('estado').value= ''

  document.getElementById('nombre').value= docente.nombre
  document.getElementById('apellidos').value= docente.apellidos
  document.getElementById('pass').value=docente.password
  document.getElementById('estado').value= docente.estado
  document.getElementById('correo').value= docente.correo
  
}


//Actualizar editar
const actualizar = async() =>{

  let _nombre = document.getElementById('nombre').value
  let _apellidos = document.getElementById('apellidos').value
  let _estado = document.getElementById('estado').value
  let _correo = document.getElementById('correo').value

  let _password = document.getElementById('pass').value
  let _confirmarPassword = document.getElementById('confirmPass').value

  if ((_password.length>0 && _confirmarPassword.length>0)&& _password == _confirmarPassword){
      let _docente = {
          nombre : _nombre,
          apellidos: _apellidos,
          estado: _estado,
          correo: _correo,
          password : _password,

      }
      fetch (url,{
          method: 'PUT',
          mode: 'cors',
          body: JSON.stringify(_docente),//Convertir el objeto _usuario a un JSON
          headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then((resp)=> resp.json())
      .then(json => {
          alert(json.msg)
  })
      
  }else{
      alert('La contraseña y la confirmación de contraseña no coinciden')
  }   
}







const eliminar = (id)=>{
    if(confirm('Esta seguro de realizar la eliminacion?')== true){
  
    
            let docente = {
                _id: id
            }
            fetch (url,{
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(docente),//Convertir el objeto _usuario a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp)=> resp.json())
            .then(json => {
                alert(json.msg)
        })
       
    }
    
}



if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)

}

if(document.querySelector('#btnActualizar')){
   document.querySelector('#btnActualizar')
   .addEventListener('click',actualizar)
}




