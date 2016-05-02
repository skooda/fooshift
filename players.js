function getPlayers()
{
  return JSON.parse(localStorage.getItem("players"));
}

function getActivePlayers()
{
  players = getPlayers();
  retPlayers = [];
  for (var i = 0; i < players.length; i++) {
    if (players[i].active == 1) {
      retPlayers.push(players[i]);
    }
  }
  return retPlayers;
}

function getPlayer(name)
{
  var players = getPlayers();
  for (var i = 0; i < players.length; i++) {
    if (players[i].name == name) {
      return players[i];
    }
  }
  return null;
}

function addPlayer(name, image)
{
  var players = getPlayers();
  players.push({'name': name, 'image': image, 'active': 0});
  localStorage.setItem("players", JSON.stringify(players));
}

function activatePlayer(name)
{
  var players = getPlayers();
  for (var i = 0; i < players.length; i++) {
    if (players[i].name == name) {
      if (players[i].active == 0) {
        players[i].active = 1;
      } else {
        players[i].active = 0;
      }
    }
  }
  localStorage.setItem("players", JSON.stringify(players));
}

if (localStorage.getItem("players") == null) {
    localStorage.setItem("players", JSON.stringify([]));
    addPlayer('Pavel', 'http://foos.skooda.org/players/pavel.png');
    addPlayer('Peter', 'http://foos.skooda.org/players/peter.png');
    addPlayer('Ondra', 'http://foos.skooda.org/players/ondra.png');
    addPlayer('Vláďa', 'http://foos.skooda.org/players/vlada.png');
    addPlayer('Jakub', 'http://foos.skooda.org/players/jakub.png');
    addPlayer('Martin', 'http://foos.skooda.org/players/martin.png');
}
