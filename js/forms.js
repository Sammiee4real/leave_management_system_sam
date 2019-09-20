
$(document).ready(function(){

  
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
         
          let firstname = response[0].firstname;
          let lastname = response[0].lastname;
          let phoneno = response[0].phoneno;
          let logincount = response[0].logincount;

          // if(logincount == '0'){
          //     window.location.assign('staffResetPassword.html');
          //     localStorage.setItem('resetemail', staffLoginEmail);
          //     localStorage.setItem('oldpassword', staffLoginPassword);
          //     localStorage.setItem('logincount', logincount);
          // }else{
             $('#staff_notification').html('<span class="badge badge-success">Login was Successful</span>');
            $('#verifyLogin').html('You are logged in');
            localStorage.setItem('staffLoginEmail', staffLoginEmail);
            localStorage.setItem('staffFirstName', firstname);
            localStorage.setItem('staffLastName', lastname);
            localStorage.setItem('staffPhoneno', phoneno);
            $('#staffLoginBtn').html('Login');
            //redirect to home page if the login is successfull
            window.location.assign('staffHome.html');
         // }


        

        } else {
          //
          $('#staff_notification').html('<span class="badge badge-danger">Email or Password Incorrect</span>');
           $('#staffLoginBtn').html('Login');
        }
      }
  
   });

   }


  });



  /////reset password staffResetBtn
    /////staff login function
  // $('#staffResetBtn').click(function(event) {
  //   event.preventDefault();
  //   const resetpass = $('#resetpass').val();
  //   const cresetpass = $('#cresetpass').val();
  //   //Check if the user is in the database
  //    if (!resetpass || !cresetpass) {
  //     $('#staff_notification').html('<span class="badge badge-danger">Empty Fields found</span>');
  //     //return;
  //   }else if(resetpass != cresetpass){
  //      $('#staff_notification').html('<span class="badge badge-danger">Password mismatch</span>');
  //   }


  //   else{
  //   $.ajax({
  //     method: 'GET',
  //     url: `http://localhost:3000/staffers?email=${resetemail}&logincount=${logincount}`,
  //     data: {
  //       resetemail:resetemail,
  //       logincount:logincount
  //     },
  //     beforeSend: function() {
  //      $('#staffResetBtn').html('Loading...');
  //      $('#staffResetBtn').html('Reset Password');

  //      },
  //     success: function(response) {
  //       if (response.length) { //login was successfull
  //           newlog = parseInt(logincount) + 1;

  //         ////////////////update login count to 1
  //         $.ajax({
  //                 method: 'PATCH',
  //                 url: `http://localhost:3000/staffers?email=${resetemail}`,
  //                 data: {
  //                  logincount: newlog,
  //                  password: resetpass

  //                 },
  //                   success:function(update_response){
  //                              if(!update_response.length){
  //                               alert('correct');
  //                                 //alert('success');
  //                                  $('#staff_notificationn').html('<span class="badge badge-success">Password reset was successful &nbsp;&nbsp;<a href="staffHome.html" class="text-white">Return to Dashboard</a></span>');
  //                              }
     
                              
  //                           }

  //               });



         
  //         let firstname = response[0].firstname;
  //         let lastname = response[0].lastname;
  //         let phoneno = response[0].phoneno;
  //         let logincount = response[0].logincount;

  //           $('#staff_notification').html('<span class="badge badge-success">Login was Successful</span>');
  //           $('#verifyLogin').html('You are logged in');
  //           localStorage.clear();
  //           localStorage.setItem('staffLoginEmail', resetemail);
  //           localStorage.setItem('staffFirstName', firstname);
  //           localStorage.setItem('staffLastName', lastname);
  //           localStorage.setItem('staffPhoneno', phoneno);
  //           $('#staffResetBtn').html('Reset Password');
  //           //redirect to home page if the login is successfull
  //           window.location.assign('staffHome.html');
          


        

  //       }

  //        else {
  //         //
  //         $('#staff_notification').html('<span class="badge badge-danger">Email or Password Incorrect</span>');
  //          $('#staffResetBtn').html('Reset Password');
  //       }



  //     }
  
  //  });

  // } 


  // });


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
       $('#view_single_requests_div').hide();
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
    const cpassword = $('#cpassword').val();
    const qualification = $('#qualification').val();
    const address = $('#address').val();
    const middlename = $('#middlename').val();
    const maritalstatus = $('#maritalstatus').val();
    const dob = $('#dob').val();
    const gender = $('#gender').val();
    const logincount = 0;

    
    
    
    //Check if user input is empty
    if (!firstname || !lastname || !phoneno || !password || !qualification || !address || !middlename || !gender || !maritalstatus || !dob) {
      $('#notification').html('<span class="badge badge-danger">Ensure all fields are properly filled. Thank you. </span>');
      return;
    }
    else if(password !== cpassword){
      $('#notification').html('<span class="badge badge-danger">Password mismatch found. </span>');
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
              middlename,
              email,
              phoneno,
              password,
              qualification,
              address,
              maritalstatus,
              dob,
              gender,
              logincount
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
      const leave_detail = $('#leave_detail').val();
     const approval_status = 0;
     let  email = window.localStorage.getItem('staffLoginEmail');
     let  staffFirstName = window.localStorage.getItem('staffFirstName');
     let  staffLastName = window.localStorage.getItem('staffLastName');
     let  staffPhoneno = window.localStorage.getItem('staffPhoneno');

     if(!end_date || !start_date || !leave_purpose || !leave_detail){
          $('#staff_notification').html('<span class="badge badge-danger">Kindly fill all fields</span>');
            $('#registerStaffBtn').html('Register Now');
     }

     else if(end_date < start_date ){
          $('#staff_notification').html('<span class="badge badge-danger">End Date cannot be less than Start Date</span>');
            $('#registerStaffBtn').html('Register Now');
     }

     else{

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
              leave_detail,
              approval_status 

            },
            beforeSend: function() {
              $('#leaveRequestBtn').html('Loading...');
              $('#leaveRequestBtn').html('Send Leave Request');
            },
            success: function() {
              $('#staff_notification').html('<span class="badge badge-success">You have successfully sent a leave request.&nbsp;&nbsp;<a href="staffHome.html" class="text-white">Return to Dashboard</a></span>');
                $('#leaveRequestBtn').hide();
                $('#request_form').hide();
                
            },
          });
        }
      },
    });

  }
        

  });



//view staffers
  $('#view_all_staff').click(function(event) {
    event.preventDefault();
     $('#view_staff_div').fadeIn();
     $('#view_all_requests_div').hide();
     $('#admin_register_div').hide();
     $('#view_single_requests_div').hide();
     let k = 1;
    
     $.ajax({
          type: "GET",
          url: 'http://localhost:3000/staffers', // Using our resources.json file to serve results
          success: function(result) {
           //console.log(result);
           let output =
          "<table id='example' class='table table-striped table-bordered'><thead><tr><th>SN</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone No</th></tr></thead><tbody>";
        for (let i in result) {
          output +=
            "<tr><td>"+k+"</td><td>" +
            result[i].firstname +
            "</td><td>" +
             result[i].lastname +
            "</td><td>" +
             result[i].email +
            "</td><td>" +
             result[i].phoneno +
            "</td></tr>";
          k++;
          }
         
         output += "</tbody></table>";
         $('#view_staff_table').html(output);
       }

        });
     

      });



    $('#example').DataTable();



});


