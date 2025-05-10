import React, { useEffect, useState } from "react";

const Home = () => {
  const [listado, setListado] = useState([]);
  const [textoInput, setTextoInput] = useState("");

  useEffect(() => {
    listarTareas();
  }, []);

  const manejarCambioInput = (e) => {
    setTextoInput(e.target.value);
  };

  const agregarItem = () => {
    const nuevaTarea = {
      label: textoInput.trim(),
      is_done: false
    };

    if (nuevaTarea.label !== "") {
      fetch('https://playground.4geeks.com/todo/todos/AnaliaMagallanes', {
        method: "POST",
        body: JSON.stringify(nuevaTarea),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log("Tarea guardada:", data);
          listarTareas();
          setTextoInput(""); 
        })
        .catch(error => {
          console.log("Error al guardar tarea:", error);
        });
    }
  };

  const listarTareas = () => {
    fetch('https://playground.4geeks.com/todo/users/AnaliaMagallanes')
      .then(resp => resp.json())
      .then(data => {
        console.log("Tareas recibidas:", data.todos);
        setListado(data.todos);
      })
      .catch(error => {
        console.log("Error al listar tareas:", error);
      });
  };

  const eliminarItem = (todoId) => {
  fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
    method: "DELETE"
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Error al eliminar");
      return resp.status === 204 ? null : resp.json();
    })
    .then((data) => {
      console.log("Tarea eliminada:", data);
      listarTareas(); 
    })
    .catch((error) => {
      console.log("Error al eliminar tarea:", error);
    });
};



  return (
    <>
      <h1>Todos</h1>
      <input 
        type="text" 
        value={textoInput}
        onChange={manejarCambioInput} 
        placeholder="Escribe una tarea" 
      />
      <button onClick={agregarItem}>Agregar item</button>

     <ul>
  {listado.map((item) => (
    <li key={item.id}>
      {item.label}{" "}
      <button onClick={() => eliminarItem(item.id)}>Eliminar</button>
    </li>
  ))}
</ul>

    </>
  );
};

export default Home;
