document.getElementById('startGame').addEventListener('click', () => {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const nickname = document.getElementById('nickname').value.trim();
  
    if (!firstName || !lastName || !email || !nickname) {
      alert('Please fill out all fields.');
      return;
    }
  
    const playerData = {
      firstName,
      lastName,
      email,
      nickname
    };
  
    localStorage.setItem('player1', JSON.stringify(playerData));
    window.location.href = 'index.html'; // Return to table
  });
  