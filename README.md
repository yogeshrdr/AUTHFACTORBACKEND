


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a>
    <img src="https://i.ibb.co/g4Z0RmV/icon.png"  alt="unnamed-removebg-preview" width="150px" height:"150px">
  </a>

  <h3 align="center">AUTH FACTOR</h3>
   <a href="https://github.com/yogeshrdr/AUTHFACTOR">AUTH FACTOR APP REPO</a>
  <p align="center">
    A TWO FACTOR AUTHETICATOR
    <br />
    <a href="https://drive.google.com/file/d/1xueeENjHhpOvY__B7GvnWhjHx3iHoW23/view?usp=sharing">DOWNLOAD APP</a>
  <br />
  <a href="https://lively-comet-301135.postman.co/documentation/15724742-7a3adca9-9f27-482d-9bd1-b3033988698d/publish?workspaceId=70eadbf4-888a-4f9f-812e-71996020657f">BACKEND DOCUMNETATION</a>
  </p>
  
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
        <li>
      <a href="#website-preview">APP PREVIEW</a>
      <ul>
        <li><a href="#login">Login</a></li>
        <li><a href="#add">ADD A AUTHETICATOR</a></li>
        <li><a href="#dis">DISPLAY AUTHETICATIOR TOKEN</a></li>
        <li><a href="#del">DELETE AUTHETICATIOR</a></li>
      </ul>
    </li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
The idea of the project is 2-factor authetication who want a secured login for there applications.

2FA is an extra layer of security used to make sure that people trying to gain access to an online account are who they say they are. First, a user will enter their username and a password. Then, instead of immediately gaining access, they will be required to provide another piece of information.

This Project uses TOTP(time based OTP) algorithm , which takes secert from the user and decode to the token.
The token changes in every period of time given by the user

### Built With

The list of major frameworks that is used to built SpeedCode.
* [React-Native](https://getbootstrap.com)
* [Expo](https://getbootstrap.com)
* [NodeJS](https://getbootstrap.com)
* [AXIOS](https://getbootstrap.com)


<!-- GETTING STARTED -->
## Getting Started

How to Setup the project in your local Device

### Prerequisites

Node package Should be installed in The Device
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation - AUTHFACTOR SERVER


1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Run Project
   ```sh
   npm start
   ```

<!-- Website Preview -->
## AUTHFACTOR PREVIEW
See how the App Works

###  Login

  ```js
  {
    email: "Enter Your Email",
    otp: "Enter Your Otp",
  }
  ```
  ![Alt Text](https://media.giphy.com/media/NfKUo7NJpDC6fSE7Zg/giphy.gif?cid=790b76113afdffcfeff9b45adce29f5f46434ba1d588f7e6&rid=giphy.gif&ct=g)

### ADD A AUTHETICATOR
SCAN QR CODE and extract data from QR
```js
  name: String,
  period: Number,
  seceret: String,
  issuer: String.
```
   ![Alt Text](https://media.giphy.com/media/kgiCeZ7vLdTmx6rLI1/giphy.gif?cid=790b76113afdffcfeff9b45adce29f5f46434ba1d588f7e6&rid=giphy.gif&ct=g)
     
### DISPLAY AUTHETICATIOR TOKEN
ON THE PARTICULAR TOKEN USE TOTP ALGORITHM TO GET TOKENOTP WHICH WILL CHANGE AFTER EVERY 30 SEC
```js
  seceret: String
```

![Alt Text](https://media.giphy.com/media/2k8SyE1T9hgc1P15uG/giphy.gif?cid=790b76117b24005a16354b6a92af4e1a88d26a0b58108963&rid=giphy.gif&ct=g)
    
### DELETE AUTHETICATIOR
DELETE AUTHETICATOR APP FROM YOUR ACCOUNT
```js
  accountId: _id
```

![Alt Text](https://media.giphy.com/media/bvj7AzJGa0dcbbVKwH/giphy.gif?cid=790b76111a5a1183a9353b62d2ed4937a9fce45bd54052d4&rid=giphy.gif&ct=g)





