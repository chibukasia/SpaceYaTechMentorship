// Get the form and tbody elements 
const form = document.querySelector('#form')
const tableBody = document.querySelector('#table-body')

// Add a new book in the table
function addBookToUI(book){
  const tr = document.createElement('tr')
  tr.innerHTML=
  `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td id="delete"><i class="fa-solid fa-trash text-danger delete" style="cursor:pointer"></i></td>
  `
  tableBody.appendChild(tr)

  // Delete a book from the table
  const delBtn = tr.querySelector('#delete') 
  deleteBook(delBtn)
}

// Function to clear the input fields
function clearFields(){
    form.reset()
}

// Submit the form data
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const title  = document.querySelector('#title').value 
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#ISBN').value 

    const book = {
        title: title.trim(),
        author: author.trim(),
        isbn: isbn.trim(),
    }
    if (!book.title || !book.author || !book.isbn){
        alerts('blank')
    }else{
        addBookToUI(book)
        alerts('success')
        clearFields()
    }
    
}) 
// Function to perform the delete action 
function deleteBook(target){
    target.addEventListener('click', (e)=>{
        e.target.parentElement.parentElement.remove()
        alerts('delete')
    })
}

// Display the appropriate message after submititng the form
function alerts(alertType){
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

    setTimeout(()=>alertContainer.innerHTML=``, 5000)
}