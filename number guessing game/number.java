//PROBLEM STATEMENT
// This is a number-guessing game that allows a user to choose a number at first. 
// Let the number guessed by the user be (x).
// The program generates a number (y).
// The objective of the game is to guess the number.
// If the number is :
// 1) x>y 
//   The program will indicate that the number to be guessed is less than the number guessed by the user.
// 2) x<y 
//  The program will indicate that the number to be guessed is greater than the number guessed by the user.
// 3) x=y 
//  The program will indicate that the number to be guessed is equal to the number guessed by the user.

// The player's score will be the number of tries taken to guess the correct number. 

import java.util.Random;
import java.util.Scanner;
public class cwh_50_ex3sol {
    public static void main(String[] args) {
        /*
            Create a class Game, which allows a user to play "Guess the Number"
            game once. Game should have the following methods:
            1. Constructor to generate the random number
            2. takeUserInput() to take a user input of number
            3. isCorrectNumber() to detect whether the number entered by the user is true
            4. getter and setter for noOfGuesses
            Use properties such as noOfGuesses(int), etc to get this task done!
         */

        Game g = new Game();
        boolean b= false;
        while(!b){
        g.takeUserInput();
        b = g.isCorrectNumber();
        }

    }
}

class Game{
    public int number;
    public int inputNumber;
    public int noOfGuesses = 0;

    public int getNoOfGuesses() {
        return noOfGuesses;
    }

    public void setNoOfGuesses(int noOfGuesses) {
        this.noOfGuesses = noOfGuesses;
    }

    Game(){
        Random rand = new Random();
        this.number = rand.nextInt(100);
    }
    void takeUserInput(){
        System.out.println("Guess the number");
        Scanner sc = new Scanner(System.in);
        inputNumber = sc.nextInt();
    }
    boolean isCorrectNumber(){
        noOfGuesses++;
        if (inputNumber==number){
            System.out.format("Yes you guessed it right, it was %d\nYou guessed it in %d attempts", number, noOfGuesses);
            return true;
        }
        else if(inputNumber<number){
            System.out.println("Too low...");
        }
        else if(inputNumber>number){
            System.out.println("Too high...");
        }
        return false;
    }

}
