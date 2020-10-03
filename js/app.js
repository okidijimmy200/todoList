// get elements

const itemForm = document.getElementById('itemForm')
const itemInput = document.getElementById('itemInput')
const itemList = document.querySelector('.item-list') //where we write items after we write then in the input
// btns
const clearBtn = document.getElementById('clear-list')
const feedback = document.querySelector('.feedback')

// empty array
// let itemData = [];
// incase of page refresh, how to get info from localStrorage or if its empty, set it to empty
let itemData = JSON.parse(localStorage.getItem('list')) || [];

// display refreshed content if available in localStorage
if(itemData.length > 0) {
    itemData.forEach(function(singleItem){
        itemList.insertAdjacentHTML('beforeend', `
        <div class="item my-3">
        <h5 class="item-name text-capitalize">${singleItem}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>
    </div>`)
    handleItem(singleItem)
    }) 
}

// form submission
itemForm.addEventListener('submit', function(event){
    event.preventDefault(); // to prevent the page reloading on submitting form

    // looking for value we are getting
    const textValue = itemInput.value;
    console.log(textValue) 


    // check if there is an empty value
    if(textValue === '') {
        showFeedback('please enter valid value', 'danger');
    }
    // --if there is a value
    else {
        // --set up add item and put it in the list, handle item then move to push data
        addItem(textValue) // we get text value back from our form input

        // clear form after adding item, itemInput set to empty string
        itemInput.value = '';
        // add to items array
        itemData.push(textValue);
        // console.log(itemData)

        // local storage
        localStorage.setItem('list', JSON.stringify(itemData)) // name and data we r going to pass

        // handle item addEventlistern to item
        handleItem(textValue)
        
    }
})

// show feedback func to check if text is empty
function showFeedback(text, action) {
    //  --action is the color of bootstrap either danger or success
    feedback.classList.add('showItem', `alert-${action}`);
    feedback.innerHTML = `<p>${text}</p>`

    // hide the text after a while
    setTimeout(function(){ // 1st func is acallback function
        // --remove showItem class after 3s
        feedback.classList.remove('showItem', `alert-${action}`);
    }, 3000)
}

// add item
function addItem(value){
    // div to hold all values
    const div = document.createElement('div');
    div.classList.add('item', 'my-3');
    div.innerHTML = `<h5 class="item-name text-capitalize">${value}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`
    itemList.appendChild(div);
}

// handle item
function handleItem(textValue) {
    const items = itemList.querySelectorAll('.item');
    // loop through the items
    items.forEach(function(item) {
        // --check whether the queryselector item is the same
        if(item.querySelector(".item-name").textContent === textValue) {
            // add eventlistener 4 btn
            // complete event listener
            item.querySelector('.complete-item').addEventListener('click', function(){
                // toggle completed class
                item.querySelector('.item-name').classList.toggle('completed')
                //toggle class of visibility
                this.classList.toggle('visibility');
            })
    // edit event listener
    item.querySelector('.edit-item').addEventListener('click', function(){
        //get input value of text value
        itemInput.value = textValue;
        itemList.removeChild(item);

        // remove from array
        itemData = itemData.filter(function(item){
            // return all things tht r not equal to the text
            return item != textValue
        });
        // local storage
        localStorage.setItem('list', JSON.stringify(itemData)) // name and data we r going to pass
        
    })
        // delete event listener
        item.querySelector('.delete-item').addEventListener('click', function(){
            //get input value of text value
            itemList.removeChild(item);            
    
            // remove from array
            itemData = itemData.filter(function(item){
                // return all things tht r not equal to the text
                return item != textValue
            });
            // local storage
        localStorage.setItem('list', JSON.stringify(itemData)) // name and data we r going to pass
            // show feedback class
            showFeedback('item deleted', 'success');
            
        })
        }
    })
}

// clear btn
clearBtn.addEventListener('click', function(){
    itemData = [];
    localStorage.removeItem('list')
    const items = itemList.querySelectorAll('.item');
    // check if items actually exit
    if(items.length > 0){
        items.forEach(function(item){
            itemList.removeChild(item)
        })
    }
})