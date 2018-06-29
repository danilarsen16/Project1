let userOneScore = 0;
let userNames = [];

// function to add new users name/score
function listUsers() {
$("#playerNames").empty();
    userNames.forEach(user => {
        
        let newPlayer = $("<p>");
        newPlayer.append(`${user.name}'s score: ${user.score}`);
        $("#playerNames").append(newPlayer);
    })
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
        let queryURL = "https://opentdb.com/api.php?" + amount + "&" + difficulty;

        $.ajax({
            url: queryURL,
            method: "GET",
        })
            .then(function (response) {
                console.log(response)
            })
    })




});