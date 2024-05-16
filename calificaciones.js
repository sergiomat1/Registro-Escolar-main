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

const tbCalificaciones = document.querySelector("#tbCalificaciones");

btc.addEventListener('click', async (e) => {
  try {
    tbCalificaciones.innerHTML = "";
    
    const unidadesRef = collection(db, "Unidades");
    
    const unidadesSnapshot = await getDocs(unidadesRef);
    
    unidadesSnapshot.forEach(async (unidadDoc) => {
      const unidadId = unidadDoc.id;
      const unidadData = unidadDoc.data();

      const registrosRef = collection(db, "Unidades", unidadId, "Acreditados");

      const registrosSnapshot = await getDocs(registrosRef);
      
      registrosSnapshot.forEach((registroDoc) => {
        const registroData = registroDoc.data();
        tbCalificaciones.innerHTML += `<tr class="regis" data-id="${registroDoc.id}">
          <td>${registroData.Clave}</td>
          <td>${registroData.Matricula}</td>
          <td>${registroData.Calificacion}</td>
          <td>${registroData.Ciclo}</td>
          <td>
            <button class="btn-primary btn m-1 editar_" data-id="${registroDoc.id}|${unidadId}">
              Editar 
              <span class="spinner-border spinner-border-sm" id="Edit-${registroDoc.id}" style="display: none;"></span>
            </button>        
            <button class="btn-danger btn eliminar_" data-id="${registroDoc.id}|${registroData.Clave}|${registroData.Matricula}">
              Eliminar 
              <span class="spinner-border spinner-border-sm" id="elim-${registroDoc.id}" style="display: none;"></span>
            </button>
          </td>
        </tr>`;
      });
    });
  } catch (error) {
    console.error("Error al mostrar registros:", error);
  }
});

bti.addEventListener('click', async (e) => {
  try {
    const matricula = document.getElementById("mat_etu").value; 
    const unidadSeleccionada = document.getElementById("cla_uni").value;
    const docRef = doc(collection(db, "Unidades", unidadSeleccionada, "Acreditados"), matricula);
    await setDoc(docRef, {
      Clave: document.getElementById("cla_uni").value,
      Matricula: matricula, 
      Catedratico: document.getElementById("catedratico").value,
      Calificacion: document.getElementById("calificacion").value,
      Ciclo: document.getElementById("ciclo").value,
      Registro: "Pancho Villa",
    });
    console.log("Document written with ID: ", matricula);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

$("#tbCalificaciones").on("click", ".eliminar_", async function () {
  try {
    const producto_id = $(this).data("id");
    const [registro_id, unidad_id] = producto_id.split('|');
    await deleteDoc(doc(db, "Unidades", unidad_id, "Acreditados", registro_id));
  } catch (error) {
    console.log("error", error);
  }
});

$("#tbCalificaciones").on("click", ".editar_", async function () {
  try {
    const ids = $(this).data("id").split('|');
    const registro_id = ids[0];
    const unidad_id = ids[1];

    const registroRef = doc(db, "Unidades", unidad_id, "Acreditados", registro_id);
    
    await updateDoc(registroRef, {
      Catedratico: document.getElementById("catedratico").value,
      Calificacion: document.getElementById("calificacion").value,
      Ciclo: document.getElementById("ciclo").value,
      Registro: "Pancho Villa",
    })

    } catch (error) {
    console.log("Error:", error);
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const unidadesRef = collection(db, "Unidades");
    const unidadesSnapshot = await getDocs(unidadesRef);
    const selectElement = document.getElementById("cla_uni");
    
    unidadesSnapshot.forEach((doc) => {
      const unidadId = doc.id;
      const unidadData = doc.data(); 
      
      const optionText = `${unidadId} - ${unidadData.Nombre}`;

      const option = document.createElement("option");
      option.value = unidadId;
      option.textContent = optionText;
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Error al cargar las unidades:", error);
  }
});
