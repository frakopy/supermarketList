//---------------------- Data Table configuration ----------------------------------------------------
let dataTable

$(document).ready( function () {
    dataTable = $('#table-home').DataTable({
        "language": {
            "lengthMenu": "",
            "zeroRecords": "No records to display",
            "info": "Displaying page _PAGE_ from _PAGES_",
            "infoEmpty": "No records available",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "search": "Search:",
            "paginate": {
                "first": "First",
                "last": "Last",
                "next": "Next",
                "previous": "Previous"
            },
        },
    });
});


// ----------------------- Getting html elements -------------------------------------------------

const btnMenu = document.getElementById("btn-menu")
const btnAdd = document.getElementById("btnCreateItem")
const btnPurchasedSat = document.getElementById("purchased-satus")
const ModalbtnUpdate = document.getElementById("ModalbtnUpdateItem")
const btnUpdate = document.getElementById("btn-update")
const btnDelete = document.getElementById("btn-delete")
const btnMarkPurchased = document.getElementById("btn-mark-purchased")
const btnCloseModal = document.getElementById("close-modal")
const btnCloseUpdateModal = document.getElementById("close-update-modal")
const tdBtns = document.getElementsByClassName("tdButton")
const tbody = document.getElementById("tbody-shopping")
const formCreate = document.getElementById("form-create")
const bootstrapAlert = document.getElementById("bootstrap-alert")

// Defining the global variable for later asign a tr html element
let trParentForUpdate

// Get csrftoken, the code of this function is provided by django documentation
// in the link https://docs.djangoproject.com/en/4.0/ref/csrf/
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


// Function to update the Item in the DB
const updateItem = async (url, purchased, name, description, number, rows) => {
    //Get the CSRF token using the function code provided by django documentation
    const csrftoken = getCookie('csrftoken'); 

    const fetchSettings = {
        method : 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify({ purchased: purchased, name: name, description: description, number: number}),
        headers: {'Content-Type': 'application/json','X-CSRFToken': csrftoken},
    }

    try{
        const request = await fetch(url, fetchSettings)
        if(request.status === 200) {
            bootstrapAlert.classList.remove('hide')
            bootstrapAlert.querySelector('p').textContent = "The item was successfully updated!"
            setTimeout(() => {
                bootstrapAlert.classList.add('hide')
            }, 3000);
            // Reload the page if ther is not more rows to show
            if(rows === 0) {location.reload()}
        }else{
            bootstrapAlert.classList.remove('hide')
            bootstrapAlert.classList.remove('alert-success')
            bootstrapAlert.classList.add('alert-danger')
            bootstrapAlert.querySelector('p').textContent = `
                Upps something was wrong, remember that the fields 
                "name" and "description" are mandatory
            `
            setTimeout(() => {
                bootstrapAlert.classList.add('alert-success')
                bootstrapAlert.classList.remove('alert-danger')
                bootstrapAlert.classList.add('hide')
            }, 3000);
        }
    }catch(error){
        return error
    }
}
// Function to crete the item in the DB
const createItem = async (url, data) => {
    //Get the CSRF token using the function code provided by django documentation
    const csrftoken = getCookie('csrftoken'); 

    const fetchSettings = {
        method : 'POST',
        credentials: 'same-origin',
        body: data,
        headers: {'Content-Type': 'application/json','X-CSRFToken': csrftoken},
    }

    try{
        const request = await fetch(url, fetchSettings)
        if(request.status === 201) {
            bootstrapAlert.classList.remove('hide')
            bootstrapAlert.querySelector('p').textContent = "The item was successfully created!"
            setTimeout(() => {
                bootstrapAlert.classList.add('hide')
            }, 3000);
            const result = await request.json()
            return result
        }else{
            bootstrapAlert.classList.remove('hide')
            bootstrapAlert.classList.remove('alert-success')
            bootstrapAlert.classList.add('alert-danger')
            bootstrapAlert.querySelector('p').textContent = `
                Upps something was wrong, remember that the fields 
                "name" and "description" are mandatory
            `
            setTimeout(() => {
                bootstrapAlert.classList.add('alert-success')
                bootstrapAlert.classList.remove('alert-danger')
                bootstrapAlert.classList.add('hide')
            }, 3000);
        }

    }catch(error){
        return error
    }
}


// Function to delete the item in the DB
const deleteItem = async (url, rows) => {
    //Get the CSRF token using the function code provided by django documentation
    const csrftoken = getCookie('csrftoken'); 

    const fetchSettings = {
        method : 'DELETE',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json','X-CSRFToken': csrftoken},
    }

    try{
        const request = await fetch(url, fetchSettings)
        if(request.status === 204) {
            bootstrapAlert.classList.remove('hide')
            bootstrapAlert.querySelector('p').textContent = "The item was successfully deleted!"
            setTimeout(() => {
                bootstrapAlert.classList.add('hide')
            }, 3000);
            // If there is not more trs reload the page
            if(rows === 0) {location.reload()}
        }else{
            bootstrapAlert.classList.remove('hide')
            bootstrapAlert.classList.remove('alert-success')
            bootstrapAlert.classList.add('alert-danger')
            bootstrapAlert.querySelector('p').textContent = `
                Upps something was wrong, this operation requiere the PK.
            `
            setTimeout(() => {
                bootstrapAlert.classList.add('alert-success')
                bootstrapAlert.classList.remove('alert-danger')
                bootstrapAlert.classList.add('hide')
            }, 3000);
            return null
        }
    }catch(error){
        return error
    }
}



//----------------- Adding listener to remove item from html document and from DB ------------------

tbody.addEventListener("click", (e) => { 
    if (e.target.classList.contains("btn-purchased")) {
        let url = e.target.dataset.url
        let itemId = e.target.dataset.itemId
        const rowToDelete = e.target.parentNode.parentNode

        const name = rowToDelete.querySelector(`#name-${itemId}`).textContent
        const description = rowToDelete.querySelector(`#desc-${itemId}`).textContent
        const number = rowToDelete.querySelector(`#number-${itemId}`).textContent
        const purchased = true

        // remove the row from the table
        tbody.removeChild(rowToDelete)
        const rows = tbody.querySelectorAll("tr").length

        // Call the function to update the item in the db
        updateItem(url, purchased, name, description, number, rows)

    }else if(e.target.classList.contains("btn-delete")){
        // Call the function to delete the item in the db
        let url = e.target.dataset.url
        
        // remove the row from the table
        trParentForUpdate = e.target.parentNode.parentNode
        tbody.removeChild(trParentForUpdate)
        
        const rows = tbody.querySelectorAll("tr").length

        // Call the function to remove the item in the db
        deleteItem(url, rows)


    }else if(e.target.classList.contains("btn-update")){
        let url = e.target.dataset.url
        trParentForUpdate = e.target.parentNode.parentNode
        let id = url.split("/")[2]
        let nameContent = trParentForUpdate.querySelector(`#name-${id}`).textContent
        let descriptionContent = trParentForUpdate.querySelector(`#desc-${id}`).textContent
        let numberContent = trParentForUpdate.querySelector(`#number-${id}`).textContent
        const inputName = document.getElementById("update-item-name")
        const inputDescription = document.getElementById("update-item-description")
        const inputNumber = document.getElementById("update-item-quantity")
        inputName.value = nameContent
        inputDescription.value = descriptionContent
        inputNumber.value = numberContent
    }
})


// Function to update the td content with the button
const addNewBtn = (text, className) => { 
    const btnsTd = Array.from(tdBtns)
    btnsTd.forEach(element => {
        let id = Number(element.getAttribute("id").split("-")[1])
        element.innerHTML = `
        <button 
        type="button" 
        class="btn btn-success ${className}"
        data-url="api/item/${id}"
        >
            ${text}
        </button>
        `
    });
}

//---------------- Adding listeners to change buttons -------------------------------


btnMarkPurchased.addEventListener("click", () => { location.reload() })


btnUpdate.addEventListener("click", () => {
    if (window.innerWidth <= 767){btnMenu.click()}
    const btnsTd = Array.from(tdBtns)
    btnsTd.forEach(element => {
        let id = Number(element.getAttribute("id").split("-")[1])
        element.innerHTML = `
        <button 
        type="button" 
        class="btn btn-success btn-update"
        data-bs-toggle="modal" 
        data-bs-target="#updateItemModal" 
        data-bs-whatever="@mdo"
        data-url="api/item/${id}"
        >
        Click to update
        </button>
        `
    });
})

btnDelete.addEventListener("click", () => {
    if (window.innerWidth <= 767){btnMenu.click()}
    addNewBtn("Click to delete", "btn-delete")
})

//------------------------- Adding listener to create new Item ----------------------------

btnAdd.addEventListener("click", (e) => {
    const url = e.target.dataset.url
    let data = Object.fromEntries(new FormData(formCreate))
    if(!data.number){data.number = 1}
    data = JSON.stringify(data)

    // Call the function to create the item in the db
    createItem(url,data).then(result => {
        if(result) {
            dataTable.row.add($(`
            <tr class="text-center odd" id="tr-${result.id}">
                <td class="d-none" id="${result.id}">${result.id}</td>
                <td id="number-${result.id}">${result.number}</td>
                <td id="name-${result.id}">${result.name}</td>
                <td id="desc-${result.id}">${result.description}</td>
                <td id="tdButton-${result.id}" class="tdButton">
                    <button 
                    type="button" 
                    class="btn btn-success btn-purchased home-purchased" 
                    data-url="/api/item/${result.id}"
                    data-item-id="${result.id}">
                    </button>
                </td>
            </tr>
            `));

            // Set up the sorting order for the first column in ascending order
            dataTable.order([0, 'desc']).draw();

        }

        //close modal window
        btnCloseModal.click()

        // Close the operations menu
        if (window.innerWidth <= 767){btnMenu.click()}

    })
})

ModalbtnUpdate.addEventListener('click', () => { 

    // Find the td elements inside the tr element
    const id = trParentForUpdate.getAttribute("id").split("-")[1]
    const tdName = trParentForUpdate.querySelector(`#name-${id}`)
    const tdDescription = trParentForUpdate.querySelector(`#desc-${id}`)
    const tdNumber = trParentForUpdate.querySelector(`#number-${id}`)

    // Getting the content from the modal window
    const name = document.getElementById("update-item-name").value
    const description = document.getElementById("update-item-description").value
    const number = document.getElementById("update-item-quantity").value
    const purchased = false
    const url = `api/item/${id}`

    // Change the contents of each element
    if (name && description) {
        tdName.textContent = name
        tdDescription.textContent = description
        tdNumber.textContent = number
    }

    //close modal window
    btnCloseUpdateModal.click() 

    // Call the function to update the item in the db
    updateItem(url, purchased, name, description, number)
})
