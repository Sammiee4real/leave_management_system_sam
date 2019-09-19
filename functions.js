	$.ajax({
          type: "GET",
          url: 'http://localhost:3000/leave_requests', // Using our db.json file to serve results
          success: function(result) {
           //console.log(result);
           let status = 'default';
           let action= 'null';
           //let staffFullName = 'not found';
           let output =
          "<table id='example' class='table table-striped table-bordered'><thead><tr><th>Staff's Fullname</th><th>Email</th><th>Phone</th><th>Approval Status</th><th>Action</th><th>Action Status</th></tr></thead><tbody>";
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
            "<tr><td>" +
            staffFullName +
            "</td><td>" +
            result[i].email +
            "</td><td>" +
            result[i].staffPhoneno +
            "</td><td>"+ status  +
            "</td><td><a href='#'  class='btn btn-sm btn-success' onclick='fetchSingleRecord("+result[i].id+")' >view details</a></td><td>"+action+"</td></tr>";
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