 $(document).ready(function(){
 //gets the user's detaills immediatelt jquery loads
      let  email = window.localStorage.getItem('staffLoginEmail');
     let  staffFirstName = window.localStorage.getItem('staffFirstName');
     let  staffLastName = window.localStorage.getItem('staffLastName');
     let  staffPhoneno = window.localStorage.getItem('staffPhoneno');

     

     $('#staff_info2').html('<strong>Welcome '+ staffFirstName+' '+staffLastName+' ( '+staffPhoneno+' )');


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
               $('#display').html('<small>Status is approved</small>');
               $('#update_leave_request').hide();
               $('#delete_leave_request').hide();
           }else if(response[0].approval_status == 2){
             // alert('disapproved');
               $('#leave_request_div').hide();
               $('#leaveRequestBtn').hide();
               $('#leave_status_div').show();
               $('#display').html('<small>Status is disapproved</small>');
                $('#update_leave_request').hide();
               $('#delete_leave_request').hide();

           }else{
              //alert('pending');
               $('#leave_request_div').hide();
               $('#leaveRequestBtn').hide();
               $('#leave_status_div').show();
               $('#display').html('<small>Your request status is <strong>Pending</strong></small>');
                $('#update_leave_request').show();
               $('#delete_leave_request').show();
            }

         }
         else{

          //  window.location.assign('staffHome.html');
           // return;
          // alert('display form');
            $('#leave_request_div').show();
           $('#leaveRequestBtn').show();
           $('#leave_status_div').hide();
           $('#display').html('<small>Status is Not submitted yet<small>');
            $('#update_leave_request').hide();
               $('#delete_leave_request').hide();
         }
       }

        });

       });