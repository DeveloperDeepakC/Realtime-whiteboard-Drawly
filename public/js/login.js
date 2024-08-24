document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const room = document.getElementById('room').value;

    if (!room.trim()) {
        alert('Room number cannot be empty');
        return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('room', room);
    window.location.href = 'index.html';
});