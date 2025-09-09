const players = [
    { name: 'Messi', goals: 30 }, undefined,
    { name: 'Ronaldo', goals: 28 }, { name: 'Neymar', goals: 22 }, { goals: 2 },
    { name: 'Mbappé', goals: 25 }, { name: 'Pele', goals: null },
  ];
  
  const isValidRule = (player) => {
    return player?.name && typeof player?.goals === 'number';
  };
  
  const validPlayers = players.filter(isValidRule);

  let topSoccer = null;
  
  validPlayers.forEach(player => {
    if (!topSoccer || player.goals > topSoccer.goals) {
      topSoccer = player;
    }
  });
  
  console.log("Danh sách cầu thủ hợp lệ là:", validPlayers);
  console.log("Cầu thủ ghi nhiều bàn nhất là:", topSoccer);
  