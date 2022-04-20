//grid of dollar amounts(clickable to show question)
//user can submit awnser
    //if correct: score is updated
//user score is saved even if refreshed(localstorage)
let questionContent = document.querySelector('.row')
// console.log(questionContent)
async function jeopardyRead() {
    let resJeopardy = await fetch("jeopardy.json")
    let dataJeopardy = await resJeopardy.json();
    console.log(dataJeopardy)
    
    //seperate data by value
    let data100 = _.filter(dataJeopardy, _.iteratee({'value':"$100"}));
    let data200 = _.filter(dataJeopardy, _.iteratee({'value':"$200"}));
    let data400 = _.filter(dataJeopardy, _.iteratee({'value':"$400"}));
    let data800 = _.filter(dataJeopardy, _.iteratee({'value':"$800"}));
    let data1000 = _.filter(dataJeopardy, _.iteratee({'value':"$1,000"}));
    // console.log(data100)

    //get random questions
    let rand100 = _.sampleSize(data100,5)
    let rand200 = _.sampleSize(data200,5)
    let rand400 = _.sampleSize(data400,5)
    let rand800 = _.sampleSize(data800,5)
    let rand1000 = _.sampleSize(data1000,5)
    // console.log(rand100)
    
    //store in object (25 questions total)
    let gameQuestions = {
        100:rand100,
        200:rand200,
        400:rand400,
        800:rand800,
        1000:rand1000
    };
    // console.log(miscData)
    //access each "row"
    // let selectedQuestion = document.querySelectorAll('p');
    // console.log(selectedQuestion)
    for(let valueRow in gameQuestions) {
        // console.log(gameQuestions[valueRow])
        //access each question
        for(let i = 0 ; i < gameQuestions[valueRow].length ;i++) {
            // console.log(gameQuestions[valueRow][i])
            let dataQ = gameQuestions[valueRow][i]
            let question = document.createElement('div')
            question.className="col btn btn-primary"
            // question.setAttribute(type,"button")
            // question.setAttribute(data-bs-toggle,"collapse")
            // question.setAttribute(type,"button")
            question.innerHTML = `
            ${dataQ.value}
            <div id="bodyInfo" style="display:none;">
               Category:${dataQ.category} ---Question:${dataQ.question}
            </div>
            <div id="answerInfo" style="display:none;">${dataQ.answer}</div>
            `
            questionContent.appendChild(question)
        }

    }
    // console.log(gameQuestions)
    let selectedQuestion = document.querySelectorAll('.col.btn.btn-primary');
    let questionText = document.querySelector('#bodyInfo')
    let answerText = document.querySelector('#answerInfo')
    let displayQ = document.querySelector('#displayQuestion')
    let userResponse = document.querySelector('#userResponse')
    let submitForm = document.querySelector('#form-content-jeopardy')
    let currentCountStr = document.querySelector('#header input')
    // console.log(currentCount)
    let count = 'count'
    // console.log(selectedQuestion)
    for(let q of selectedQuestion) {
        q.addEventListener('click', event => {
            event.preventDefault();
            // console.log(q)
            //get access to questions and answer
            //display question
            displayQ.innerText = questionText.textContent
            let totalCount = localStorage.getItem(count)
            if(totalCount === null) {
                    currentCountStr.value = 0
            } else {
                totalCount = parseInt(currentCountStr)
            } 
            submitForm.addEventListener('submit',event=> {
                event.preventDefault();
                // console.log(userResponse.value)
                // console.log(q.innerText)
                //if answer matches question increase point value for score
                if (userResponse.value === answerText.innerText) {
                    alert('Correct!')
                    //increase score by storing value plus stored value
                    q.innerText = q.innerText.substring(1)
                    totalCount += q.innerText
                    localStorage.setItem(count,currentCountStr.innerText)
                    
                    //erase content for response and answer?
                } else {
                    alert('Incorrect')
                }
            })

        })
    }

}

jeopardyRead()

// //`
//             <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
//                 ${dataQ.value}
//             </button>
//             <div class="collapse" id="collapseExample">
//             <div class="card card-body" id="bodyInfo">
//                Category:${dataQ.category} Question:${dataQ.question}
//             </div>
//             <div style="display:none;">${dataQ.answer}</div>
//             </div>
//             `
