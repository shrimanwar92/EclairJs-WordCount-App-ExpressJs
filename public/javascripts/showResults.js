var ws;
window.onload = function() {
    var port = location.port ? location.port : '80';
    ws = new WebSocket("ws://"+location.hostname+":"+port);

    // When a message is received from Node on the web socket display the results as a simple list.
    ws.onmessage = function(e) {
        if (e.data) {
            var list = document.getElementById("topTen");
            var data = JSON.parse(e.data);
            //console.log("data: ",data);
            data.forEach(function(item){
                var li = document.createElement("li");
                var text = document.createTextNode("The word '" +
		item.word + "' appears "  +item.count + " times in the text");
                li.appendChild(text);
                list.appendChild(li);
            });
        }
    };
};

// When the user clicks the button let NodeJS know it can start the EclairJS counting piece.
function clickme() {
    if (ws) {
        // First clear out any old results
        var list = document.getElementById("topTen");
        while(list.hasChildNodes()) {
            list.removeChild(list.children[0]);
        }
        ws.send(JSON.stringify({startCount: true}));
    }
};