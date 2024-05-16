import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
//import { getFirestore } from "./node_modules/firebase/firebase-firestore-lite.js";

import { getFirestore, collection, getDocs,addDoc,setDoc ,deleteDoc,doc, onSnapshot,query,updateDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA3GrC8Uo8y2Xueer57mYQgPRKGMthPPa8",
  authDomain: "sm-firebase-18f35.firebaseapp.com",
  projectId: "sm-firebase-18f35",
  storageBucket: "sm-firebase-18f35.appspot.com",
  messagingSenderId: "495088006295",
  appId: "1:495088006295:web:152cc32e06494db42b25d2",
  measurementId: "G-PQJQH9WFJD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let bti =  document.getElementById("inser");

let btc =  document.getElementById("consu");

const tablaPapeleta = document.querySelector("#tbPapeleta")

bti.addEventListener('click', async (e) => {
  try {
    const docRef = await addDoc(collection(db, "Papeleta"), {
      Matricula: document.getElementById("mat_pap").value,
      Programa: document.getElementById("pro_edu_pap").value,
      Semestre: document.getElementById("sem_pap").value,
      Grupo: document.getElementById("gru_pap").value,
      Registro: "Maribel Guardia",     
    });
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});


btc.addEventListener('click', async (e)=> {

  ShowUsers()
  viewUsuarios2()
  
})


async function ShowUsers() {

  tbPapeleta.innerHTML = ""
  const Allusers = await ViewUsuarios()

  Allusers.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //  console.log(doc.id, " => ", doc.data());
      const datos = doc.data()
      
      tbPapeleta.innerHTML += `<tr class = "regis" data-id="${doc.id}">
      <td>${datos.Matricula}</td>
      <td>${datos.Programa}</td>
    
      <td>${datos.Semestre}</td>
      <td>${datos.Grupo}</td>
      <td>
          <button class="btn-primary btn m-1 editar_" data-id="${doc.id}" >
           Editar 
          <span class="spinner-border spinner-border-sm" id="Edit-${doc.id}" style="display: none;"></span>
          </button> 

          <button class="btn-danger btn eliminar_"  data-id="${doc.id}|${datos.Matricula}|${datos.Programa}" >
          Eliminar 
          <span class="spinner-border spinner-border-sm" id="elim-${doc.id}" style="display: none;"></span>
          
          </button>
      </td>
   
      </tr>`

  });


}

 async function ViewUsuarios() {
  const userRef = collection(db, "Papeleta")
  const Allusers = await getDocs(userRef)
  return Allusers
}

async function viewUsuarios2(){

  const q = query(collection(db, "Papeleta"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];

  querySnapshot.forEach((doc) => {
      cities.push(doc.data().nombre);     
  });
  console.log("Current cities in CA: ", cities.join(", "));
});
}

$("#tbPapeleta").on("click", ".eliminar_", async function () {

  const producto_id = $(this).data("id")
  console.log("click en " + producto_id)
 let datox = producto_id.split('|')
 console.log("datos  " + datox[1])
  try {
     
    await deleteDoc(doc(db, "Papeleta", datox[0]));

  } catch (error) {
      console.log("error", error)

  }

})


$("#tbPapeleta").on("click", ".editar_", async function () {

  const producto_id = $(this).data("id")
  console.log("click en editar" + producto_id)

  try {
    const washingtonRef = doc(db, "Papeleta", producto_id.toString());

    await updateDoc(washingtonRef, {
      Matricula: document.getElementById("mat_pap").value,
      Programa: document.getElementById("pro_edu_pap").value,
      Semestre: document.getElementById("sem_pap").value,
      Grupo: document.getElementById("gru_pap").value,
      Registro:"Maribel Guardia",  
    });

  } catch (error) {
      console.log("error", error)
  }
})


$("#tbPapeleta").on("click",".regis", async function () {

  const producto_id = $(this).data("id")
  console.log("click en " + producto_id)


  try {
     
  } catch (error) {
      console.log("error", error)

  }

})

// Consultar la colección de Unidades en Firestore y obtener los IDs
async function obtenerIdsUnidades() {
  const unidadesRef = collection(db, "Unidades");
  const snapshot = await getDocs(unidadesRef);
  const ids = [];
  snapshot.forEach((doc) => {
    ids.push(doc.id);
  });
  return ids;
}

// Función para crear opciones desplegables en el formulario HTML
async function crearMenuDesplegable() {
  const ids = await obtenerIdsUnidades();
  const unidadContainer = document.getElementById("unidad-container");

  // Limpiar opciones desplegables previas
  unidadContainer.innerHTML = "";

  // Crear opción predeterminada
  const defaultOption = document.createElement("option");
  defaultOption.text = "Seleccionar Unidad";
  defaultOption.value = "";
  unidadContainer.appendChild(defaultOption);

  // Crear opciones desplegables con los IDs de las unidades
  ids.forEach((id) => {
    const option = document.createElement("option");
    option.text = id;
    option.value = id;
    unidadContainer.appendChild(option);
  });
}

// Llamar a la función para crear el menú desplegable cuando se cargue la página
document.addEventListener("DOMContentLoaded", function () {
  crearMenuDesplegable();
});
