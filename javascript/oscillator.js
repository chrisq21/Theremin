  context = new webkitAudioContext;
  tuna = new Tuna(context);
  function OscillatorSample() {
    this.isPlaying = false;
    // this.canvas = document.querySelector('canvas');
    this.WIDTH = 640;
    this.HEIGHT = 240;
  }

  OscillatorSample.prototype.play = function(effect_string) {
    // Create some sweet sweet nodes.
    this.isPlaying = true;
    this.oscillator = context.createOscillator();
    this.oscillator.type = 1;
    this.gainNode = context.createGain();
    this.gainNode.gain.value = 0.5;
    switch(effect_string) {
      case 'Chorus':
      console.log('CHORUS!')
        this.effect = new tuna.Chorus();
        break;
      case 'Phaser':
        this.effect = new tuna.Phaser();

        break;
      case 'Tremolo':
        this.effect = new tuna.Tremolo();
        this.effect.rate = 8;
        // console.log("Effect: "+this.effect.rate);
        break;    
    }

    this.oscillator.connect(this.effect.input);
    this.effect.connect(this.gainNode);
    this.gainNode.connect(context.destination);
    this.oscillator.frequency.value = 500;
    this.oscillator.start(0);
  };

  OscillatorSample.prototype.stop = function() {
    this.isPlaying = false;
    this.oscillator.stop(0);
  };

  OscillatorSample.prototype.toggle = function() {
    (this.isPlaying ? this.stop() : this.play());
    this.isPlaying = !this.isPlaying;

  };

  OscillatorSample.prototype.changeFrequency = function(val) {
    this.oscillator.frequency.value = val;
  };

  OscillatorSample.prototype.changeGain = function(val) {
    this.gainNode.gain.value = val;
  };

  OscillatorSample.prototype.changeRate = function(rate) {
    this.effect.rate = rate;
  }

  