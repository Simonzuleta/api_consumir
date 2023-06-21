const url = 'http://localhost:8084/api/novedad/';

const listarDatos = async () => {
  let respuesta = '';
  let body = document.getElementById('contenido');

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaNovedades = data.novedades;

      listaNovedades.map(function (novedad) {
        respuesta += `<tr><td>${novedad.nombre}</td>` +
          `<td>${novedad.descripcion}</td>` +
          `<td>${novedad.tipoNovedad}</td>` +
          `<td>${novedad.autor}</td>` +
          `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(novedad)})'>Editar</a></td>` +
          `<td><a class="waves-effect waves-light btn modal-danger red" href='#' onclick='eliminar(${JSON.stringify(novedad._id)})'>Eliminar</a></td></tr>`;
      });

      body.innerHTML = respuesta;
    });
};

const registrar = async () => {
  let _nombre = document.getElementById('nombre').value;
  let _descripcion = document.getElementById('descripcion').value;
  let _tipoNovedad = document.getElementById('tipoNovedad').value;
  let _autor = document.getElementById('autor').value;

  if (_nombre.trim() === '') {
    Swal.fire(
      'Error',
      'Por favor ingresa el nombre',
      'error'
    );
    return;
  }

  if (_descripcion.trim() === '') {
    Swal.fire(
      'Error',
      'Por favor ingresa la descripción',
      'error'
    );
    return;
  }

  if (_tipoNovedad.trim() === '') {
    Swal.fire(
      'Error',
      'Por favor ingresa el tipo de novedad',
      'error'
    );
    return;
  }

  if (_autor.trim() === '') {
    Swal.fire(
      'Error',
      'Por favor ingresa el autor',
      'error'
    );
    return;
  }

  let _novedades = {
    nombre: _nombre,
    descripcion: _descripcion,
    tipoNovedad: _tipoNovedad,
    autor: _autor
  };

  fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(_novedades),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(json => {
      Swal.fire(
        json.msg,
        '',
        'success'
      );
    });
};

const editar = (novedades) => {
  document.getElementById('nombre').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('tipoNovedad').value = '';
  document.getElementById('autor').value = '';

  document.getElementById('nombre').value = novedades.nombre;
  document.getElementById('descripcion').value = novedades.descripcion;
  document.getElementById('tipoNovedad').value = novedades.tipoNovedad;
  document.getElementById('autor').value = novedades.autor;
};

const actualizar = async () => {
  let _nombre = document.getElementById('nombre').value;
  let _descripcion = document.getElementById('descripcion').value;
  let _tipoNovedad = document.getElementById('tipoNovedad').value;
  let _autor = document.getElementById('autor').value;

  if (_nombre.trim() === '') {
    Swal.fire(
      'Error',
      'Por favor ingresa el nombre',
      'error'
    );
    return;
  }

  if (_descripcion.trim() === '') {
    Swal.fire(
      'Error',
      'Por favor ingresa la descripción',
      'error'
    );
    return;
  }

  if (_tipoNovedad.trim() === '') {
    Swal.fire(
      'Error',
      'Por favor ingresa el tipo de novedad',
      'error'
    );
    return;
  }

  if (_autor.trim() === '') {
    Swal.fire(
      'Error',
      'Por favor ingresa el autor',
      'error'
    );
    return;
  }

  let _novedades = {
    nombre: _nombre,
    descripcion: _descripcion,
    tipoNovedad: _tipoNovedad,
    autor: _autor
  };

  fetch(url, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(_novedades),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(json => {
      alert(json.msg);
    });
};

const eliminar = (id) => {
  if (confirm('¿Estás seguro de realizar la eliminación?') == true) {
    let novedades = {
      _id: id
    };

    fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify(novedades),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(json => {
        alert(json.msg);
      });
  }
};

if (document.querySelector('#btnRegistrar')) {
  document.querySelector('#btnRegistrar').addEventListener('click', registrar);
}

if (document.querySelector('#btnActualizar')) {
  document.querySelector('#btnActualizar').addEventListener('click', actualizar);
}
