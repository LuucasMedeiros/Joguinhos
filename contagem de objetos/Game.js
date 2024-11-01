
export class Game {

    gameHistory = localStorage.getItem('jogos') ? JSON.parse(localStorage.getItem('jogos')) : [];    
    punctuation = 0;
    attempt = 0;
    gameName = '';
    userName = '';
    
    constructor(gameName) {
        this.gameName = gameName;
    }

    sumPoint() {
        this.punctuation += 1;
    }

    attemptCounter() {
        this.attempt += 1;
    }

    returnPerformance() {
        
        let performance = '';
        
        switch(this.punctuation) {
            case 0: performance = 'baixo';
                break;

            case 1: performance = 'baixo';
                break;
            
            case 2: performance = 'baixo';
                break;
            
            case 3: performance = 'medio';
                break;

            case 4: performance = 'alto';
                break;

            case 5: performance = 'alto';
                break;

            default: performance = '';
                break;
        };

        return performance;
    }

    gameSaves() {

        const date = new Date ();
        const day = date.getDate ();
        const month = date.getMonth ();
        const year = date.getFullYear ();
        const dateFormatted = `${day}/${(month)}/${year}`;


        const jogo = {
            performance: this.returnPerformance(),
            punctuation: this.punctuation,
            gameName: this.gameName,
            attempt: this.attempt,
            date: dateFormatted,
        };

        console.log(jogo)

        if(this.gameHistory.length > 0) {

            for(let i = 0; i < this.gameHistory.length; i++) {
        
                if(this.gameName === this.gameHistory[i][0].gameName) {

                    this.gameHistory[i].push(jogo);
                    localStorage.setItem('jogos', JSON.stringify(this.gameHistory));
                    return;
                };
            };

            this.gameHistory.push([jogo]);  
            localStorage.setItem('jogos', JSON.stringify(this.gameHistory));

        } else {

            this.gameHistory.push([jogo]);  
            localStorage.setItem('jogos', JSON.stringify(this.gameHistory));
        };
    }
}
