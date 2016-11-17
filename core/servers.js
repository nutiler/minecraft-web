$(document).ready(function() {
    var debug = true;
    console.log("Debugging Mode: " + debug + ", enable or disable it in server.js:2");
    $('#github').click(function() {
        window.open('https://github.com/Nutiler', 'window name', 'window settings');
        return false;
    });
    console.log("Server functions ready.")
    // Get the server name from input.
    $(document).on("click", "#server", function() {
        var nameServer = $('#servername').val();
        nameServer = nameServer.replace(/[`~!@#$%^&*()_|+\-=?;'",<>\{\}\[\]\\\/]/gi, '');
        // Default server.
        if (nameServer === "") {
            console.log("Defaulting to mc.stormheart.net");
            nameServer = "mc.stormheart.net"
            $('#servername').val("mc.stormheart.net");
        }
        console.log("Loading Server: " + nameServer);
        // If it's not an Ip.
        if ($('#servername').val().indexOf(".") === -1) {
            $('#motd').remove();
            $("#addmotd").append('<div id="motd" class="form textarea form-control" <span>Please enter a valid Ip address.</span></div>');
            $("#version").text("Version: N/A");
            $("#status").text("Response: N/A");
            $("#players").text("Players: N/A");
            $("#location").text("Location: N/A");
            console.log("Invalid Server Name.")
        } else {
            // If valid server, query statistics.
            $.ajax({
                url: `https://mcapi.ca/query/${nameServer}/info`,
                method: "GET",
                success: function(data) {
                    $("#version").text("Version: " + data.version);
                    // Determine type of server, and if it's actually minecraft.
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
                        $("#addmotd").append(
                            '<div id="motd" class="form textarea form-control" <span>Server does not have a description.</span></div>'
                        );
                    }
                    if (data.players === undefined) {
                        $("#players").text("Players: N/A");
                        $("#motd").remove();
                        $("#addmotd").append(
                            '<div id="motd" class="form textarea form-control" <span>Check the Ip, are you sure this is a Minecraft Server?</span></div>'
                        );
                    } else {
                        $("#players").text("Players: " + data.players.online + "/" + data.players.max);
                        $('#motd').remove();
                        $("#addmotd").append('<div id="motd" class="form textarea form-control"<span>' + data.htmlmotd +
                            '</span></div>');
                    }
                    $('#servername').val(nameServer.split(":")[0] + ":" + data.port);
                    if (debug === true) {
                        console.log("Port: " + data.port);
                        console.log("Players: " + data.players.online + "/" + data.players.max);
                        // console.log("Data: " + data.htmlmotd);
                        console.log("Response: " + data.status + " " + data.ping + "ms");
                        console.log("Version: " + data.version);
                    }
                }
            });
            // geoIp ping location.
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
                    // Pass location and server information to maps.js for displaying.
                    google.maps.event.addDomListener(window, 'load', init(data.latitude, data.longitude, serverimg, servername,
                        servercity, servercountry));
                    google.maps.event.addDomListener(window, 'resize', init(data.latitude, data.longitude, serverimg, servername,
                        servercity, servercountry));
                    console.log("Google Maps Initalized.");
                    if (debug === true) {
                        console.log("Ip: " + data.ip);
                        console.log("City: " + data.city);
                        console.log("Country: " + data.country_name);
                        console.log("Region: " + data.region_name);
                        console.log("Latitude: " + data.latitude)
                        console.log("Longitude: " + data.longitude)
                    }
                }
            });
        }
    });
    // Initialize default server.
    setTimeout(function() {
        $("#server").click();
    }, 0)
});