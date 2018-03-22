// Initialize Firebase
var config = {
	apiKey: "AIzaSyCfKEJLS70JnmxbGfDBjmb4ocFl5eiuYZc",
	authDomain: "aiuto-dev.firebaseapp.com",
	databaseURL: "https://aiuto-dev.firebaseio.com",
	projectId: "aiuto-dev",
	storageBucket: "",
	messagingSenderId: "433665902763"
};
firebase.initializeApp(config);
var db = firebase.databse();

// Always log the starting of any function
// Always log any errors generated
// Always log the completion of anything important

// Handle errors
function handleErrors(err) {
	var errCode = err.code;
	var errMssg = err.message;
	console.error(err);
	alert("Doh! An Error Occurred!\r\nError:" + errCode + "\r\nMessage: " + errMssg + "\r\nContact Support if you need any assisstance.");
}

// Signed in users
function signedIn() {
	console.log("ERROR: User already signed in!");
	alert("A user is already signed in! Please sign out first to complete that action.");
}

// No signed in users
function noSignedIn() {
	console.log("ERROR: No signed in user!");
	alert("No user has signed in! Please sign in to complete that action.");
}

// Register the User, get his/her location, and redirect to dashboard
function signUp() {
	console.log("signUp started");
	if (firebase.auth().currentUser != null) {
		signedIn();
	} else {
		console.log("createUserWithEmailAndPassword started");
		firebase.auth().createUserWithEmailAndPassword(
			document.getElementById('signUpEmail').value,
			document.getElementById('signUpPassword').value
		).then(function() {
			verifyEmail();
			var pos = getPosition();
			db.ref('users/students/' + user.uid).set({
				name: document.getElementById('signUpName').value,
				email: document.getElementById('signUpEmail').value,
				latitude: "" + pos[0],
				longitude: "" + pos[1]
			}).then(function() {
				console.log("signUp completed");
				alert("Registered successfully!");
				window.location.href = "../dash";
			}).catch(handleErrors(error););
		}).catch(handleErrors(error););
	}
}

// Signs the User in
function signIn() {
	console.log("signIn started");
	if (firebase.auth().currentUser != null) {
		signedIn();
	} else {
		console.log("signInWithEmailAndPassword started");
		firebase.auth().signInWithEmailAndPassword(
			document.getElementById('signInEmail').value,
			document.getElementById('signInPassword').value
		).then(function() {
			console.log("signIn completed");
			alert("Signed in successfully!");
		}).catch(function(error) {
			handleErrors(error);
		});
	}
}

// Signs the User out
function signOut() {
	console.log("signOut started");
	if (firebase.auth().currentUser != null) {
		firebase.auth().signOut().then(function() {
			console.log("signOut completed");
			alert("Signed out successfully!");
		}).catch(function(error) {
			handleErrors(error);
		});
	} else {
		noSignedIn();
	}
}

// Send Verification Email
function verifyEmail() {
	console.log("verifyEmail started");
	if (firebase.auth().currentUser != null) {
		console.log("sendEmailVerification started");
		firebase.auth().currentUser.sendEmailVerification().then(function() {
			console.log("sendEmailVerification completed")
			alert("Verification email sent!")
		}).catch(function(error) {
			handleErrors(error);
		});
	} else {
		noSignedIn();
	}
}

// Reset Password
// TODO: Test this
function passwordReset() {
	console.log("passwordReset started");
	if (firebase.auth().currentUser != null) {
		firebase.auth().sendPasswordResetEmail(
			firebase.auth().currentUser.email
		).then(function() {
			console.log("passwordReset completed");
			alert("Password reset email sent!");
		}).catch(function(error) {
			handleErrors(error);
		});
	} else {
		noSignedIn();
	}
}

// Get the User's latitude
// TODO: Test this
function getPosition() {
	console.log("getPosition started");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			return [position.coords.latitude, position.coords.longitude];
		}).then(function() {
			console.log("getPosition successfull.");
		}).catch(function(error) {
			handleErrors(error)
		});
	}
}
