let userOneScore = 0;
let userNames = [];
let currentAnswerArray = [];
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


/*
function questionDisplay() {
    shuffle(currentAnswerArray);
    $("#questionText").html(array[i].question);
    console.log(array[i].question);
    $("#answer1").html(currentAnswerArray[0]);
    $("#answer2").html(currentAnswerArray[1]);
    $("#answer3").html(currentAnswerArray[2]);
    $("#answer4").html(currentAnswerArray[3]);

    }
*/

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
    $(document).on("click", ".btn-success", function () {
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
            console.log(response.results[i].question);
            let array = response.results;
            let answerArray = [];
            let correctAnswerArray = [];
            let chosenAnswerArray = [];
            let currentAnswerArray = [];

            function questionDisplay() {

                // displays the current question/current answers and lists users
                $("#questionText").html(array[i].question);
                $("#answerText").html(answerButtons);
                $("#playerNames").empty();
                listUsers()
            }

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
            shuffle(currentAnswerArray);

            console.log(answerArray);
            console.log(correctAnswerArray);
            console.log(currentAnswerArray);
        

            currentAnswerArray.forEach(answers => {
                let answerButtons = $("<button>");
                answerButtons.addClass("btn btn-info btn-lg btn-block")
                answerButtons.attr("type", "button");
                answerButtons.attr("id", answers);
                answerButtons.html(answers);
                $("#answerText").append(answerButtons);
            })

            $("#nextQuestion").click(function (event) {
                event.preventDefault();
                $("#questionText").empty();
                $("#answerText").empty();
                i++;
                console.log(currentAnswerArray);
                currentAnswerArray.push(array[i].correct_answer);
                currentAnswerArray.push(array[i].incorrect_answers[0]);
                currentAnswerArray.push(array[i].incorrect_answers[1]);
                currentAnswerArray.push(array[i].incorrect_answers[2]);
                console.log(currentAnswerArray);
                currentAnswerArray.forEach(answers => {
                    let answerButtons = $("<button>");
                    answerButtons.addClass("btn btn-info btn-lg btn-block")
                    answerButtons.attr("type", "button");
                    answerButtons.attr("id", answers);
                    answerButtons.html(answers);
                    $("#answerText").append(answerButtons);
                })
                $("#questionText").append(array[i].question);
            })


            }) // end of click function
            // }) // end of for loop
        }) // end of then function
    }) // end of ajax
    $("#seeResults").click(function (event) {
        event.preventDefault();
        userNames.forEach(user => {
            let newPlayer = $("<p>");
            newPlayer.attr("id", $("#nameSet").val());
            newPlayer.append(`${user.name}'s score: ${user.score}`);
            $("#playerNames").append(newPlayer);
            
            
            var losingPlayer = getLowestScore();

            $("#losingPlayer").html(`<h2>The losing player is ${losingPlayer.name}! Get out your wallet, it's time to buy everyone else some alcohol!`);
        })

        console.log();

 
        function getLowestScore () {
            var lowestPlayer = userNames.reduce((lastLowest, current) => {
                if (current.score < lastLowest.score) return current;
                else return lastLowest;
            }, {score:50});
            
        }
    })


                if (i > 5) {
                    i = 0;
                }
                    /*
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
                        answerButtons.addClass("btn btn-info btn-lg btn-block")
                        answerButtons.attr("type", "button");
                        answerButtons.attr("id", answers);
                        answerButtons.html(answers);
                        $("#answerText").append(answerButtons);
                    })
                    */
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
                    
                $(".btn-secondary").click(function() {
                    chosenAnswer = $(this).attr("id");
                    console.log(chosenAnswer);
})

