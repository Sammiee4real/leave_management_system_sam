
$(document).ready(function(){

  ////loads all request immediately jquery is ready
      // $.ajax({
      //     type: "GET",
      //     url: 'http://localhost:3000/leave_requests', // Using our db.json file to serve results
      //     success: function(result) {
      //      //console.log(result);
      //      let status = 'default';
      //      let action= 'null';
      //      //let staffFullName = 'not found';
      //      let output =
      //     "<table id='example' class='table table-striped'><thead><tr><th>Staff's Fullname</th><th>Email</th><th>Phone</th><th>Approval Status</th><th></th></tr></thead><tbody>";
      //   for (let i in result) {
      //       if(result[i].approval_status ==1){
      //            status = "<small class='badge badge-sm badge-success'>Approved</small>";
      //            action = " ";
              
      //       }

      //       if(result[i].approval_status == 0){
      //            status = "<small class='badge badge-sm badge-info'>Pending</small>";
      //            action = "<button class='btn btn-sm btn-info men' data-target ='#exampleModal'   id='men"+result[i].id+"' href='#'>approve</button>";
      //       }

      //       if(result[i].approval_status ==2){
      //            status = "<small class='badge badge-sm badge-danger'>Disapproved</small>";
      //            action = "";
      //       }
      //       //get the name and other info of the staff
      //       // $.ajax({
      //       //   type: "GET",
      //       //   url: `http://localhost:3000/staffers?email=${result[i].staffemail}`, // Using our resources.json file to serve results
      //       //   success: function(staffResult) {
                  
      //       //               if(result[i].staffemail == staffResult.email){
      //       //                    staffFullName = staffResult[j].firstname ;
      //       //               } else{
      //       //                    staffFullName = "sdfsdf";
      //       //               }
      //       //         }
               
      //       //  });
      //     const staffFullName = result[i].staffFirstName +" "+ result[i].staffLastName;
      //     output +=
      //       "<tr><td>" +
      //       staffFullName +
      //       "</td><td>" +
      //       result[i].email +
      //       "</td><td>" +
      //       result[i].staffPhoneno +
      //       "</td><td>"+ status  +
      //       "</td><td><button onclick='fetchSingleRecord("+result[i].id+")' class='approve' id='"+result[i].staffFirstName+"'>hjhj</button></td></tr>";
      //    }
  
      //   output += "</tbody></table>";
      //    $('#view_requests_table').html(output);


      //  }

      //   });





     //gets the user's detaills immediatelt jquery loads
      let  email = window.localStorage.getItem('staffLoginEmail');
     let  staffFirstName = window.localStorage.getItem('staffFirstName');
     let  staffLastName = window.localStorage.getItem('staffLastName');
     let  staffPhoneno = window.localStorage.getItem('staffPhoneno');

     $('#staff_info').html('<strong>Welcome '+ staffFirstName+' '+staffLastName+' ( '+staffPhoneno+' )');



     let  ademail = window.localStorage.getItem('adminLoginEmail');
     let  adfirstname = window.localStorage.getItem('adminFirstName');
     let  adlastname = window.localStorage.getItem('adminLastName');
     let  adphoneno = window.localStorage.getItem('adminPhoneno');

    $('#admin_info').html('<strong>Welcome '+ adfirstname+' '+adlastname+' ( '+adphoneno+' )');




     







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
       $('#adminLoginBtn').html('Login');

       },
      success: function(response) {
        if (response.length) {
          $('#notification').html('<span class="badge badge-success">Login was Successful</span>');
           let adfirstname = response[0].firstname;
          let adlastname = response[0].lastname;
          let adphoneno = response[0].phoneno;
  		  $('#verifyLogin').html('You are logged in');
          localStorage.setItem('adminLoginEmail', adminLoginEmail);
          localStorage.setItem('adminFirstName', adfirstname);
          localStorage.setItem('adminLastName', adlastname);
          localStorage.setItem('adminPhoneno', adphoneno);
           $('#adminLoginBtn').html('Login');

      
        	//redirect to home page if the login is successfull
          window.location.assign('adminHome.html');

        } else {
          $('#notification').html('<span class="badge badge-danger">Email or Password Incorrect.</span>');
           $('#adminLoginBtn').html('Login');
        }
      }
  
   });

   }


  });




    /////staff login function
  $('#staffLoginBtn').click(function(event) {
    event.preventDefault();
   const staffLoginPassword = $('#staffLoginPassword').val();
    const staffLoginEmail = $('#staffLoginEmail').val();
   // alert(adminLoginPassword);


    if (!staffLoginPassword || !staffLoginEmail) {
      $('#staff_notification').html('<span class="badge badge-danger">Ensure all fields are properly filled. Thank you.</span>');
      //return;
    }
    else{
    //Check if the user is in the database
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/staffers?email=${staffLoginEmail}&password=${staffLoginPassword}`,
      data: {
        staffLoginEmail:staffLoginEmail,
        staffLoginPassword:staffLoginPassword
      },
      beforeSend: function() {
       $('#staffLoginBtn').html('Loading...');
       $('#staffLoginBtn').html('Login');

       },
      success: function(response) {
        if (response.length) { //login was successfull
          $('#staff_notification').html('<span class="badge badge-success">Login was Successful</span>');
          let firstname = response[0].firstname;
          let lastname = response[0].lastname;
          let phoneno = response[0].phoneno;


        $('#verifyLogin').html('You are logged in');
          localStorage.setItem('staffLoginEmail', staffLoginEmail);
          localStorage.setItem('staffFirstName', firstname);
          localStorage.setItem('staffLastName', lastname);
          localStorage.setItem('staffPhoneno', phoneno);
           $('#staffLoginBtn').html('Login');

      
          //redirect to home page if the login is successfull
         window.location.assign('staffHome.html');

        } else {
          //
          $('#staff_notification').html('<span class="badge badge-danger">Email or Password Incorrect</span>');
           $('#staffLoginBtn').html('Login');
        }
      }
  
   });

   }


  });



   //Logout Function for Admin
  $('#adminLogoutBtn').click(function() {
    //clear the localstorage and redirect to signup page
    localStorage.clear();
    //$('.checkLogin').html('Kindly login');
    window.location.assign('adminLogin.html');
    $('#notification').html('<span class="badge badge-success">You are now logged out.</span>');
  });



  //Logout Function for Staff
  $('#staffLogoutBtn').click(function() {
    //clear the localstorage and redirect to signup page
    localStorage.clear();
    //$('.checkLogin').html('Kindly login');
    window.location.assign('staffLogin.html');
    $('#staff_notification').html('<span class="badge badge-success">You are now logged out.</span>');
  });



//display form registering  a staff
  $('#register_staff').click(function(){
    //$('#register').text('please wait...');
      //alert('test');
      $('#admin_register_div').fadeIn();
      $('#view_all_requests_div').hide();
      $('#view_staff_div').hide();

  });



//view all requests
  $('#view_all_requests').click(function(){
    //$('#register').text('please wait...');
      //alert('test');
      $('#view_all_requests_div').fadeIn();
      $('#admin_register_div').hide();
      $('#view_staff_div').hide();
      

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
              $('#notification').html('<span class="badge badge-success">Staff was successfully created.&nbsp;&nbsp;<a id="#view_all_staff"  href="#>View all Staffers</a></span>');
               $('#registerStaffBtn').html('Register Now');
            },
          });
        }
      },
    });

}

  });




  //send a leave requests
  $('#leaveRequestBtn').click(function(event) {
    event.preventDefault();
    const end_date = $('#end_date').val();
    const start_date = $('#start_date').val();
     const leave_purpose = $('#leave_purpose').val();
     const approval_status = 0;
     let  email = window.localStorage.getItem('staffLoginEmail');
     let  staffFirstName = window.localStorage.getItem('staffFirstName');
     let  staffLastName = window.localStorage.getItem('staffLastName');
     let  staffPhoneno = window.localStorage.getItem('staffPhoneno');

         $.ajax({
      method: 'GET',
      url: `http://localhost:3000/leave_requests?email=${email}`,
      data: {
        email
      },
      beforeSend: function() {
      $('#leaveRequestBtn').html('Loading...');
      $('#leaveRequestBtn').html('Send Leave Request');
      },
      success: function(response) {
        if (response.length) {
            $('#staff_notification').html('<span class="badge badge-danger">You have a running leave request.</span>');
            $('#registerStaffBtn').html('Register Now');
        } else {
          //Submit the user data if the user does not exist
          $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/leave_requests',
            data: {
              email,
              staffFirstName,
              staffLastName,
              staffPhoneno,
              start_date,
              end_date,
              leave_purpose,
              approval_status 

            },
            beforeSend: function() {
              $('#leaveRequestBtn').html('Loading...');
              $('#leaveRequestBtn').html('Send Leave Request');
            },
            success: function() {
              $('#staff_notification').html('<span class="badge badge-success">You have successfully sent a leave request.&nbsp;&nbsp;<a id="#view_all_staff"  href="#>View all Staffers</a></span>');
                $('#leaveRequestBtn').hide();
                $('#request_form').hide();
                
            },
          });
        }
      },
    });
        

  });



//view staffers
  $('#view_all_staff').click(function(event) {
    event.preventDefault();
     $('#view_staff_div').fadeIn();
     $('#view_all_requests_div').hide();
     $('#admin_register_div').hide();

    
     $.ajax({
          type: "GET",
          url: 'http://localhost:3000/staffers', // Using our resources.json file to serve results
          success: function(result) {
           //console.log(result);
           let output =
          "<table id='example' class='table table-striped'><thead><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone No</th></tr></thead><tbody>";
        for (let i in result) {
          output +=
            "<tr><td>" +
            result[i].firstname +
            "</td><td>" +
             result[i].lastname +
            "</td><td>" +
             result[i].email +
            "</td><td>" +
             result[i].phoneno +
            "</td></tr>";
         
          }

         output += "</tbody></table>";
         $('#view_staff_table').html(output);
       }

        });
     

      });




//view leave requests
  $('#view_all_requests').click(function(event) {
    event.preventDefault();
     $('#view_all_requests_div').fadeIn();
     $('#view_staff_div').hide();
     $('#admin_register_div').hide();
     $('#view_staff_div').hide();

    
            $.ajax({
          type: "GET",
          url: 'http://localhost:3000/leave_requests', // Using our resources.json file to serve results
          success: function(result) {
           //console.log(result);
           let status = 'default';
           let action= 'null';
           //let staffFullName = 'not found';
           let output =
          "<table id='example' class='table table-striped'><thead><tr><th>Staff's Fullname</th><th>Email</th><th>Phone</th><th>Approval Status</th><th></th></tr></thead><tbody>";
        for (let i in result) {
            if(result[i].approval_status ===1){
                 status = "<small class='badge badge-sm badge-success'>Approved</small>";
                 action = " ";
              
            }

            if(result[i].approval_status === 0){
                 status = "<small class='badge badge-sm badge-info'>Pending</small>";
                 action = "<small><a class = 'btn btn-sm btn-info viewRecord' id='"+result[i].email+"' href='"+result[i].email+"'>approve</a></small>";
            }

            if(result[i].approval_status ===2){
                 status = "<small class='badge badge-sm badge-danger'>Disapproved</small>";
                 action = "";
            }

            //get the name and other info of the staff
            // $.ajax({
            //   type: "GET",
            //   url: `http://localhost:3000/staffers?email=${result[i].staffemail}`, // Using our resources.json file to serve results
            //   success: function(staffResult) {
                  
            //               if(result[i].staffemail == staffResult.email){
            //                    staffFullName = staffResult[j].firstname ;
            //               } else{
            //                    staffFullName = "sdfsdf";
            //               }
            //         }
               
            //  });
          const staffFullName = result[i].staffFirstName +" "+ result[i].staffLastName;
          output +=
            "<tr><td>" +
            staffFullName +
            "</td><td>" +
            result[i].email +
            "</td><td>" +
            result[i].staffPhoneno +
            "</td><td>"+ status  +
            "</td><td>&nbsp;&nbsp;"+action+"</td></tr>";
         
          }

         output += "</tbody></table>";
         $('#view_requests_table').html(output);
       }

        });


      });








  //////////disregard down



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


