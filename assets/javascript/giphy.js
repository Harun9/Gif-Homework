var topic = ["smilling", "jumping", "dancing", "funny", "eating", "waving", "sleepy", "Hiphop"];

// Function for displaying movie data
function renderButtons() {

    $("#tags").empty();

    for (var i = 0; i < topic.length; i++) {
        $("#tags").append('<button class="tag-buttons btn btn-primary">' + topic[i] + '</button>');
    }

}

// Add tags function // 

$(document).on('click', '#addTag', function (event) {

    event.preventDefault();

    var newTag = $("#category").val().trim();
    topic.push(newTag);

    $("#tags").append('<button class="tag-buttons btn btn-primary">' + newTag + '</button>');

});

// Tag button function //

$(document).on('click', '.tag-buttons', function (event) {

    // Keeps page from reloading //
    event.preventDefault();



    var type = this.innerText;
    console.log(this.innerText);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + (type) + "&api_key=qAvCnGXBhMc4Sl9igvdBwdMoibMaOrs4";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {

            $("#photo").append('<img class="gif" src="' + response.data[i].images.fixed_height_still.url + '">');
        }
    });

    $("#photo").empty();

});
renderButtons();


$('body').on('click', '.gif', function () {
    var src = $(this).attr("src");
    if ($(this).hasClass('playing')) {
        //stop
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
    } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
});