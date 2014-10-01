cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.phonegap.plugins.OrientationLock/www/orientationLock.js",
        "id": "com.phonegap.plugins.OrientationLock.OrientationLock",
        "clobbers": [
            "OrientationLock"
        ]
    },
    {
        "file": "plugins/com.phonegap.LowLatencyAudio/www/LowLatencyAudio.js",
        "id": "com.phonegap.LowLatencyAudio.LowLatencyAudio",
        "clobbers": [
            "window.LowLatencyAudio"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.phonegap.plugins.OrientationLock": "0.1",
    "com.phonegap.LowLatencyAudio": "0.1.0"
}
// BOTTOM OF METADATA
});