// --------------------------Getting html elements --------------------------
const tbody = document.getElementById("tbody-shopping")
const bootstrapAlert = document.getElementById("bootstrap-alert")


// -----------------Functions to hit the API -----------------------------------------
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
const updateItem = async (url, purchased) => {
    //Get the CSRF token using the function code provided by django documentation
    const csrftoken = getCookie('csrftoken'); 

    const fetchSettings = {
        method : 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify({ purchased: purchased}),
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
        const result = await request.json()
        return result
    }catch(error){
        return error
    }
}

// ----------- Addint listener to the button for modify purchased status--------------------

tbody.addEventListener("click", (e) => {
    if(e.target.classList.contains("btn-purchased")){
        const url = e.target.dataset.url
        const id = e.target.dataset.itemId
        const parentTr = document.getElementById(`tr-${id}`)
        const purchased = parentTr.querySelector(`#purchased-${id}`)
        let purchasedVal = purchased.dataset.purchasedValue === "True" ? "False" : "True"
        purchased.textContent = purchasedVal === "True" ? "Purchased" : "No Purchased"
        updateItem(url, purchasedVal).then((result) => {
            purchased.dataset.purchasedValue = result.purchased ? "True" : "False"
        })

    } 

})



// -------------------------Data Table configuration ------------------------

$(document).ready( function () {
    $('#table-purchased').DataTable({
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














