var brainSocket = new WebSocket("ws://192.168.1.136:8080/?clientID=1")

var db
var objectStore
var request = indexedDB.open('brainDatabase')

// Set up database
request.onerror = function(event) {
  alert('Why didn\'t you allow my web app to use IndexedDB?!')
}
request.onsuccess = function(event) {
  db = event.target.result
}
request.onupgradeneeded = function(event) { 
  // Save the IDBDatabase interface 
  var db = event.target.result;

  // Create an objectStore for this database
  var objectStore = db.createObjectStore('brainData', { keyPath: 'id' })
  objectStore.createIndex('date', 'date', { unique: true })
}

// Handle messages
brainSocket.onmessage = function (event) {
  // If database exists, add data to store
  if (db) {
    var transaction = db.transaction(['brainData'], 'readwrite')
    var brainObjectStore = transaction.objectStore('brainData')
    brainObjectStore.add(JSON.parse(event.data))
    console.log(event.data)
  }
}


