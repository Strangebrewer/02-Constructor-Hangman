var Word = require("./word.js");
var colors = require("colors/safe");
var prompt = require("prompt");

var wordArray = ["ineffable", "nefarious", "cellar door", "serendipity", "bombastic", "mad as a hatter", "epiphany", "three sheets to the wind", "ephemeral", "defenestrate", "curioser and curiouser"];

var gameWordArray = wordArray;

var randomWord;
var gameWord;
var incorrectGuessesRemaining = 7;
var wordSpaces = 0;
var correctGuessesRemaining;
var randomNum;
var lettersGuessed = [];

var schema = {
  properties: {
    letter: {
      description: "Guess a letter",
      pattern: /^[a-zA-Z]+$/,
      maxLength: 1,
      message: 'Guesses must be one letter.',
      required: true
    }
  }
}

function newWord() {
  lettersGuessed = [];
  randomNum = Math.floor(Math.random() * (gameWordArray.length))
  randomWord = gameWordArray[randomNum];
  gameWord = new Word(randomWord);
  console.log(gameWord.displayWord());
}

function runPrompt() {
  prompt.get(schema, function (error, response) {

    if (lettersGuessed.includes(response.letter)) {
      console.log("You already guessed that letter!");
      return runPrompt();
    }
    else {
      lettersGuessed.push(response.letter);

      if (gameWord.word.includes(response.letter)) {
        gameWord.checkGuess(response.letter);
        console.log(gameWord.displayWord());
        console.log(colors.green("CORRECT!\n"));
        var endGameArray = [];

        for (let i = 0; i < gameWord.letterArray.length; i++) {
          const element = gameWord.letterArray[i];
          if (element.guessed === true) {
            endGameArray.push("true");
          }
          else {
            endGameArray.push("false");
          }
        }

        if (!(endGameArray.includes("false"))) {
          gameWordArray.splice(randomNum, 1);
          if (gameWordArray.length === 0) {
            return console.log("You Won!\nThat's all the words we have. GAME OVER!");
          }
          else {
            console.log("You won! Next Word!");
            incorrectGuessesRemaining = 7;
            newWord();
          }
        }

      }
      else {
        incorrectGuessesRemaining--;
        console.log(colors.red("\nINCORRECT!\n"));

        if (incorrectGuessesRemaining === 0) {
          gameWordArray.splice(randomNum, 1);
          if (gameWordArray.length === 0) {
            return console.log("You're out of guesses.\nThat's all the words we have. GAME OVER!");
          }
          else {
            console.log("You're out of guesses. Next word!")
            incorrectGuessesRemaining = 7;
            newWord();
          }
        }
        else {
          console.log(colors.yellow(incorrectGuessesRemaining) + " incorrect guesses remaining!\n");
        }
      }

      newGuess();

    }

  });

}

function newGuess() {
  prompt.start();
  runPrompt();
}

newWord();
newGuess();