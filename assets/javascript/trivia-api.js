let userOneScore = 0;
let userNames = [];
let possibleAnswers = [];
let correctAnswers = [];
let wrongAnswers = [];
let i = 0;
let chosenAnswer = "";

// function to add new users name/score
function listUsers() {
    $("#playerNames").empty();
        userNames.forEach(user => {
            
            let newPlayer = $("<p>");
            newPlayer.attr("id", $("#nameSet").val());
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
        newUser.name = addedName;
        userNames.push(newUser);
        console.log(userNames);
        listUsers();
    })

    // function to get 5 trivia questions based on difficulty
    $(document).on("click", ".btn-primary", function () {
        event.preventDefault();
        let difficulty = $(this).attr("difficulty")
        let amount = $(this).attr("amount")
        let queryURL = "https://opentdb.com/api.php?" + amount + "&" + difficulty + "&type=multiple";
        let i=0;

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

                // pushes all the possible answers for the current question into an array
                currentAnswerArray.push(array[0].correct_answer);
                currentAnswerArray.push(array[0].incorrect_answers[0]);
                currentAnswerArray.push(array[0].incorrect_answers[1]);
                currentAnswerArray.push(array[0].incorrect_answers[2]);
                shuffle(currentAnswerArray);

                // creates new buttons and fills them with the text of the possible answers for the question
                currentAnswerArray.forEach(answers => {
                    let answerButtons = $("<button>");
                    answerButtons.addClass("btn btn-secondary")
                    answerButtons.attr("type", "button");
                    answerButtons.attr("id", answers);
                    answerButtons.text(answers);
                    $(".btn-group").append(answerButtons);
                })
                

                console.log(answerArray);
                console.log(correctAnswerArray);
                console.log(currentAnswerArray);

                
                questionDisplay();
                
                
                
                function questionDisplay() {

                    // displays the current question/current answers and lists users
                    $("#questionText").text(array[i].question);
                    $("#answerText").text(currentAnswerArray);
                    $("#playerNames").empty();
                    listUsers()

                }

                    // function to fire when you click next question 
                    $("#nextQuestion").click(function(event){
                    event.preventDefault();
                    $("#questionText").empty();
                    $(".btn-group").empty();
                    i++;
                    if (i == 5) {
                        let i=0;
                        j++;
                    }
                    currentAnswerArray = []
                    console.log(currentAnswerArray);
                    currentAnswerArray.push(array[i].correct_answer);
                    currentAnswerArray.push(array[i].incorrect_answers[0]);
                    currentAnswerArray.push(array[i].incorrect_answers[1]);
                    currentAnswerArray.push(array[i].incorrect_answers[2]);
                    shuffle(currentAnswerArray);
                    console.log(currentAnswerArray);
                    currentAnswerArray.forEach(answers => {
                        let answerButtons = $("<button>");
                        answerButtons.addClass("btn btn-secondary")
                        answerButtons.attr("type", "button");
                        answerButtons.text(answers);
                        $(".btn-group").append(answerButtons);
                    })

                    // this should be reseting i to 0 after pressing next question a 5th time (ends the round)
                    

                    console.log(i);
                    
                    // sets the current user to cycle through an array (should reset when it reaches the end of the array)
                    let j=0
                    let currentUserName = userNames[j].name;
                    let currentUserScore = userNames[j].score;
                    console.log(j);
                    console.log(userNames[j].score);
                    console.log(currentUserName);

                    // this will compare the current answer being chosen to the correctAnswer array
                    var found = false;
                    for(var k = 0; k < correctAnswerArray.length; k++) {
                        if (chosenAnswer == correctAnswerArray[k]) {
                        found = true;
                        userNames[j].score++
                        break;
                        }
                    }
                    
                    console.log(userNames[j].score);
                    console.log(userNames);
                    questionDisplay();
                    

                    

                    }) // end of click function

                    // this will set the chosenAnswer to be equal to the id of the answers
                    $(".btn-secondary").click(function() {
                        chosenAnswer = $(this).attr("id");
                        console.log(chosenAnswer);
                    })
        }) // end of then loop
    }) // end of click function
}) // end of document

