// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, set, onValue, push, remove} from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlVlNWUH8mCK5fw9cZUgKiPrfBLXZhln8",
  authDomain: "note-app-b9e5d.firebaseapp.com",
  projectId: "note-app-b9e5d",
  storageBucket: "note-app-b9e5d.appspot.com",
  messagingSenderId: "593465034462",
  appId: "1:593465034462:web:343af05d7b711f2982244f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const database = getDatabase(app);
console.log(database);

//Const

const getButtonadd = document.querySelector('#add-note');
const divBody = document.querySelector('.show-listnote');
const getCleannote = document.querySelector('#clean-note');
//Write data
function writenoteData(name) {
    const db = getDatabase();
    const noteRef = ref(db, 'name-noted/');
    const noteId = push(noteRef);
    console.log(noteId);
    set(noteId, {
      name: name
    });
  }
// writenoteData(20, "aa")

// Event Click Add
getButtonadd.addEventListener('click', function(){
    const getNamenote = document.getElementById('note-name').value;
    console.log(getNamenote)
    if (getNamenote == ""){
        alert("Không được để trống.")
    } else {
        const db = getDatabase();
        const noteRef = ref(db, 'name-noted/');
        const noteId = push(noteRef);
        set(noteId, {
        name: getNamenote
    })
    }

    
})


//Even Clean note
getCleannote.addEventListener('click', function(){
    const db = getDatabase();
    const noteRef = ref(db, 'name-noted/');
    set(noteRef, null)
})


//Create element table
const db = getDatabase();
onValue(ref(db, 'name-noted/'), (snapshot) => {
    const data = snapshot.val();
    // console.log(data);
    divBody.innerHTML = "";
    for (var note in data) {
      // console.log(data[note]);
      const tr = `
      <input type="text" class="form-control" readonly style="width: 345px; margin-bottom: 10px;" id="lists" value="${data[note].name}"/><i data-id="${note}" class="fa fa-remove " role="button" id="remove-note"></i>
      `
    divBody.innerHTML += tr;
    }
    //Event Remove
    const removed = document.querySelectorAll("#remove-note");
    // console.log(removed);
    removed.forEach(removed => {
    removed.addEventListener("click", (e) => {
      e.preventDefault();
      const getremoveID = removed.getAttribute("data-id")
    //   console.log(getremoveID);
      const db = getDatabase();
      const noteRef = ref(db, 'name-noted/');
    //   const noteId = push(noteRef);
      remove(ref(db, 'name-noted/' + getremoveID), {

      })

    })

  })

});


//Tips
// const tr = `
//     <tr class="spacer"><td colspan="100"></td></tr>
//     <tr data-id=${note}>
//       <th scope="row">
//         <label class="control control--checkbox">
//           <input type="checkbox"/>
//           <div class="control__indicator"></div>
//         </label>
//       </th>
      
//       <td>${data[note].note_id}</td>
//       <td><a href="#">${data[note].note_name}</a></td>
//       <td>
//         ${data[note].description}
//       </td>
//       <td>${data[note].status_note}</td>
//       <td style="width:10%;"><button type="button" class="btn btn-outline-danger" id="remove" style="width: 100%;">Remove</button></td>
//       <td style="width:10%;"><button type="button" class="btn btn-outline-warning" id="editer" style ="width: 100%;">Edit</button></td>
//     </tr>
//     `
//     tableBody.innerHTML += tr;