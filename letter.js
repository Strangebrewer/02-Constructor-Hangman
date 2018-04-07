function Letter(letterInput) {

  this.letter = letterInput;
  this.guessed = false;

  this.toString = function () {
    if (this.letter === " ") {
      this.guessed = true;
      return " ";
    }
    else if (this.guessed === false) {
      return "_";
    }
    else {
      return this.letter;
    }
  }

  this.guess = function (guessInput) {
    if (guessInput === this.letter) {
      this.guessed = true;
    }
  }

}

module.exports = Letter;