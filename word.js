var Letter = require("./letter.js");

function Word(wordInput) {
  
  this.word = wordInput.split("");
  this.letterArray = [];

  for (let i = 0; i < this.word.length; i++) {
    const element = this.word[i];
    var newLetter = new Letter(element);
    this.letterArray.push(newLetter);
  }

  this.displayWord = function () {
    var display = "";
    for (let i = 0; i < this.letterArray.length; i++) {
      const element = this.letterArray[i];
      display += element + " ";
    }
    return `\n${display}\n`;
  }

  this.checkGuess = function (guess) {
    for (let i = 0; i < this.letterArray.length; i++) {
      const element = this.letterArray[i];
      element.guess(guess);
    }
  }

}

module.exports = Word;