// TODO:
// 1.deposit some money
// 2.collect a bet money 
// 3.determine number of lines to bet
// 4.spin the slot machine
// 5. check if user win
// 6.give the user their winning
// 7.play again

const prompt =require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT={
    A:2,
    B:4,
    C:6,
    D:7

};
const SYMBOL_VALUES={
    A:5,
    B:4,
    C:3,
    D:2

};




const deposit = ()=>{
  while(true){
    const depositAmount=prompt("enter a deposit amount: ")
    const numberDepositAmount=parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount<=0){
        console.log("Invalid deposit amount");
    }else{
        return numberDepositAmount;
    }
  }
};

const getNumberOfLines = ()=>{
    while(true){
        const lines =prompt("enter a  number of lines(1-3): ");
        const numberOfLines=parseFloat(lines);
    
        if (isNaN(numberOfLines) || numberOfLines<=0 || numberOfLines >3){
            console.log("Invalid number of lines");
        }else{
            return numberOfLines;
        }
      }

};
const getBet =(balance,lines)=>{
    while(true){
        const bet =prompt("enter a   bet amount per lines : ");
        const numberBet=parseFloat(bet);
    
        if (isNaN(numberBet) || numberBet<=0 || numberBet  > (balance/lines)){
            console.log("Invalid Bet");
        }else{
            return numberBet;
        }
      }

};

const spin = ()=>{
    const symbols=[];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for (let i=0;i<count;i++){
            symbols.push(symbol);
              
        }
    }
        const reels = [[],[],[]];
        for (let i = 0;i<COLS;i++){
            const reelSymbols=[...symbols];
            for (let j=0;j<ROWS;j++){
                const randomIndex=Math.floor(Math.random()*reelSymbols.length);
                const selectedSymbol= reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex,1);
            }

        }
        return reels;

};


const transpose=(reels)=>{
    const rows=[];
    for (let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}
const printRows= (rows)=>{
    for (const row of rows){
        let rowString="";
        for(const [i,symbol]of row.entries()){
            rowString+=symbol
            if(i!= row.length-1){
                rowString+= "| "
            }

        }
        console.log(rowString);
    }
};

const getWinning=(rows,bet,lines)=>{
    let winnings=0;
    for(let row=0; row< lines;row++){
        const symbols=rows[row];
        let allSame=true;
        for (const symbol of symbols){
            if(symbol!= symbols[0]){
                allSame=false;
                break;
            }
        }
        if (allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
        return winnings;


    }
}

const game=()=>{
    while(true){
          console.log("You have a balance of $ "+balance);
        let balance=deposit();
        const numberOfLines=getNumberOfLines();
        const bet=getBet(balance,numberOfLines);
        const reels=spin();



       const rows=transpose(reels);

       printRows(rows);
       const winnings=getWinning(rows,bet,numberOfLines);
       console.log(`You won  $.${winnings.toString()} dollars`);
       if (balance<=0){
        console.log("you ran out the money");
        break;
       }
       const playAgain=prompt("Do you want to play again(y/n)?: ");
       if (playAgain!= "y") break;
    }
};








game();



