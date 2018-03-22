// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAB7OqAgB01bZMH9O-tekwJ4LwEgTP348g',
  authDomain: 'aiuto-dev-1.firebaseapp.com',
  databaseURL: 'https://aiuto-dev-1.firebaseio.com',
  projectId: 'aiuto-dev-1',
  storageBucket: 'aiuto-dev-1.appspot.com',
  messagingSenderId: '376819957796'

firebase.initializeApp(config)
var database = firebase.database();

function writeUserData (id, nme, msg) {
  database.ref('messages/test/msg' + id).set({
    name = nme
    message = msg
  });
}

var nameInpt = document.querySelector('#name')
var messageInpt = document.querySelector('#msg')
var postBtn = document.querySelector('#post')
var msgCount = 1

postButton.addEventListener('click', function () {
  var msgName = nameInput.value
  var msgText = messageInput.value
  writeUserData(msgCount, msgName, msgText)
  count += 1
  textInput.value = ''
})

var startListening = function () {
  database.on('child_added', function (snapshot) {
    var msg = snapshot.val()

    var msgNameElement = document.createElement('b')
    msgNameElement.textContent = msg.Name

    var msgTextElement = document.createElement('p')
    msgTextElement.textContent = msg.msg

    var msgElement = document.createElement('div')
    msgElement.appendChild(msgUsernameElement)
    msgElement.appendChild(msgTextElement)

    msgElement.className = 'msg'
    document.getElementById('results').appendChild(msgElement)
  })
}

// Begin listening for data
startListening()
