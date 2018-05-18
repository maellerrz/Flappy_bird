//https://www.mindmeister.com/fr/1018158559?t=7P7Qll2X2J

function play(){
  if($('#scd_playButton').css('display')!=="none"){
    $('#scd_playButton').css({'display' : 'none'});
    $('#gameOver').remove();
    $("#bird").attr({'src':'bird.gif'}).css({'margin':'0px', 'transition':'0s', 'transform':'rotate(0deg)'});
    $(".tuyau").remove();
  }
  $('#fst_playButton').css({'display':'none'});
  $('#logo').css({'display':'none'});

  var oiseau = $("#bird");
  var stopListening = false;
  var nb = 0;
  var tuyaux = [];

  $(document).keydown(function(e){
    // alert(e.keyCode);
    //console.log(e.keyCode); //pour écrire dans la console et pas en pop up
    if (stopListening == false){
      if (e.keyCode == 38){
        $(oiseau).animate({marginBottom:'+=100px'}, 200, 'linear'); //(selector).animate({styles},speed,easing,callback)
      }
      else if (e.keyCode == 40){
        $(oiseau).animate({marginTop:'+=100px'}, 200, 'linear');
      }
      else if (e.keyCode == 37){
        $(oiseau).animate({marginRight:'+=100px'}, 200, 'linear');
      }
      else if (e.keyCode == 39){
        $(oiseau).animate({marginLeft:'+=100px'}, 200, 'linear');
      }
    }
  });

  function getNumber() {
    var minNumber = 140; // le minimum
    var maxNumber = 300; // le maximum
    var random = Math.random() * (maxNumber + 1); //Math.random() donne une valeur dans [0, 1[
                                                  // et on fait "*(maxNumber + 1)" pour obtenir une valeur entr 0 et maxNumber
    var randomInInterval = random + minNumber; //la valeur ne pourra pas être inférieur à minNumber
    var randomnumber = Math.floor(randomInInterval); // arrondi de la valeur random
    return randomnumber
  }

  var obstacleGeneration = setInterval(function(){ genererObstacle() }, 2000);

  var collisionVerification = setInterval(function(){ verifierCollisions() }, 200);

  function genererObstacle() {
    nb ++;
    $('section').append('<img class="tuyau" id="' + nb +'" src="https://image.ibb.co/iyJjRm/pipe.png">');
    tuyaux.push("#" + nb);
    console.log(tuyaux);
    if(nb % 2 == 0){
      $("#" + nb).css({'top':getNumber()});
    }
    else {
      $("#" + nb).css({'bottom': getNumber()});
    }
    // alert(getNumber());
    $("#" + nb).animate({right:'+=450px'}, 5000, 'linear', function(){
      //console.log("ok");
      tuyaux.splice(0, 1);
      console.log(tuyaux);
      $("#" + (nb-2)).remove();
    });
  }

  function verifierCollisions() {
    var birdPos = recupererPosition(oiseau);

    for (var i=0; i<tuyaux.length; i++){
      var tuyauPos = recupererPosition(tuyaux[i]);
      var collision = chevauchement(birdPos, tuyauPos);
      if (collision){
        game_over();
      }
      console.log(collision);
    }
  }

  function recupererPosition(bloc) {
    var pos = $(bloc).offset();

    var width = $(bloc).width();
    var height = $(bloc).height();

    return [ pos.left, pos.left + width, pos.top, pos.top + height ];
  }

  function chevauchement(bloc1, bloc2) {
    return !(bloc1[1] < bloc2[0] ||
      bloc1[0] > bloc2[1] ||
      bloc1[3] < bloc2[2] ||
      bloc1[2] > bloc2[3])
    }

    function game_over(){
      $(".tuyau").stop();
      clearInterval(obstacleGeneration);
      clearInterval(collisionVerification);
      stopListening = true;
      $("#bird").attr({'src':'dead_bird.png'}).css({'transition':'1s', 'transform':'rotate(360deg)'}).animate({marginTop:'+=1500px'}, 2000, 'linear', function(){
        $("#scd_playButton").css({'display':'block'});
      });
      $('section').append('<p id="gameOver">GAME OVER</p>');
      $("#gameOver").animate({marginTop: '-10%'}, 100);
    }
}
// document.addEventListener("keydown",saut, false); // keydown = quand on enfonce une touche ET PAS flèche bas
// function saut(){
//   var oiseau = $("#bird"); //$ récupère l'élément
//   if (event.keyCode == 38){
//     $(oiseau).animate({marginBottom:'+=100px'}, 200, 'linear'); //(selector).animate({styles},speed,easing,callback)
//   }
//   else if (event.keyCode == 40){
//     $(oiseau).animate({marginTop:'+=100px'}, 200, 'linear');
//   }
//   else if (event.keyCode == 37){
//     $(oiseau).animate({marginRight:'+=100px'}, 200, 'linear');
//   }
//   else if (event.keyCode == 39){
//     $(oiseau).animate({marginLeft:'+=100px'}, 200, 'linear');
//   }
// }
