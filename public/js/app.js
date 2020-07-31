const webServerForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// fetching data from server
const fetchURL = (location) => {

    fetch('/weather?address=' + location).then((response) => {
        
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = location
                messageTwo.textContent = data.forecast
            }
        })
    })

}


webServerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    const name = location
    const nameToUpperCase = name[0].toUpperCase() + name.slice(1)


    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
 //calling fetchURl with location gotten from UI 
    fetchURL(nameToUpperCase);
})