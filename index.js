var Word = require("./word.js");
var colors = require("colors/safe");
var prompt = require("prompt");

var wordArray = ["ineffable", "nefarious", "cellar door", "serendipity", "bombastic", "mad as a hatter", "epiphany", "three sheets to the wind", "ephemeral", "defenestrate", "curiouser and curiouser"];

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
  randomNum = Math.floor(Math.random() * (wordArray.length))
  randomWord = wordArray[randomNum];
  gameWord = new Word(randomWord);
  console.log(gameWord.displayWord());
  lettersGuessed = [];
}

function newGuess() {
  prompt.start();
  runPrompt();
}

function runPrompt() {
  prompt.get(schema, function (error, response) {

    //  if guess is a repeat for this word, display that and rerun the prompt
    if (lettersGuessed.includes(response.letter)) {
      console.log("You already guessed that letter!");
      return runPrompt();
    }
    else {
      lettersGuessed.push(response.letter);

      //  if the guess is correct, display 'correct' and run the guess function (property of the Letter constructor) by running the checkGuess function (property of the Word constructor)
      if (gameWord.word.includes(response.letter)) {
        gameWord.checkGuess(response.letter);
        console.log(gameWord.displayWord());
        console.log(colors.green("CORRECT!\n"));

        //  set variable to an array to contain a boolean for the guessed condition of each letter
        var endWordArray = [];

        //  loop through the letterArray (letterArray is a property of the Word constructor)
        for (let i = 0; i < gameWord.letterArray.length; i++) {
          const element = gameWord.letterArray[i];
          // if the guessed property of the letter is true, push a 1 to the endWordArray
          if (element.guessed === true) {
            endWordArray.push(1);
          }
          //  if guessed property is false, push 0 to endWordArray
          else {
            endWordArray.push(0);
          }
        }
        //  if all letters have been guessed the endWordArray will contain only 1s, and the word has been guessed
        if (!(endWordArray.includes(0))) {
          //  remove the current game word from the wordArray
          wordArray.splice(randomNum, 1);
          //  if the word array is empty, the game is over - return to command line
          if (wordArray.length === 0) {
            return console.log("You Won!\nThat's all the words we have. GAME OVER!");
          }
          //  otherwise, move on to the next word and reset incorrect guesses for the next word
          else {
            console.log("You won! Next Word!");
            incorrectGuessesRemaining = 7;
            newWord();
          }
        }

      }
      //  if the guess is incorrect, decrement incorrect guesses and display 'incorrect'
      else {
        incorrectGuessesRemaining--;
        console.log(colors.red("\nINCORRECT!\n"));

        //  if incorrect guesses are depleted, remove the word from the wordArray
        if (incorrectGuessesRemaining === 0) {
          wordArray.splice(randomNum, 1);
          //  if wordArray is empty, the game is over
          if (wordArray.length === 0) {
            return console.log("You're out of guesses.\nThat's all the words we have. GAME OVER!");
          }
          //  otherwise, reset incorrect guesses and move on to the next word
          else {
            console.log("You're out of guesses. Next word!")
            incorrectGuessesRemaining = 7;
            newWord();
          }
        }
        //  if there are incorrect guesses left, display number of guesses remaining
        else {
          console.log(colors.yellow(incorrectGuessesRemaining) + " incorrect guesses remaining!\n");
        }
      }

      //  once a) the logic has been run for the current guess, b) the word is not yet complete, and c) incorrectGuessesRemaining is still > 0, prompt for a new guess
      newGuess();

    }

  });

}

newWord();
newGuess();