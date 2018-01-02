import AWS from 'aws-sdk';
import * as React from "react";

class FileUpload extends React.Component {

  // Amazon s3 config

  constructor() {
    super();

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    let files = document.getElementById('photoupload').files;
    if (!files.length) {
      return alert('Please choose a file to upload first.');
    }
    let file = files[0];

    AWS.config.update({
      region: 'eu-west-1',
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-1:603e0807-f3f2-46d3-ad72-4806263bc08c'
      }),
      Bucket: 'cheftransformer-images',
      params: {Bucket: 'cheftransformer-images'}
    });

    this.s3 = new AWS.S3({
      // apiVersion: '2006-03-01',
      params: {Bucket: 'cheftransformer-images'}
    });

    this.s3.config = AWS.config;
    this.s3.upload({
      Bucket:  'cheftransformer-images',
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

  render() {
    return (
      <div>
        <input id="photoupload" type="file" accept="image/*"/>
        <button id="addphoto" onClick={this.onDrop}>
          Add Photo
        </button>
      </div>
    );
  }
}

export default FileUpload;
