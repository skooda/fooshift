function Game (players, plane_id) {
  function _create_button(plane, side) {
    var button = document.createElement("button");
    button.appendChild(document.createTextNode(side));
    button.className="btn " + side;
    button.addEventListener('click',function(){game.goal(side)});

    plane.insertBefore(button, null);
    return button;
  }

  function _create_player(plane, name) {
    var player = document.createElement("div");
    player.appendChild(document.createTextNode(name));

    plane.insertBefore(player, null)
    return player;
  }

  function _create_undo_button(plane) {
    var button = document.createElement("button");
    button.appendChild(document.createTextNode('←'));
    button.className="btn-undo";
    button.addEventListener('click',function(){game.undo()});

    plane.insertBefore(button, null);
    return button;
  }

  function _create_winner(plane) {
    var winner = document.createElement("div");
    winner.appendChild(document.createTextNode(" "));
    winner.className = 'winner';
    winner.style.display = 'none';
    plane.insertBefore(winner, null)
    return winner;
  }

  this.players = players.map(function(player){player.score = 0; return player;});
  shuffle(this.players);

  this.plane = document.getElementById(plane_id);
  this.winner = _create_winner(this.plane);
  this.buttons = {'red': null, 'blue': null, 'undo': null};
  this.score = {'red': 0, 'blue': 0};
  this.history = [];

  this.buttons['red'] = _create_button(this.plane, 'red');
  this.buttons['blue'] = _create_button(this.plane, 'blue');
  this.buttons['undo'] = _create_undo_button(this.plane);

  for (var i = 0; i < this.players.length; i++) {
    this.players[i].element = _create_player(this.plane, this.players[i].name);
  }

  this.goal = function (side) {
    this.history.push(side);
    if (side == 'red') {
      this.players[0].score ++;
      this.players[1].score ++;
    } else {
      this.players[2].score ++;
      this.players[3].score ++;
    }
    this.players.unshift(this.players.pop());
    this.score[side] += 1;
    this.draw();
  }

  this.undo = function () {
    side = this.history.pop();
    this.score[side] -= 1;
    this.players.push(this.players.shift());
    if (side == 'red') {
      this.players[0].score --;
      this.players[1].score --;
    } else {
      this.players[2].score --;
      this.players[3].score --;
    }

    this.draw();
  }

  this.draw = function () {
    if (this.history.length == 0) {
      this.buttons.undo.style.display = 'none';
    } else {
      this.buttons.undo.style.display = 'block';
    }

    this.buttons.red.innerHTML = '<div class="btn-text red">RED (' + this.score.red + ')</span>';
    this.buttons.blue.innerHTML = '<div class="btn-text blue">BLUE (' + this.score.blue + ')</span>';
    this.plane.className = "foosball";
    this.winner.style.display = 'none';

    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].score > 9) {
          trophy = '<span class="trophy">&#127942;</span><br/>';
          if (this.players[i+1].score > 9) {
            this.winner.innerHTML = trophy + this.players[i].name + " and " + this.players[i+1].name + " wins!";
          } else if (this.players[i-1].score > 9) {
            this.winner.innerHTML = trophy + this.players[i].name + " and " + this.players[i-1].name + " wins!";
          } else {
            this.winner.innerHTML = trophy + this.players[i].name + " wins!";
          }
          this.winner.style.display = 'block';
      }

      this.players[i].element.innerText = this.players[i].name + "(" + this.players[i].score + ")";
      switch(i) {
        case 0:
          this.players[i].element.className = "player red center s"+this.players[i].score;
          break;
        case 1:
          this.players[i].element.className = "player red goalman s"+this.players[i].score;
          break;
        case 2:
          this.players[i].element.className = "player blue center s"+this.players[i].score;
          break;
        case 3:
          this.players[i].element.className = "player blue goalman s"+this.players[i].score;
          break;
        default:
          this.players[i].element.className = "player other t"+i+" s"+this.players[i].score;
      }
    }
  }
  this.draw();
}
