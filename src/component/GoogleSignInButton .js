import React from 'react';

const GoogleSignInButton = () => {

  const handleCredentialResponse = (response) => {
    console.log(response);
  }

  return (
    <div>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <div id="g_id_onload" data-client_id="1043185101706-b2sb09pk80am8ms55rqa08kn22kj99ia.apps.googleusercontent.com" data-callback={handleCredentialResponse}></div>
      <div className="g_id_signin" data-type="standard"></div>
      <button className="btn btn-primary g_id_signin" data-type="standard">Sign in with Google</button>
    </div>
  );
}

export default GoogleSignInButton;
