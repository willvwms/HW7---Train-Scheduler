  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBnb9R3Vq8dEzb7w1lOgvgFm4zDBFZJBq8",
    authDomain: "trainscheduler-3836c.firebaseapp.com",
    databaseURL: "https://trainscheduler-3836c.firebaseio.com",
    projectId: "trainscheduler-3836c",
    storageBucket: "trainscheduler-3836c.appspot.com",
    messagingSenderId: "261696569581"
  };
  firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Initial Variables / values (SET the first set IN FIREBASE FIRST)
    // Note remember to create these same variables in Firebase!
    var TrainName = "";
    var Destination = "";
    var FirstTrainTime = "";
    var Frequency = "";

    // Click Button changes what is stored in firebase
    $("#submit").on("click", function() {
      // Prevent the page from refreshing
      event.preventDefault();

      // Get inputs
      TrainName = $("#TrainName").val().trim();
      Destination = $("#Destination").val().trim();
      FirstTrainTime = $("#FirstTrainTime").val().trim();
      Frequency = $("#Frequency").val().trim();

      console.log($("#TrainName").val().trim());
      console.log($("#Destination").val().trim());
      console.log($("#FirstTrainTime").val().trim());
      console.log($("#Frequency").val().trim());

      // Change what is saved in firebase
      database.ref().push({
        TrainName: TrainName,
        Destination: Destination,
        FirstTrainTime: FirstTrainTime,
        Frequency: Frequency
      });

      // Clear text input fields
      $("#TrainName").txt("");
      $("#Destination").txt("");
      $("#FirstTrainTime").txt("");
      $("#Frequency").txt("");  

    });

    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("value", function(snapshot) {

      // Print the initial data to the console.
      console.log(snapshot.val());

      // Log the value of the various properties
      console.log(snapshot.val().TrainName);
      console.log(snapshot.val().Destination);
      console.log(snapshot.val().FirstTrainTime);
      console.log(snapshot.val().Frequency);

      TrainName = $("#TrainName").val().trim();
      Destination = $("#Destination").val().trim();
      FirstTrainTime = $("#FirstTrainTime").val().trim();
      Frequency = $("#Frequency").val().trim();

      // Change the HTML
      $("#displayed-data").html(snapshot.val().name + " | " + snapshot.val().age + " | " + snapshot.val().phone);

      // If any errors are experienced, log them to console.
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
