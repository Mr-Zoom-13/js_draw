$(document).ready(function() {
            // Connect to the Socket.IO server.
            // The connection URL has the following format, relative to the current page:
            //     http[s]://<domain>:<port>[/<namespace>]
            var socket = io();


            var ping_pong_times = [];
            var start_time;
            // window.setInterval(function() {
            //     start_time = (new Date).getTime();
            //     $('#transport').text(socket.io.engine.transport.name);
            //     socket.emit('my_ping');
            // }, 1000);

            // Handler for the "pong" message. When the pong is received, the
            // time from the ping is stored, and the average of the last 30
            // samples is average and displayed.
            socket.on('my_pong', function() {
                var latency = (new Date).getTime() - start_time;
                ping_pong_times.push(latency);
                ping_pong_times = ping_pong_times.slice(-30); // keep last 30 samples
                var sum = 0;
                for (var i = 0; i < ping_pong_times.length; i++)
                    sum += ping_pong_times[i];
                $('#ping-pong').text(Math.round(10 * sum / ping_pong_times.length) / 10);
            });


            // Event handler for new connections.
            // The callback function is invoked when a connection with the
            // server is established.
            socket.on('connect', function () {
                socket.emit('my_event', {data: 'I\'m connected!'});
            })
            socket.on('my_response', function(msg, cb) {
                $('#log').append('<br>' + $('<div/>').text('Received #' + msg.count + ': ' + msg.data).html());
                if (cb)
                    cb();
            });
            socket.on('start_draw', function(msg, cb) {
                ctx.beginPath()
                ctx.moveTo(msg.data[0], msg.data[1])
                ctx.lineTo(msg.data[2], msg.data[3])
                ctx.stroke()
                // Update previous mouse position
                prevX = msg.data[2]
                prevY = msg.data[3]
            });
            $('form#my_emit').submit(function(event) {
                socket.emit('my_event', {data: $('#emit_data').val()});
                return false;
            });


const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const ctx = canvas.getContext("2d")

// previous mouse positions
// They will be null initially
let prevX = null
let prevY = null

// How thick the lines should be
ctx.lineWidth = 5

window.addEventListener("mousemove", (e) => {
    // initially previous mouse positions are null
    // so we can't draw a line
    if(prevX == null || prevY == null){
        // Set the previous mouse positions to the current mouse positions
        prevX = e.clientX
        prevY = e.clientY
        return
    }

    // Current mouse position
    let currentX = e.clientX
    let currentY = e.clientY
    $(document).ready(function(event) {
        socket.emit('some_draw', {data: [prevX, prevY, currentX, currentY]})
    })
    // Drawing a line from the previous mouse position to the current mouse position


})
    })