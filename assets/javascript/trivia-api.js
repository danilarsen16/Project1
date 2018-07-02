let userOneScore = 0;
let userNames = [];
let possibleAnswers = [];
let correctAnswers = [];
let wrongAnswers = [];
let i = 0;

// function to add new users name/score
function listUsers() {
$("#playerNames").empty();
    userNames.forEach(user => {
        
        let newPlayer = $("<p>");
        newPlayer.append(`${user.name}'s score: ${user.score}`);
        $("#playerNames").append(newPlayer);
    })
}

// shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

$(document).ready(function () {

    // function to add the player names to an array for all users and display the names onto the HTML
    $("#nameEnter").click(function (event) {
        event.preventDefault();
        let newUser = { name: "", score: 0 }
        let addedName = $("#nameSet").val();
        $("#nameSet").val("");
        newUser.name = addedName;
        userNames.push(newUser);
        console.log(userNames);
        listUsers();
    })

    // function to get 5 trivia questions based on difficulty
    $(document).on("click", ".btn", function () {
        event.preventDefault();
        let difficulty = $(this).attr("difficulty")
        let amount = $(this).attr("amount")
        let queryURL = "https://opentdb.com/api.php?" + amount + "&" + difficulty + "&type=multiple";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
                console.log(response)
                let array = response.results;
                let answerArray = [];
                let correctAnswerArray = [];
                let chosenAnswerArray = [];
                let currentAnswerArray = [];

                // pushes the answers into different arrays (answerArray for all avaliable answers, correct/incorrect answer arrays to compare
                // if the chosen answer is right or wrong)
                array.forEach(answer => {
                    answerArray.push(answer.correct_answer);
                    correctAnswerArray.push(answer.correct_answer);
                    answer.incorrect_answers.forEach(incorrect => {
                        answerArray.push(incorrect);
                    })
                })

                currentAnswerArray.push(array[i].correct_answer);
                currentAnswerArray.push(array[i].incorrect_answers[0]);
                currentAnswerArray.push(array[i].incorrect_answers[1]);
                currentAnswerArray.push(array[i].incorrect_answers[2]);

                console.log(answerArray);
                console.log(correctAnswerArray);
                console.log(currentAnswerArray);

                
                questionDisplay();
                
                
                
                function questionDisplay() {

                    $("#questionText").text(array[i].question);
                    $("#answerText").text(currentAnswerArray);

                }

                    $("#nextQuestion").click(function(event){
                    event.preventDefault();
                    $("#questionText").empty();
                    $("#answerText").empty();
                    i++;
                    currentAnswerArray = []
                    console.log(currentAnswerArray);
                    currentAnswerArray.push(array[i].correct_answer);
                    currentAnswerArray.push(array[i].incorrect_answers[0]);
                    currentAnswerArray.push(array[i].incorrect_answers[1]);
                    currentAnswerArray.push(array[i].incorrect_answers[2]);
                    console.log(currentAnswerArray);
                    questionDisplay();
                    console.log(i);

                    if (i > 5) {
                        i = 0;
                    }

                    }) // end of click function
                // }) // end of for loop
            }) // end of then function
            
    }) // end of ajax

});

//for questions we can; 
// create an array of all possible answers
// add the correct answers to an array, add the wrong answers to an array
// create buttons for each answer and randomize
// create a submit button that checks your answers at the end and totals your points and displays it to the HTML

