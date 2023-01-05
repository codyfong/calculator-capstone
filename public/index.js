
const plusButton = document.querySelector('#plus-btn')
const minusButton = document.querySelector('#minus-btn')
const multiplyButton = document.querySelector('#multiply-btn')
const divideButton = document.querySelector('#divide-btn')
const oneButton = document.querySelector('#one-btn')
const twoButton = document.querySelector('#two-btn')
const threeButton = document.querySelector('#three-btn')
const fourButton = document.querySelector('#four-btn')
const fiveButton = document.querySelector('#five-btn')
const sixButton = document.querySelector('#six-btn')
const sevenButton = document.querySelector('#seven-btn')
const eightButton = document.querySelector('#eight-btn')
const nineButton = document.querySelector('#nine-btn')
const zeroButton = document.querySelector('#zero-btn')
const equalButton = document.querySelector('#equal-btn')
const clearButton = document.querySelector('#clear-btn')
const deleteButton = document.querySelector('#del-btn')

const calcQuery = document.querySelector('#calculator-query')
const calcAnswer = document.querySelector('#calculator-answer')
const cardList = document.querySelector('#cards-list')
const decimalButton = document.querySelector('#decimal-btn')
const openParenButton = document.querySelector('#open-paren-btn')
const closedParenButton = document.querySelector('#closed-paren-btn')
const xButton = document.querySelector('#x-btn')
const piButton = document.querySelector('#pi-btn')
const sinButton = document.querySelector('#sin-btn')
const cosButton = document.querySelector('#cos-btn')
const tanButton = document.querySelector('#tan-btn')
const deriveButton = document.querySelector('#derive-btn')
const integrateButton = document.querySelector('#integrate-btn')
const factorialButton = document.querySelector('#factorial-btn')
const eButton = document.querySelector('#e-btn')
const expButton = document.querySelector('#exp-btn')

const postsDiv = document.querySelector('#posts')

const baseURL = "http://localhost:4000/api"
// const baseURL = "http://107.20.43.234/api"

let reqType = "simplify"


function loadPosts(res) {
    console.log(res)
    axios.get(`/api/posts`)
    .then(res => {
        console.log(res.data)
        res.data.forEach(element => {
            let { type, result, query } = element
            let newCard = document.createElement('div')
            newCard.classList.add(`post-card`)
            newCard.innerHTML = `
            <div>
            <h1>${type}:</h1>
            <h2>${query}</h2>
            <div/>
            <div>
            <h1>Result:</h1>
            <h2>${result}</h2>
            </div>
            `
            postsDiv.appendChild(newCard)
        });
    })
    .catch(err => console.log(err))
}

window.onload = loadPosts

function addPlus(evt){
    calcQuery.textContent = calcQuery.textContent + '+'
}
function addMinus(evt){
    calcQuery.textContent = calcQuery.textContent + '-'
}
function addMultiply(evt){
    calcQuery.textContent = calcQuery.textContent + '*'
}
function addDivide(evt){
    calcQuery.textContent = calcQuery.textContent + '/'
}
function addNine(evt){
    calcQuery.textContent = calcQuery.textContent + '9'
}
function addEight(evt){
    calcQuery.textContent = calcQuery.textContent + '8'
}
function addSeven(evt){
    calcQuery.textContent = calcQuery.textContent + '7'
}
function addSix(evt){
    calcQuery.textContent = calcQuery.textContent + '6'
}
function addFive(evt){
    calcQuery.textContent = calcQuery.textContent + '5'
}
function addFour(evt){
    calcQuery.textContent = calcQuery.textContent + '4'
}
function addThree(evt){
    calcQuery.textContent = calcQuery.textContent + '3'
}
function addTwo(evt){
    calcQuery.textContent = calcQuery.textContent + '2'
}
function addOne(evt){
    calcQuery.textContent = calcQuery.textContent + '1'
}
function addZero(evt){
    calcQuery.textContent = calcQuery.textContent + '0'
}
function addDecimal(evt){
    calcQuery.textContent = calcQuery.textContent + '.'
}
function addOpenParen(evt){
    calcQuery.textContent = calcQuery.textContent + '('
}
function addClosedParen(evt){
    calcQuery.textContent = calcQuery.textContent + ')'
}
function addX(evt){
    calcQuery.textContent = calcQuery.textContent + 'x'
}

function addCos(evt){
    calcQuery.textContent = calcQuery.textContent + 'cos('
}

function addSin(evt){
    calcQuery.textContent = calcQuery.textContent + 'sin('
}

function addTan(evt){
    calcQuery.textContent = calcQuery.textContent + 'tan('
}
function addPi(evt){
    calcQuery.textContent = calcQuery.textContent + 'π'
}
function addExp(evt){
    calcQuery.textContent = calcQuery.textContent + '^('
}
function addE(evt){
    calcQuery.textContent = calcQuery.textContent + 'e'
}

function addFactorial(evt){
    calcQuery.textContent = calcQuery.textContent + '!'
}

function deleteCard(ID){
    let card = document.getElementById(`card-${ID}`)
    card.remove()
}

function reuseCard(ID){
    let card = document.getElementById(`card-${ID}`)
    calcQuery.textContent = card.dataset.query
    calcAnswer.textContent = ''
}

function useResult(ID){
    let card = document.getElementById(`card-${ID}`)
    calcQuery.textContent = card.dataset.result
    calcAnswer.textContent = ''
}

function addReuseCard(ID){
    let card = document.getElementById(`card-${ID}`)
    calcQuery.textContent = calcQuery.textContent+card.dataset.query
    calcAnswer.textContent = ''
}
function addUseResult(ID){
    let card = document.getElementById(`card-${ID}`)
    calcQuery.textContent = calcQuery.textContent+card.dataset.result
    calcAnswer.textContent = ''
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function shareResult(ID){
    let card = document.getElementById(`card-${ID}`)
    let post = {
        query: card.dataset.query,
        result: card.dataset.result,
        type: card.dataset.type
    }
    postsDiv.innerHTML = ""
    console.log(ID)
    await axios.post(`/api/posts`, post )
    loadPosts()

}



let cardID = 0
function addCard(query, result, requestType){
    requestType = capitalizeFirstLetter(requestType)
    const newCard = document.createElement('div')
    newCard.classList.add('history-card')
    newCard.id = `card-${cardID}`
    newCard.dataset.query = query
    newCard.dataset.result = result
    newCard.dataset.type = requestType
    newCard.innerHTML = `
        <div>
        <h1>Operation: ${requestType} </h1>
        </br>
        </div>
        </br>
        <div id="input-result">
        <h1>Input: ${query}</h1>
        <h1>Result: ${result}</h1>
        </br>
        </div>
        <div id="card-btns">
        <button onclick="deleteCard(${cardID})" id="delete" class="history-btn">Delete</button>
        <button onclick="reuseCard(${cardID})" id="reuse" class="history-btn">Reuse</button>
        <button onclick="useResult(${cardID})" id="use-result" class="history-btn">Use Result</button>
        <button onclick="addReuseCard(${cardID})" id="add-reuse" class="history-btn">Add Input to Query</button>
        <button onclick="addUseResult(${cardID})" id="add-result" class="history-btn">Add Result to Query</button>
        <button onclick="shareResult(${cardID})" id="share-result" class="history-btn">Share Result </button>
        </div>
    `
    cardList.appendChild(newCard)
    cardID++
}

function deleteMath(evt){
    calcQuery.textContent = calcQuery.textContent.slice(0, calcQuery.textContent.length-1)
    calcAnswer.textContent = ''
}

function clearMath(evt){
    calcQuery.textContent = ''
    calcAnswer.textContent = ''
}

function urlEncoder(queryString){
    queryString = queryString.replaceAll("+", "%2B")
    queryString = queryString.replaceAll("/", "%2F")
    queryString = queryString.replaceAll("*", "%2A")
    queryString = queryString.replaceAll("(", "%28")
    queryString = queryString.replaceAll(")", "%29")
    queryString = queryString.replaceAll("^", "%5E")
    queryString = queryString.replaceAll("π", "pi")
    return queryString
}

function submitIntegrate(){
    reqType = "integrate"
    submitMath()
}

function submitDerive(){
    reqType = "derive"
    submitMath()
}

function submitEqual(){
    reqType = "simplify"
    submitMath()
}

function submitMath(){
    reqString = urlEncoder(calcQuery.textContent)
    axios.get(`https://newton.vercel.app/api/v2/${reqType}/${reqString}`)
    .then(res => {
        let result = res.data.result
        result = result.replaceAll("pi","π")
        result = result.replaceAll("exp","e^")
        calcAnswer.textContent = `Result: ${result}` 
        addCard(calcQuery.textContent.trim(), result, reqType)
    })
}



plusButton.addEventListener('click', addPlus)
minusButton.addEventListener('click', addMinus)
multiplyButton.addEventListener('click', addMultiply)
divideButton.addEventListener('click', addDivide)
zeroButton.addEventListener('click', addZero)
oneButton.addEventListener('click', addOne)
twoButton.addEventListener('click', addTwo)
threeButton.addEventListener('click', addThree)
fourButton.addEventListener('click', addFour)
fiveButton.addEventListener('click', addFive)
sixButton.addEventListener('click', addSix)
sevenButton.addEventListener('click', addSeven)
eightButton.addEventListener('click', addEight)
nineButton.addEventListener('click', addNine)
zeroButton.addEventListener('click', addZero)
decimalButton.addEventListener('click', addDecimal)
openParenButton.addEventListener('click', addOpenParen)
closedParenButton.addEventListener('click', addClosedParen)
xButton.addEventListener('click', addX)
tanButton.addEventListener('click', addTan)
sinButton.addEventListener('click', addSin)
cosButton.addEventListener('click', addCos)
piButton.addEventListener('click', addPi)
expButton.addEventListener('click', addExp)
eButton.addEventListener('click', addE)
factorialButton.addEventListener('click', addFactorial)
integrateButton.addEventListener('click', submitIntegrate)
deriveButton.addEventListener('click', submitDerive)
equalButton.addEventListener('click', submitEqual)
clearButton.addEventListener('click', clearMath)
deleteButton.addEventListener('click', deleteMath)

