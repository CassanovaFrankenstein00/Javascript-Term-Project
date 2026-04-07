$(document).ready(function(){
    $('.open-modal').click(function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        
        $('#myModal iframe[name="modal-frame"]').attr('src', url);

        $('#myModal').fadeIn();
    });

    $('.modal').on('click', function(e) {
        if (e.target !== this) return;
        $(this).fadeOut();
        $(this).find('iframe').attr('src', '');  
    });
});
    $('#readme').on("mouseover", function() {
        document.getElementById("message").innerHTML="<em>ReadMe</em><br>\
            My simple game interface that contains colors and image that are reminiscent of old school arcades\
            click or hover over the links to see a description of or be taken to one of me games.";
    });
    $('#home').on("mouseover",function(){
        document.getElementById("message").innerHTML="<p>My collection of games built using HTML, CSS, and Javascript</p>";
    }) 
    $("#puzzlePic").on("mouseover",function(){
        document.getElementById("message").innerHTML="<em>PuzzlePic</em><br> is \
        A simple puzzle game I made using some of my own photography";
    })
    $("#dungeon").on("mouseover",function(){
        document.getElementById("message").innerHTML="<em>Dungeon Master</em> is a Gauntlet inspired\
         dungeon crawler with a simple theme of battling through a castle dungeon looking for the key in each\
        level trying to escape.";
    })
    $("#canvasGame").on("mouseover",function(){
        document.getElementById("message").innerHTML="<em>Doodle Jump</em>For my third game I will use\
        canvas to create a game similar to doodle jump. I'll basically turn the cavas game verticle\
        and allow a character to bounce off the obsticles instead of ending the game.";
    }) 