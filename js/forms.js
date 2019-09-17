
$(document).ready(function(){


	/////admin login function
  $('#adminLoginBtn').click(function(event) {
    event.preventDefault();
    const adminLoginPassword = $('#adminLoginPassword').val();
    const adminLoginEmail = $('#adminLoginEmail').val();
    if (!adminLoginPassword || !adminLoginEmail) {
      $('#notification').html('<span style="badge badge-danger">Ensure all fields are properly filled. Thank you.</span>');
      return;
    }
    //Check if the user is in the database
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/admin?email=${emailLogin}&password=${passwordLogin}`,
      data: {
        adminLoginEmail,
        adminLoginPassword,
      },
      beforeSend: function() {
        $('#adminLoginBtn').html('Please wait....');
      },
      success: function(response) {
        if (response.length) {
          $('#notification').html('<span style="badge badge-success">You are succesfully logged in</span>');
  		  $('#verifyLogin').html('You are logged in');
          localStorage.setItem('adminEmail', adminLoginEmail);
          //redirect to home page if the login is successfull
          window.location.assign('index.html');
        } else {
          $('#notification').html('Username or password Incorrect');
        }
      },
    });
  });





	$('#login_admin').click(function(){
		//$('#login').text('please wait...');
	    //alert('test');
	    $('#register_div').slideUp();
	    $('#login_div').slideDown();
	    $('#view_all_requests_div').hide();
	});


	$('#register_staff').click(function(){
		//$('#register').text('please wait...');
	    //alert('test');
	    $('#login_div').slideUp();
	    $('#register_div').slideDown();
	     $('#view_all_requests_div').hide();
	});

		$('#view_all_requests').click(function(){
		//$('#register').text('please wait...');
	    //alert('test');
	    $('#view_all_requests_div').fadeIn();
	    $('#login_div').hide();
	    $('#register_div').hide();

	});


		$('#register').click(function(){
		   $('#register').text('please wait...');
		   $('#login').text('Login');
		   });



		$('#login').click(function(){
		   $('#login').text('please wait...');
		   $('#register').text('Register Now');

	});


    $('#example').DataTable();






});


