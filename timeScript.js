document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById("messageContainer").style.opacity = 1;
        setTimeout(function() {
            document.getElementById("sponsoredMessage").style.opacity = 1; // Fade in the second message
        }, 1000); // 1 second after the first message
    }, 1000); // Start 1 second after page load
});
