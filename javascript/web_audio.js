$(document).ready(function() {
  o = new OscillatorSample;
  var note;
  var n = 0;
  var AREA_HEIGHT = 500;
  var NOTE_SPAN = 30;
  f = 300;
  var mousedown = false;
  getNotes('blah');
  startLeapMotion();

  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  
  function startLeapMotion() {

    var controllerOptions = {enableGestures: true};
    Leap.loop(controllerOptions, function(frame) {
        if(frame.pointables.length >= 1) {
            var finger = frame.pointables[0];
            var x = finger.tipPosition[0];
            var y = finger.tipPosition[1];
            updateValues(x, y);
        } else {
            console.log('No Fingers present!');
            if(o && o.isPlaying) {
              o.stop();  
            }
        }
    });
  }

  function updateValues(x, y) {
    if(o.isPlaying == false)
      o.play($('#effects').val());
    // y = Math.abs(y - 150);
    n = y / NOTE_SPAN;
    // var frequency = Math.pow(Math.pow(2,(1/12)), n) * 523.25;
    var frequency = Math.pow(Math.pow(2,(1/12)), n) * 523.25;
    console.log('FREQUENCY: ', frequency);
    var volume = (x - 300)/100;
    o.changeFrequency(frequency);
    o.changeRate(((x-700)/10)-10);
    $('#coords').text("X: " + x + ", Y: " + y);
    $('#freq').text("frequency: " + frequency + ", volume: " + volume);
    // ctx.translate(0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x,Math.abs(y - 150),10,10);
    console.log('WIDTH:' , c.height);
  }
  
 $('#stop_btn').click(function() {
    o.stop();
  });

  $('#volume_slider').change(function() {
    o.changeGain($(this).val() / 10);
    console.log($(this).val() / 10);
  });

  $('#effect_slider').change(function() {
    o.changeRate($(this).val());
  });

  $('#effects').change(function() {
    o.stop();
    o.play($(this).val());
  });

  function getFreq(note) {
    var freq;
    switch(note) {
      case 'a':
        freq = 440;
        break;
      case 'a#':
        freq = 466.16;
        break;  
      case 'b':
        freq = 493.88;
        break;
      case 'c':
        freq = 523.25;
        break;
      case 'c#':
        freq = 554.37;
        break;
      case 'd':
        freq = 587.33;
        break;
      case 'd#':
        freq = 622.25;
        break;
      case 'e':
        freq = 659.26;
        break;
      case 'f':
        freq = 698.46;
        break;
      case 'f#':
        freq = 739.99;
        break;
      case 'g':
        freq = 783.99;
        break;
      case 'g#':
        freq = 830.61;
        break;                
    }
    return freq;
  }

  function getNotes(scale) {
    for(var i = 16; i >= 0; i--) {
      switch(i) {
        case 0:
          note = 'C';
          break;
         case 1:
          note = 'C#'
          break;
         case 2:
          note = 'D';
          break;
         case 3: 
          note = 'D#' 
          break;
         case 4:
          note = 'E';
          break;
         case 5:
          note = 'F';
          break;
         case 6:
          note = 'F#';
          break;
         case 7:
          note = 'G';
          break;
         case 8:
          note = 'G#';
          break;
         case 9:
          note = 'A';
          break;
         case 10:
          note = 'A#';
          break;
         case 11: 
          note = 'B';
          break;
        case 12:
          note = 'C';
          break;
        case 13:
          note = 'C#'
          break;  
        case 14:
          note = 'D';
          break;
        case 15: 
          note = 'D#' 
          break;
        case 16:
          note = 'E';
          break;  
      }
      $('#music_area').append('<div class="notearea" style="position:absolute; top:'+(500-(i*30))+'px;">'+note+'</div>');
    }
  } 
});