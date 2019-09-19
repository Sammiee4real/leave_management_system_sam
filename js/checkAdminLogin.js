 let useremail2 = window.localStorage.getItem('adminLoginEmail');
  if (useremail2) {
    //If no user data, redirect to signup/login page, anyone you like
   // $('.checkLogin').html('Kindly Log in');
    window.location.assign('adminHome.html');
  } 