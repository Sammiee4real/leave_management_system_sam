 $(document).ready(function(){
 //gets the user's detaills immediatelt jquery loads
      let  email = window.localStorage.getItem('staffLoginEmail');
     let  staffFirstName = window.localStorage.getItem('staffFirstName');
     let  staffLastName = window.localStorage.getItem('staffLastName');
     let  staffPhoneno = window.localStorage.getItem('staffPhoneno');

   



      ///chcking if the staff's leave status is positive or negative
      $.ajax({
      method: 'GET',
      url: `http://localhost:3000/leave_requests?email=${email}`,
      data: {
        email: email,
     
      },
      beforeSend: function() {
       $('#adminLoginBtn').html('Loading...');
       $('#adminLoginBtn').html('Login');

       },
      success: function(response) {
        if (response.length) {
           if(response[0].approval_status == 1){
              //alert('approved');
                $('#leave_request_div').hide();
               $('#leaveRequestBtn').hide();
               $('#leave_status_div').show();
                $('#staff_info2').html('<strong>Hello, '+ staffFirstName+' '+staffLastName+' ( '+staffPhoneno+' )');
               $('#display').html('<small>Your request has been <span style="color:green;"><strong>Approved</strong></span></small>');
               $('#update_leave_request').hide();
               $('#delete_leave_request').hide();
           }else if(response[0].approval_status == 2){
             // alert('disapproved');
               $('#leave_request_div').hide();
               $('#leaveRequestBtn').hide();
               $('#leave_status_div').show();
                $('#staff_info2').html('<strong>Hello, '+ staffFirstName+' '+staffLastName+' ( '+staffPhoneno+' )');
                  $('#display').html('<small>Sorry Dear, Your request was <span style="color:red;"><strong>Disapproved</strong></span></small>');

                $('#update_leave_request').hide();
               $('#delete_leave_request').hide();

           }else{
              //alert('pending');
               $('#leave_request_div').hide();
               $('#leaveRequestBtn').hide();
               $('#leave_status_div').show();
              $('#staff_info2').html('<strong>Hello, '+ staffFirstName+' '+staffLastName+' ( '+staffPhoneno+' )');
              $('#display').html('<small>Your request status is <span style="color:blue;"><strong>Pending</strong></span></small>');
              $('#update_leave_request').show();
               $('#delete_leave_request').show();
              //$('#my_request_div').show();

                  ////view my leave request
              $.ajax({
                    type: "GET",
                    url: `http://localhost:3000/leave_requests?email=${myemail}`, // Using our db.json file to serve results
                    data:{
                      myemail,
                    },
                    success: function(response) {
                     if(response.length){
                          
                          let myoutput = "";
                          myoutput +="<table id='example' class='table table-striped table-bordered'><thead><tr><th><h4><strong>Your Request</strong></h4></th><th></th></tr></thead><tbody>";
                          myoutput +="<tr><td>Leave  Date: </td><td>"+response[0].leave_purpose+"</td></tr><tr><td>Leave Detail: </td><td>"+response[0].leave_detail+"</td></tr><tr><td>Leave Purpose: </td><td>"+response[0].leave_purpose+"</td></tr><tr><td>Start Date: </td><td>"+response[0].start_date+"</td></tr><tr><td>End Date: </td><td>"+response[0].end_date+"</td></tr>";
                          myoutput += "</tbody></table>";
                          myoutput +="<p><a href='#' onclick='updateLeave()' id='update_leave_request()' class='btn btn-sm btn-info'>Update Request</a>&nbsp;|&nbsp;<a onclick='deleteLeave()' id='delete_leave_request()' class='btn btn-sm btn-danger' href='#'>Delete Request</a></p>";
                     
               
                          $('#my_request_div').show();
                          $('#my_request_table').html(myoutput);
            
                     }
                                
                    }
                  });


                
            }

         }
         else{

            $('#leave_request_div').show();
           $('#leaveRequestBtn').show();
           $('#leave_status_div').hide();
            $('#staff_info2').html('<strong>Hello, '+ staffFirstName+' '+staffLastName+' ( '+staffPhoneno+' )');
          // $('#display').html('<small>Status is Not submitted yet<small>');
            $('#update_leave_request').hide();
               $('#delete_leave_request').hide();
               
         }
       }

        });

       });

