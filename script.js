const RAMDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quote-display')
const quoteInputElement = document.getElementById('quoteInput')



quoteInputElement.addEventListener('input',() =>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split(' ')

    
    let correct = true
    arrayQuote.forEach((characterSpan, index) =>{
        
        console.log(index)
        const character = arrayValue[index]
        console.log(character.toString()+" "+characterSpan.innerText.toString())
        console.log(character.trim()==characterSpan.innerText.trim())
        if(character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }else if(character.trim() === characterSpan.innerText.trim()){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }else{
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
    })
    renderNewQuote()
})

function getRandomQuote(){
    try {
        return fetch(RAMDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content) 
    } catch (error) {
        return 404
    }
    
}

async function renderNewQuote(){
    let quote = 404
    for(let i=0;i<4;i++){
        while(quote==404){
           quote = await getRandomQuote()
        }
        
        
    }
    
    quoteDisplayElement.innerText = ''
    quote.split(" ").forEach(character =>{
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character+" "
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
}

function startTimer(){

}
 
renderNewQuote()