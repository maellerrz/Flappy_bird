//https://www.mindmeister.com/fr/1018158559?t=7P7Qll2X2J

var oiseau = $("#bird");
var stopListening = false;

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
  var minNumber = 120; // le minimum
  var maxNumber = 300; // le maximum
  var randomnumber = Math.floor(Math.random() * (maxNumber + 1) + minNumber); // la fonction magique
  return randomnumber
}

var obstacleGeneration = setInterval(function(){ genererObstacle() }, 2000);

var collisionVerification = setInterval(function(){ verifierCollisions() }, 200);

var nb = 0;
var tuyaux = [];

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
    } else {
      //$("#gameOver").remove();
    }
    console.log(collision);
  }
}

function recupererPosition(bloc) {
  var pos = $(bloc).offset();

  var width = $(bloc).width();
  var height = $(bloc).height();
  // console.log(pos.left);
  // console.log((pos.left + width));
  // console.log(pos.top);
  // console.log((pos.top + height));
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
  $("#bird").css({'transition':'1s'})
  $("#bird").attr({'src':'dead_bird.png'}).css({'transform':'rotate(360deg)'}).animate({marginTop:'+=1500px'}, 2000, 'linear');
  $('section').append('<p id="gameOver">GAME OVER</p>');
  $("#gameOver").animate({'marginTop': '0%'}, 100);

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
