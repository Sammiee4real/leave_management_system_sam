


	$.ajax({
          type: "GET",
          url: 'http://localhost:3000/leave_requests', // Using our db.json file to serve results
          success: function(result) {
           //console.log(result);
           let status = 'default';
           let action= 'null';
           let k =1;
           //let staffFullName = 'not found';
           let output =
          "<table id='example' class='table table-striped table-bordered'><thead><tr><th>SN</th><th>Staff's Fullname</th><th>Email</th><th>Phone</th><th>Approval Status</th><th>Action</th><th>Action Status</th></tr></thead><tbody>";
        for (let i in result) {
            if(result[i].approval_status =='1'){
                 status = "<small class='badge badge-sm badge-success'>Approved</small>";
                 action = " <small><i>Treated</i></small>&nbsp;&nbsp;<button class='btn btn-sm btn-danger' onclick='disapproveRequest("+result[i].id+")' data-target ='#exampleModal'   id='men"+result[i].id+"' href='#'>disapprove</button>";
              
            }

            if(result[i].approval_status == '0'){
                 status = "<small class='badge badge-sm badge-warning'>Pending</small>";
                 action = "<button class='btn btn-sm btn-info men' onclick='approveRequest("+result[i].id+")' data-target ='#exampleModal'  href='#'>approve</button>&nbsp;&nbsp;<button class='btn btn-sm btn-danger' onclick='disapproveRequest("+result[i].id+")' data-target ='#exampleModal'   id='men"+result[i].id+"' href='#'>disapprove</button>";
            }

            if(result[i].approval_status =='2'){
                 status = "<small class='badge badge-sm badge-danger'>Disapproved</small>";
                 action = "<button class='btn btn-sm btn-info men' onclick='approveRequest("+result[i].id+")' data-target ='#exampleModal'  href='#'>approve</button>&nbsp;&nbsp;<small><i>Treated</i></small>";
            }
           
          const staffFullName = result[i].staffFirstName +" "+ result[i].staffLastName;
          output +=
            "<tr><td>"+k+"</td><td>" +
            staffFullName +
            "</td><td>" +
            result[i].email +
            "</td><td>" +
            result[i].staffPhoneno +
            "</td><td>"+ status  +
            "</td><td><a href='#'  class='btn btn-sm btn-success' onclick='fetchSingleRecord("+result[i].id+")' >view details</a></td><td>"+action+"</td></tr>";
         	k++;
         }
  
        output += "</tbody></table>";
         $('#view_requests_table').html(output);


       }

        });



	








///////displaying a single record
function fetchSingleRecord(data){
     
   			$.ajax({
			      method: 'GET',
			      url: `http://localhost:3000/leave_requests?id=${data}`,
			      data: {
			        data:data
			      },
			      // beforeSend: function() {
			      //  $('#staffLoginBtn').html('Loading...');
			      //  $('#staffLoginBtn').html('Login');

			      //  },
			      success: function(response) {
			        if (response.length) { //
			          let leave_purpose = response[0].leave_purpose;
			          let end_date = response[0].end_date;
			          let Fullname = response[0].staffFirstName +' '+response[0].staffLastName;
			           let output =
			          "<table id='example' class='table table-striped table-bordered'><thead><tr><th><th></th><strong>Leave Request Details of "+Fullname+"</strong>&nbsp;&nbsp;&nbsp;<a href='#'  class='badge badge-sm badge-info' onclick='goBack()'>Go Back</a></th></tr></thead><tbody>";
			           
			          output +="<tr><td>Email: </td><td>"+response[0].email+"</td></tr><tr><td>First Name: </td><td>"+response[0].staffFirstName+"</td></tr><tr><td>Last Name: </td><td>"+response[0].staffLastName+"</td></tr><tr><td>Phone No: </td><td>"+response[0].staffPhoneno+"</td><tr><td>Leave Purpose: </td><td>"+response[0].leave_purpose+"</td></tr><tr><td>Start Date: </td><td>"+response[0].start_date+"</td></tr><tr><td>End Date: </td><td>"+response[0].end_date+"</td></tr><tr><td>Leave Purpose: </td><td>"+leave_purpose+"</td></tr></tr>";

			           output += "</tbody></table>";
			          $('#view_requests_table').html(output);
			          

			         $('#view_all_requests_div').hide();
			           $('#view_single_requests_div').show();
			          $('#view_single_request_table').html(output);
			         // alert(leave_purpose);

			      }
			     } 
  
   });

     } 


 ///////approve a leave requests
function approveRequest(id){
        
			        	$.ajax({
			        		method: 'PATCH',
			        		url: `http://localhost:3000/leave_requests/${id}`,
			        		data: {
			        			approval_status: '1'
			        		},
			        	    success:function(update_response){
                               //$('#notification').show();
                               //$('#notification').html('<span class="badge badge-success">Request was approved</span>');
                               alert('Request was approved');
                                window.location.assign('adminHome.html');
                               
			        	    
			        	    }
			        	});
			      }
			     
  
  

 ///////disapprove a leave requests
function disapproveRequest(id){
        
			        	$.ajax({
			        		method: 'PATCH',
			        		url: `http://localhost:3000/leave_requests/${id}`,
			        		data: {
			        			approval_status: '2'
			        		},
			        	    success:function(update_response){
                           			
                           	alert('Request was disapproved');		
  							//$('#notification').html('<span class="badge badge-success">Request was disapproved</span>');
                           //	$("#reloadPage").load(location.href + "#reloadPage"); 
                           window.location.assign('adminHome.html');
			        	    
			        	    }
			        	});
			      }
			     
    

			function goBack(){
	 				window.location.assign('adminHome.html');

			}






//////////////staff area
			//update leave request
			 ///////approve a leave requests
           function updateLeave(){
        		
        			let output = "";
			        	$.ajax({
			        		method: 'GET',
			        		url: `http://localhost:3000/leave_requests?email=${myemail}`,
			        		data: {
			        			myemail
			        		},
			        	    success:function(resp){
                               if(resp.length){
                               	   const start_date = resp[0].start_date;
                               	   const email = resp[0].email;
                               	   const staffFirstName = resp[0].staffFirstName;
                               	   const staffLastName = resp[0].staffLastName;
                               	    const staffPhoneno = resp[0].staffPhoneno;
                               	   const end_date = resp[0].end_date;
                               	   const leave_purpose = resp[0].leave_purpose;
                               	   const leave_detail = resp[0].leave_detail;
                               	   const id = resp[0].id;
                               	

                               		output +='<h4 align="center">Update Leave Request </h4>';
                               		output +='<div class="row"><div class="col-lg-4 col-md-12 col-sm-12"></div><div class="col-lg-4 col-md-12 col-sm-12"><div align="center" id="staff_notificationn"></div><br>'; 
                               		output +='<form id="request_form"><div class="form-group"><label>Leave Start Date</label><input type="date" name="start_date_update" required id="start_date_update" class="form-control" value='+start_date+' placeholder="Leave Start Date"></div><div class="form-group"><label>Leave End Date</label><input type="date" name="end_date_update" value='+end_date+' required id="end_date_update" class="form-control" placeholder="Leave End Date"></div><div class="form-group"><label>Purpose of Leave</label><select class="form-control" id="leave_purpose_update" required=""><option value="'+leave_purpose+'">'+leave_purpose+'</option><option value="Maternity Leave">Maternity Leave</option><option value="Paternity Leave">Paternity Leave</option><option value="Bereavement Leave">Bereavement Leave</option><option value="Sick Leave">Sick Leave</option><option value="Administrative Leave">Administrative leave</option><option value="Adoption leave">Adoption leave</option><option value="Annual Leave">Annual Leave</option><option value="Nursing Leave">Nursing Leave</option><option value="Study Leave">Study Leave</option><option value="Casual Leave">Casual Leave</option><option value="Vacation Leave">Vacation Leave</option><option value="Others">Others</option></select></div><div class="form-group"><label>Leave Description</label><textarea type="" class="form-control" name="leave_detail" id="leave_detail_update">'+leave_detail+'</textarea></div></div><div class="col-lg-4 col-md-12 col-sm-12"></div></div><div class="row"><div class="col-lg-4 col-md-12 col-sm-12"></div><div class="col-lg-4 col-md-12 col-sm-12"><a href="staffHome.html"  class="btn btn-md btn-info">Back</a>&nbsp;&nbsp;<button id="updateleaveRequestBtn" onclick="updateRequest('+id+')" class="btn btn-md btn-primary">Update Request</button></div><div class="col-lg-4 col-md-12 col-sm-12"></div></div>';
                               		
                               	}

                               	$('#leave_request_div').hide();
                               	$('#show_update_request_div').html(output);

                               	 $('#my_request_div').remove();
                                // $('#my_request_table').empty(myoutput);
               
			        	    }
			        	});
			      }




           function deleteLeave(){
        			//alert(email);
        			let output = "";
			        	$.ajax({
			        		method: 'GET',
			        		url: `http://localhost:3000/leave_requests?email=${myemail}`,
			        		data: {
			        			myemail
			        		},
			        	    success:function(resp){
                               if(resp.length){
                               	   const start_date = resp[0].start_date;
                               	   const email = resp[0].email;
                               	   const staffFirstName = resp[0].staffFirstName;
                               	   const staffLastName = resp[0].staffLastName;
                               	    const staffPhoneno = resp[0].staffPhoneno;
                               	   const end_date = resp[0].end_date;
                               	   const leave_purpose = resp[0].leave_purpose;
                               	   const leave_detail = resp[0].leave_detail;
                               	   const id = resp[0].id;
                               	

                               		output +='<h4 align="center">Delete Leave Request<br><span style="color:red;font-size:15px;">Please note that once the delete button is clicked, your request is erased from the HR Database<span> </h4>';
                               		output +='<div class="row"><div class="col-lg-4 col-md-12 col-sm-12"></div><div class="col-lg-4 col-md-12 col-sm-12"><div align="center" id="staff_notificationn"></div><br>'; 
                               		output +='<form id="request_form"><div class="form-group"><label>Leave Start Date</label><input type="date" name="start_date_update" required id="start_date_update" class="form-control" value='+start_date+' placeholder="Leave Start Date"></div><div class="form-group"><label>Leave End Date</label><input type="date" name="end_date_update" value='+end_date+' required id="end_date_update" class="form-control" placeholder="Leave End Date"></div><div class="form-group"><label>Purpose of Leave</label><select class="form-control" id="leave_purpose_update" required=""><option value="'+leave_purpose+'">'+leave_purpose+'</option><option value="Maternity Leave">Maternity Leave</option><option value="Paternity Leave">Paternity Leave</option><option value="Bereavement Leave">Bereavement Leave</option><option value="Sick Leave">Sick Leave</option><option value="Administrative Leave">Administrative leave</option><option value="Adoption leave">Adoption leave</option><option value="Annual Leave">Annual Leave</option><option value="Nursing Leave">Nursing Leave</option><option value="Study Leave">Study Leave</option><option value="Casual Leave">Casual Leave</option><option value="Vacation Leave">Vacation Leave</option><option value="Others">Others</option></select></div><div class="form-group"><label>Leave Description</label><textarea type="" class="form-control" name="leave_detail" id="leave_detail_update">'+leave_detail+'</textarea></div></div><div class="col-lg-4 col-md-12 col-sm-12"></div></div><div class="row"><div class="col-lg-4 col-md-12 col-sm-12">';
                               		output +='</div><div class="col-lg-4 col-md-12 col-sm-12"><a href="staffHome.html"  class="btn btn-md btn-info">Cancel</a>&nbsp;&nbsp;<button id="updateleaveRequestBtn" onclick="deleteRequest('+id+')" class="btn btn-md btn-danger">Delete Request</button></div><div class="col-lg-4 col-md-12 col-sm-12"></div></div>';
                               		
                               	}

                               	$('#leave_request_div').hide();
                               	$('#show_update_request_div').html(output);

                               	 $('#my_request_div').remove();
               
			        	    }
			        	});
			      }



			function deleteRequest(id){
					
				$.ajax({
			        		method: 'DELETE',
			        		url: `http://localhost:3000/leave_requests/${id}`,
			        		data: {
			        		},
			        	    success:function(del_response){
                               
                               		//alert('success');
                               		 $('#staff_notificationn').html('<span class="badge badge-danger">Deletion  of your leave request was successful &nbsp;&nbsp;<a href="staffHome.html" class="text-white">Return to Dashboard</a></span>');
     
                              
                            }

			        	});
			}


			function updateRequest(id){
					start_date_update = $('#start_date_update').val();
					end_date_update = $('#end_date_update').val();
					leave_purpose_update = $('#leave_purpose_update').val();
					leave_detail_update = $('#leave_detail_update').val();
			        	
				$.ajax({
			        		method: 'PATCH',
			        		url: `http://localhost:3000/leave_requests/${id}`,
			        		data: {
			        			start_date: start_date_update,
			        			end_date: end_date_update,
			        			leave_purpose: leave_purpose_update,
			        			leave_detail: leave_detail_update
			        		},
			        	    success:function(update_response){
                               
                               		//alert('success');
                               		 $('#staff_notificationn').html('<span class="badge badge-success">Update of your leave request was successful &nbsp;&nbsp;<a href="staffHome.html" class="text-white">Return to Dashboard</a></span>');
     
                              
                            }

			        	});
			}
			     
			     
	


