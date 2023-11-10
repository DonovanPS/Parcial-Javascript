const data = {
  "tasks":{
    "one":{
      "task":"Learning Javascript",
      "state":true,
      "end":"2020/10/21"
    },
    "two":{
      "task":"Reader Book Clean Code",
      "state":false,
      "end":"2023/12/31"
    },
    "three":{
      "task":"Running",
      "state":false,
      "end":"2023/06/25"
    },
    "four":{
      "task":"Pass the Evaluation",
      "state":false,
      "end":"2023/11/09"
    },
    "five":{
      "task":"Go to Karaoke",
      "state":true,
      "end":"2022/08/25"
    },
    "six":{
      "task":"Finish watching the serie",
      "state":false,
      "end":"2023/12/31"
    },
    "seven":{
      "task":"Controll Weight",
      "state":false,
      "end":"2020/11/22"
    }
  }
}



const tableBody =  document.getElementById("table-body");

function cargarData(data) {
  tableBody.innerHTML = '';

  for (const task in data.tasks) {
    const fila = document.createElement('tr');

    const tareaPasada = tareaPasadaDeFecha(task);
    const estadoVigente = tareaPasada ? 'No vigente' : 'Vigente';

    const cumplida = data.tasks[task].state ? 'Si' : 'No';
    const vensida = tareaPasada ? 'Si' : 'No';
    
   
    if (!data.tasks[task].state && !tareaPasada) {
      fila.innerHTML = `
        <td>${task}</td>
        <td>${data.tasks[task].task}</td>
        <td>${cumplida}</td>
        <td>${data.tasks[task].end}</td>
        <td>${estadoVigente}</td>
        <td>${vensida}</td>
        <td><button class="btn btn-primary" onclick="cambiarEstado('${task}')"><i class="fas fa-check"></i> Completada</button></td>
      `;
    } else {
    
      fila.innerHTML = `
        <td>${task}</td>
        <td>${data.tasks[task].task}</td>
        <td>${cumplida}</td>
        <td>${data.tasks[task].end}</td>
        <td>${estadoVigente}</td>
        <td>${vensida}</td>
        <td></td>
      `;
    }

    tableBody.appendChild(fila);
  }
}

function cambiarEstado(taskKey) {
  const tarea = data.tasks[taskKey];
  !tarea.state ? (tarea.state = true, cargarData(data)) : null;
  cargarData(data);
}


function tareaPasadaDeFecha(taskKey) {
  const tarea = data.tasks[taskKey];

  const fechaActual = new Date();
  const fechaFinalizacion = new Date(tarea.end);

 
  return fechaFinalizacion < fechaActual;
  
}




function agregarTarea() {
  const tarea = document.getElementById("tarea").value;
  const fecha = document.getElementById("fecha").value;

 
  const fechaActual = new Date();
  const fechaSeleccionada = new Date(fecha);
  
 
  const fechaActualString = fechaActual.toISOString().split('T')[0];
  const fechaSeleccionadaString = fechaSeleccionada.toISOString().split('T')[0];

  if (fechaSeleccionadaString < fechaActualString) {

    alert('La fecha seleccionada es anterior o igual a la fecha actual. Por favor, elige una fecha futura.');
    return;
  }

 
  const actividades = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];


  const nextIndex = Object.keys(data.tasks).length;


  if (nextIndex < actividades.length) {
    const id = actividades[nextIndex];

    data.tasks[id] = {
      task: tarea,
      state: false,
      end: fecha
    }

    cargarData(data);

    document.getElementById("tarea").value = '';
    document.getElementById("fecha").value = '';
  } else {
    alert('Se alcanzó el límite máximo de actividades (20).');
  }
}




function filtrarCumplidas() {
  
  document.getElementById('1').className = 'btn btn-success';
  document.getElementById('2').className = 'btn btn-primary';
  document.getElementById('3').className = 'btn btn-primary';
  document.getElementById('4').className = 'btn btn-primary';
  
  const dataFiltrada = {
    tasks: Object.fromEntries(
      Object.entries(data.tasks).filter(([task, tarea]) => tarea.state === true)
    )
  };

  cargarData(dataFiltrada);

}

function filtrarNoCumplidasVigentes() {
  
  document.getElementById('1').className = 'btn btn-primary';
  document.getElementById('2').className = 'btn btn-success';
  document.getElementById('3').className = 'btn btn-primary';
  document.getElementById('4').className = 'btn btn-primary';

   const dataFiltrada = {
    tasks: Object.fromEntries(
      Object.entries(data.tasks).filter(([task, tarea]) => !tarea.state && !tareaPasadaDeFecha(task))
    )
  };

 
  cargarData(dataFiltrada);
}


function filtrarCumplidasNoVigentes() {
  document.getElementById('1').className = 'btn btn-primary';
  document.getElementById('2').className = 'btn btn-primary';
  document.getElementById('3').className = 'btn btn-success';
  document.getElementById('4').className = 'btn btn-primary';
  
  const dataFiltrada = {
    tasks: Object.fromEntries(
      Object.entries(data.tasks).filter(([task, tarea]) => tarea.state && tareaPasadaDeFecha(task))
    )
  };
  
  cargarData(dataFiltrada);
}

function mostrarTodas() {
  document.getElementById('1').className = 'btn btn-primary';
  document.getElementById('2').className = 'btn btn-primary';
  document.getElementById('3').className = 'btn btn-primary';
  document.getElementById('4').className = 'btn btn-primary';
  cargarData(data);
}



cargarData(data);