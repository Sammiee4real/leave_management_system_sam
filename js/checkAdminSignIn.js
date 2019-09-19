 let useremail = window.localStorage.getItem('adminLoginEmail');
  if (!useremail) {
    //If no user data, redirect to signup/login page, anyone you like
   // $('.checkLogin').html('Kindly Log in');
    window.location.assign('adminLogin.html');
  }