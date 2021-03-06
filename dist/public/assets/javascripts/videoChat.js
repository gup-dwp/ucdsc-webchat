//
//Copyright (c) 2014, Priologic Software Inc.
//All rights reserved.
//
//Redistribution and use in source and binary forms, with or without
//modification, are permitted provided that the following conditions are met:
//
//  * Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
//  * Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
//THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
//LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
//POSSIBILITY OF SUCH DAMAGE.
//
var selfEasyrtcid = "";
var haveSelfVideo = false;

function disable(domId) {
//document.getElementById(domId).disabled = "disabled";
}


function enable(domId) {
//document.getElementById(domId).disabled = "";
}


function connect() {
easyrtc.enableAudio(document.getElementById("shareAudio").checked);
easyrtc.enableVideo(document.getElementById("shareVideo").checked);
easyrtc.enableDataChannels(true);
easyrtc.setRoomOccupantListener( convertListToButtons);
easyrtc.initMediaSource(
function(){    // success callback
var selfVideo = document.getElementById("selfVideo");
easyrtc.setVideoObjectSrc(selfVideo, easyrtc.getLocalStream());
easyrtc.connect("easyrtc.audioVideo", loginSuccess, loginFailure);
},
loginFailure
);
}


function hangup() {
easyrtc.hangupAll();
disable("hangupButton");
}


function clearConnectList() {
var otherClientDiv = document.getElementById("otherClients");
while (otherClientDiv.hasChildNodes()) {
otherClientDiv.removeChild(otherClientDiv.lastChild);
}
}


function convertListToButtons (roomName, occupants, isPrimary) {
clearConnectList();
var otherClientDiv = document.getElementById("otherClients");
for(var easyrtcid in occupants) {
  var button = document.createElement("button");
  $('#callAgent').click(function () {
    return function() {
      performCall(easyrtcid);

      $('#callAgent').hide();
  }(easyrtcid);
})

$('#noAgent').hide();
$('#callAgent').show();
//var label = document.createTextNode("Call Agent " /* + easyrtc.idToName(easyrtcid)*/ );
//button.appendChild(label);
//otherClientDiv.appendChild(button);
}
}


function setUpMirror() {
if( !haveSelfVideo) {
var selfVideo = document.getElementById("selfVideo");
easyrtc.setVideoObjectSrc(selfVideo, easyrtc.getLocalStream());
selfVideo.muted = true;
haveSelfVideo = true;
}
}

function performCall(otherEasyrtcid) {
easyrtc.hangupAll();
var acceptedCB = function(accepted, easyrtcid) {
if( !accepted ) {
easyrtc.showError("CALL-REJECTEd", "Sorry, your call to " + easyrtc.idToName(easyrtcid) + " was rejected");
enable("otherClients");
}
};

var successCB = function() {
setUpMirror();
enable("hangupButton");
};
var failureCB = function() {
enable("otherClients");
};
easyrtc.call(otherEasyrtcid, successCB, failureCB, acceptedCB);
enable("hangupButton");
}


function loginSuccess(easyrtcid) {
disable("connectButton");
//  enable("disconnectButton");
enable("otherClients");
selfEasyrtcid = easyrtcid;
//document.getElementById("iam").innerHTML = "I am " + easyrtc.cleanId(easyrtcid);
easyrtc.showError("noerror", "logged in");
}


function loginFailure(errorCode, message) {
easyrtc.showError(errorCode, message);
}


function disconnect() {
easyrtc.disconnect();
//document.getElementById("iam").innerHTML = "logged out";
var disconnectBtn = document.querySelector('#disconnect');

$('#callerVideo').hide()
enable("connectButton");
disable(disconnectBtn);
easyrtc.clearMediaStream( document.getElementById("selfVideo"));
easyrtc.setVideoObjectSrc(document.getElementById("selfVideo"),"");
easyrtc.closeLocalMediaStream();
easyrtc.setRoomOccupantListener( function(){});
clearConnectList();
}


easyrtc.setStreamAcceptor( function(easyrtcid, stream) {
setUpMirror();
$('#callerVideo').show()
var video = document.getElementById("callerVideo");
easyrtc.setVideoObjectSrc(video,stream);

enable("hangupButton");
});



easyrtc.setOnStreamClosed( function (easyrtcid) {

easyrtc.setVideoObjectSrc(document.getElementById("callerVideo"), "");
disable("hangupButton");
});


var callerPending = null;

easyrtc.setCallCancelled( function(easyrtcid){
if( easyrtcid === callerPending) {
document.getElementById("acceptCallBox").style.display = "none";
callerPending = false;
}
});


easyrtc.setAcceptChecker(function(easyrtcid, callback) {
document.getElementById("acceptCallBox").style.display = "block";
callerPending = easyrtcid;
if( easyrtc.getConnectionCount() > 0 ) {
document.getElementById("acceptCallLabel").innerHTML = "Drop current call and accept new from " + easyrtc.idToName(easyrtcid) + " ?";
}
else {
document.getElementById("acceptCallLabel").innerHTML = "Accept help request?";
}
var acceptTheCall = function(wasAccepted) {
document.getElementById("acceptCallBox").style.display = "none";
if( wasAccepted && easyrtc.getConnectionCount() > 0 ) {
easyrtc.hangupAll();
}
callback(wasAccepted);
callerPending = null;
};
document.getElementById("callAcceptButton").onclick = function() {
$('#callerVideo').show()
acceptTheCall(true);
};
document.getElementById("callRejectButton").onclick =function() {
acceptTheCall(false);
};
} );


document.querySelector('#video-chat-connect').addEventListener('click', function () {
  $('#selfVideo').show();
  connect();
  $(this).hide();
  $('#video-chat-disconnect').show();
  return false;
})

document.querySelector('#video-chat-disconnect').addEventListener('click', function () {
  disconnect();
  $(this).hide();
  $('#video-chat-connect').show();
  $('#selfVideo').hide();
  return false;
})
