class Spectate {
  constructor() {
    this.BLUE_SIDE_ID = 100;
    this.RED_SIDE_ID = 200;
  }

  blueSidePlayers(summoners) {
    const blueSide = summoners.filter((summoner) => {
      return summoner.teamId === this.BLUE_SIDE_ID;
    });

    return blueSide;
  }

  redSidePlayers(summoners) {
    const redSide = summoners.filter((summoner) => {
      return summoner.teamId === this.RED_SIDE_ID;
    });

    return redSide;
  }
}

module.exports = new Spectate();
