
// constructor function that store the snakes and ladders cells, and the convertion of the cells places to suit the image and the five methods
function SnakesLadders() {
    this.turn = 1;              // to switch turn between the players
    this.player1place = 1;      // first player place
    this.player2place = 1;      // second player place
    this.check=0;                // 0 to continue the game, 3 if player one win, 4 if player two win
    this.hard_bot_arr=[6,6,1,1,1,1]  // array for the hard mode that store the number of dice for the next 3 moves
    this.hard_bot_index =0;          // index has 2 tasks first to get the right number on the dice and the second task is to let the bot choose randomly when the index is greater than the length of the array
    this.newGame_check = 0;          // if the user press new game when timeout function is occuring then the game will start itself because the timeout function will call the method
    this.red_circle = 'assets/red.png';
    this.blue_circle = 'assets/blue.png';
    this.board = {   // convert the number from bottom of the ladder to the top and from the head of the snakes to the tail
        2:38,
        7:14,
        8:31,
        15:26,
        16:6,
        21:42,
        28:84,
        36:44,
        46:25,
        49:11,
        51:67,
        62:19,
        64:60,
        71:91,
        74:53,
        78:98,
        87:94,
        89:68,
        92:88,
        95:75,
        99:80
    };
    this.img ={  // convert the number of the player place to the correspondent place on the image 
        1:91,
        2:92,
        3:93,
        4:94,
        5:95,
        6:96,
        7:97,
        8:98,
        9:99,
        10:100,
        11:90,
        12:89,
        13:88,
        14:87,
        15:86,
        16:85,
        17:84,
        18:83,
        19:82,
        20:81,
        21:71,
        22:72,
        23:73,
        24:74,
        25:75,
        26:76,
        27:77,
        28:78,
        29:79,
        30:80,
        31:70,
        32:69,
        33:68,
        34:67,
        35:66,
        36:65,
        37:64,
        38:63,
        39:62,
        40:61,
        41:51,
        42:52,
        43:53,
        44:54,
        45:55,
        46:56,
        47:57,
        48:58,
        49:59,
        50:60,
        51:50,
        52:49,
        53:48,
        54:47,
        55:46,
        56:45,
        57:44,
        58:43,
        59:42,
        60:41,
        61:31,
        62:32,
        63:33,
        64:34,
        65:35,
        66:36,
        67:37,
        68:38,
        69:39,
        70:40,
        71:30,
        72:29,
        73:28,
        74:27,
        75:26,
        76:25,
        77:24,
        78:23,
        79:22,
        80:21,
        81:11,
        82:12,
        83:13,
        84:14,
        85:15,
        86:16,
        87:17,
        88:18,
        89:19,
        90:20,
        91:10,
        92:9,
        93:8,
        94:7,
        95:6,
        96:5,
        97:4,
        98:3,
        99:2,
        100:1
    };
    this.newGame = ()=>{
        this.newGame_check =1;  // so the timeout function don't call any method if the new game button is pressed
        this.turn = 1;
        this.player1place = 1;
        this.player2place = 1;
        this.check =0;
        this.hard_bot_index =0;
        players[0].position = 1;
        players[1].position = 1;
        renderPlayersInfo();
        const game_won_check = document.getElementById('won');
        if(game_won_check && checkbox_div){
            checkbox_div.removeChild(game_won_check);
        }// game_won_check.style.visibility = 'hidden';
        let cells = document.querySelectorAll('.insider')
        for(let cell of cells){
            cell.style['background-image'] = null;
        }
        const cell91 = document.getElementById('91');
        cell91.style['background-image'] = `url(${this.red_circle})`; 
        cell91.style['background-size']='cover';
        dice.className = 'dice'; // Reset classes
        dice2.className = 'dice';
        dice.innerHTML = '';
        dice2.innerHTML = '';
        dice.style['transform'] = 'rotate(0deg)'
        dice2.style['transform'] = 'rotate(0deg)'
        checkbox_sub_div.style.visibility= 'visible';
        two_dice_div.style.visibility= 'visible';
        two_players_div.style.visibility= 'visible';
        document.getElementById('play').removeAttribute('disabled');
        document.getElementById("turn").textContent= player_name;
        playersInfoEl.style.visibility = 'hidden';
    };
    this.play = ()=>{  // called when playing with 2 dice and 2 players
        if(this.check==3){ return 0}; // check if player 1 won //console.log( player_name+' Wins!');
        if(this.check==4){ return 0}; // check if player 2 won //console.log( 'Player 2 Wins!');
        let die1 = Math.ceil(Math.random()*6)  // random number for the dice between 1 and 6
        let die2 = Math.ceil(Math.random()*6)
        //console.log(die1 + ' '+die2)
        this.roll_dice(die1)
        this.roll_dice2(die2)
        if(this.turn==1){  // player 1 turn
            let element = document.getElementById(this.img[this.player1place]) || null;  // convert to right place on the image, and null because at first the place is 0 and that throw and error
            if(this.player2place!=this.player1place){   
                //if(element) element.style['background-image'] = null;  // to turn the background off before leaving the palce
                setTimeout(()=>{if(element) element.style['background-image'] = null},1500)
            }else{
                setTimeout(()=>{if(element) element.style['background-image'] = `url(${this.blue_circle})`},1500) ;// to turn the background by the opposit color before leaving (that was a glitch caused by the comming to the occupied place abd leaving it on the next turn before the opposit play(2 dice equal case))
                if(element)element.style['background-size']='cover';
            }
            if(die1!==die2){this.turn=2};     // to switch the turn if dice aren't the same and to not switching it if the dice has the same number
            this.player1place = this.player1place+die1+die2;   // changing the player place to the next one
            if(this.player1place==100){  // checking if the current player won  
                this.turn=2;             // chanching the turn in case the dice are the same
                this.check =3;           // changing the check 
                //console.log( player_name+ ' Wins!');
                setTimeout(()=>{game_won()},1500);
                setTimeout(()=>{playMp3('assets/winning.mp3')},1500);
            }else{           // normal cases
                if(this.player1place>100) this.player1place = 100 -(this.player1place%100)  // bounce back above 100
                if(this.board[this.player1place]) this.player1place = this.board[this.player1place]  // checking if the player lay on a snake head or a bottom of a ladder
                //console.log( 'Player 1 is on square '+this.player1place);
                players[0].position = this.player1place;
                setTimeout(renderPlayersInfo,1500);
            };
            let element_new = document.getElementById(this.img[this.player1place]) || null;
            setTimeout(()=>{if(element_new)element_new.style['background-image'] = `url(${this.red_circle})`},1500);        // coloring the newly occupied place
            if(element_new)element_new.style['background-size']='cover';
        }else if(this.turn==2){   // player 2 turn 
            let element2 = document.getElementById(this.img[this.player2place]) || null;  
            if(this.player2place!=this.player1place){
                //if(element2) element2.style['background-image'] = null;
                setTimeout(()=>{if(element2) element2.style['background-image'] = null},1500)
            }else{
                setTimeout(()=>{if(element2) element2.style['background-image'] = `url(${this.red_circle})`},1500);
                if(element2)element2.style['background-size']='cover';
            }
            if(die1!==die2){this.turn=1};
            this.player2place = this.player2place+die1+die2;
            if(this.player2place==100){
                this.turn=1;
                this.check =4;
                //console.log('Player 2 Wins!');
                setTimeout(()=>{game_won()},1500);
                setTimeout(()=>{playMp3('assets/losing.mp3')},1500);
            }else{
                if(this.player2place>100) this.player2place = 100 -(this.player2place%100) 
                if(this.board[this.player2place]) this.player2place = this.board[this.player2place]
                //console.log('Player 2 is on square '+ this.player2place);
                players[1].position = this.player2place;
                setTimeout(renderPlayersInfo,1500);
            };
            let element2_new = document.getElementById(this.img[this.player2place]) || null;
            setTimeout(()=>{if(element2_new) element2_new.style['background-image'] = `url(${this.blue_circle})`},1500)
            if(element2_new) element2_new.style['background-size']='cover';
        };
        setTimeout(()=>{document.getElementById("turn").textContent= `Player ${this.turn}`},1500);   // changing the player 2 above the play button on the user interface
    };
    this.bot = ()=>{   // called when playing one player and two dice
        if(this.check==3){ return 0};//console.log( player_name+' Wins!');
        if(this.check==4){ return 0};//console.log( 'Player 2 Wins!');
        let die1 = Math.ceil(Math.random()*6)
        let die2 = Math.ceil(Math.random()*6)
        //console.log(die1 + ' '+die2)
        this.roll_dice(die1);
        this.roll_dice2(die2);
        if(this.turn==1){
            let element = document.getElementById(this.img[this.player1place]) || null;
            if(this.player2place!=this.player1place){
                //if(element) element.style['background-image'] = null;
                setTimeout(()=>{if(element) element.style['background-image'] = null},1500)
            }else{
                setTimeout(()=>{if(element) element.style['background-image'] = `url(${this.blue_circle})`},1500);
                if(element)element.style['background-size']='cover';
            }
            if(die1!==die2){this.turn=2};
            this.player1place = this.player1place+die1+die2;
            if(this.player1place==100){
                this.turn=2;
                this.check =3;
                //console.log( player_name+' Wins!');
                setTimeout(()=>{game_won()},1500);
                setTimeout(()=>{playMp3('assets/winning.mp3')},1500);
            }else{
                if(this.player1place>100) this.player1place = 100 -(this.player1place%100) 
                if(this.board[this.player1place]) this.player1place = this.board[this.player1place]
                //console.log( 'Player 1 is on square '+this.player1place);
                players[0].position = this.player1place;
                setTimeout(renderPlayersInfo,1500);
            };
            let element_new = document.getElementById(this.img[this.player1place]) || null;
            setTimeout(()=>{if(element_new)element_new.style['background-image'] = `url(${this.red_circle})`},1500)
            if(element_new)element_new.style['background-size']='cover';
        }else if(this.turn==2){
            let element2 = document.getElementById(this.img[this.player2place]) || null;
            if(this.player2place!=this.player1place){
                setTimeout(()=>{if(element2) element2.style['background-image'] = null},1500);
            }else{
                setTimeout(()=>{if(element2) element2.style['background-image'] = `url(${this.red_circle})`},1500);
                if(element2)element2.style['background-size']='cover';
            }
            if(die1!==die2){this.turn=1};
            this.player2place = this.player2place+die1+die2;
            if(this.player2place==100){
                this.turn=1;
                this.check =4;
                //console.log('Bot Wins!');
                setTimeout(()=>{game_won()},1500);
                setTimeout(()=>{playMp3('assets/losing.mp3')},1500);
            }else{
                if(this.player2place>100) this.player2place = 100 -(this.player2place%100) 
                if(this.board[this.player2place]) this.player2place = this.board[this.player2place]
                //console.log('Bot is on square '+ this.player2place);
                players[1].position = this.player2place;
                setTimeout(renderPlayersInfo,1500);
            };
            let element2_new = document.getElementById(this.img[this.player2place]) || null;
            setTimeout(()=>{if(element2_new) element2_new.style['background-image'] = `url(${this.blue_circle})`},1500);
            if(element2_new) element2_new.style['background-size']='cover';
        };
        if(this.turn==2){
            setTimeout(()=>{document.getElementById("turn").textContent= 'Bot'},1500);
        }else{
            setTimeout(()=>{document.getElementById("turn").textContent= `Player ${this.turn}`},1500);
        }
        if(this.turn==2) {
            setTimeout(timeout_function, 3000);   // a 3 second wait so the bot doesn't play directly after the human player it's annoying beleive me
        };
        if(this.turn==2) document.querySelector('#play').setAttribute('disabled',true)  // to not let the user press the button during the bot turn
        setTimeout(()=>{if(this.turn==1) document.querySelector('#play').removeAttribute('disabled')},1500);  // allowing the user to play after the bot finish its turn
    };
    this.playOne =()=>{      // called when playing two players and one dice
        if(this.check==3){ return 0}; //console.log( player_name+' Wins!');
        if(this.check==4){ return 0}; //console.log( 'Player 2 Wins!');
        let die1 = Math.ceil(Math.random()*6)
        //console.log(die1)
        this.roll_dice(die1)
        if(this.turn==1){
            let element = document.getElementById(this.img[this.player1place]) || null;
            if(this.player2place!=this.player1place){
                setTimeout(()=>{if(element) element.style['background-image'] = null;},1500)
            }else{
                setTimeout(()=>{if(element) element.style['background-image'] = `url(${this.blue_circle})`},1500);  // i can remove this else statement because there's one dice and the player can't have a second turn without the opposit play(no 2 dice equal case)
                if(element)element.style['background-size']='cover';
            }
            this.turn=2;
            this.player1place = this.player1place+die1;
            if(this.player1place==100){
                this.turn=2;
                this.check =3;
                //console.log( player_name+' Wins!');
                setTimeout(()=>{game_won()},1500);
                setTimeout(()=>{playMp3('assets/winning.mp3')},1500);
            }else{
                if(this.player1place>100) this.player1place = 100 -(this.player1place%100) 
                if(this.board[this.player1place]) this.player1place = this.board[this.player1place]
                //console.log( 'Player 1 is on square '+this.player1place);
                players[0].position = this.player1place;
                setTimeout(renderPlayersInfo,1500);
            };
            let element_new = document.getElementById(this.img[this.player1place]) || null;
            setTimeout(()=>{if(element_new)element_new.style['background-image'] = `url(${this.red_circle})`;},1500)
            if(element_new)element_new.style['background-size']='cover';
        }else if(this.turn==2){
            let element2 = document.getElementById(this.img[this.player2place]) || null;
            if(this.player2place!=this.player1place){
                setTimeout(()=>{if(element2) element2.style['background-image'] = null},1500)
            }else{
                setTimeout(()=>{if(element2) element2.style['background-image'] = `url(${this.red_circle})`},1500);     // i can remove this else statement because there's one dice and the player can't have a second turn without the opposit play(no 2 dice equal case)
                if(element2)element2.style['background-size']='cover';
            }
            this.turn=1;
            this.player2place = this.player2place+die1;
            if(this.player2place==100){
                this.turn=1;
                this.check =4;
                //console.log('Player 2 Wins!');
                setTimeout(()=>{game_won()},1500);
                setTimeout(()=>{playMp3('assets/winning.mp3')},1500);
            }else{
                if(this.player2place>100) this.player2place = 100 -(this.player2place%100) 
                if(this.board[this.player2place]) this.player2place = this.board[this.player2place]
                //console.log('Player 2 is on square '+ this.player2place);
                players[1].position = this.player2place;
                setTimeout(renderPlayersInfo,1500);
            };
            let element2_new = document.getElementById(this.img[this.player2place]) || null;
            setTimeout(()=>{if(element2_new) element2_new.style['background-image'] = `url(${this.blue_circle})`},1500)
            if(element2_new) element2_new.style['background-size']='cover';
        };
        setTimeout(()=>{document.getElementById("turn").textContent= `Player ${this.turn}`},1500);
    }
    this.botOne= ()=>{   // called when playing one player and one dice
        if(this.check==3){return 0}; //console.log( player_name +' Wins!');
        if(this.check==4){return 0}; //console.log( 'Bot Wins!');
        let die1 = Math.ceil(Math.random()*6)
        //console.log(die1)
        this.roll_dice(die1)
        if(this.turn==1){
            let element = document.getElementById(this.img[this.player1place]) || null;
            if(this.player2place!=this.player1place){
                setTimeout(()=>{if(element) element.style['background-image'] =  null},1500)           
            }else{
                setTimeout(()=>{if(element) element.style['background-image'] = `url(${this.blue_circle})`},1500);
                if(element)element.style['background-size']='cover';
            }
            this.turn=2;
            this.player1place = this.player1place+die1;
            if(this.player1place==100){
                this.turn=2;
                this.check =3;
                //console.log( player_name+' Wins!');
                setTimeout(()=>{game_won()},1500);
                setTimeout(()=>{playMp3('assets/winning.mp3')},1500);
            }else{
                if(this.player1place>100) this.player1place = 100 -(this.player1place%100) 
                if(this.board[this.player1place]) this.player1place = this.board[this.player1place]
                //console.log( 'Player 1 is on square '+this.player1place);
                players[0].position = this.player1place;
                setTimeout(renderPlayersInfo,1500);
            };
            let element_new = document.getElementById(this.img[this.player1place]) || null;
            setTimeout(()=>{if(element_new) element_new.style['background-image'] =  `url(${this.red_circle})`},1500)
            if(element_new) element_new.style['background-size']= 'cover';
        }else if(this.turn==2){
            playMp3('/assets/roll_dice.mp3');
            let element2 = document.getElementById(this.img[this.player2place]) || null;
            if(this.player2place!=this.player1place){
                setTimeout(()=>{if(element2) element2.style['background-image'] =  null},1500)

            }else{
                setTimeout(()=>{if(element2) element2.style['background-image'] = `url(${this.red_circle})`},1500);
                if(element2)element2.style['background-size']='cover';
            }
            this.turn=1;
            this.player2place = this.player2place+die1;
            if(this.player2place==100){
                this.turn=1;
                this.check =4;
                //console.log('Bot Wins!');
                setTimeout(()=>{game_won()},1500);
                setTimeout(()=>{playMp3('assets/losing.mp3')},1500);
            }else{
                if(this.player2place>100) this.player2place = 100 -(this.player2place%100) 
                if(this.board[this.player2place]) this.player2place = this.board[this.player2place]
                //console.log('Bot is on square '+ this.player2place);
                players[1].position = this.player2place;
                setTimeout(renderPlayersInfo,1500);
            };
            let element2_new = document.getElementById(this.img[this.player2place]) || null;
            setTimeout(()=>{if(element2_new) element2_new.style['background-image'] =  `url(${this.blue_circle})`},1500);
            if(element2_new)element2_new.style['background-size']='cover';
        };
        if(this.turn==2){
            setTimeout(()=>{document.getElementById("turn").textContent= 'Bot'},1500);  
        }else{
            setTimeout(()=>{document.getElementById("turn").textContent= `Player ${this.turn}`},1500);
        }
        if(this.turn==2) {
            setTimeout(timeout_function, 2500);
        };
        if(this.turn==2) document.querySelector('#play').setAttribute('disabled',true)
        setTimeout(()=>{if(this.turn==1) document.querySelector('#play').removeAttribute('disabled')},1500);
    }
    this.hard=()=>{    // called when playing against hard opponent, here the bot will arrive to the cell 84 in 2 turns (3 moves) and have a move in hand (2 dice equal case)
        if(this.check==3){ return 0};//console.log( player_name+' Wins!');
        if(this.check==4){ return 0};//console.log( 'Bot Wins!');
        if(this.turn==1){
            let die1 = Math.ceil(Math.random()*6)
            let die2 = Math.ceil(Math.random()*6)
            //console.log(die1 + ' '+die2)
            this.roll_dice(die1);
            this.roll_dice2(die2)
            let element = document.getElementById(this.img[this.player1place]) || null;
            if(this.player2place!=this.player1place){
                setTimeout(()=>{if(element) element.style['background-image'] = null},1500);
            }else{
                setTimeout(()=>{if(element) element.style['background-image'] = `url(${this.blue_circle})`},1500);
                if(element)element.style['background-size']='cover';
            }
            if(die1!==die2){this.turn=2};
            this.player1place = this.player1place+die1+die2;
            if(this.player1place==100){
                this.turn=2;
                this.check =3;
                //console.log( player_name+' Wins!');
                setTimeout(()=>{game_won()},1500);
                setTimeout(()=>{playMp3('assets/winning.mp3')},1500);
            }else{
                if(this.player1place>100) this.player1place = 100 -(this.player1place%100) 
                if(this.board[this.player1place]) this.player1place = this.board[this.player1place]
                //console.log( 'Player 1 is on square '+this.player1place);
                players[0].position = this.player1place;
            };
            let element_new = document.getElementById(this.img[this.player1place]) || null;
            setTimeout(()=>{if(element_new)element_new.style['background-image'] = `url(${this.red_circle})`},1500)
            if(element_new)element_new.style['background-size']='cover';
        }else if(this.turn==2){
            let die1 = 0;
            let die2 = 0;
            if(this.hard_bot_index<this.hard_bot_arr.length){  // checking if the bot played all his designated moves or yet
                die1 = this.hard_bot_arr[this.hard_bot_index];    // assigning the first dice to the coorespondent index in the array
                die2 = this.hard_bot_arr[this.hard_bot_index+1];
                this.hard_bot_index+=2;       // adding the index for the next move or turn
            }else{                    // leaving the bot to his chance :(
                die1 = Math.ceil(Math.random()*6)
                die2 = Math.ceil(Math.random()*6)
            }
            //console.log(die1 + ' '+die2)
            this.roll_dice(die1);
            this.roll_dice2(die2);
            let element2 = document.getElementById(this.img[this.player2place]) || null;
            if(this.player2place!=this.player1place){
                setTimeout(()=>{if(element2) element2.style['background-image'] = null},1500)
            }else{
                setTimeout(()=>{if(element2) element2.style['background-image'] = `url(${this.red_circle})`},1500);
                if(element2)element2.style['background-size']='cover';
            }
            if(die1!==die2){this.turn=1};
            this.player2place = this.player2place+die1+die2;
            if(this.player2place==100){
                this.turn=1;
                this.check =4;
                //console.log('Bot Wins!');
                setTimeout(()=>{game_won()},1500);
                setTimeout(()=>{playMp3('assets/losing.mp3')},1500);
            }else{
                if(this.player2place>100) this.player2place = 100 -(this.player2place%100) 
                if(this.board[this.player2place]) this.player2place = this.board[this.player2place]
                //console.log('Bot is on square '+ this.player2place);
                players[1].position = this.player2place;
                setTimeout(renderPlayersInfo,1500);
            };
            let element2_new = document.getElementById(this.img[this.player2place]) || null;
            setTimeout(()=>{if(element2_new) element2_new.style['background-image'] = `url(${this.blue_circle})`},1500);
            if(element2_new) element2_new.style['background-size']='cover';
        };
        if(this.turn==2){
            setTimeout(()=>{document.getElementById("turn").textContent= 'Bot'},1500);
        }else{
            setTimeout(()=>{document.getElementById("turn").textContent= `Player ${this.turn}`},1500);
        }
        if(this.turn==2) {
            setTimeout(timeout_function, 2500);
        };
        if(this.turn==2) document.querySelector('#play').setAttribute('disabled',true)
        if(this.turn==1) setTimeout(()=>{document.querySelector('#play').removeAttribute('disabled')},1000);
    }
    this.roll_dice=(number)=>{
          dice.className = 'dice'; // Reset classes
          dice.classList.add(this.getNumberClassName(number));
          dice.innerHTML = this.generateDiceFace(number);
          dice.style.transform = `rotate(${Math.random() * 3600}deg)`; // Add rotation for roll effect
    }
    this.roll_dice2=(number)=>{
        dice2.className = 'dice'; // Reset classes
        dice2.classList.add(this.getNumberClassName(number));
        dice2.innerHTML = this.generateDiceFace(number);
        dice2.style.transform = `rotate(${Math.random() * 3600}deg)`; // Add rotation for roll effect
    }
    this.getNumberClassName =(number)=>{
        const classNames = {
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
            5: 'five',
            6: 'six',
          };
          return classNames[number];
    }
    this.generateDiceFace =(number)=>{
        let dots = '';
        switch (number) {
          case 1:
            dots = '<div class="dot"></div>';
            break;
          case 2:
            dots = '<div class="dot"></div><div class="dot"></div>';
            break;
          case 3:
            dots = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
            break;
          case 4:
            dots = '<div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>';
            break;
          case 5:
            dots = '<div class="dot"></div><div class="dot v"></div><div class="dot"></div><div class="dot v"></div><div class="dot"></div><div class="dot v"></div><div class="dot"></div><div class="dot v"></div><div class="dot"></div>';
            break;
          case 6:
            dots = '<div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>';
            break;
        }
        return dots;
    }
};



let game = new SnakesLadders 

const checkbox_div = document.getElementById('checkbox_div');
const play_hard_checkbox = document.querySelector('#play_hard');
const two_players_checkbox = document.querySelector("#two_players");
const two_dice_checkbox = document.querySelector("#two_dice");
const new_game = document.querySelector('#new_game');
const dice = document.getElementById('dice');
const dice2 = document.getElementById('dice2');

async function play_now(){       // called when the play button is clicked on
    game.newGame_check = 0;   // to reset the check button to start playing normally
   // playSound();
   playMp3('/assets/roll_dice.mp3');
    const checkbox_sub_div = document.getElementById('checkbox_sub_div');
    const two_dice_div = document.getElementById('two_dice_div');
    const two_players_div = document.getElementById('two_players_div');
    checkbox_sub_div.style.visibility= 'hidden';      // hide the options so the user doesn't toggle them after the starting of the game
    two_dice_div.style.visibility= 'hidden';      // although their parent div has hidden visibility, but if the hard mode was checked and unchecked they will have a style of visibility visible and they will appear
    two_players_div.style.visibility= 'hidden';
    if(play_hard_checkbox.checked){          // specifing which method should be called
        game.hard();
    }else if(two_dice_checkbox.checked){
        if (two_players_checkbox.checked){
            game.play();
        }else{
            game.bot();
        }
    }else{
        if (two_players_checkbox.checked){
            game.playOne();
        }else{
            game.botOne();
        }
    };
    playersInfoEl.style.visibility = 'visible';
};

function timeout_function(){
    if(game.newGame_check){     // to check if the new game button was pressed during the bot turn
        return 0;
    }else if(play_hard_checkbox.checked){
        game.hard();
    }else if(two_dice_checkbox.checked){
        game.bot();
    }else{
        game.botOne();
    }
};

function hide_other_options(){    // function to hide other checkboxes if the hard mode is checked and to make them visible again if the user uncheked it
    const two_dice_div = document.getElementById('two_dice_div');
    const two_players_div = document.getElementById('two_players_div');
    const second_dice = document.getElementById('dice2');
    if(play_hard_checkbox.checked){
        two_dice_div.style.visibility= 'hidden';
        two_players_div.style.visibility= 'hidden';
        second_dice.style.visibility = 'visible';
    }else{
        two_dice_div.style.visibility= 'visible';
        two_players_div.style.visibility= 'visible';
        second_dice.style.visibility = 'hidden';
    }
}

function show_second_dice(){
    if(two_dice_checkbox.checked){
        dice2.style.visibility = 'visible';
    }else{
        dice2.style.visibility = 'hidden';
    }
}


let players;
let player_name ='';
let bot = 'Bot';

let player_input= document.getElementById('turn');
 if(player_input)setTimeout(()=>{player_name = player_input.innerText},1000)
//  setTimeout(()=>{console.log(player_name)},1500)
function change_bot(){
    if(two_players_checkbox.checked){
        players[1].name = 'Player 2'
    }else{
        players[1].name = 'Bot'
    }
}
setTimeout(()=>{players= [
    { name: player_name, position: 1, color: 'red' },
    { name: bot, position: 1, color: 'blue' },
]},2000);

const playersInfoEl = document.getElementById('players')
const renderPlayersInfo = () => {
    playersInfoEl.innerHTML = '';
    players.forEach((player, index) => {
        const playerInfoDiv = document.createElement('div');
        playerInfoDiv.classList.add('player-info');
        playerInfoDiv.innerHTML = `
            <div class="player-info-name">
                <div class="player-color" style="color: ${player.color}"></div>
                <span class = player_name>${player.name}</span>
            </div>
            <div> Position: <span class="position">${player.position}</span></div>
        `;
        playersInfoEl.appendChild(playerInfoDiv);
    });
};

function game_won(){
    playersInfoEl.style.visibility = 'hidden';
    const playerWon = document.createElement('div');
    playerWon.id = 'won';
    if(game.check==3){
        setTimeout(()=>{playerWon.innerHTML = player_name +' WON!'},500);
        playMp3('/assets/winning.mp3');
    }if(game.check==4){
        setTimeout(()=>{playerWon.innerHTML = bot +' Won!'},500);
    };
    playerWon.style.position = 'absolute';
    playerWon.style['z-index'] = '3';
    checkbox_div.appendChild(playerWon);
}

async function playMp3(filePath) {
    try {
      const audioContext = new AudioContext();
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
      // Create a buffer source and play the audio.
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
  
      // Optionally, you can handle the "ended" event:
    //   source.onended = () => {
    //     console.log('MP3 playback finished.');
    //   };
  
    } catch (error) {
      console.error('Error playing MP3:', error);
    }
  }

const play_button = document.getElementById('playButton');

if (play_button) {
    play_button.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent default form submission
        const nameInput = document.getElementById('nameInput');
        const userName = nameInput.value;
        try {
            const response = await fetch('/play', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `name=${encodeURIComponent(userName)}`,
            });

            if (response.ok) {
                const data = await response.json();
                window.location.href = data.redirect;
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}


if(playersInfoEl)window.onload = ()=>{
    setTimeout(()=>{renderPlayersInfo()},2100);
    playersInfoEl.style.visibility = 'hidden';
}



if(new_game)new_game.addEventListener('click', game.newGame);

if(play_hard_checkbox)play_hard_checkbox.addEventListener('change',hide_other_options);

if(two_dice_checkbox)two_dice_checkbox.addEventListener('change',show_second_dice);

if(two_players_checkbox)two_players_checkbox.addEventListener('click',change_bot)

const play_now_var = document.querySelector('#play');
if(play_now_var) play_now_var.addEventListener('click', play_now);






