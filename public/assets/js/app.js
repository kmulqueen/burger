// Document ready $ short-hand
$(function() {
    $(".change-devoured").on("click", function(e) {
        var id = $(this).data("id");
        console.log(id);
        var newDevoured = $(this).data("newdevoured");
        var newDevouredState = {
            devoured: newDevoured
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function() {
                console.log("Changed devoured to", newDevoured);
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(e) {
        e.preventDefault();
        var newBurger = {
            burger_name: $("#form-burger-name").val().trim()
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("Created new burger.");
                location.reload();
            }
        );
    });
})