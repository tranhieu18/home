
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
  import { getDatabase, ref, set, onValue, push, child} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAKNRZAABKjusNLZANaqtZF_0G54nvZZUQ",
    authDomain: "phonebook-595a2.firebaseapp.com",
    databaseURL: "https://phonebook-595a2-default-rtdb.firebaseio.com",
    projectId: "phonebook-595a2",
    storageBucket: "phonebook-595a2.appspot.com",
    messagingSenderId: "595851071182",
    appId: "1:595851071182:web:8f3bb7e39c195349d88a9f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();



  //Read data Form insert Firebsae.
var names, phone, dataid;

let tableBody = document.querySelector("tbody")
  function ReadData() {
      names = document.getElementById("name").value
      phone = document.getElementById("phone").value
  }

  document.getElementById("submit").onclick = function() {
      ReadData()
      const db = getDatabase(); 
      const newPostKey = push(child(ref(db), 'phonebook/')).key; //Tạo data-id random
      set(ref(db, 'phonebook/' + newPostKey), {
      names: names,
      phone: phone
    });
    //   alert("Đã Thêm Vào Danh Bạ.")
      
  }

  // function writeUserData(names, phone) {
  //   let userId = push(child(usersRef)).key;
  //   console.log(userId)
  //   child(userId).set({
  //     names: names,
  //     phone: phone
  //   }).then((onFullFilled)=>{
  //     console.log("writed");
  //   }, (onRejected) => {
  //     console.log(onRejected);
  //   })
  // }

  //   writeUserData("abc","cdd")

  //Insert Data Form Table

 

  
const starCountRef = ref(db, 'phonebook/');
onValue(starCountRef, (snapshot) => {
  tableBody.innerHTML = "" // Cập Nhập Bảng
  const data = snapshot.val();
  snapshot.forEach(dulieu => {
    //   console.log(dulieu.val().phone) // Lấy data trong firebase (dãy key data-id) thêm vào Form. ( Theo Phương Thức Mới Nhất Phải Có ".val()")
        let tr = `
  <tbody>
  <tr>
    <th scope="row">${dulieu.val().names}</th>
    <td><a href="tel: ${dulieu.val().phone}"</a>${dulieu.val().phone}</td>
    <td><button data-id='${dulieu.key}' type="button" class="btn btn-danger" id="remove">Xóa</button></td>

  </tr>
</tbody>
  `
    tableBody.innerHTML+= tr // Cập Nhập Bảng

  
  // console.log(btnDelete)
  // btnDelete.addEventListener('click', () => {
  //   console.log('user deleted');
  // })

  })


// -----------------------------------------------------------
  //Remove Bản Chuẩn
  const btnDelete = document.querySelectorAll("#remove");
  // const getValue = ref(db, 'phonebook/');
  btnDelete.forEach(element => {
    element.addEventListener('click', () => {
      const div1 = element.getAttribute("data-id")
      const getValue = ref(db, 'phonebook/' + div1);
      // console.log(div1)
      // console.log(element)
      // console.log(snapshot.val())
      onValue(getValue, (snapshot) => {
        set(ref(db, 'phonebook/' + div1), {
          names: null,
          phone: null
        })
        // .then(() => {
          
        // })
        // .catch((error) => {

        // });
        console.log("Remove User "+ snapshot.val().names)
      
    })
    // console.log(element)
  })

  })
  // ----------------------------------------------------------------

//   console.log(remove_users)
});

//Delete


// removeBtn.addEventListener("click", (e) =>{
//     e.preventDefault();

//     remove(ref(db, 'phonebook/' + data-id.value))
// })



