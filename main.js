

//get the jeopardy data
async function jeopardy() {
    // set parent element to add all questions later 
    let questionContent = document.querySelector('.row')
    // console.log(questionContent)
    
    let resJeopardy = await fetch("jeopardy.json")
    let dataJeopardy = await resJeopardy.json();
    // console.log('[{objects}]', dataJeopardy)
    
    //seperate the questions to seperate into lists by dollar value
    let data100 = _.filter(dataJeopardy, _.iteratee({'value':"$100"}));
    let data200 = _.filter(dataJeopardy, _.iteratee({'value':"$200"}));
    let data400 = _.filter(dataJeopardy, _.iteratee({'value':"$400"}));
    let data800 = _.filter(dataJeopardy, _.iteratee({'value':"$800"}));
    let data1000 = _.filter(dataJeopardy, _.iteratee({'value':"$1,000"}));
    // console.log('[{questions only w/value of $100}]',data100)

    //get 25 random questions to fill game with
    let rand100 = _.sampleSize(data100,5)
    let rand200 = _.sampleSize(data200,5)
    let rand400 = _.sampleSize(data400,5)
    let rand800 = _.sampleSize(data800,5)
    let rand1000 = _.sampleSize(data1000,5)
    // console.log("[{question1}...{question5}]",rand100)
    
    //put all lists into an "joined" list to interact later on..
    let gameQuestions = {
        100:rand100,
        200:rand200,
        400:rand400,
        800:rand800,
        1000:rand1000
    };
    // console.log("{100:[{Q1},{Q2}],...}",gameQuestions)
    
    //access each "dollar" value list of questions and add to the game
    for(let valueRow in gameQuestions) {
        // console.log(gameQuestions[valueRow])

        //access each individual question
        for(let i = 0 ; i < gameQuestions[valueRow].length ;i++) {
            // console.log(gameQuestions[valueRow][i])

            //made var to make writing easier to understand
            let dataQ = gameQuestions[valueRow][i]
            //create element to add to game by question to house all info
            let question = document.createElement('div')
            question.className="col btn btn-primary"
            
            //add ways to hide certain info from the user
            question.innerHTML = `
            ${dataQ.value}
            <div id="bodyInfo" style="display:none;">
               Category:${dataQ.category} ---Question:${dataQ.question}
            </div>
            <div id="answerInfo" style="display:none;">${dataQ.answer}</div>
            `
            //add element to html page
            questionContent.appendChild(question)
        }

    }
    //identify  ALL questions 
    let selectedQuestion = document.querySelectorAll('.col.btn.btn-primary');
    // console.log(selectedQuestion)

    //identify all other needed elements(user response/buttons etc.)
    let questionText = document.querySelector('#bodyInfo')
    let answerText = document.querySelector('#answerInfo')
    let displayQ = document.querySelector('#displayQuestion')
    let userResponse = document.querySelector('#userResponse')
    let submitForm = document.querySelector('#form-content-jeopardy')
    let currentCountStr = document.querySelector('#header input')
    // console.log(currentCount)
    
    // let count = 0

    // got through all question info
    for(let q of selectedQuestion) {
        //add listener for indifivuual question clicked
        q.addEventListener('click', event => {
            event.preventDefault();
            //sameple the current answer
            console.log('current answer', answerText.value)
            
            //display question only(renaming variables)
            displayQ.innerText = questionText.textContent

            //currently broken at the moment
            // let totalCount = localStorage.getItem(count)
            // if(totalCount === null) {
            //         currentCountStr.value = 0
            // } else {
            //     totalCount = parseInt(currentCountStr)
            // }
            
            //after user inputs response to question add listener to submit button
            submitForm.addEventListener('submit',event=> {
                event.preventDefault();
                
                // console.log(q.innerText)
                //if answer matches user input alert user && increase point value for score
                if (userResponse.value === answerText.innerText) {
                    alert('Correct!')
                    
                    //seperate dollar value from number and add to current total count
                    // q.innerText = q.innerText.substring(1)
                    // totalCount += q.innerText
                    // localStorage.setItem(count,currentCountStr.innerText)
                    // displayQ.innerText =  "" 
                    
                } else {
                    alert('Incorrect')
                    
                    //erase question from display
                     
                }
                displayQ.innerText =  ""  
            })

        })
    }

}

jeopardy();
