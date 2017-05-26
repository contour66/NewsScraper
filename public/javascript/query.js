// $("#scrape-button").on("click", function(event) {
//   // event.preventDefault() prevents the form from trying to submit itself.
//   // We're using a form so that the user can hit enter instead of clicking the button if they want
//   event.preventDefault();
//   // This line will grab the text from the input box
//   var sport = $("#sports-input").val().trim();
//   // The sport from the textbox is then added to our array
//   sports.push(sport);
//   // calling renderButtons which handles the processing of our sport array
// });

$(document).on("click", ".submit-comment", function(){
	// $(".submit-comment").on("click", function(){
		// console.log("something");
		var thisId= $(this).attr("data-id");
	$.ajax({
		method:"POST",
		url:"/home/"  + thisId,
		data: {
			comment: $(".comment-box").val(),
		}
	})
	.done(function(data){
		console.log(data);
		
	});
	$("comment-box").val("");
});
//       $.ajax({
//           url: queryURL,
//           method: "GET"
//         })
//         .done(function(response) {
//           var results = response.data;
//       }
// }
        