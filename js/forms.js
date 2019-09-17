
$(document).ready(function(){


	/////admin login function
  $('#adminLoginBtn').click(function(event) {
    event.preventDefault();
   const adminLoginPassword = $('#adminLoginPassword').val();
    const adminLoginEmail = $('#adminLoginEmail').val();
   // alert(adminLoginPassword);


    if (!adminLoginPassword || !adminLoginEmail) {
      $('#notification').html('<span class="badge badge-danger">Ensure all fields are properly filled. Thank you.</span>');
      //return;
    }
    else{
    //Check if the user is in the database
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/admin?email=${adminLoginEmail}&password=${adminLoginPassword}`,
      data: {
        adminLoginEmail:adminLoginEmail,
        adminLoginPassword:adminLoginPassword
      },
      beforeSend: function() {
       $('#adminLoginBtn').html('Loading...');

       },
      success: function(response) {
        if (response.length) {
          $('#notification').html('<span class="badge badge-success">Login was Successful</span>');
  		  $('#verifyLogin').html('You are logged in');
          localStorage.setItem('adminLoginEmail', adminLoginEmail);
           $('#adminLoginBtn').html('Login');

      
        	//redirect to home page if the login is successfull
          window.location.assign('adminHome.html');

        } else {
          $('#notification').html('<span class="badge badge-danger">Username or Password Incorrect.</span>');
           $('#adminLoginBtn').html('Login');
        }
      }
  
   });

   }


  });



   //Logout Function
  $('#adminLogoutBtn').click(function() {
    //clear the localstorage and redirect to signup page
    localStorage.clear();
    //$('.checkLogin').html('Kindly login');
    window.location.assign('adminLogin.html');
    $('#notification').html('<span class="badge badge-success">You are now logged out.</span>');
  });



//display form registering  a staff
  $('#register_staff').click(function(){
    //$('#register').text('please wait...');
      //alert('test');
      $('#admin_register_div').fadeIn();
      $('#view_all_requests_div').hide();

  });



//view all requests
  $('#view_all_requests').click(function(){
    //$('#register').text('please wait...');
      //alert('test');
      $('#view_all_requests_div').fadeIn();
      $('#admin_register_div').hide();
      

  });



//register a staff
  $('#registerStaffBtn').click(function(event) {
    event.preventDefault();
    const firstname = $('#firstname').val();
    const lastname = $('#lastname').val();
    const email = $('#email').val();
    const phoneno = $('#phoneno').val();
    const password = $('#password').val();
    //Check if user input is empty
    if (!firstname || !lastname || !phoneno || !password || !email) {
      $('#notification').html('<span class="badge badge-danger">Ensure all fields are properly filled. Thank you. </span>');
      return;
    }
     else{
    //Make get request to check if the user already exist
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/staffers?email=${email}`,
      data: {
        email,
      },
      beforeSend: function() {
      $('#registerStaffBtn').html('Loading...');
      },
      success: function(response) {
        if (response.length) {
            $('#notification').html('<span class="badge badge-danger">User Already Exists.</span>');
            $('#registerStaffBtn').html('Register Now');
        } else {
          //Submit the user data if the user does not exist
          $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/staffers',
            data: {
              firstname,
              lastname,
              email,
              phoneno,
              password
            },
            beforeSend: function() {
              $('#registerStaffBtn').html('Loading...');
            },
            success: function() {
              $('#notification').html('<span class="badge badge-success">Staff was successfully created.</span>');
               $('#registerStaffBtn').html('Register Now');
            },
          });
        }
      },
    });

}

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

	


		$('#register').click(function(){
		   $('#register').text('please wait...');
		   $('#login').text('Login');
		   });



		$('#login').click(function(){
		   $('#login').text('please wait...');
		   $('#register').text('Register Now');

	});


    //$('#example').DataTable();






});


