function Loby (plane_id) {
  function _create_player(plane, name) {
    var player = document.createElement("div");
    player.appendChild(document.createTextNode(name));
    player.addEventListener('click', function(){activatePlayer(name); loby.draw()});

    plane.insertBefore(player, null)
    return player;
  }

  this.plane = document.getElementById(plane_id);
  this.players = [];

  playerlist = getPlayers();
  for (var i = 0; i < playerlist.length; i++) {
    this.players.push({'element': _create_player(this.plane, playerlist[i].name), 'name': playerlist[i].name});
  }

  this.draw = function () {
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].element.innerText = this.players[i].name;
      if (getPlayer(this.players[i].name).active == 1) {
        this.players[i].element.className = "player loby active";
      } else {
        this.players[i].element.className = "player loby";
      }
    }
  }
  this.draw();
}
