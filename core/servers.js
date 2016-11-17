$(document).ready(function() {
    
    $('#github').click(function(){
  window.open('https://github.com/Nutiler', 'window name', 'window settings');
  return false;
});
    
    console.log("Server functions ready.")
    $(document).on("click", "#server", function() {
                    var nameServer = $('#servername').val();
            nameServer = nameServer.replace(/[`~!@#$%^&*()_|+\-=?;'",<>\{\}\[\]\\\/]/gi, '');
        if (nameServer === "") {
            console.log("Defaulting to mc.stormheart.net");
            nameServer = "mc.stormheart.net"
            $('#servername').val("mc.stormheart.net");
        }
        console.log("Loading Server: " + nameServer);
        if ($('#servername').val().indexOf(".") === -1) {
            $('#motd').remove();
            $("#addmotd").append('<div id="motd" class="form textarea form-control" <span>Please enter a valid Ip address.</span></div>');
            $("#version").text("Version: N/A");
            $("#status").text("Response: N/A");
            $("#players").text("Players: N/A");
            $("#location").text("Location: N/A");
            console.log("Invalid Server Name.")
        } else {
            $.ajax({
                url: `https://mcapi.ca/query/${nameServer}/info`,
                method: "GET",
                success: function(data) {
                    $("#version").text("Version: " + data.version);
                    if (data.status === true) {
                        $("#status").text("Response: Online " + data.ping + "ms");
                    } else if (data.status === undefined) {
                        $("#status").text("Response: Offline :(");
                    } else {
                        $("#status").text("Response: Unknown Server.");
                        $("#version").text("Version: N/A");
                    }
                    if (data.motd === undefined || data.motd === "") {
                        $("#motd").remove();
                        $("#addmotd").append('<div id="motd" class="form textarea form-control" <span>Server does not have a description.</span></div>');
                    }
                    if (data.players === undefined) {
                        $("#players").text("Players: N/A");
                        $("#motd").remove();
                        $("#addmotd").append('<div id="motd" class="form textarea form-control" <span>Check the Ip, are you sure this is a Minecraft Server?</span></div>');
                    } else {
                        $("#players").text("Players: " + data.players.online + "/" + data.players.max);
                        $('#motd').remove();
                        $("#addmotd").append('<div id="motd" class="form textarea form-control"<span>' + data.htmlmotd + '</span></div>');
                    }
                    $('#servername').val(nameServer.split(":")[0] + ":" + data.port);
                    
                    // Debugging.
                    // console.log("Port: " + data.port);
                    // console.log("Players: " + data.players.online + "/" + data.players.max);
                    // console.log("Data: " + data.htmlmotd);
                    // console.log("Response: " + data.status + " " + data.ping + "ms");
                    // console.log("Version: " + data.version);
                }
            });
            $.ajax({
                url: `https://freegeoip.net/json/${nameServer.split(":")[0]}`,
                method: "GET",
                success: function(data) {
                    if (data.city === undefined || data.city === "" || data.city === null) {
                        $("#location").text(data.country_name);
                    } else {
                        $("#location").text(data.city + ", " + data.country_name);
                    }
                    var serverimg = `https://mcapi.ca/query/${nameServer.split(":")[0]}/icon`
                    var servername = nameServer.split(":")[0];
                    var servercity = data.city;
                    var servercountry = data.country_name;
                    
                    google.maps.event.addDomListener(window, 'load', init(data.latitude, data.longitude, serverimg, servername, servercity, servercountry));
                    google.maps.event.addDomListener(window, 'resize', init(data.latitude, data.longitude, serverimg, servername, servercity, servercountry ));
                    console.log("Google Maps Initalized.");
                    
                    // Debugging.
                    // console.log("Ip: " + data.ip);
                    // console.log("City: " + data.city);
                    // console.log("Country: " + data.country_name);
                    // console.log("Region: " + data.region_name);
                    // console.log("Latitude: " + data.latitude)
                    // console.log("Longitude: " + data.longitude)
                }
            });
        }
    });
    
    // Initialize first server.
    setTimeout(function() {
        $("#server").click();
    }, 0)
});