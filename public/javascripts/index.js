const restBooksApi = axios.create({
  baseUrl: 'http://localhost:3000'
})

function buscaLibro(strLibro){
  restBooksApi.post('/buscar', strLibro)
  .then(respuestaAPI =>{
    let htmlrespuesta = `<tr>
      <th>Nombre</th>
      <th>URL</th>
    </tr>`
    respuestaAPI.data.forEach((libro)=>{
      htmlrespuesta += `<tr>
      <td><a href="/libros/${libro._id}">${libro.title}</a></td>
      <td> ${libro.author[0].} {{this.author.[0].lastName}}</td>
      <td><a href="/libros/edit?book_id={{this._id}}" class="edit-button">Editar</a>
      </tr>`
    })
    document.getElementById("tablalibros")

  })
  .catch(err=>{
    console.log("Error es ", err);
  })
}

document.getElementById('titulo').onkeydown = ()=>{
  const libro = document.getElementById('titulo').value
  const busqueda = {
    titulo: libro
  }
  buscaLibro(busqueda)
}
