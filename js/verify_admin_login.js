$(document).ready(function() {
  //Check if there is any user data stored in the local storage
  //because user data is stored in localstorage at login
  // let user = window.localStorage.getItem('email');
  // if (!user) {
  //   //If no user data, redirect to signup/login page, anyone you like
  //   $('#verifyLogin').html('Sorry, Try Logging in again!');
  //   window.location.assign('admin_page.html');
  // } else {
  //   //Else prompt the user he is logged in
  //   $('#verifyLogin').html('Voila, You are logged in');
  // }


    $('#admin_login').click(function(){
         let emailLogin = $('#loginEmail').val();
         localStorage.setItem('loginEmail', emailLogin);
        let adminEmail = window.localStorage.getItem('loginEmail');

        if(!adminEmail){
              //If no user data, redirect to signup/login page, anyone you like
              
               $('#verifyLogin').html('Sorry, Try Logging in again!');
                $('#verifyLogin').show();
              //window.location.assign('admin_page.html');
        } else{
            //Else prompt the user he is logged in
             $('#verifyLogin').html('Voila, You are logged in');
              $('#verifyLogin').show();
              //$('#admin_login').text('please wait...');
              //$('#register').text('Register Now');
        }

      

  });


});
