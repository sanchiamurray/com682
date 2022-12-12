//The URIs of the REST endpoint
IUPS = "https://prod-17.northeurope.logic.azure.com:443/workflows/16e3b73c28cb47bf95a27cb1e4081123/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WxgtNrnuXqS-uCVUaKpopYOJ7NVWz7t8wlFDMDS85hs";
RAI = "https://prod-23.northeurope.logic.azure.com:443/workflows/c0eae4088da546b7993168f405082261/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rFyfUMIR0s38xfWCT9ngmH9c1riWepqDE4UpvEEs2X4";

BLOB_ACCOUNT = "https://videoshareb00779644.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
   //Create a form data object
   submitData = new FormData();

   //Get form variables and append them to the form data object
   submitData.append('Title', $('#Title').val());
   submitData.append('Producer',$('#Producer').val());
   submitData.append('Publisher', $('#Publisher').val());
   submitData.append('Genre',$('#Genre').val());
  // submitData.append('Age', $('Age').val())
   //submitData.append('FileName', $('#FileName').val());
   //submitData.append('userID', $('#userID').val());
   //submitData.append('userName', $('#userName').val());
   submitData.append('File', $("#UpFile")[0].files[0]);
  
   //Post the form data to the endpoint, note the need to set the content type header
   $.ajax({
      url: IUPS,
      data: submitData,
      cache: false,
      enctype: 'multipart/form-data',
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(data){
  
      }
   });
  

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){

//Replace the current HTML in that div with a loading message
$('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

$.getJSON(RAI, function( data ) {

  //Create an array to hold all the retrieved assets
  var items = [];

  //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
  $.each( data, function( key, val ) {

    items.push( "<hr />");
    //items.push("<video width='320' height='240'controls/>")
    items.push("<video src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400' autoplay muted controls> </video> ")
    
    items.push("<br/>"+"Video title: " + val["Title"] + "<br/>");
    items.push("Producer: " + val["Producer"] + " (Publisher: " + val["Publisher"]+")</br>");
    items.push( "Age : " + val["Age"] + "<br />");
    items.push( "Genre : " + val["Genre"] + "<br />");
  //  items.push( "File : " + val["fileName"] + "<br />");
    //items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
    items.push( "<hr />");
  
  });

  //Clear the assetlist div
  $('#ImageList').empty();

  

  //Append the contents of the items array to the ImageList Div
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
    }).appendTo( "#ImageList" );
  });
}


//save me!