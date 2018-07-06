let userOneScore = 0;
let currentAnswerArray = [];
let wrongAnswers = [];
let i = 0;
let j = 0;
let p = 0;
let o = 0;
let chosenAnswer = "";
let userNames = [];

// function to add new users name/score
function listUsers() {
    $("#playerNames").empty();
    userNames.forEach(user => {
        let newPlayer = $("<p>");
        newPlayer.attr("id", $("#nameSet").val());
        newPlayer.append(`${user.name}'s score: ${user.score}`);
        $("#playerNames").append(newPlayer);
        // sessionStorage.setItem("user" + p, user.name);
        let sessionUser = JSON.parse(sessionStorage.getItem("user" + p));
        console.log(sessionUser);
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
function questionDisplay() {

    // displays the current question/current answers and lists users
    $("#questionText").text(array[i].question);
    $("#answerText").text(currentAnswerArray);
    $("#playerNames").empty();
    listUsers()

}

$(document).ready(function () {
    console.log(userNames);
    $("#nextQuestion").hide();
    // function to add the player names to an array for all users and display the names onto the HTML
    $("#startGame").click(function (event){
        p=0;
    })
    $("#nameEnter").click(function (event) {
        event.preventDefault();
        let newUser = { name: "", score: 0 }
        let addedName = $("#nameSet").val().trim();
        newUser.name = addedName;
        userNames.push(newUser);
        sessionStorage.setItem("user" + p, JSON.stringify({ name: addedName, score: 0 }));
        console.log(userNames);
        p++;
        o++;
        listUsers();answer
    })
    // function to add the player names to an array for all users and display the names onto the HTML

    startRound();

    $("#nextPlayer").click(function (event) {
        event.preventDefault();
        $("#answerText").empty();
        $("#questionText").empty();
        i = 0;
        p++;
        let sessionUser = JSON.parse(sessionStorage.getItem("user" + p));
        document.getElementById("currentUserName").innerHTML = ("Name: " + sessionUser.name + " ");
        document.getElementById("currentUserScore").innerHTML = ("Score: " + sessionUser.score);
    })
        function startRound() {
            // function to get 5 trivia questions based on difficulty
            $(".btn-success").click(function () {
                event.preventDefault();
                let difficulty = $(this).attr("difficulty")
                let amount = $(this).attr("amount")
                let queryURL = "https://opentdb.com/api.php?" + amount + "&" + difficulty + "&type=multiple";
                i=0;
                let sessionUser = JSON.parse(sessionStorage.getItem("user" + p));
                document.getElementById("currentUserName").innerHTML = ("Name: " + sessionUser.name + " ");
                document.getElementById("currentUserScore").innerHTML = ("Score: " + sessionUser.score);
                //store this in a variable so then can be working with an array that can be parsed out and looped through.
                console.log(p);
                $("#answerText").empty();
                $("#checkAnswer").show();



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
                    $("#questionText").append(array[i].question);
                    
                


                // end of click function
                // }) // end of for loop
             // end of then function
            // end of ajax
            $("#seeResults").click(function (event) {
                event.preventDefault();
                userNames.forEach(user => {
                    let newPlayer = $("<p>");
                    newPlayer.attr("id", $("#nameSet").val());
                    newPlayer.append(`${user.name}'s score: ${user.score}`);
                    $("#playerNames").append(newPlayer);
                })

                console.log();



            })


            $(document).off('click', '#nextQuestion').on('click', '#nextQuestion', function(event){
                event.preventDefault();
                $("#questionText").html("");
                $("#answerText").empty();
                i ++;
                currentAnswerArray = [];
                console.log(currentAnswerArray);
                console.log(i);
                currentAnswerArray.push(array[i].correct_answer);
                currentAnswerArray.push(array[i].incorrect_answers[0]);
                currentAnswerArray.push(array[i].incorrect_answers[1]);
                currentAnswerArray.push(array[i].incorrect_answers[2]);
                console.log(currentAnswerArray);
                shuffle(currentAnswerArray);
                currentAnswerArray.forEach(answers => {
                    let answerButtons = $("<button>");
                    answerButtons.addClass("btn btn-info btn-lg btn-block")
                    answerButtons.attr("type", "button");
                    answerButtons.attr("id", answers);
                    answerButtons.html(answers);
                    $("#answerText").append(answerButtons);
                })

                $("#checkAnswer").show();
                $("#nextQuestion").hide();
                $("#questionText").html(array[i].question);
            })

            $(document).on("click", ".btn-info", function () {
                chosenAnswer = $(this).attr("id");
                console.log(this);
                console.log(chosenAnswer);
            })

            $("#checkAnswer").click(function () {
                var found = false;
                for (var k = 0; k < correctAnswerArray.length; k++) {
                    if (chosenAnswer == correctAnswerArray[k] && response.results[i].difficulty == "easy") {
                        found = true;
                        let sessionUser = JSON.parse(sessionStorage.getItem("user" + p));
                        sessionUser.score++;
                        console.log(sessionUser.score);
                        document.getElementById("currentUserScore").innerHTML = ("Score: " + sessionUser.score);
                        sessionStorage.setItem("user" + p, JSON.stringify({ name: sessionUser.name, score: sessionUser.score}));
                        break;
                    }
                    if (chosenAnswer == correctAnswerArray[k] && response.results[i].difficulty == "medium") {
                        found = true;
                        let sessionUser = JSON.parse(sessionStorage.getItem("user" + p));
                        sessionUser.score++;
                        sessionUser.score++;
                        console.log(sessionUser.score);
                        document.getElementById("currentUserScore").innerHTML = ("Score: " + sessionUser.score);
                        sessionStorage.setItem("user" + p, JSON.stringify({ name: sessionUser.name, score: sessionUser.score}));
                        break;
                    }
                    if (chosenAnswer == correctAnswerArray[k] && response.results[i].difficulty == "hard") {
                        found = true;
                        let sessionUser = JSON.parse(sessionStorage.getItem("user" + p));
                        sessionUser.score++;
                        sessionUser.score++;
                        sessionUser.score++;
                        console.log(sessionUser.score);
                        document.getElementById("currentUserScore").innerHTML = ("Score: " + sessionUser.score);
                        sessionStorage.setItem("user" + p, JSON.stringify({ name: sessionUser.name, score: sessionUser.score}));
                        break;
                    }
                }
                $("#checkAnswer").hide();
                $("#nextQuestion").show();
            })

            $(".btn-secondary").click(function () {
                chosenAnswer = $(this).attr("id");
                console.log(chosenAnswer);
            })
        

        })
    
    })
}

})


