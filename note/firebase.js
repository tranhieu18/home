  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
  import { getDatabase, ref, set, onValue, push, get, onChildAdded, update, remove} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js';

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAZjwS9k4LG_cGYfXQK0Vv8SKfQbxq8jZI",
    authDomain: "note-app-cf6b9.firebaseapp.com",
    databaseURL: "https://note-app-cf6b9-default-rtdb.firebaseio.com",
    projectId: "note-app-cf6b9",
    storageBucket: "note-app-cf6b9.appspot.com",
    messagingSenderId: "667864014367",
    appId: "1:667864014367:web:e3fe29b86025a5ce74bf2a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase();

  console.log(database);

  // Add Database

function writeUserData(note_id, note_name, description, status_note) {
  const userId = push(noteRef);
  // const db = getDatabase();
  set(userId, {
    note_id: note_id,
    note_name: note_name,
    description: description,
    status_note : status_note
  });
}


 // Update Database

function updateUserData(note_id, note_name, description, status_note) {
  // A post entry.

  const userId = push(noteRef);

  set(userId, {
    note_id: note_id,
    note_name: note_name,
    description: description,
    status_note : status_note
  });

}




// Add element to table
const tableBody = document.querySelector("tbody");
const addNote = document.querySelector("#add-note");
const popup = document.querySelector("#popup");
const form = document.querySelector("form");
const popup01 = document.querySelector("#popup-01");
const submitUpdate = document.querySelector("#submit-update");
const formUpdate = document.querySelector("#popup-01 > form");

// Read Data

const db = getDatabase();
const noteRef = ref(db, 'note/');


onValue(noteRef, (snapshot) => {
  const data = snapshot.val();
  // console.log(data);
  tableBody.innerHTML = "";
  for (var note in data) {
    // console.log(data[note]);
    const tr = `
    <tr class="spacer"><td colspan="100"></td></tr>
    <tr data-id=${note}>
      <th scope="row">
        <label class="control control--checkbox">
          <input type="checkbox"/>
          <div class="control__indicator"></div>
        </label>
      </th>
      
      <td>${data[note].note_id}</td>
      <td><a href="#">${data[note].note_name}</a></td>
      <td>
        ${data[note].description}
      </td>
      <td>${data[note].status_note}</td>
      <td style="width:10%;"><button type="button" class="btn btn-outline-danger" id="remove" style="width: 100%;">Remove</button></td>
      <td style="width:10%;"><button type="button" class="btn btn-outline-warning" id="editer" style ="width: 100%;">Edit</button></td>
    </tr>
    `
    tableBody.innerHTML += tr;

    
    // Edit Note
    const edit = document.querySelectorAll("#editer");
    // console.log(edit.length);
    edit.forEach(edit => {
      edit.addEventListener("click", () => {
        popup01.style.display = "block";
        const getupdateID = edit.parentElement.parentElement.dataset.id;
        submitUpdate.addEventListener("click", (e) => {
          e.preventDefault();
                  
          // e.preventDefault();
          // console.log(edit.parentElement.parentElement.dataset.id);
          
          // console.log(getupdateID);

          set(ref(db, 'note/' + getupdateID), {
            note_id: formUpdate.id.value,
            note_name: formUpdate.name.value,
            description: formUpdate.description.value,
            status_note : formUpdate.status.value
          }).then(() => {
            alert("Updated.")
          })
          .catch((error) => {
            alert("Update Failed.")
          });
        popup01.style.display = "none";
        location.reload();
        }, {once: true})
                
        // updateUserData(form.id.value, form.name.value, form.description.value, form.status.value);
             
      }, {once: true});
      
    });
  
  const removed = document.querySelectorAll("#remove");
  // console.log(removed);
  removed.forEach(removed => {

    removed.addEventListener("click", (e) => {
      e.preventDefault();
      const getremoveID = removed.parentElement.parentElement.dataset.id;
      console.log(getremoveID);
      remove(ref(db, 'note/' + getremoveID), {

      })
      
    })

  })

}

  
}, {once: true});
  


// Show Form Note
addNote.addEventListener("click", () => {
  
    popup.style.display = "block";
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(form.name);
      writeUserData(form.id.value, form.name.value, form.description.value, form.status.value);
      popup.style.display = "none";
      location.reload();
    })

}, {once: true}); // Allow 1 Click.


// Close Form Note
window.addEventListener("click", (e) => {
    if (e.target == popup) {
      popup.style.display = "none";
      form.reset();
    }
});


// writeUserData(3, "AAE", "HomeWork", "Not");
// writeUserData("MAE", "HomeWork", "Not");