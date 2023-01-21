// Create a construtor for books

// Book constructor
function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

const person = {
  firstName: 'John',
}
// Object.prototype

//console.log(person)

// UI constructor
function UIController(){};

const tableBody = document.querySelector('#table-body');

UIController.prototype.addBookToUI = function(book){
 
 const tr = document.createElement('tr');
 tr.innerHTML = 
 `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td id="delete"><i class="fa-solid fa-trash text-danger delete" style="cursor:pointer"></i></td>
 `;
 tableBody.appendChild(tr);
 // THE ALTERNATIVE DELETE FUNCTIONALITY 
 
 // First, create an instance of the UIController. This enables us to access the allerts function 
 const ui = new UIController()

 // Get the target element that you want to click, that is the td tag with the delete icon. 
 // Remember we gave it an id of delete. We are getting the element using the delete id 
 // We use the tr element instead of document while invoking the queryselector method 
 const delBtn = tr.querySelector('#delete')
 // Add a click event listener on the target, which is the delBtn that has the delete icon
 delBtn.addEventListener('click', (e)=>{
  // Remove the parent elements of the target
  e.target.parentElement.parentElement.remove() 
  // Call and invoke the alerts method once the delete operation is done; that is, the parent elements have been removd
  ui.alerts('delete')
 })
};

UIController.prototype.alerts = function(alertType){ 
    
  const alertContainer = document.querySelector('#alert')
    if(alertType === 'success'){     
     alertContainer.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
     <strong>Book added successfully</strong> 
     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
   </div>`;
   
    }else if(alertType === 'delete'){
      alertContainer.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Book deleted successfully</strong> 
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    }else{
        alertContainer.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
     <strong>You need to provide all the fields</strong> 
     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
   </div>`;
        
    }
};
// Delete book from the UI

UIController.prototype.deleteBook = function(target){
  if(target.classList.contains('delete')){

   target.parentElement.parentElement.remove()
  }
}


// Clear Fields Method
UIController.prototype.clearFields = function(){
    // This will reset the form fields
    document.querySelector('#form').reset();

};



// Add event listeners
const formElement = document.querySelector('#form');




formElement.addEventListener('submit',function(e){
  e.preventDefault();
  const title = document.querySelector('#title').value;  
  const author = document.querySelector('#author').value; 
  const isbn = document.querySelector('#ISBN').value; 
  const ui = new UIController();
  
  if(!title.trim() || !author.trim() || !isbn.trim()){
    ui.alerts('error');
  }else{
   const book = new Book(title, author, isbn);
   ui.alerts('success');
   ui.addBookToUI(book);
   ui.clearFields();
  }
});


// Add an event listener to the table body. We will use event delegation to pass donwn the click event to the trash icon

// tableBody.addEventListener('click', function(e){
//  const ui = new UIController();
//  ui.deleteBook(e.target);
//  ui.alerts('delete');
//  e.preventDefault();
// })
