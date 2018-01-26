$(document).keydown(function(e){
  // alert(e.keyCode);
  console.log(e.keyCode); //pour écrire dans la console et pas en pop up
  var oiseau = $("#bird");
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
});

function getNumber() {
  var minNumber = 120; // le minimum
  var maxNumber = 300; // le maximum
  var randomnumber = Math.floor(Math.random() * (maxNumber + 1) + minNumber); // la fonction magique
  return randomnumber
}

setInterval(function(){ genererObstacle() }, 2000);

var nb = 0;

function genererObstacle() {
  nb ++;
  $('section').append('<img class="tuyau" id="' + nb +'" src="https://image.ibb.co/iyJjRm/pipe.png">');
  if(nb % 2 == 0){
    $("#" + nb).css({'top':getNumber()});
  }
  else {
    $("#" + nb).css({'bottom': getNumber()});
  }
  // alert(getNumber());
  $("#" + nb).animate({right:'+=450px'}, 5000, 'linear', function(){
    console.log("ok");
    $("#" + (nb-2)).remove();
  });
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
