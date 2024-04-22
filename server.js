const express = require('express')
const path = require('path')
const hbs = require('express-handlebars');
const wifi = require('node-wifi');
const app = express()

app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.set('views', __dirname + '/views');

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layout/' }))
app.engine('hbs', hbs.engine({
    extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layout/', partialsDir: __dirname + '/views/partials/', runtimeOptions: {
        allowProtoPropertiesByDefault: true, // Disable the prototype access check
    }, helpers: {
        json: function (context) {
            return JSON.stringify(context);
        },
    },
}));





app.get('/', (req, res) => {
    var availnetworks;
    wifi.init({
        iface: null // network interface, choose a random wifi interface if set to null
    });

    // Scan networks
    wifi.scan((error, networks) => {
        if (error) {
            console.log(error);
        } else {
            res.render('map', { networks: networks })
            //   networks.map(item=>{
            //     console.log(item.ssid);
            //   })
            /*
                networks = [
                    {
                      ssid: '...',
                      bssid: '...',
                      mac: '...', // equals to bssid (for retrocompatibility)
                      channel: <number>,
                      frequency: <number>, // in MHz
                      signal_level: <number>, // in dB
                      quality: <number>, // same as signal level but in %
                      security: 'WPA WPA2' // format depending on locale for open networks in Windows
                      security_flags: '...' // encryption protocols (format currently depending of the OS)
                      mode: '...' // network mode like Infra (format currently depending of the OS)
                    },
                    ...
                ];
                */
        }
    });
    console.log(availnetworks);
    
})



app.listen(process.env.PORT || 3005);