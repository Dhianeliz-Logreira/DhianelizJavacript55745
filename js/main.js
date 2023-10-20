const listaLibros = document.getElementById("lista-libros");
const favoritos = document.getElementById("favoritos");

/* function mostrarLibros() {
  fetch("libros.json")
    .then((response) => response.json())
    .then((libros) => {
      listaLibros.innerHTML = '';
      libros.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = libro.titulo;
        const btnAgregar = document.createElement("button");
        btnAgregar.textContent = "AGREGAR A FAVORITOS";
        btnAgregar.classList.add("button");
        btnAgregar.addEventListener("click", () => {
          agregarFavorito(libro);
        });
        li.appendChild(btnAgregar);
        listaLibros.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error al cargar los libros:", error);
    });
}
 */

const libros = [
    
    {
        "titulo": "EL PSICOANALISTA",
        "autor": "John K.",
        "genero": "Ficción",
    },
    {
        "titulo": "EL LABERINTO DE ESPIRITUS",
        "autor": "Carlos R.",
        "genero": "Suspenso",
    },
    {
        "titulo": "EL TIEMPO DE COSTURAS",
        "autor": "Maria D.",
        "genero": "Romance",
    },
    {
        "titulo": "LA MUJER DEL VIAJERO",
        "autor": "Marcio T.",
        "genero": "Romance",
    }, 
];


function mostrarLibros() {
    listaLibros.innerHTML = '';
    libros.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = libro.titulo;
        const btnAgregar = document.createElement("button");
        btnAgregar.textContent = "AGREGAR A FAVORITOS";
        btnAgregar.classList.add("button");
        btnAgregar.addEventListener("click", () => {
            agregarFavorito(libro);
        });
        li.appendChild(btnAgregar);
        listaLibros.appendChild(li);
    });
}


function agregarFavorito(libro) {
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    const libroDuplicado = favoritosGuardados.find(fav => fav.titulo === libro.titulo);

    if (!libroDuplicado) {
        const li = document.createElement("li");

        const detalleLibro = document.createElement("div");
        detalleLibro.classList.add("detalle-libro"); 

        detalleLibro.innerHTML = `
            <p><strong>Título:</strong> ${libro.titulo}</p>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Género:</strong> ${libro.genero}</p>
        `;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.addEventListener("click", () => {
            eliminarFavorito(libro, li);
        });

        li.textContent = libro.titulo;

        li.appendChild(btnEliminar);
        li.appendChild(detalleLibro);

        favoritos.appendChild(li);

        favoritosGuardados.push(libro);
        localStorage.setItem("favoritos", JSON.stringify(favoritosGuardados));

        Swal.fire({
            position: 'center',
            imageUrl: 'https://cdn-icons-png.flaticon.com/128/867/867912.png',
            imageWidth: 100,
            title: 'Se agregó a la lista de favoritos',
            showConfirmButton: false,
            timer: 3000,
            background: '#9ED2BE'
          });
    } 
}

function eliminarFavorito(libro, elementoLi) {
    Swal.fire({
        title: '¿Seguro que deseas eliminar este libro de tus favoritos?',
        imageUrl: 'https://cdn-icons-png.flaticon.com/128/564/564619.png',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        showDenyButton: true,
        denyButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
            const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
            const nuevosFavoritos = favoritosGuardados.filter(fav => fav.titulo !== libro.titulo);
            localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
            elementoLi.remove();
          Swal.fire('El libro ha sido eliminado de tu lista de favoritos con éxito.', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('El libro no ha sido eliminado.', '', 'info')
          }
      });
}

function cargarFavoritos() {
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritosGuardados.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = libro.titulo;
        favoritos.appendChild(li);
    });
}

mostrarLibros();
cargarFavoritos();

