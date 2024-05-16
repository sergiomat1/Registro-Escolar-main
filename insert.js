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

const tablaEstudiantes = document.querySelector("#tbEstudiantes")

bti.addEventListener('click', async (e) => {
  try {
    const docRef = await setDoc(doc(db, "Estudiantes", document.getElementById("mat").value ), 

    {
      Nombre: document.getElementById("nombre").value,
      Apellidos: document.getElementById("ap").value,
      Matricula: document.getElementById("mat").value,
      Carrera: document.getElementById("carr").value,
      Correo: document.getElementById("correo").value,
      Telefono: document.getElementById("cel").value,
      Estado: document.getElementById("est").value,
      Registro:"Pepe Pica Papas",     
    }

    );
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})

btc.addEventListener('click', async (e)=> {

  ShowUsers()
  viewUsuarios2()
  
})


async function ShowUsers() {

  tbEstudiantes.innerHTML = ""
  const Allusers = await ViewUsuarios()

  Allusers.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //  console.log(doc.id, " => ", doc.data());
      const datos = doc.data()
      
      tbEstudiantes.innerHTML += `<tr class = "regis" data-id="${doc.id}">
      <td>${datos.Nombre}</td>
      <td>${datos.Apellidos}</td>
    
      <td>${datos.Telefono}</td>
      <td>${datos.Estado}</td>
      <td>
          <button class="btn-primary btn m-1 editar_" data-id="${doc.id}" >
           Editar 
          <span class="spinner-border spinner-border-sm" id="Edit-${doc.id}" style="display: none;"></span>
          </button> 

          <button class="btn-danger btn eliminar_"  data-id="${doc.id}|${datos.Nombre}|${datos.Apellidos}" >
          Eliminar 
          <span class="spinner-border spinner-border-sm" id="elim-${doc.id}" style="display: none;"></span>
          
          </button>
      </td>
   
      </tr>`

  });


}

 async function ViewUsuarios() {
  const userRef = collection(db, "Estudiantes")
  const Allusers = await getDocs(userRef)
  return Allusers
}

async function viewUsuarios2(){

  const q = query(collection(db, "Estudiantes"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];

  querySnapshot.forEach((doc) => {
      cities.push(doc.data().nombre);     
  });
  console.log("Current cities in CA: ", cities.join(", "));
});
}

$("#tbEstudiantes").on("click", ".eliminar_", async function () {

  const producto_id = $(this).data("id")
  console.log("click en " + producto_id)
 let datox = producto_id.split('|')
 console.log("datos  " + datox[1])
  try {
     
    await deleteDoc(doc(db, "Estudiantes", datox[0]));

  } catch (error) {
      console.log("error", error)

  }

})


$("#tbEstudiantes").on("click", ".editar_", async function () {

  const producto_id = $(this).data("id")
  console.log("click en editar" + producto_id)

  try {
    const washingtonRef = doc(db, "Estudiantes", producto_id.toString());

    await updateDoc(washingtonRef, {
        Nombre: document.getElementById("nombre").value,
        Apellidos: document.getElementById("ap").value,
        Matricula: document.getElementById("mat").value,
        Carrera: document.getElementById("carr").value,
        Correo: document.getElementById("correo").value,
        Telefono: document.getElementById("cel").value,
        Estado: document.getElementById("est").value,
        Registro:"Pepe Pica Papas",     
    });

  } catch (error) {
      console.log("error", error)
  }
})


$("#tbEstudiantes").on("click",".regis", async function () {

  const producto_id = $(this).data("id")
  console.log("click en " + producto_id)


  try {
     
  } catch (error) {
      console.log("error", error)

  }

})