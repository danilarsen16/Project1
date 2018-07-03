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
        sessionStorage.setItem("user" + p, user.name);
        sessionStorage.setItem("user" + o, user.score);
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
    console.log(userNames);
    // function to add the player names to an array for all users and display the names onto the HTML
    $("#nameEnter").click(function (event) {
        event.preventDefault();
        let newUser = { name: "", score: 0 }
        let addedName = $("#nameSet").val();
        newUser.name = addedName;
        userNames.push(newUser);
        console.log(userNames);
        p++;
        o++;
        listUsers();
    })

    $("#currentUserName").text(userNames[j]);

    startRound();

    $("#nextPlayer").click(function(event){
        event.preventDefault();
        $("#answerText").empty();
        $("#questionText").empty();
        i = 0;
        j++;
    })

    function startRound() {
        // function to get 5 trivia questions based on difficulty
        $(document).on("click", ".btn-success", function () {
            event.preventDefault();
            let difficulty = $(this).attr("difficulty")
            let amount = $(this).attr("amount")
            let queryURL = "https://opentdb.com/api.php?" + amount + "&" + difficulty + "&type=multiple";
            document.getElementById("currentUserName").innerHTML = sessionStorage.getItem("name");
            $("#checkAnswer").show();
            $("#nextQuestion").show();

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

                $("#questionText").html(array[i].question);
                listUsers()

                $("#nextQuestion").click(function (event) {
                    event.preventDefault();
                    $("#questionText").html("");
                    $("#answerText").empty();
                    i++;
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
                    $("#questionText").html(array[i].question);
                })

                $(document).on("click", ".btn-info", function () {
                    chosenAnswer = $(this).attr("id");
                    console.log(this);
                    console.log(chosenAnswer);
                })

                $("#checkAnswer").click(function() {
                    var found = false;
                    for (var k = 0; k < correctAnswerArray.length; k++) {
                        if (chosenAnswer == correctAnswerArray[k]) {
                        found = true;
                        userNames[j].score++
                        break;
                        }
                    }
                    if (i == 4) {
                        $("#nextQuestion").hide();
                    }
                    listUsers();
                    $("#checkAnswer").hide();
                })
            })


            }) // end of click function
        } 
    }) // end of display function



