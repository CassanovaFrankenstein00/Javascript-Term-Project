    document.getElementById("readme").addEventListener("click",function(){              
        window.open("ReadMe.txt","readme","height=600","width=600","menubar=1","scrollbars=1","status=1","toolbar=1","titlebar=1");
    })
    document.getElementById("home").addEventListener("mouseover",function(){
        document.getElementById("message").innerHTML="<p>My collection of games built using HTML, CSS, and Javascript</p>";
    })
    document.getElementById("puzzlePic").addEventListener("mouseover",function(){
        document.getElementById("message").innerHTML="<em>PuzzlePic</em> is \
        A simple puzzle game I made using some of my own photography";
    })
    document.getElementById("dungeon").addEventListener("mouseover",function(){
        document.getElementById("message").innerHTML="<em>Dungeon Master</em> is a Gauntlet inspired\
         dungeon crawler with a simple theme of battling through a castle dungeon looking for the key in each\
        level trying to escape.";
    })
    document.getElementById("pong").addEventListener("mouseover",function(){
        document.getElementById("message").innerHTML="<em>Pong/Centipede</em>For my third game I will use\
        the game we will develop next week. I am going to make a version of pong. Depending on\
        how the development goes, I might try and make it into a centipede type arcade game.";
    })