window.onload = function() {
    setInterval(function(){
        var date = new Date();
        var displayDate = date.toLocaleDateString();
        var displayTime = date.toLocaleTimeString();

        document.getElementById('date-time').innerHTML = displayDate + " " + displayTime;
    }, 1000); // 1000 milliseconds = 1 second
}