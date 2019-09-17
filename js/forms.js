
$(document).ready(function(){
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


