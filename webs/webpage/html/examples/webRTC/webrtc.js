// Fix Vendor Prefixes
var connection;
var signalingChannel;
var dataChannel;

var IS_CHROME = !!window.webkitRTCPeerConnection,
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription;

if (IS_CHROME) {
  RTCPeerConnection = webkitRTCPeerConnection;
  RTCIceCandidate = window.RTCIceCandidate;
  RTCSessionDescription = window.RTCSessionDescription;
} else {
  RTCPeerConnection = mozRTCPeerConnection;
  RTCIceCandidate = mozRTCIceCandidate;
  RTCSessionDescription = mozRTCSessionDescription;
}

// Signaling Channel (PubNub, Firebase, Socket.io, etc.)
function SignalingChannel(peerConnection, socket) {
  // Setup the signaling channel here
    this.socket = socket;
    this.peerConnection = peerConnection;
}

SignalingChannel.prototype.send = function(message) {
    // Send messages using your favorite real-time network
    this.socket.send(message);
};

SignalingChannel.prototype.onmessage = function (message) {
    var index = message.IndexOf(":");
    var id = message.substring(0, index - 1);
    var rtc = message.substring(index + 1);
  // If we get a sdp we have to sign and return it
  if (message.sdp != null) {
    var that = this;
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp), function () {
      that.peerConnection.createAnswer(function (description) {
          that.send("$" + peerid + ":" + description);
      });
    });
  } else {
    this.peerConnection.addIceCandidate(new RTCIceCandidate(message.candidate));
  }
};

// Create a peer connection object
connection = new RTCPeerConnection({
  iceServers: [
    { 'url': (IS_CHROME ? 'stun:stun.l.google.com:19302' : 'stun:23.21.150.121') }
  ]
});

// Initiate a signaling channel between two users
signalingChannel = new SignalingChannel(connection);

// Only one client should initiate the connection, the other client should wait.
function initiateConnection(peerid) {
    connection.createOffer(function (description) {
        alert(description);
        signalingChannel.send("#" + peerid + ":" + description);
  });
};

// Firefox does not support unreliable channels at this time
dataChannel = connection.createDataChannel("my_label", (IS_CHROME ? { reliable: false } : {}));

dataChannel.onmessage = function (event) {
  var data = event.data;

  console.log("I got data channel message: ", data);
};

dataChannel.onopen = function (event) {
  dataChannel.send("Hello World!");
};

// Create a button on the page so only one client initiates the connection.
document.querySelector('#initiate-button').onclick = function (event) {
  initiateConnection();
};