import AWS from 'aws-sdk';
import * as React from "react";
import GoogleLogin from 'react-google-login';

class FileUpload extends React.Component {

  // Amazon s3 config

  constructor() {
    super();

    this.state = {/* initial state */};
    this.onDrop = this.onDrop.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    let files = document.getElementById('photoupload').files;
    if (!files.length) {
      return alert('Please choose a file to upload first.');
    }
    let file = files[0];

    if (!this.state.googleUser) {
      console.log("NOOOO")
      return;
    }

    const user = this.state.googleUser;
    const accessToken = this.state.googleUser.accessToken;
    const tokenId = this.state.googleUser.tokenId;


    console.log(user)
    console.log("LDLD" + user);
    console.log("accessToken" + accessToken);
    console.log("tokenId" + tokenId);

    AWS.config.update({
      region: 'eu-west-1',
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-1:603e0807-f3f2-46d3-ad72-4806263bc08c',
        Logins: {
          'accounts.google.com': tokenId
        }
      }),

      Bucket: 'cheftransformer-images',
      params: {Bucket: 'cheftransformer-images'}
    });

    // AWS.config.credentials = new AWS.WebIdentityCredentials({
    //   ProviderId: 'www.amazon.com',
    //   WebIdentityToken: this.state.googleUser.access_token,
    //   IdentityPoolId: 'eu-west-1:603e0807-f3f2-46d3-ad72-4806263bc08c'
    // });

    this.s3 = new AWS.S3({
      // apiVersion: '2006-03-01',
      params: {Bucket: 'cheftransformer-images'}
    });

    this.s3.config = AWS.config;
    this.s3.upload({
      Bucket: 'cheftransformer-images',
      Key: file.name,
      Body: file
    }, function (err, data) {
      if (err) {
        console.log(err);
        return alert('There was an error uploading your photo: ' + err.message, data);
      }
      alert('Successfully uploaded photo.');
      // viewAlbum(albumName);
    });
  };

  loggedIn(googleUser) {
    console.log(googleUser);
    this.setState({
      googleUser
    });
    console.log(googleUser);
  };


  render() {

    return (
      <div>
        <input id="photoupload" type="file" accept="image/*"/>
        <button id="addphoto" onClick={this.onDrop}>
          Add Photo
        </button>

        <GoogleLogin
          clientId="182416863508-bk0cned125mcvr10hlv415ratemqnr6u.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.loggedIn}
          onFailure={(resp) => {
            console.log("O.o");
            console.log(resp)
          }}
        />,
      </div>
    );
  }
}

export default FileUpload;
