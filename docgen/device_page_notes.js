const notes = [
    {
        model: ['ICTC-G-1'],
        note: `
### Pairing
To factory reset the TRADFRI wireless dimmer (ICTC-G-1) press the button
4 times (so the red lights starts blinking).
After the blinks you might be willing to rotate the dimmer
like you are trying to control your lights. It will prevent the device
from going to sleep and ensure successful pairing. In case the dimmer was
recognized but no actions seems to be detected, try to restart the zigbee2mqtt.
See [IKEA TRADFRI wireless dimmer (ICTC-G-1) not pairing](https://github.com/Koenkk/zigbee2mqtt/issues/620).
`,
    },
    {
        model: ['SMSZB-120'],
        note: `
### Triggering alarm
This smoke alarm can be triggered manually by sending these commands to it:

To start (Change duration to what you need):
* \`{"warning": {"mode": "burglar", "level": "high", "strobe": false, "duration": 300}}\`

To stop:
* \`{"warning": {"mode": "stop", "level": "low", "strobe": false, "duration": 300}}\`
`,
    },
    {
        model: 'TH1123ZB',
        note: `
### Setting outdoor temperature
To set _outdoor temperature_, you need to send the value to the following MQTT topic:
\`\`\`
zigbee2mqtt/<FRIENDLY_NAME>/set/thermostat_outdoor_temperature
\`\`\`

If you want to automate the publishing of the outdoor temperature using Home Assistant, you may create an automation like this:

\`\`\` yaml
- id: 'Auto_Publish_Outdoor_Temprature'
  alias: Auto_Publish_Outdoor_Temprature
  description: Automatically Publish the outdoor temperature to thermostats
  trigger:
  - entity_id: sensor.outdoor_temprature_sensor
    platform: state
  condition: []
  action:
  - data:
      payload_template: '{{ states(''sensor.outdoor_temprature_sensor'') | string }}'
      topic: zigbee2mqtt/<FRIENDLY_NAME>/set/thermostat_outdoor_temperature
    service: mqtt.publish
\`\`\`

### Enabling time
To enable _time_ you need to send a _blank_ message to the following MQTT topic:
\`\`\`
zigbee2mqtt/<FRIENDLY_NAME>/set/thermostat_time
\`\`\`
Everytime the above message is sent, Zigbee2mqtt will calculate the current time and send it to the thermostat.
`,
    },
    {
        model: 'XDD12LM',
        note: `
### Pairing
Switch the lamp on five times until the lamp blinks several times.
`,
    },
    {
        model: 'V3-BTZB',
        note: `
### Pairing
If pairing failed, try the followings:
- Pairing it closer to the coordinator
- Connecting the CC2531 via an USB extension cable (to avoid interference)
- Replacing the batteries of the danalock.

### App
This device also come with an iOS app (Android as well but not tested). It is recommended to do the setups via the app for better control of the lock.
`,
    },
    {
        model: '07008L',
        note: `
### How to reset device
Turn power on/off five times.
`,
    },
    {
        model: '43080',
        note: `
### LED status indicator
To change the LED status indicator press the top of rocker 3 times and then the bottom of the rocker 1 time. This will cycle between these modes:
1. LED is ON when the load if OFF (Default)
2. LED is ON when the load if ON
3. LED is always OFF

### Pairing
Factory reset the dimmer by pressing the top of the rocker 10 times quickly.
`,
    },
    {
        model: 'DIYRuZ_RT',
        note: `
# Firmware
This firmware can be used to flash any CC2530 device to support zigbee 3.0
For example the Sonoff BasicZBR3
Firmware download: https://github.com/diyruz/diyruz_rt
Blog about supporting Zigbee 3.0 to CC2530: https://habr.com/ru/company/iobroker/blog/495926/
`,
    },
    {
        model: '3RSS007Z',
        note: `
### Pairing mode
To put the device in pairing mode, hold the switch's button for 30 seconds until LED starts blinking fast (2 blinks per second)

### Swap ON/OFF
If the switch is showing off when it is actually on, hold the button till the LED comes on then release, it will change the switch position while keeping the current state.

`,
    },
    {
        model: 'DL15S-1BZ',
        note: `
### Pairing
To pair this device, hold the ON for few seconds until the red light is blinking. After that, simple tap once on the ON again to start the pairing process.

Note: This device doesn't support Zigbee channels 25 & 26.
`,
    },
    {
        model: 'C4',
        note: `
### General
The ubisys C4 remote control unit seems to be primarily targeted to be directly bound to other ZigBee devices to control them. Therefore it does not emit plain "click" events or similar but can be configured to send ZigBee commands like on, off, toggle, cover up, cover down etc. from up to 6 endpoints (4 with on/off, level and scene clusters for lights and another 2 to control window covering devices).
When used with Zigbee2mqtt all endpoints get bound to the coordinator automatically. Therefore all actions will be sent to the coordinator and forwarded to MQTT in addition to being sent directly via ZigBee to other devices that have potentially been bound manually (see [Binding](../information/binding.html) for more information).
In it's factory reset configuration an ubisys C4 just sends a toggle command (originating from endpoints 1 to 4 respectively) for each input. Therefore basic keypresses on attached momentary switches can be processed through Zigbee2mqtt even without further input configuration.


### Configuring Inputs
By publishing to \`zigbee2mqtt/[FRIENDLY_NAME]/set\` the following device attributes can be set to configure inputs:
\`\`\`json
{
    "configure_device_setup": {
        "inputConfigurations": [0, 0, 0, 0],
        "inputActions": [
            [0, 13, 1, 6, 0, 2],
            [1, 13, 2, 6, 0, 2],
            [2, 13, 3, 6, 0, 2],
            [3, 13, 4, 6, 0, 2]
        ]
    }
}
\`\`\`
For further details on these attributes please take a look at the
[ubisys C4 Technical Reference Manual](https://www.ubisys.de/wp-content/uploads/ubisys-c4-technical-reference.pdf),
chapter "7.8.5. Device Setup Cluster (Server)" and the "ZigBee Device Physical Input Configurations Integrator's Guide" (which can be obtained directly from ubisys upon request).
Please note that there seems to be a size limit on the amount of data that can successfullly be written to \`inputActions\`, so not all configurations theoretically possbile might work in reality.

By publishing to \`zigbee2mqtt/[FRIENDLY_NAME]/get/configure_device_setup\` the values of the configuration attributes can
also be read back from the device and be printed to the normal zigbee2mqtt log.
`,
    },
    {
        model: ['D1', 'J1', 'S1', 'S2'],
        note: `
### Configuring Inputs
In case the inputs need to be reconfigured (e.g. to use stationary switches instead of momentary ones) this can be done in the same way as [it is being done for the ubisys C4](C4.html#configuring-inputs).
`,
    },
    {
        model: '3RSS008Z',
        note: `
### Pairing
To put the device in pairing mode, hold the switch's button for 30 seconds until LED starts blinking fast (2 blinks per second)
`,
    },
    {
        model: 'HGZB-41',
        note: `
### Pairing
Reset of device is done by holding button for 20 secs until it starts to flash green. It will now automatically pair.
`,
    },
    {
        model: 'ROB_200-008-0',
        note: `
### Pairing
First reset. Press and hold the upper two buttons for 5 seconds untill led turns blue. Then press the upper "0" 5 times really quickly - practise. Second pair. Press and hold the upper two buttons for 5 seconds again, untill the led turns blue. Then press the "0" once. It should now enter pair mode.
`,
    },
    {
        model: 'E1766',
        note: `
### Pairing
Open the back cover of the remote and find the pairing button.
Reset the remote with 4 short pushes on the pairing button on the back (within 5 seconds) and a red light will shine steadily on the remote.

Now keep the CC2531 USB sniffer very close to the remote for pairing (red light will stop shinning when done).
`,
    },
    {
        model: ['E1757', 'E1926'],
        note: `
### Pairing
It's recommend to first pair the included TRADFRI signal repeater in the room where you want to put the blinds.
Now press both buttons on the blind (next to battery lid) for 5 seconds until a white light between both buttons is turned on.
The device is now awake and ready to pair for 2 minutes.
After that pair the blind by holding the blind battery lid very close to the TRADFRI signal repeater until the white light is turned off (this should mean the pairing is successful).

### End Position
The roller blind maximum extension can be set by moving the blind to the desired position and then double pressing the up or down button.
`,
    },
    {
        model: 'ZNLDP12LM',
        note: `
### Pairing
Switch the lamp on five times until the bulb blinks several times.
`,
    },
    {
        model: 'E1525/E1745',
        note: `
### Pairing
Pair the sensor to Zigbee2mqtt by pressing the pair button 4 times in a row.
The red light on the front side should flash a few times and the turn off.
After a few seconds it turns back on and pulsate. When connected, the light turns off.

### Binding
The E1745 can be bound to groups using [binding](../information/binding).
`,
    },
    {
        model: 'E1743',
        note: `
### Pairing
Pair the switch to Zigbee2mqtt by pressing the pair button (found under the back cover next to the battery)
4 times in a row. The red light on the front side should flash a few times and the turn off
(it's more visible to see the light from the back). After a few seconds it turns back on and pulsate.
When connected, the light turns off.
`,
    },
    {
        model: 'E1743',
        note: `
### Binding
The E1743 can be bound to groups using [binding](../information/binding).
It can only be bound to 1 group at a time and cannot be bound to a device.

By default this remote is bound to the default bind group which you first have to unbind it from.
This can be done by sending to \`zigbee2mqtt/bridge/unbind/[DEVICE_FRIENDLY_NAME]]\` payload \`default_bind_group\`.
`,
    },
    {
        model: 'ZYCT-202',
        note: `
### Pairing
Factory reset the remote by holding the 0 (off) button for +-20 seconds.
To establish a connection keep the remote within 2 meters from the hub.
Press and hold the smart group button (button with two bulbs) and wait until the lights, below the channels, flash.
`,
    },
    {
        model: 'ZCTS-808',
        note: `
### Pairing
When pairing the sensor with Zigbee2MQTT,
keep opening and closing the sensor (pull/insert the sensor parts next to each other) for 10 seconds,
otherwise device will fall asleep before it gets fully configured and will not send state changes.
`,
    },
    {
        model: 'PP-WHT-US',
        note: `
### Pairing
Additional steps are required because the Peanut Smart Plug does not provide a \`modelId\` in its database entry,
and thus zigbee2mqtt cannot identify the product or how to handle it.

Reset the device and initiate pairing mode by holding the pairing button
(the small button next to the on/off button) for ten seconds, releasing the button,
and unplugging the device.
When plugged back in, the front LED will be blinking red and ready to receive a pairing request.
When paired successfully, the red LED on the plug will stop blinking.

After pairing, you must stop zigbee2mqtt and manually edit the zigbee2mqtt \`database.db\` file with a
text editor (note that the file may be owned by root).
Find each line where the Peanut Smart Plug is listed (look for "SecuriFi Ltd." in the \`ManufName\` field)
and **add** \`"modelId":"PP-WHT-US",\` between two existing fields.

*For example,* change \`..."manufId":4098,"manufName":"Securifi Ltd....\`
to \`..."manufId":4098,"modelId":"PP-WHT-US","manufName":"Securifi Ltd....\`
on each line for the device.

Save the file and restart zigbee2mqtt.
`,
    },
    {
        vendor: 'Gledopto',
        note: `
### Pairing
1. Switch on your device.
2. Now switch off and on within 2 seconds.
3. Repeat off/on four times.
4. Reset is done when the device is switched on in the fifth time and the light stays on after blinking 4 times
`,
    },
    {
        model: 'Z809A',
        note: `
### Pairing
Factory reset by:
- Press and hold the Binding Key for 15 seconds. The network indicator will flash green 3 times
(at the 3rd, the 10th, and the 15th second).
- After releasing the Binding Key, press the Switch Key within 2 seconds. The network indicator
will rapidly flash green.
- After fast flashes, Z809A will reboot, and the restore is completed. The socket will automatically connect now.
`,
    },
    {
        model: '4713407',
        note: `
### Pairing
1. Turn bulb on.
2. Turn power off for 2 seconds.
3. Turn power on for 1 second.
4. Repeat turning off and turning on six times.
5. Bulb will flash and is now reset.
`,
    },
    {
        model: 'EMIZB-132',
        note: `
### Configuring interface mode
In order to get measurements, after pairing the device you need to configure the interface mode.

To do this send to \`zigbee2mqtt/FRIENDLY_NAME/set\` payload \`{"interface_mode": "INTERFACE_MODE"}\`.

Possible values for \`INTERFACE_MODE\` are:

| Value | Description |
| - | - |
| \`norwegian_han\` | Norwegian HAN  |
| \`norwegian_han_extra_load\` | Norwegian HAN – Enable extra load. This is need to enable Adion meter
communication |
| \`aidon_meter\` | Aidon Meter supporting Norwegian HAN HW interface.
SW protocol is Aidon Manufacture Specific |
| \`kaifa_and_kamstrup\` | Kaifa meter and Kamstrup meters running old firmware |

Example of payload: \`{"interface_mode": "norwegian_han_extra_load"}\`

### Not getting measurements
In case you are not getting any measurements, it could be that your firmware is too old. You can ask Wattle for a replacement.

Related issues:
- https://github.com/Koenkk/zigbee-herdsman-converters/issues/974#issuecomment-590450035
- https://github.com/dresden-elektronik/deconz-rest-plugin/issues/2127#issuecomment-587949747
`,
    },
    {
        model: 'PLUG EDP RE:DY',
        note: `
### Pairing
Factory reset the plug (hold the switch button for >10sec). After resetting the switch will automatically connect.
`,
    },
    {
        model: 'AC0251100NJ/AC0251700NJ',
        note: `
### Pairing
For the OSRAM Smart+ Switch Mini (AC0251100NJ/AC0251700NJ) hold the Middle and Arrow Down Buttons for 10 Seconds
to Reset the Device. Hold the Middle and Arrow Up Buttons for 3 Seconds to connect.
If the Switch is connected hold Middle and Arrow Up Buttons for 3 Seconds to disconnect.
`,
    },
    {
        model: 'AB3257001NJ',
        note: `
### Pairing
For the OSRAM Smart+ plug (AB3257001NJ) hold the on/off button until your hear a click (+- 10 seconds).
`,
    },
    {
        model: ['ZLED-2709'],
        note: `
### Pairing
After a factory reset the bulb will automatically connect.

Power on and off the bulb 5 times (screw/unscrew the bulb if you don't have a physical switch)
to perform a factory reset.
As a reset confirmation the bulb will blink 4 times.
`,
    },
    {
        model: [
            '4058075816718', 'AA69697', 'AC03645', 'AC03642', 'AA70155', 'AA68199', 'AB32840', '4058075816794',
            'AC03641', '4052899926158', 'AB401130055', 'AB35996', 'AC08562', 'AC03648',
        ],
        /* eslint-disable */
        note: `
### Pairing
Follow instruction from [Manual reset](http://belkin.force.com/Articles/articles/en_US/Troubleshooting_and_Tutorials/Resetting-the-OSRAM-LIGHTIFY-Tunable-White-60-Bulb#a).
After resetting the bulb will automatically connect.
`,
        /* eslint-enable */
    },
    {
        model: ['HALIGHTDIMWWE27', 'HALIGHTDIMWWB22'],
        /* eslint-disable */
        note: `
### Pairing
Follow instructions from
[How do I reset my Hive Active Light?](https://www.hivehome.com/ca/support/Help_installing_Hive/HIH_Hive_Active_Light/How-do-I-reset-my-Hive-Active-Light). After resetting the bulb will automatically connect.
`,
        /* eslint-enable */
    },
    {
        model: ['7199960PH', '7299760PH'],
        note: `
### Pairing
Philips LivingColors IRIS and Philips LivingColors Bloom Devices that comes with
Philips (HUE) Remote Gen 2 (Touch Wheel) or Gen 3 (Round Click Wheel) can be paired via Zigbee.
Devices with Gen 1 Remote don't use Zigbee and can not be paired.
The Philips LivingColors Remote can not be paired via Zigbee because it only support ZigBee Light Link (ZLL).

To Pair hold Button ON and Bottom Left Key (Favorite 1) on the Remote in Front of the Device until
the Device Light blinks and lights Orange. If connection was successful the Device Light will light Green.

**WARNING**: If you pair your Device to a Zigbee Network which is not using a ZLL Channel
you can't reset the Device with the Philips LivingColors Remote Gen 3.
The Gen 3 Remote will only try ZLL Channels to find the Device! Maybe it's possible to reset
the Device with a Philips LivingColors Remote Gen 2 as it should try all Zigbee Channels to find the Device.

[Philips LivingColors Bloom Manual](https://www.download.p4c.philips.com/files/7/7099760pu/7099760pu_dfu_eng.pdf)

[Philips LivingColors Iris Manual](https://www.download.p4c.philips.com/files/7/7099930ph/7099930ph_dfu_eng.pdf)
`,
    },
    {
        vendor: 'Philips',
        notModel: ['324131092621'],
        supports: ['brightness'],
        note: `
### Pairing
Factory resetting a Hue bulb can be accomplished in 4 ways.
After resetting the bulb will automatically connect.

#### Touchlink factory reset
See [Touchlink](../information/touchlink)

#### Hue bridge
When the bulb is still connected to the Hue bridge, you can simply factory reset the bulb
by removing it from the bridge via the Hue app.

#### Hue dimmer switch
[VIDEO: Factory reset a Hue bulb with Hue dimmer switch](https://www.youtube.com/watch?v=qvlEAELiJKs).

#### TRADFRI remote control
This may also be possible with the
[Tradfri Remote Control](https://www.ikea.com/us/en/images/products/tradfri-remote-control__0489469_PE623665_S4.JPG)
by pressing and holding the reset button on the bottom of the remote (next to the battery).
[This may not always work](https://github.com/Koenkk/zigbee2mqtt/issues/296#issuecomment-416923751).
`,
    },
    {
        vendor: 'Philips',
        notModel: ['324131092621'],
        supports: ['brightness', 'on/off'],
        note: `
### Power-on behavior
Allows to set the power-on behavior of the plug/bulb.
Note that this requires at least November/December '18 firmware update of the device.
\`\`\`js
{
    "hue_power_on_behavior": "on",          // default, on, off, recover
    "hue_power_on_brightness": 125,         // same values as brightness
    "hue_power_on_color_temperature": 280,  // same values as color_temp
    "hue_power_on_color": "#0000FF",        // color in hex notation, e.g. #0000FF = blue

}
\`\`\`

Attribute Value | Description
----------------|-----------------------------------------------
default         | reset to factory default value
on              | bulb on after power loss with configured brightness, color-temperature and color
off             | bulb off after power loss
recover         | last running state after power loss

Rules:
- \`hue_power_on_behavior\` value always has to be provided
- \`hue_power_on_brightness\`, \`hue_power_on_color_temperature\` and \`hue_power_on_color\` can only be provided when \`hue_power_on_behavior\` = \`on\`
- \`hue_power_on_color_temperature\` and \`hue_power_on_color\` cannot be provided together, only one can be set
- When setting \`hue_power_on_behavior\` = \`on\`, any not provided values will be reset to their factory defaults
`,
    },
    {
        vendor: ['OSRAM', 'Sylvania', 'LEDVANCE'],
        notModel: [],
        supports: ['brightness'],
        note: `
### Set default power on/off transition
Various Osram/Sylvania LED support setting a default transition when turning a light on and off.
\`\`\`js
{
    "set_transition": 0.1,            //time in seconds (integer or float)
}
\`\`\`

### Remember current light state
Various Osram/Sylvania LED support remembering their current state in case of power loss, or if a light
is manually switched off then on. Lights will remember their respective attributes
(i.e. brightness, color, saturation, etc.).
NOTE: This must be executed every time you make changes to a light's attributes for it to then 'remember' it.
\`\`\`js
{
    "remember_state": true,            // true, false (boolean)
}
\`\`\`
`,
    },
    {
        model: ['AIRAM-CTR.U'],
        note: `
### Pairing
Hold small reset button pressed (located under battery cover on the backside of remote) for 4
seconds and device will reset and will attempt to join network.
Keep clicking any button on the frontside of the device to keep device awake while pairing.
You should be clicking every two seconds until pairing is complete.

Device seems to join network also when it is paired directly to Airam bulb (which is joined to network already)
(https://www.zigbee2mqtt.io/devices/4713407.html) by keeping ON and DIM buttons pressed while holding remote
within 5 centimeters away from Airam bulb.
`,
    },
    {
        model: ['324131092621'],
        note: `
### Pairing
Factory reset the Hue dimmer switch by pressing and holding the setup button on the back for 10 seconds.

Restart the Hue dimmer switch by holding all 4 buttons of the Hue dimmer switch.
You can let go when the light on the front flashes red/green briefly.

#### Using the dimmer to reset a Hue light bulb

To use the Hue dimmer switch to factory reset a Hue light bulb see
[HOWTO: Factory reset a Hue bulb](https://www.youtube.com/watch?v=qvlEAELiJKs).
After resetting the bulb will automatically connect.
This method also works for Philips Hue Lightstrips.
Hue dimmer switch can also be used to factory reset Ikea Trådfri light bulbs using the same method described above.

### Binding
If you want to bind the dimmer to a (Hue) lamp you'll have to *[bind it to the lamp through MQTT](../information/binding.html)* and unbind it from the coordinator. Use the dimmer as source and a literal \`coordinator\` as target for that.

### Device type specific configuration
*[How to use device type specific configuration](../information/configuration.md)*

* \`multiple_press_timeout\`: Controls how long (in seconds) subsequent key presses may be apart and still count as one event. The default is 250ms (0.25).

### Troubleshooting

#### Resetting the device

- Method 1: Press all four buttons for 4 seconds. When the light turns green, release the buttons. The device will flash green and red alternatively after which it will reconnect to the network.
- Method 2: Use a needle or paperclip to press the reset button on the back for 10 seconds. The behavior is similar to method 1

#### Device refuses actions

If actions (e.g. applying zigbee2mqtt/bridge/request/device/remove to a dimmer) result in timeouts, perform a reset (see above) and apply the action right after the device announced itself in the network.

#### Device announces itself but the buttons don't work

The dimmer appears to be working normally and the logs in zigbee2mqtt look good. However, nothing happens when a button is pressed (no light, no log message in zigbee2mqtt). In this case:

- Reset the device
- Use zigbee2mqtt/bridge/request/device/remove to remove the device from the network (this should result in a "left the network" log message)
- Allow joining of new devices in zigbee2mqtt
- Reset the device again
- Wait for it to pair again. The device should now be operational.
`,
    },
    {
        model: '7146060PH',
        note: `
For the 7146060PH (Philips Hue Go), **the power cord has to be connected**,
after the blinking light (**INSTEAD** of step four in the video),
press and keep holding the button on the bottom until the device is paired (+- 60 seconds).
While holding the button the Hue Go will give you a nice light show :smile:.
`,
    },
    {
        model: ['404000/404005/404012', '404006/404008/404004'],
        note: `
### Pairing
Turn the light bulb five times on and off. After turning it on the sixth time,
it will indicate with colors that the bulb is pairing.
`,
    },
    {
        model: ['MLI-404011'],
        note: `
### Pairing
Remove the battery cover and use the cover to press the button above the batteries.
Press and hold this button for 10-20 seconds and release the button.
After that the remote should show up as a paired device.
`,
    },
    {
        model: ['E1524/E1810'],
        note: `
### Pairing
Pair the remote to Zigbee2mqtt by holding it close to the coordinator and
pressing the inside button, next to the CR2032 battery, 4 times.
The red light on the (front of the) remote will now flash a few times.

### Toubleshooting: no battery level
It may help to remove the battery for a few seconds and after that reconfigure it via [Configure](../information/mqtt_topics_and_message_structure.md#zigbee2mqttbridgeconfigure). Right before executing the Configure make sure to wake up the device by pressing a button on it.
`,
    },
    {
        model: ['LLKZMK11LM'],
        note: `
### Interlock
This option allows to inter connect the relays which will make sure that only one relay is on at a time. To do this publish to \`zigbee2mqtt/[FRIENDLY_NAME]/set\` payload \`{"interlock": true}\` or \`{"interlock": false}\`. By default this option is \`false\`.
`,
    },
    {
        model: ['E1744'],
        note: `
### Pairing
Press the button on the device 4 times (until the red light turns on).
`,
    },
    {
        model: ['E1744', 'ICTC-G-1'],
        note: `
### Legacy integration
By default (for backwards compatibility purposes) the legacy integration is enabled.
For new users it is recommended to **disable** this as it has several problems.
To disable the legac integration add the following to your \`configuration.yaml\`:

{% raw %}
\`\`\`yaml
'0xabc457fffe679xyz':
    friendly_name: my_remote
    legacy: false
\`\`\`
{% endraw %}


The information below only applies to the legacy integration.

### Recommendation
This device sends multiple messages in short time period with the same payload. It's worth setting \`debounce\` option with \`debounce_ignore: - action\` to throttle them without losing unique action payloads.

E.g. (devices.yaml)

{% raw %}
\`\`\`yaml
'0xabc457fffe679xyz':
    friendly_name: my_remote
    debounce: 0.5
    debounce_ignore:
    - action
\`\`\`
{% endraw %}

To find optimal "smoothness" play with debounce time or if you need all unique rotation steps consider adding \`brightness\` to \`debounce_ignore\` option

{% raw %}
\`\`\`yaml
'0xabc457fffe679xyz':
    friendly_name: my_remote
    debounce: 0.1
    debounce_ignore:
    - action
    - brightness
\`\`\`
{% endraw %}
`,
    },
    {
        model: ['E1524/E1810'],
        note: `
### Binding
The remote can be bound to groups using [binding](../information/binding) since firmware 2.3.014.
It can only be bound to 1 group at a time. Use the group name as \`TARGET_DEVICE_FRIENDLY_NAME\`.
By default this remote is bound to the default bind group which you first have to unbind it from.
This can be done by sending to \`zigbee2mqtt/bridge/unbind/[DEVICE_FRIENDLY_NAME]]\` payload \`default_bind_group\`.

#### Note
This device with old firmware < 2.3.014 does not support binding (limitation of the device). A workaround is to first
get the group ID where the remote is sending it's commands to and add bulbs to the
same group ([discussion](https://github.com/Koenkk/zigbee2mqtt/issues/782#issuecomment-514526256)).

1. Pair the IKEA TRADFRI remote control to Zigbee2mqtt.
2. Enable debug logging (log_level: debug) ([documentation](../information/configuration.md)).
3. You will get log output like this: \`10/3/2019, 9:28:02 AM - debug: Received Zigbee message from '0x90fd9ffffe90d778'
of type 'commandToggle' with data '{}' from endpoint 1 with groupID 57173\`.
4. Retrieve the group from the log output, which is \`57173\` in the above example.
5. Add this group to \`configuration.yaml\` and add your device (e.g.) bulb to this group.
([documentation](../information/groups.md)).
`,
    },
    {
        model: ['WXCJKG11LM', 'WXCJKG12LM', 'WXCJKG13LM'],
        note: `
### Binding
By default the switch is bound to the coordinator but this device can also be used to directly control other lights and switches in the network.

First unbind it from the coordinator, then you can bind it to any other device or group. (see https://www.zigbee2mqtt.io/information/binding.html )

Now change the operation mode of the device, by default it is in \`event\` mode, but when binding we need to change it to \`command\` mode.
To do this send to \`zigbee2mqtt/FRIENDLY_NAME/set\` payload \`{"operation_mode": "command"}\`, right before doing this make sure to wakeup the device.

As the device is sleeping by default, you need to wake it up after sending the bind/unbind command by pressing the reset button once.

When bound to a lamp, the behavior is as follows (for WXCJKG11LM Aqara Opple switch 1 band):
- left click: turn off
- right click: turn on
- left double click: light dim down (by steps of 33%)
- right double click: light dim up (by steps of 33%)
- long left click: warm white
- long right click: cold white
`,
    },
    {
        model: ['E1746'],
        note: `
### Pairing
Push the reset button of the device with a paperclip for 5 seconds.
While pairing the LED is flashing/dimming slowly. Once the pairing is finished, the LED stays on.
`,
    },
    {
        model: ['F7C033'],
        note: `
### Pairing
[Resetting or Restoring the Wemo® Smart LED Bulb, F7C033](http://www.belkin.com/us/support-article?articleNum=116178)
`,
    },
    {
        model: ['BASICZBR3'],
        note: `
### Pairing
If brand new, when powered on it will attempt to pair to Zigbee2mqtt automatically. If not (or if has been paired before and needs to be re-paired) - press and hold the (relay) button on the top for about 5 seconds until the relay clicks and the red LED flashes several times. The device will then go into pairing mode and the blue LED will begin to flash. When connected, the blue LED will turn on solid. It should then be connected to Zigbee2mqtt. Pressing the button should activate the relay on/off as normal, and the red LED will be on/off.
`,
    },
    {
        model: ['E1603/E1702'],
        note: `
The TRADFRI control outlet also acts as a Zigbee router.
`,
    },
    {
        model: ['E1603/E1702'],
        note: `
### Pairing
To factory reset the TRADFRI control outlet, press and hold the reset button
(pinhole underneath the light, located at the top (bottom if UK) of the outlet) with a
paperclip until the white light starts fading. Hold onto the button for a
few more seconds, then release. After this, the outlet will automatically connect.
`,
    },
    {
        model: ['ICPSHC24-10EU-IL-1', 'ICPSHC24-30EU-IL-1'],
        note: `
### Pairing
To factory reset the TRADFRI drivers use a
small pin or paperclip to push the reset button once.
`,
    },
    {
        vendor: 'IKEA',
        supports: ['brightness'],
        notModel: ['E1524/E1810', 'ICPSHC24-10EU-IL-1', 'ICPSHC24-30EU-IL-1', 'ICTC-G-1', 'E1743'],
        note: `
### Pairing
Factory reset the light bulb ([video](https://www.youtube.com/watch?v=npxOrPxVfe0)).
After resetting the bulb will automatically connect.

While pairing, keep the bulb close to the CC2531 USB sniffer.

What works is to use (very) short “on’s” and a little bit longer “off’s”.
Start with bulb on, then off, and then 6 “on’s”, where you kill the light as soon as the bulb shows signs of turning on.
`,
    },
    {
        model: ['MCCGQ01LM'],
        note: `
### Pairing
Press and hold the reset button on the device for +- 5 seconds (until the blue light starts blinking). The reset button is the small hole in the side of the device - you will need a pin or needle to push into the small hole. After this the device will automatically join.
`,
    },
    {
        model: [
            'WXKG01LM', 'WSDCGQ11LM', 'RTCGQ01LM', 'MCCGQ11LM', 'WXKG11LM', 'WXKG12LM', 'RTCGQ11LM',
            'MFKZQ01LM', 'WSDCGQ12LM',
        ],
        note: `
### Pairing
Press and hold the reset button on the device for +- 5 seconds (until the blue light starts blinking).
After this the device will automatically join.
`,
    },
    {
        model: ['WSDCGQ01LM'],
        note: `
### Pairing
Press and hold the reset button on the device for +- 5 seconds (until the blue light starts blinking). The reset button is the small button on the 'top' of the device. After this the device will automatically join.
`,
    },
    {
        model: ['WXKG01LM'],
        note: `
### Binding
This device does **not** support binding.
`,
    },
    {
        model: ['TI0001'],
        note: `
### Important
These devices can only be used on channel 26.
These devices are locked to the manufacturer's network key (ext_pan_id).
Your configuration file [data/configuration.yaml](../information/configuration) must contain the following:

\`\`\`yaml
advanced:
  ext_pan_id: [33,117,141,25,0,75,18,0]
  channel: 26
\`\`\`

Therefore these devices may not co-existence with other Zigbee devices.
Maybe, you need to add a dedicated coordinator and create a new network for Livolo.
If you decided to create a new network, you should specify another 'pan_id'.

\`\`\`yaml
advanced:
  pan_id: 6756
\`\`\`
`,
    },
    {
        model: ['JTQJ-BF-01LM/BW', 'JTYJ-GD-01LM/BW'],
        note: `
### Pairing
Plug the device in and wait for around 5mins, while it performs its self-tests.
A successful self-test is indicated by couple of beeps and a steady green led.
Now the device is ready for pairing. To initiate pairing quickly press the button three times in a row.
`,
    },
    {
        model: ['SZ-ESW01-AU'],
        note: `
### Pairing
Press and hold the pairing button while plugging in the device.
`,
    },
    {
        model: ['ZBHT-1'],
        note: `
### Similar Devices
This device is older and seems to be similar to the netvox Z711 (and others).

### Pairing

#### Resetting the Device/Restore to Factory Defaults
1. Remove the battery to power off the device.
2. Press and hold the only button.
3. Re-install the batteries to power on the device
4. Release the button.
 * The LED will blink quickly, and the reset/restore is complete

#### Joining the Network
1. Remove battery from device
2. Enable permit-join on Zigbee2mqtt
3. Re-install battery in the device
 * The LED will flash 5 times to indicate success (no flashing means not successful)
4. After successfully joining, press and hold the only button for 3 seconds to broadcast the binding request.
5. The LED will flash once.
6. The LED flashes 5 times after the binding is completed; otherwise, it flashes 10 times.

#### Waking the Device
If the device is asleep (which is most of the time) and you need it to be awake for some reason, tap the only button on the device. The LED will flash 5 times and the device will be awake for a brief period.

### Status of Functions
1. Temperature monitoring - Works
2. Humidity monitoring - Works
3. Battery monitoring - untested.
 * In theory the device LED will flash ONCE if the voltage falls below 2.4V
 * In theory the device will send a low-power report to the ZigBee network if the voltage falls below 2.4V - no other battery reporting.
`,
    },
    {
        model: ['TS0601', 'mcdj3aq'],
        note: `
### Configuration of device attributes
By publishing to \`zigbee2mqtt/[FRIENDLY_NAME]/set\` various device attributes can be configured:
\`\`\`json
{
    "options":{
        "reverse_direction": xxx
    }
}
\`\`\`

- **reverse_direction**: (\`true\`/\`false\`, default: \`false\`). Device can be configured to act in an opposite direction.
`,
    },
    {
        model: ['TERNCY-DC01'],
        note: `
### Pairing
Press and hold the reset button on the device for +- 5 seconds (until the green light starts blinking).
After this the device will automatically join.
`,
    },
    {
        model: ['500.67'],
        note: `
### Pairing
- Press W-key for 3 seconds
- Press Power On/Off Key for 5 seconds
Now the device should showup.

### Extended hue
The device gives extended hue values. Zigbee2mqtt calculates also the normal hue and provides both via mqtt.
- hue = extendedhue * 360 / 65536 % 360
`,
    },
    {
        model: ['AC01353010G'],
        note: `
### Pairing
The following steps have to be taken to reset the device:

* remove the battery for at least 6 seconds
* press the button on the device and keep it pressed
* insert the battery
* release the button when the LED turns red
`,
    },
    {
        model: ['GL-C-008-2ID'],
        note: `
### 2ID handling
This device exposes the two specific endpoints \`rgb\` and \`cct\`. The command topics are \`zigbee2mqtt/<FRIENDLY_NAME>/rgb/set\`, and \`zigbee2mqtt/<FRIENDLY_NAME>/cct/set\`. Both [specific endpoints can be added to a group](../information/groups.md#adding-a-specific-endpoint). These endpoints are \`<FRIENDLY_NAME>/rgb\`, and \`<FRIENDLY_NAME>/cct\`.
`,
    },
    {
        model: ['GDKES-01TZXD', 'GDKES-02TZXD', 'GDKES-03TZXD'],
        note: `
### Rebrand
Also branded as Yagusmart in the UK, with a version that does not require a neutral wire.
`,
    },
    {
        model: ['E1E-G7F'],
        note: `
### Pairing
Factory reset the switch by pressing and holding the on and off buttons at the same time for at least 33 seconds. The indicator will start flashing, indicating a successul reset. The device will enter pairing mode for one minute. If the device is not connected in one minute, you must restart the pairing process.


### Long press action
The device will sometimes output a single push in addition to a long press. You can mitigate this by using the Debounce device configuration. Refer to *[How to use device type specific configuration](../information/configuration.md)*.
`,
    },
    {
        model: ['DIYRuZ_FreePad'],
        note: `
### Firmware
Open source firmware can be found here: [Github](https://github.com/diyruz/freepad)

### How to join:
#### If device in FN(factory new) state:
1. Press and hold button (1) for 2-3 seconds, until device start flashing led
2. Wait, in case of successful join, device will flash led 5 times
3. If join failed, device will flash led 3 times

#### If device in a network:
1. Hold button (1) for 10 seconds, this will reset device to FN(factory new) status
2. Go to step 1 for FN device

### How to use touch link
1. Bring you remote near to TL device
2. Hold button (2) for 5 seconds
TL funtionality can work without connecting to network
`,
    },
    {
        model: ['2AJZ4KPKEY'],
        note: `
### Pairing
Press and hold the reset button in the side of the device for +- 5 seconds (until the blue light starts blinking).
You will need a needle or a pin to do it. After this the device will automatically join.
`,
    },
    {
        model: ['SWO-MOS1PA'],
        note: `
### Temperature not supported
Device is listed as having temperature detection. This feature is still being investigated.
`,
    },
    {
        model: ['DJT11LM'],
        note: `
### Pairing
Press the reset button for about 5 seconds. The LED lights up 3 times.
Then press the button again every 2 seconds (maximum 20 times).

*NOTE: When you fail to pair a device, try replacing the battery, this could solve the problem.*

### Meaning of \`strength\` value
The \`strength\` value, which is reported every 300 seconds after vibration is detected, is the max strength measured during a period of 300 second.
`,
    },
    {
        model: ['WXKG03LM', 'WXKG06LM', 'WXKG02LM', 'QBKG04LM', 'QBKG11LM', 'QBKG03LM', 'QBKG12LM', 'ZNCZ02LM', 'QBKG25LM', 'QBKG22LM', 'QBKG24LM'],
        note: `
### Pairing
Press and hold the button on the device for +- 10 seconds
(until the blue light starts blinking and stops blinking), release and wait.
`,
    },
    {
        model: ['9290012607', '9290019758'],
        note: `
### Pairing
Press and hold the setup button on the rear of the device for +- 10 seconds (until the green light goes solid)
to initiate pairing. Please note that the pairing indicator light is below the main sensor
(as oppose to the obvious indicator above the main sensor).
`,
    },
    {
        vendor: 'Innr',
        supports: ['brightness'],
        note: `
### Pairing
Factory reset the light bulb ([video](https://www.youtube.com/watch?v=4zkpZSv84H4)).
`,
    },
    {
        model: ['RTCGQ01LM', 'RTCGQ11LM'],
        note: `
### Device type specific configuration
*[How to use device type specific configuration](../information/configuration.md)*

* \`no_occupancy_since\`: Timeout (in seconds) after \`no_occupancy_since\` is send.
This indicates the time since last occupancy was detected.
For example \`no_occupancy_since: [10, 60]\` will send a \`{"no_occupancy_since": 10}\` after 10 seconds
and a \`{"no_occupancy_since": 60}\` after 60 seconds.
* \`occupancy_timeout\`: Timeout (in seconds) after the \`occupancy: false\` message is sent.
If not set, the timeout is \`90\` seconds.
When set to \`0\` no \`occupancy: false\` is send.

**IMPORTANT**: \`occupancy_timeout\` should not be set to lower than 60 seconds.
The reason is this: after detecting a motion the sensor ignores any movements for
exactly 60 seconds. In case there are movements after this, a new message
(\`occupancy: true\`) will be sent and the sensor will go for one more minute sleep, and so on.
This is expected behaviour (see [#270](https://github.com/Koenkk/zigbee2mqtt/issues/270#issuecomment-414999973)).
To work around this, a
[hardware modification](https://community.smartthings.com/t/making-xiaomi-motion-sensor-a-super-motion-sensor/139806)
is needed.
`,
    },
    {
        model: ['AV2010/22'],
        note: `
### Device type specific configuration
*[How to use device type specific configuration](../information/configuration.md)*

* \`occupancy_timeout\`: Timeout (in seconds) after the \`occupancy: false\` message is sent.
If not set, the timeout is \`90\` seconds.
When set to \`0\` no \`occupancy: false\` is send.
`,
    },
    {
        model: ['WXKG01LM'],
        note: `
### Device type specific configuration
*[How to use device type specific configuration](../information/configuration.md)*

* \`long_timeout\`: The WXKG01LM only reports a button press and release.
By default, Zigbee2mqtt publishes a long click when there is at
least 1000 ms between both events. It could be that due to
delays in the network the release message is received late. This causes a single
click to be identified as a long click. If you are experiencing this you can try
experimenting with this option (e.g. \`long_timeout: 2000\`).
`,
    },

    // Device specific configuration
    {
        supports: ['temperature', 'humidity', 'pressure', 'brightness', 'color temperature', 'color', 'illuminance'],
        notDescription: ['thermostat'],
        notModel: ['324131092621', 'ICZB-KPD18S', 'ICZB-KPD14S'],
        note: `
### Device type specific configuration
*[How to use device type specific configuration](../information/configuration.md)*
`,
    },
    {
        supports: ['illuminance'],
        notModel: ['RTCGQ11LM', 'GZCGQ01LM'],
        note: `
* \`illuminance_lux_precision\`: Controls the precision of \`illuminance_lux\` values, e.g. \`0\` or \`1\`; default \`1\`.
To control the precision based on the illuminance_lux value set it to e.g. \`{1000: 0, 100: 1}\`,
when illuminance_lux >= 1000 precision will be 0, when illuminance_lux >= 100 precision will be 1.
`,
    },
    {
        supports: ['illuminance'],
        note: `
* \`illuminance_lux_calibration\`: Allows to manually calibrate illuminance values,
e.g. \`95\` would take 95% to the illuminance reported by the device; default \`100\`.
`,
    },
    {
        supports: ['temperature'],
        notSupports: ['color temperature'],
        notDescription: ['thermostat'],
        note: `
* \`temperature_precision\`: Controls the precision of \`temperature\` values,
e.g. \`0\`, \`1\` or \`2\`; default \`2\`.
To control the precision based on the temperature value set it to e.g. \`{30: 0, 10: 1}\`,
when temperature >= 30 precision will be 0, when temperature >= 10 precision will be 1.
* \`temperature_calibration\`: Allows to manually calibrate temperature values,
e.g. \`1\` would add 1 degree to the temperature reported by the device; default \`0\`.
`,
    },
    {
        model: ['GreenPower_On_Off_Switch', 'GreenPower_7'],
        note: `
### Green Power
This is a Zigbee Green Power device which allows it to be very energy efficient.
Messages from Green Power devices cannot be "understood" by normal Zigbee devices, therefore they need to be "translated" first.
Not all Zigbee devices can do this translation, currently the only devices known to do this are Philips Hue devices. This means that the Green Power device has to be in range of a Philips Hue device in order to use it.

Green Power devices don't support binding and are not included in network scans.

### Pairing Philips Hue Tap
This device requires your Zigbee network to run on channel 11, 15, 20 or 25. In order to pair it hold the corresponding button for that channel 10 seconds.

| Button (dots) | Channel |
|-|-|
| 1 | 11 |
| 2 | 15 |
| 3 | 20 |
| 4 | 25 |

### Pairing Friends of Hue switches (EnOcean PTM 216Z module based)
This device has 4 buttons: A0 (left-top), A1 (left-bottom), B0 (right-top), B1 (right-bottom). In case the module is integrated in a single rocker switch, you need to remove the caps to expose all buttons. A button can be pressed by holding the contact of that button and then push the energy bar.

To pair it hold the corresponding button for that channel for 7 seconds or more.

| Button | Channel |
|-|-|
| A0 | 15 |
| A1 | 20 |
| B0 | 11 |
| B1 | 25 |

Once the device is paired you need to confirm the channel. To do this press A1 and B0 together. Important: don't press any other buttons between this and the pairing.

In case you want to pair it to a different channel you have to factory reset the device. This can be done by pressing all buttons (A0, A1, B0 and B1) simultaneously for at least 7 seconds.

This device can work on any channel, not only 15, 20, 11 or 25. For this refer to the [EnOcean PTM 216Z manual chapter 5.3](https://www.enocean.com/en/products/enocean_modules_24ghz/ptm-216z/user-manual-pdf/)
`,
    },
    {
        supports: ['humidity'],
        notModel: ['SMT402', 'SMT402AD'],
        note: `
* \`humidity_precision\`: Controls the precision of \`humidity\` values, e.g. \`0\`, \`1\` or \`2\`; default \`2\`.
To control the precision based on the humidity value set it to e.g. \`{80: 0, 10: 1}\`,
when humidity >= 80 precision will be 0, when humidity >= 10 precision will be 1.
`,
    },
    {
        supports: ['pressure'],
        note: `
* \`pressure_precision\`: Controls the precision of \`pressure\` values, e.g. \`0\` or \`1\`; default \`1\`.
To control the precision based on the pressure value set it to e.g. \`{1000: 0, 100: 1}\`,
when pressure >= 1000 precision will be 0, when pressure >= 100 precision will be 1.
* \`pressure_calibration\`: Allows to manually calibrate pressure values,
e.g. \`1\` would add 1 to the pressure reported by the device; default \`0\`.
`,
    },
    {
        supports: ['brightness', 'color temperature', 'color'],
        notModel: ['324131092621', 'ICZB-KPD18S', 'ICZB-KPD14S'],
        note: `
* \`transition\`: Controls the transition time (in seconds) of on/off, brightness,
color temperature (if applicable) and color (if applicable) changes. Defaults to \`0\` (no transition).
Note that this value is overridden if a \`transition\` value is present in the MQTT command payload.
`,
    },
    {
        model: ['JTQJ-BF-01LM/BW', 'JTYJ-GD-01LM/BW'],
        note: `
### Sensitivity
The sensitivity can be changed by publishing to \`zigbee2mqtt/[FRIENDLY_NAME]/set\`
\`{"sensitivity": "SENSITIVITY"}\` where \`SENSITIVITY\` is one of the following
values: \`low\`, \`medium\`,  \`high\`.

### Self-test
A self-test can be trigged by publishing to \`zigbee2mqtt/[FRIENDLY_NAME]/set\`
\`{"selftest": ""}\`.
If the selftest is executed successfully you will hear the device beep in 30 seconds.
`,
    },
    {
        model: ['DJT11LM'],
        note: `
### Sensitivity
The sensitivity can be changed by publishing to \`zigbee2mqtt/[FRIENDLY_NAME]/set\`
\`{"sensitivity": "SENSITIVITY"}\` where \`SENSITIVITY\` is one of the following
values: \`low\`, \`medium\`,  \`high\`.

After setting the sensitivity you immediately have to start pressing the reset button with an interval of 1 second until you see Zigbee2mqtt publishing the new sensitivity to MQTT.
`,
    },
    {
        model: ['9290012607', '9290019758'],
        note: `
### Motion sensitivity
The motion sensitivity can be changed by publishing to \`zigbee2mqtt/[FRIENDLY_NAME]/set\`
\`{"motion_sensitivity": "SENSITIVITY"}\` where \`SENSITIVITY\` is one of the following
values: \`low\`,  \`medium\`,  \`high\` (default).

### Occupancy timeout
Sets the sensors timeout between last motion detected and sensor reports occupance false
\`\`\`js
{
    // Value >= 0,
    // 0 - 10: 10sec (min possible timeout)
    //   > 10: timeout in sec
    // (must be written to (default) endpoint 2)
    "occupancy_timeout": 0,
}
\`\`\`
`,
    },
    {
        model: ['MCCGQ11LM'],
        note: `
### Recommendation
If the contact is being made via a horizontal slide (e.g. the sensor is placed at the top of a sliding door), the sensor may provide three or more messages with conflicting states. To get around this issue, consider using the \`debounce\` option in your device specific configuration.

E.g. (devices.yaml)

{% raw %}
\`\`\`yaml
'0xabc457fffe679xyz':
    friendly_name: my_sensor
    debounce: 1
\`\`\`
{% endraw %}
`,
    },
    {
        model: ['CC2530.ROUTER'],
        note: `
### Pairing
At first boot it will automatically be in pairing mode and join your network.
To reset it into pairing mode power-cycle it three times as follows:

1) power on
2) wait 2sec
3) power off
4) repeat above steps 2 further times
5) power on and wait for it to join your network
    `,
    },
    {
        model: ['IM6001-MPP01'],
        note: `
### Pairing
When pairing, make sure to keep the sensor awake for 20 seconds by opening and closing the contact
every second.
    `,
    },
    {
        model: ['SJCGQ11LM', 'SJCGQ12LM'],
        note: `
### Pairing
Press and hold water logo on the device for +- 10 seconds until the blue light blinks
three times, release the water logo (the blue light will blink once more) and wait.
    `,
    },
    {
        model: 'HS2WD-E',
        note: `
### Triggering the alarm
The alarm can be trigged by publishing to \`zigbee2mqtt/[FRIENDLY_NAME]/set\` message
\`{"warning": {"duration": 10, "mode": "emergency", "strobe": false}}\`.

Where:
- \`duration\`: the number of seconds the alarm will be on (max is 1800 seconds)
- \`mode\`: \`stop\` or \`emergency\`
- \`strobe\`: \`true\` or \`false\` will let the strobe flash once during the alarm
        `,
    },
    {
        model: 'STS-PRS-251',
        note: `
### Let the device beep.
\`\`\`json
{
    "beep": 5
}
\`\`\`
`,
    },
    {
        model: ['QBKG03LM', 'QBKG04LM', 'QBKG12LM', 'QBKG11LM'],
        note: `
### Decoupled mode
Decoupled mode allows to turn wired switch into wireless button with separately controlled relay.
This might be useful to assign some custom actions to buttons and control relay remotely.
This command also allows to redefine which button controls which relay for the double switch.

Special topics should be used: \`zigbee2mqtt/[FRIENDLY_NAME]/system/set\` to modify operation mode.

Payload:
\`\`\`js
{
  "operation_mode": {
    "button": "single"|"left"|"right",
    "state": "VALUE"
  }
}
\`\`\`

Values                | Description
----------------------|---------------------------------------------------------
\`control_relay\`       | Button directly controls relay (for single switch)
\`control_left_relay\`  | Button directly controls left relay (for double switch)
\`control_right_relay\` | Button directly controls right relay (for double switch)
\`decoupled\`           | Button doesn't control any relay

\`zigbee2mqtt/[FRIENDLY_NAME]/system/get\` to read current mode.

Payload:
\`\`\`js
{
  "operation_mode": {
    "button": "single"|"left"|"right"
  }
}
\`\`\`

Response will be sent to \`zigbee2mqtt/[FRIENDLY_NAME]\`:
\`\`\`json
{"operation_mode_right":"control_right_relay"}
\`\`\`
`,
    },
    {
        model: ['E1524/E1810'],
        note: `
### Toggle button
When clicking the middle (center) button on the remote it will send a \`{"click": "toggle"}\`, when holding it
it will **also** send a \`{"click": "toggle_hold"}\`. It is not possible to skip the \`toggle\` when the button is hold.
Also the remote won't send anything when the button is released.
See [link](https://github.com/Koenkk/zigbee2mqtt/issues/2077#issuecomment-538691885) for more details.
`,
    },
    {
        model: ['ZNCZ02LM', 'ZNCZ04LM'],
        note: `
### Power outage memory
This option allows the device to restore the last on/off state when it's reconnected to power.
To set this option publish to \`zigbee2mqtt/[FRIENDLY_NAME]/set\` payload \`{"power_outage_memory": true}\` (or \`false\`).
Now toggle the plug once with the button on it, from now on it will restore its state when reconnecting to power.
`,
    },
    {
        model: ['ZNCLDJ12LM'],
        note: `
### Configuration of device attributes
By publishing to \`zigbee2mqtt/[FRIENDLY_NAME]/set\` various device attributes can be configured:
\`\`\`json
{
    "options":{
        "reverse_direction": xxx,
        "auto_close": xxx
    }
}
\`\`\`

- **reverse_direction**: (\`true\`/\`false\`, default: \`false\`). Device can be configured to act in an opposite direction.
- **auto_close**: (\`true\`/\`false\`, default: \`true\`). Enables/disabled auto close

You can send a subset of options, all options that won't be specified will be revered to default.

After changing \`reverse_direction\` you will need to fully open and fully close the curtain so the motor will re-detect edges. \`reverse_direction\` will get new state only after this recalibration.
`,
    },
    {
        model: ['ZNCLDJ11LM'],
        note: `
### Configuration of device attributes
By publishing to \`zigbee2mqtt/[FRIENDLY_NAME]/set\` various device attributes can be configured:
\`\`\`json
{
    "options":{
        "reverse_direction": xxx,
        "hand_open": xxx,
        "reset_move": xxx
    }
}
\`\`\`

- **reverse_direction**: (\`true\`/\`false\`, default: \`false\`). Device can be configured to act in an opposite direction.
- **hand_open**: (\`true\`/\`false\`, default: \`true\`). By default motor starts rotating when you pull the curtain by hand. You can disable this behaviour.
- **reset_move**: (\`true\`/\`false\`, default: \`false\`). Reset the motor. When a path was cleared from obstacles.

You can send a subset of options, all options that won't be specified will be revered to default.

After changing \`reverse_direction\` you will need to fully open and fully close the curtain so the motor will re-detect edges. \`reverse_direction\` will get new state only after this recalibration.
`,
    },
    {
        vendor: 'Konke',
        note: `
### Important
Konke devices only work on Zigbee channel 15, 20 and 25.
`,
    },
    {
        model: ['PP-WHT-US'],
        note: `
### Power measurements
This device only support power measurements with an up-to-date firmware on the plug which can only be done
via the original hub. In case of an older firmware you will only see 0 values in the measurements.
Discussion: https://github.com/Koenkk/zigbee2mqtt/issues/809
`,
    },
    {
        model: ['SPZB0001'],
        note: `
### Pairing
If you are having trouble pairing, reset the device.
- hold boost, +, and - (a count from 1 to 10 will be on the display)
- release ones 'rES' is displayed
- hit boot once after 'Jin' is displayed

### Controlling
*Current heating setpoint*
\`\`\`json
{
    "current_heating_setpoint": 21.5
}
\`\`\`
Current heating setpoint is also modified when occupied or unoccupied heating setpoint is set.

*System mode*

The system mode will be either \`off\`, \`auto\`, or \`heat\`. When set to \`heat\` the boost host flags will be set, when using \`off\` the window_open host flag will be set (and off will be displayed on the display).

*Eurotronic host flags*

The \`eurotronic_host_flags\` property contains an object with a true/false field for each host option.

\`\`\`json
{
  "eurotronic_host_flags": {
    "mirror_display": false,
    "boost": false,
    "window_open": false,
    "child_protection": true
  }
}
\`\`\`

You can toggle these flags by publishing a message to the \`set\` mqtt topic containing \`eurotronic_host_flags\`. e.g. enabling the display mirroring:
\`\`\`json
{"eurotronic_host_flags": {"mirror_display": true}}
\`\`\`

**Note that \`true\` or \`false\` do not have quotes aroud them!**

*Eurotronic system mode*

**This is deprecated in favor of eurotronic_host_flags, but will still work for now.**

This is a bitmap encoded field to set several device specific features. Please remind it is not possible to set single bits, always the full bitmap is written. Bit 0 doesnt seem to be writeable, it is always reported as set, so expect your written value + 1 to be reported.

Bit | Position
--- | --------
0 | unknown (default 1)
1 | Mirror display
2 | Boost
3 | unknown
4 | disable window open
5 | set window open (is reported as disable window open)
6 | unknown
7 | Child protection

Examples for eurotronic_system_mode:

Mirror display, reported as 3
\`\`\`json
{
    "eurotronic_system_mode": 2
}
\`\`\`
signal external window open, current_heating_setpoint will report "5", device display shows "OFF"
\`\`\`json
{
    "eurotronic_system_mode": 32
}
\`\`\`
signal external window close, will restore last current_heating_setpoint value
\`\`\`json
{
    "eurotronic_system_mode": 16
}
\`\`\`
Mirror display and set child protection.
\`\`\`json
{
    "eurotronic_system_mode": 66
}
\`\`\`

*Eurotronic error status*
\`\`\`json
{
    "eurotronic_error_status": 0
}
\`\`\`
This field is a readonly bitmap

Bit | Position
--- | --------
0 | reserved
1 | reserved
2 | reserved
3 | Valve adaption failed (E1)
4 | Valve movement too slow (E2)
5 | Valve not moving/blocked (E3)
6 | reserved
7 | reserved
`,
    },
    {
        model: ['J1'],
        note: `
### Configuration of device attributes
By publishing to \`zigbee2mqtt/[FRIENDLY_NAME]/set\` various device attributes can be configured:
\`\`\`json
{
    "configure_j1": {
        "windowCoveringType": xxx,
        "configStatus": xxx,
        "installedOpenLimitLiftCm": xxx,
        "installedClosedLimitLiftCm": xxx,
        "installedOpenLimitTiltDdegree": xxx,
        "installedClosedLimitTiltDdegree": xxx,
        "turnaroundGuardTime": xxx,
        "liftToTiltTransitionSteps": xxx,
        "totalSteps": xxx,
        "liftToTiltTransitionSteps2": xxx,
        "totalSteps2": xxx,
        "additionalSteps": xxx,
        "inactivePowerThreshold": xxx,
        "startupSteps": xxx,
        "totalSteps": xxx,
        "totalSteps2": xxx
    }
}
\`\`\`
For further details on these attributes please take a look at the
[ubisys J1 technical reference manual](https://www.ubisys.de/wp-content/uploads/ubisys-j1-technical-reference.pdf),
chapter "7.2.5. Window Covering Cluster (Server)".

As an alternative to the attributes listed above, the following properties may be used for convenience:
* \`open_to_closed_s\`: corresponds to \`totalSteps\`, but takes value in seconds instead of in full AC waves
* \`closed_to_open_s\`: ditto for \`totalSteps2\`,
* \`lift_to_tilt_transition_ms\`: sets both \`liftToTiltTransitionSteps\` and \`liftToTiltTransitionSteps2\`
(they shall both be equal according to ubisys manual), but takes value in *milli*seconds instead of in full AC waves
* \`steps_per_second\`: factor to be used for conversion, defaults to 50 full AC waves per second if not provided

By publishing to \`zigbee2mqtt/[FRIENDLY_NAME]/get/configure_j1\` the values of the configuration attributes can
also be read back from the device and be printed to the normal zigbee2mqtt log.

### Calibration
By publishing \`{"configure_j1": {"calibrate": 1}}\` to \`zigbee2mqtt/[FRIENDLY_NAME]/set\` the device can also be
calibrated after installation to support more advanced positioning features
(i.e. go to lift percentage / go to tilt percentage). This can be combined with setting attributes as shown above,
for example:
\`\`\`json
{
    "configure_j1": {
        "calibrate" : 1,
        "windowCoveringType": 8,
        "lift_to_tilt_transition_ms": 1600
    }
}
\`\`\`
The calibration procedure will move the shutter up and down several times and the current stage of the
calibration process will again be logged to the normal zigbee2mqtt log for the user to get some feedback.
For details on the calibration procedure please again take a look at
the [ubisys J1 technical reference manual](https://www.ubisys.de/wp-content/uploads/ubisys-j1-technical-reference.pdf),
chapter "7.2.5.1. Calibration".
Please note that tilt transition steps cannot be determined automatically and must therefore be
configured manually for the device to also support "go to tilt percentage". One possibility to determine the
correct value is to take a video of the blinds moving from 0 to 100 percent tilt and then getting the exact timing
from the video by playing it slow motion.

### Home Assistant cover features when using [MQTT discovery](../integration/home_assistant)
The cover will be offered to Home Assistant as supporting lift and tilt by default, but for covers with reduced
functionality this can be passed along to Home Assistant by disabling some of the topics in \`configuration.yaml\`,
for example:
\`\`\`yaml
'0x001fee0000001234':
    friendly_name: cover_not_supporting_tilt'
    homeassistant:
    tilt_command_topic: null
    tilt_status_topic: null
'0x001fee0000001234':
    friendly_name: cover_supporting_neither_lift_nor_tilt'
    homeassistant:
    set_position_topic: null
    position_topic: null
    tilt_command_topic: null
    tilt_status_topic: null
\`\`\`
`,
    },
    {
        model: ['1TST-EU', 'AV2010/32'],
        note: `
### Controlling
Get local temperature in degrees Celsius (in the range 0x954d to 0x7fff, i.e. -273.15°C to 327.67 ºC)
\`\`\`json
{
    "local_temperature": ""
}
\`\`\`

Get or set offset added to/subtracted from the actual displayed room temperature to NUMBER, in steps of 0.1°C
\`\`\`js
{
    "local_temperature_calibration": "NUMBER"       // Possible values: –2.5 to +2.5; leave empty to read
}
\`\`\`

Set temperature display mode
\`\`\`js
{
    "temperature_display_mode": ""      // Possible values: 0 to set °C or 1 so set °F
}
\`\`\`

Get room occupancy. Specifies whether the heated/cooled space is occupied or not. If 1, the space is occupied,
else it is unoccupied.
\`\`\`json
{
    "thermostat_occupancy": ""
}
\`\`\`

Get or set occupied heating setpoint to NUMBER in degrees Celsius.
\`\`\`js
{
    "occupied_heating_setpoint": "NUMBER"       // Possible values: MinHeatSetpointLimit to  MaxHeatSetpointLimit, i.e. 7 to 30 by default; leave empty to read
}
\`\`\`

Get or set unoccupied heating setpoint to NUMBER in degrees Celsius
\`\`\`js
{
    "unoccupied_heating_setpoint": "NUMBER"       // Possible values: MinHeatSetpointLimit to MaxHeatSetpointLimit, i.e. 7 to 30 by default; leave empty to read
}
\`\`\`

Increase or decrease heating setpoint by NUMBER degrees in °C.
\`\`\`js
{
    "setpoint_raise_lower": {
    "mode": "0x00",       // Possible values: see table below
    "amount": "NUMBER"    // Possible values: signed 8-bit integer that specifies the amount the setpoint(s) are to be increased (or decreased) by, in steps of 0.1°C
    }
}
\`\`\`

Attribute Value | Description
----------------|-----------------------------------------------
0x00            | Heat (adjust Heat Setpoint)
0x01            | Cool (adjust Cool Setpoint)
0x02            | Both (adjust Heat Setpoint and Cool Setpoint)

Get or set whether the local temperature, outdoor temperature and occupancy are being sensed by internal sensors or remote networked sensors
\`\`\`js
{
    "remote_sensing": "NUMBER"      // Possible values: see table below; leave empty to read
}
\`\`\`

Bit Number | Description
-----------|-----------------------------------------
0          | 0 – local temperature sensed internally <br> 1 – local temperature sensed remotely
1          | 0 – outdoor temperature sensed internally <br> 1 – outdoor temperature sensed remotely
2          | 0 – occupancy sensed internally <br> 1 – occupancy sensed remotely

Get or set control sequence of operation
\`\`\`js
{
    "control_sequence_of_operation": "VALUE"       // Possible values: see table below; leave empty to read
}
\`\`\`

Values                                    | Possible Values of SystemMode
------------------------------------------|-------------------------------------
\`cooling only\`                            | Heat and Emergency are not possible
\`cooling with reheat\`                     | Heat and Emergency are not possible
\`heating only\`                            | Cool and precooling are not possible
\`heating with reheat\`                     | Cool and precooling are not possible
\`cooling and heating 4-pipes\`             | All modes are possible
\`cooling and heating 4-pipes with reheat\` | All modes are possible

Get or set system mode
\`\`\`js
{
    "system_mode": "VALUE"       // Possible values: see table below; leave empty to read
}
\`\`\`

Values              |
--------------------|
\`off\`               |
\`auto\`              |
\`cool\`              |
\`heat\`              |
\`emergency heating\` |
\`precooling\`        |
\`fan only\`          |
\`dry\`               |
\`sleep\`             |

Get running state
\`\`\`js
{
    "running_state": ""       // leave empty when reading
}
\`\`\`
Possible values:

Values |
-------|
\`off\`  |
\`cool\` |
\`heat\` |

Valve position / heating demand
\`\`\`
{
    "pi_heating_demand": 0       // leave empty when reading
}
\`\`\`
Will report the valve position or heating amount depending on device. 0=min, 255=max

Get or set weekly schedule
\`\`\`js
{
    "weekly_schedule": {
    "TemperatureSetpointHold": "0x00",                // 0x00 setpoint hold off or 0x01 on
    "TemperatureSetpointHoldDuration": "0xffff",      // 0xffff to 0x05a0
    "ThermostatProgrammingOperationMode": "00xxxxxx"  //see table below
    }                                                   // leave empty to read
}
\`\`\`

Attribute Value | Description
----------------|---------------------------------------------------------------------------
0               | 0 – Simple/setpoint mode. This mode means the thermostat setpoint is altered only by manual up/down changes at the thermostat or remotely, not by internal schedule programming. <br> 1 – Schedule programming mode. This enables or disables any programmed weekly schedule configurations. <br> Note: It does not clear or delete previous weekly schedule programming configurations.
1               | 0 - Auto/recovery mode set to OFF <br> 1 – Auto/recovery mode set to ON
2               | 0 – Economy/EnergyStar mode set to OFF <br> 1 – Economy/EnergyStar mode set to ON

Clear weekly schedule
\`\`\`json
{
    "clear_weekly_schedule": ""
}
\`\`\`
<!--
Coming soon:
Get weekly schedule response
tz.thermostat_weekly_schedule_rsp
Get relay status log
tz.thermostat_relay_status_log
Get relay status log response
tz.thermostat_relay_status_log_rsp
-->
`,
    },
    {
        model: ['PM-S140-ZB', 'PM-S240-ZB', 'PM-S340-ZB'],
        note: `
### Routing functionallity
This device does **not** act as a router.
`,
    },
    {
        model: ['LZL4BWHL01'],
        note: `
### Pairing
Factory reset the Lutron Connected Bulb Remote by pressing and holding the remote's top and bottom buttons for approximately 15 seconds. The light on the remote will blink rapidly to indicate that the remote has been reset.

After resetting the remote can be paired to a network by pressing and holding the top button for approximately 2 seconds.

#### Using the Connected Bulb Remote to reset a connected light bulb (Hue, Cree, GE Link)
Connected light bulbs can be reset with the Lutron Connected Bulb Remote by bringing the remote close (~3 inches) to the light bulb and pressing and holding the remote's 2nd and bottom buttons. The light bulb will flash and the remote's LED will turn on. Continue to hold both buttons until the remote's LED turns off.

After resetting the bulb will automatically attempt to join a network.

This method should work for Philips Hue bulbs, IKEA TRADFRI bulbs, GE Link bulbs, Connected Cree bulbs, and EcoSmart SMART bulbs.
`,
    },
    {
        model: 'HS1SA-M',
        note: `
### Pairing

Press the side button of the device with a paper clip for more than 2 seconds. The main button led will flash. Then make sure the device is awake during pairing phase or the configuration may fail. To ensure device is awake press the main button every 2 seconds until configuration is done in zigbee2mqtt logs.

### Important
There are 3 versions of this device: Standalone, Zigbee and Z-wave. These are visualy identical. Make sure to get the correct version that will work with zigbee2mqtt:

Supported:
- **HS1SA-M : Zigbee**
- **HS1SA-N : Zigbee**

Unsupported:
- HS1SA : Standalone
- HS1SA-Z : Z-wave

The product code should end in *-M* for the Zigbee version. The label inside the battery compartment should also show the Zigbee logo.
`,
    },
    {
        model: 'WV704R0A0902',
        note: `
### Device pairing/installation
To put the TRV in installation mode twist and hold the cap in the  **+** direction
until the central LED flashes green.  The device is ready for joining when:

- left/right LEDs flash red/blue
- central LED shows a solid orange

If central light shows a solid green, your TRV has been paired and is connected to the zigbee network.

If blinking with yellow, then your TRV is not paired or can't connect to the zigbee network. If Zigbee2MQTT is running and accepting new devices the valve should join the network. Sometimes you may need to twist and hold the cap in the **+** direction for 3 seconds before it will try to join.

**Note:** Zigbee2MQTT might not be able to correctly configure the TRV until you have [calibrated](#calibrate) it.

If the valve is not recognized, you can turn the boost button to positive and hold it; the red light starts to blink slowly. Release the button once the red light stops blinking.

### Calibrate
After installing the TRV twist the cap in the **-** direction and hold for
2 seconds until the blue LED lights up.

### Device hard reset
If the device fails to pair/join the network (\`red:yellow:blue\` on paring mode) or you changed the network id/channel, connect to another network, bought the TRV second hand, you can perform a factory reset to start fresh.

1. Make sure that the TRV is NOT in pairing mode.
2. Twist the cap in the **-** direction and hold till blue light turns off and then center light blinks red (about 15 seconds).
3. Release the button, you should see a \`red:gree:blue\` short flash; the valve will go into installation mode.

### Controlling

Valve sometimes fails to respond/acknowledge a setting, just send the command again.

- Get local temperature in degrees Celsius.
    \`\`\`json
    {
        "local_temperature": ""
    }
    \`\`\`

- Get or set occupied heating setpoint to *&lt;temperature&gt;* in degrees Celsius. Possible values: 7 to 30 by default; leave empty to read.
    \`\`\`json
    {
        "occupied_heating_setpoint": "<temperature>"
    }
    \`\`\`

- Get or set the keypad lock, i.e. enable/disable twist-top boost. Possible values: "unlock", "lock1". **WARNING** Setting the keypad to lock (i.e. "lock1") disables the twist-top boost button which impedes setting the valve to installation mode or hard-reseting it.
    \`\`\`json
    {
        "keypad_lockout": ""
    }
    \`\`\`

- Get the battery level, in percentage. Possible values 0 to 100 (%). The level corresponds voltages in the range 2.2 V (0%) to 3.0 V (100%). The levels where chosen so a 0% indicates that batteries must be replaced, but the valve will still work.
    \`\`\`json
    {
        "battery": ""
    }
    \`\`\`

- Get the battery voltage. Possible values 0.0 to 3.0 (V). This is a direct measure of the battery voltage.
    \`\`\`json
    {
        "voltage": ""
    }
    \`\`\`

- Get the (latest) twist-top boost state. Possible values:

    | Attribute Value | Description |
    | -----------------|----------------------------------------------- |
    | 1 | Boost up |
    | 0 | No boost |
    | -1 | Boost down |

    Note that the valve will not automatically toggle the value to 0 after some time, i.e. configuration/automation logic is needed to use the value. E.g. in Home Assistant the \`expire_after\` setting can be used to handle this.

- Get the valve position / heating demand. Will report the valve position or heating amount depending. Possible values 0 to 100 (%).
    \`\`\`json
    {
        "pi_heating_demand": ""
    }
    \`\`\`
- Get the valve motor state. Possible values: "Stall", others. String description of the motor state. Seems to change when the motor is moving.
    \`\`\`json
    {
        "MOT": ""
    }
    \`\`\`
- Get the Zigbee link quality. Possible values 0 to 100 (%).
    \`\`\`json
    {
        "linkquality": ""
    }
    \`\`\`
`,
    },
    {
        model: ['SMT402', 'STZB402'],
        note: `
### Setting outdoor temperature
To set _outdoor temperature_, you need to send the value to the following MQTT topic:
\`\`\`
zigbee2mqtt/<FRIENDLY_NAME>/set/thermostat_outdoor_temperature
\`\`\`

If you want to automate the publishing of the outdoor temperature using Home Assistant, you may create an automation like this:

\`\`\` yaml
- id: auto_publish_outdoor_temp
  description: publish the outdoor temperature to Stelpro thermostat
  trigger:
    - platform: state
      entity_id: sensor.outdoor_sensor_temperature
      condition: []
  action:
    - service: mqtt.publish
      data_template:
      payload: '{{ states(trigger.entity_id) }}'
      topic: 'zigbee2mqtt/THERMOSTAT_FRIENDLY_NAME/set/thermostat_outdoor_temperature'
\`\`\`

**IMPORTANT**: The outdoor temperature need to be refreshed at least each 4 hours, or the \`EXT\` display will be cleared on the thermostat.
`,
    },
    {
        model: ['067771'],
        note: `
### Model numbers
Model number depends on the country and the colour of the devices, for instance:

- French models are branded as Céliane with Netatmo, and models for this device depends on the colour, with the following numbers: "0 677 21", "0 677 71" and "0 648 91".

- Spanish models are branded as Legrand Valena Next, and models for this device depends on the colour, with the following numbers: "7 418 10", "7 418 40" and "7 418 70".

Other brand names depending on the country:
- Availability for Céliane™ with Netatmo &#8594;     France and Overseas territories, Greece, Poland, Hungary, Tunisia, Morocco, Ivory Coast, Czech Republic, Russia, Mauritius
- Availability for Dooxie™ with Netatmo &#8594;     France and Overseas territories
- Availability for Mosaic™ with Netatmo &#8594;     France and Overseas territories, Ivory Coast
- Availability for Living Now™ with Netatmo &#8594;     Italy, Belgium, Greece, Portugal, Lebanon, Israel, Chile, Peru, Mexico
- Availability for Valena Allure™ with Netatmo &#8594;     Greece, Germany, Austria, Poland, Slovakia, Bulgaria, Czech Republic, Hungary, Russia
- Availability for Valena Life™ with Netatmo &#8594;    Greece, Germany, Austria, Portugal, Poland, Slovakia, Bulgaria, Czech Republic, Hungary, Lituania, Russia
- Availability for Valena Next™ with Netatmo &#8594;    Spain, Belgium
- Availability for Arteor™ with Netatmo &#8594;    Australia, New Zealand, India, Malaysia, Lebanon, Mauritius, South Africa
- Availability for Plexo™ with Netatmo &#8594;    France and Overseas territories, Spain, Belgium
- Availability for Modul'Up™ with Netatmo &#8594;    France and Overseas territories

### LED configuration
* \`permanent_led\`: enable or disable the permanent blue LED. Values: \`ON\` / \`OFF\` (default)
* \`led_when_on\`: enables the LED when the light is on. Values: \`ON\` / \`OFF\` (default)

Example of MQTT message payload to disable permanent LED and enable LED when the lights are on. This shouuld be sent to \`zigbee2mqtt/[FRIENDLY_NAME]/set\`:

\`\`\`js
{
    "permanent_led": "OFF",
    "led_when_on": "ON"
}
\`\`\`

### Dimmer
* \`dimmer_enabled\`: enable or disable the dimming functions. Values: \`ON\` / \`OFF\` (default)

Example of MQTT message payload to enable dimming. This shouuld be sent to \`zigbee2mqtt/[FRIENDLY_NAME]/set\`:

\`\`\`
{
    "dimmer_enabled": "ON"
}
\`\`\`

### Identify
Helps to identify the switch using the LED.

* \`identify['effect']\`:  only works for blink3 & fixed in \`effect\`. Values:
    - \`blink3\`
    - \`fixed\`
    - \`blinkgreen\`
    - \`blinkblue\`

* \`identify['color']\`:  only works for blink3 & fixed in \`effect\`. Values:
    - \`default\`
    - \`red\`
    - \`green\`
    - \`blue\`
    - \`lightblue\`
    - \`yellow\`
    - \`pink\`
    - \`white\`

Example of MQTT message payload to Identify the switch. This shouuld be sent to \`zigbee2mqtt/[FRIENDLY_NAME]/set\`:

\`\`\`js
{
  "identify": {
    "effect": "blink3",
    "color": "white"
  }
}
\`\`\`
`,
    },
    {
        model: ['067773'],
        note: `
### Model numbers
Model number depends on the country and the colour of the devices.
French models are branded as Céliane with Netatmo, and models for this device depends on the colour, with the following numbers: "0 677 23", "0 677 73", and "0 648 93".
Spanish models are branded as Legrand Valena Next, and models for this device depends on the colour, with the following numbers: "7 418 13", "7 418 43" and "7 418 73".

### Binding
The remote supports [binding](../information/binding).
`,
    },
    {
        model: ['067776'],
        note: `
### Model number
Model number depends on the country and the colour of the devices.
French models are branded as Céliane with Netatmo, and models for this device depends on the colour, with the following numbers: "0 677 26", "0 677 76" and "0 648 96".
Spanish models are branded as Legrand Valena Next, and models for this device depends on the colour, with the following numbers: "7 418 07", "7 418 37" and "7 418 67".
`,
    },
    {
        model: ['E1603/E1702'],
        note: `
## OpenHAB configuration
You have to enable attribute output. Via configuration.yaml in Zigbee2MQTT.

### Item

{% raw %}
\`\`\`yaml
Switch      GF_NameDevice_Button_Press              "NameDevice"                     <button>            (GF_Room, gButton)     ["Button"]      {channel="mqtt:topic:MQTTBroker:NameDevice:state"}
Number      GF_NameDevice_Button_Link               "Link"                 <link>              (gButton)                       ["link"]        {channel="mqtt:topic:MQTTBroker:NameDevice" }
String      GF_NameDevice_Button_update_available  "Update[%s]"      <icon>            (gButton)              ["update_available"]     {channel="mqtt:topic:MQTTBroker:NameDevice:update_available"}
\`\`\`
{% endraw %}

### Thing

{% raw %}
\`\`\`yaml
    Thing topic NameDevice "NameDevice" {
        Channels:
            Type switch : state "state" [ stateTopic = "zigbee2mqtt/NameDevice/state", commandTopic = "zigbee2mqtt/NameDevice/set/state", on="ON", off="OFF" ]
            Type string : update_available "update_available"     [ stateTopic="zigbee2mqtt/NameDevice/update_available"] //It shows only if an update is available
            Type number : linkquality      "linkquality"     [ stateTopic="zigbee2mqtt/NameDevice/linkquality" ]
\`\`\`
{% endraw %}
`,
    },
    {
        model: ['MCCGQ01LM'],
        note: `
## OpenHAB integration and configuration
In OpenHAB you need the MQTT Binding to be installed. It is possible to add this sensor as a generic mqtt thing, but here it is described how to add the sensor manually via an editor.

To make the following configuration work it is neccessary to enable the experimental attribute output in the configuration.yaml.
\`\`\`yaml
experimental:
    output: attribute
\`\`\`

### Thing
To add this Xiaomi MCCGQ01LM MiJia door & window contact sensor as Thing it is necessary to embed the Thing into a bridge definition of a mqtt broker. Please concider that for the door window sensor OPEN is false (no contact) and CLOSED is true (contact). So make sure that on(OPEN) = "false" and off(CLOSED) = "true".

\`\`\`yaml
Bridge mqtt:broker:zigbeeBroker [ host="YourHostname", secure=false, username="your_username", password="your_password" ]
{
    Thing topic MijiaDoorSensor "MiJia door & window contact sensor"  @ "Your room"
    {
        Channels:
            Type contact  : status      "status"      [ stateTopic = "zigbee2mqtt/<FRIENDLY_NAME>/contact", on="false", off="true" ]
            Type number   : voltage     "voltage"     [ stateTopic = "zigbee2mqtt/<FRIENDLY_NAME>/voltage" ]
            Type number   : battery     "battery"     [ stateTopic = "zigbee2mqtt/<FRIENDLY_NAME>/battery" ]
            Type number   : linkquality "linkquality" [ stateTopic = "zigbee2mqtt/<FRIENDLY_NAME>/linkquality" ]
            /****************************************************************************************************
            If you want to know when the sensor has been last changed you cann add to your configuration.yaml:
            advanced:
                last_seen: ISO_8601_local

            and add another channel:
            ****************************************************************************************************/
            Type datetime : last_change "last change" [ stateTopic = "zigbee2mqtt/<FRIENDLY_NAME>/last_seen" ]
    }
}
\`\`\`

### Items
\`\`\`yaml
Contact  door_window_sensor_isOpen      "open status" <door>                                {channel="mqtt:topic:zigbeeBroker:MijiaDoorSensor:status"}
Number   door_window_sensor_VOLTAGE     "voltage [%d mV]"                                   {channel="mqtt:topic:zigbeeBroker:MijiaDoorSensor:voltage"}
Number   door_window_sensor_BATTERY     "battery [%.1f %%]" <battery>                       {channel="mqtt:topic:zigbeeBroker:MijiaDoorSensor:battery"}
Number   door_window_sensor_LINKQUALITY "link qualitiy [%d]" <qualityofservice>             {channel="mqtt:topic:zigbeeBroker:MijiaDoorSensor:linkquality"}
/* See comment above */
DateTime door_window_sensor_last_change "last change [%1$td.%1$tm.%1$tY %1$tH:%1$tM:%1$tS]" {channel="mqtt:topic:zigbeeBroker:MijiaDoorSensor:last_change"}
\`\`\`
`,
    },
    {
        model: ['GS361A-H04'],
        note: `
### Installing the TRV
- open battery cover (twist and slide)
- insert batteries (a orange wrench should appear)
- close battery cover (slide and twist)
- press front button until \`F1₁\` is displayed
- install TRV
- press front button until \`F1₂\` is displayed (after 10-30 seconds the TRV should be able to pair)

### Pairing
- press front button 3x to enter pairing mode (LED will flash green)

If you get a warning that the model is undefined, which might happen after removing the device. Try removing it from the network again while in pairning mode.
`,
    },
    {
        model: ['ZK03840'],
        note: `
### Installing the TRV
- install the correct adaptor on the valve
- open cover (push clip on bottom and push front side to slide open)
- insert batteries (\`--\` should be on the display)
- press the button on the top (\`--\` + \`((•))\` should be on the display)
- wait for the device to pair, it took about 2 minutes for me to get the success message in zigbee2mqtt
- install the TRV on the adaptor (push hard until you feel a click, rotate the TRV until display faces up)
- press the button on the top for 3 seconds (motor will turn, \`21°\` + \`((•))\` should be on the display)
- close the cover
`,
    },
];

module.exports = notes;
