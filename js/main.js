//consignas............
//1 cargar tareas-- listorty
//2 marcarlas como hechas -- listorty
//3 borrarlas -- listorty
//4 crear nueva tarea -- listorty
//5 guardarlo en el storage -- listorty

class Tarea {
  constructor(id, nombre, descripcion, resuelta = false) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.resuelta = resuelta;
  }
}

let tareas//crear la variable con alcance global para recorrerla desde la app

//verificar si hay algun dato en el storage
let datoAlmacenado = localStorage.getItem("tareas");
if (datoAlmacenado == null) {
  //cargar el local storage
  tareas = [
    new Tarea("1", "Tarea 1", "Cuidado personal: Bañarse, vestirse, asearse, cuidar la salud.", true),
    new Tarea("2", "Tarea 2", "Hogar: Limpieza, cocina, compras, mantenimiento.", true),
    new Tarea("3", "Tarea 3", "Trabajo: Tareas laborales, reuniones, proyectos.", false),
    new Tarea("4", "Tarea 4", "Estudios: Tareas académicas, lecturas, investigaciones.", false),
    new Tarea("5", "Tarea 5", "Sociales: Interacciones sociales, hobbies, actividades recreativas.", false),
  ];
  localStorage.setItem("tareas",JSON.stringify(tareas))
  
} else {
  //Cargar el arrray del local storage
  tareas=JSON.parse(localStorage.getItem("tareas"))

}


function app(tareas) {
  function crearNuevaTarea(tareas){
    const form = document.getElementById("form")}
  form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const titulo = document.getElementById("titulo-nt")
    const descripcion = document.getElementById("descripcion-nt")
    if (titulo != "") {
      tareas.push(new Tarea(`${tareas.length+1}`,titulo.value,descripcion.value))
      titulo.value=""
      descripcion.value=""
    }
    localStorage.setItem("tareas",JSON.stringify(tareas))
    document.getElementById("contenedor-tareas").innerHTML = ""
    cargarTareas(tareas)

  })
  function crearContenedorTareas() {
    const contenedor = document.createElement("div");
    contenedor.id = "contenedor-tareas";
    document.body.appendChild(contenedor);
  }
  function cargarTareas(tareas){
    function eliminarTarea(idTarea, tareas){
      const indice = tareas.findIndex(tarea => idTarea==tarea.id)
      if (indice != -1) {
        tareas.splice(indice,1) // rebana tantos elementos hacia la derecha como numero indicado
        console.log(tareas);
      } else{
        alert("No se encontro la tarea")
      }
    }
    
    tareas.forEach(tarea => {
        const card = document.createElement("div")
        card.id = `t${tarea.id}`
        card.classList.add("tarea")
        card.innerHTML = `
        <h3>${tarea.nombre}</h3>
        <p><b>${tarea.descripcion}</b></p>
        <label><b>Resuelto</b></label><input class="checkbox" type="checkbox" ${tarea.resuelta ? "checked": ""}>
        <button class="boton"><b>Eliminar</b></button>`
        document.getElementById("contenedor-tareas").appendChild(card)
        // agregar escuchadores
        document.querySelector(`#t${tarea.id} > .checkbox`).addEventListener("click",()=>{
          if (tarea.resuelta) {
            tarea.resuelta = false
          } else {
            tarea.resuelta = true
          }
          localStorage.setItem("tareas",JSON.stringify(tareas))//convierte el array en un JSON
        })

        document.querySelector(`#t${tarea.id} > .boton`).addEventListener("click",()=>{
          const tareaaEliminar = document.querySelector(`#t${tarea.id}`);
          tareaaEliminar.remove();
          eliminarTarea(tarea.id,tareas)//elimina de el array actual
          localStorage.setItem("tareas",JSON.stringify(tareas))//convierte el array en un JSON

        })

    });
    
    
  }
  

  crearContenedorTareas()

  cargarTareas(tareas)
}

window.onload = app(tareas);
