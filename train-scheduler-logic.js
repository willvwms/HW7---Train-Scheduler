// Initialize Firebase
const config = {
  apiKey: "AIzaSyBnb9R3Vq8dEzb7w1lOgvgFm4zDBFZJBq8",
  authDomain: "trainscheduler-3836c.firebaseapp.com",
  databaseURL: "https://trainscheduler-3836c.firebaseio.com",
  projectId: "trainscheduler-3836c",
  storageBucket: "trainscheduler-3836c.appspot.com",
  messagingSenderId: "261696569581"
};

firebase.initializeApp(config);

  // Create a variable to reference the database

const database = firebase.database();

$(document).on("ready", function (){

    // Click Button changes what is stored in firebase
    $("#add-train").on("click", function() {
      // Prevent the page from refreshing
      event.preventDefault();

      // Get inputs
      let trainName = $("#trainName").val().trim();
      let destination = $("#destination").val().trim();
      let firstTrainTime = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(1, "days").format("X");
      let frequency = $("#frequency").val().trim();

      console.log(trainName);
      console.log(destination);
      console.log("firstTrainTime: " + moment(firstTrainTime, "a"));
      console.log(frequency);

    // Add it to Firebase
    
    let additionalTrain = {
        trainName: trainName, 
        destination: destination, 
        firstTrainTime: firstTrainTime,
        frequency: frequency
    };

    database.ref().push(additionalTrain);

      // Clear text input fields
      $("#trainName").val("");
      $("#destination").val("");
      $("#firstTrainTime").val("");
      $("#frequency").val("");  

    }); // close CLICK HANDLER


    // Having saved the new train object to Firebase, 
    // pull the values from therefrom and do the Next Arrival / Minutes Away calculations, and render everything:

    database.ref().on("child_added", function(snap) {

      // Log the value of the various properties
      console.log("from firebase:" + snap.val().trainName);
      console.log("from firebase:" + snap.val().destination);
      console.log("from firebase:" + snap.val().firstTrainTime);
      console.log("from firebase:" + snap.val().frequency);  

      // Store the essential (user input) properties in new variables:
      let trainName = snap.val().trainName;
      let destination = snap.val().destination;
      let firstTrainTime = snap.val().firstTrainTime;
      let frequency = snap.val().frequency;

      // Calculate # of MINUTES till arrival: difference = ( current time ) - ( firstTrainTime )
      // use moment.diff(variable, "minutes")
      let difference = moment().diff(moment.unix(firstTrainTime, "minutes"));
      console.log("difference = " + difference);   

      // Find the remainder (%) after dividing DIFFERENCE by FREQUENCY:
      let remainder = parseInt(difference) % frequency;
      console.log("remainder = " + remainder);

      // Find difference of frequency and the remainder;
      // this will equal MINUTES AWAY:
      let minutesAway = frequency - remainder;
      console.log("minutes away = " + minutesAway);

      // Lastly, find the NEXT ARRIVAL TIME by adding minutesAway to current time: moment() + minutesAway

      let nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
      console.log("next arrival = " + nextArrival);

      // Append newTrain's data to the table
      $("#currentTrainSchedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

    }); // close ON CHILD ADDED handler

}); // end of ON-READY function


// CODE SNIPPET GRAVEYARD

// 1. Snippet to stop ON VALUE from throwing an error when the database is empty (before a first object is input) 
// if(!snap.val()){
// return;
// } 

// 2. Class example calculations
  // To calculate the arrival time, add the tMinutes to the currrent time
  // var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  // console.log(tMinutes);
  // console.log(tArrival);
  // console.log(moment().format("hh:mm A"));
  // console.log(tArrival);
  // console.log(moment().format("X"));
