document.getElementById('passwordInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        login();
    }
});

function login() {
    const password = document.getElementById('passwordInput').value;
    if (password === "Sphynx123") {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'flex';
    } else {
        alert("Incorrect password!");
    }
}

// The rest of the JavaScript functions remain unchanged

function setTimer(duration) {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    startTimer(duration);
}

function setCustomTime() {
    const customTime = document.getElementById('customTime').value * 60; // Convert minutes to seconds
    setTimer(customTime);
}



function startTimer(duration) {
    let remainingTime = duration;
    const timerOverlay = document.getElementById('timerOverlay');
    timerOverlay.style.transform = "translateY(0%)"; // Slide in the timer overlay

    const timerDisplay = document.getElementById('timeDisplay');
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        // Directly update the textContent with the formatted time
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            endGame();
            timerOverlay.style.transform = "translateY(-100%)"; // Hide the timer overlay
        }
        remainingTime--;
    }, 1000);
}

// Existing login, setTimer, and startTimer functions remain unchanged

function sendDiscordWebhookStart(duration) {
    const webhookUrl = 'https://discord.com/api/webhooks/1214805548059463732/ss7orz2V66wme8t84ostt3B4zwqcDBSH-NHswzJo2J_v3yYrayyFAgNw3PKJv34NNRST';
    const reservationStartTime = new Date().toLocaleTimeString();
    const reservationEndTime = new Date(new Date().getTime() + duration * 1000).toLocaleTimeString();

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            embeds: [{
                title: "Reservation Started!",
                description: `The game reservation has started at ${reservationStartTime} and will end at ${reservationEndTime}.`,
                color: 5814783
            }]
        }),
    });
}

function sendDiscordWebhookEnd(startTime, endTime, duration) {
    const webhookUrl = 'https://discord.com/api/webhooks/1214805548059463732/ss7orz2V66wme8t84ostt3B4zwqcDBSH-NHswzJo2J_v3yYrayyFAgNw3PKJv34NNRST';
    const durationMinutes = (duration / 60).toFixed(2);

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            embeds: [{
                title: "Reservation Ended!",
                description: `The game reservation started at ${startTime}, ended at ${endTime}, and lasted for ${durationMinutes} minutes.`,
                color: 16711680
            }]
        }),
    });
}

// Modify startTimer function to send a Discord webhook at the start
let reservationStartTimestamp; // Store the start timestamp globally

function startTimer(duration) {
    let remainingTime = duration;
    reservationStartTimestamp = new Date(); // Capture the start timestamp
    const timerOverlay = document.getElementById('timerOverlay');
    timerOverlay.style.transform = "translateY(0%)"; // Slide in the timer overlay

    sendDiscordWebhookStart(duration); // Send start notification

    const timerDisplay = document.getElementById('timeDisplay');
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerOverlay.style.transform = "translateY(-100%)"; // Hide the timer overlay
            endGame(duration); // Pass duration to endGame
        }
        remainingTime--;
    }, 1000);
}


// endGame function remains unchanged


function endGame(duration) {
    const reservationEndTimestamp = new Date();
    const startTime = reservationStartTimestamp.toLocaleTimeString();
    const endTime = reservationEndTimestamp.toLocaleTimeString();

    sendDiscordWebhookEnd(startTime, endTime, duration); // Correctly pass the actual duration

    window.location.href = "time.html"; // Redirect as before
}