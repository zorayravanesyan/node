const Html = {
  sendVerificationMail(user) {
    return `
        <html>
    <head>
        <style>

            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                width: 50%;
            }
            .container {
                background-color:rgb(218, 215, 255);
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                text-align: center;
                border:5px rgb(0, 0, 0) outset;
                width: 300px;
                margin: auto;
            }
            h1 {
                color: #333333;
                margin-bottom: 20px;
            }
            p {
                font-size: 16px;
                margin-bottom: 30px;
            }
            strong {
                color: rgb(107, 96, 253);
                font-size: 35px;
                font-style:oblique;
            }
        </style>
    </head>
        <body>
            <div class="container">
                <h1>Hi dear ${user.username}</h1>
                <p>Your verification code: <br><strong>${user.verify_code}</strong></p>
            </div>
        
        </body>
    </html>

        `;
  },
  registrationForAdmin(user){
    return `
    <html>
    <head>
        <style>

            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                width: 50%;
            }
            .container {
                background-color:rgb(218, 215, 255);
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                text-align: center;
                border:7px rgba(0, 0, 0) outset;
                width: 300px;
                margin: auto;
            }
            h1 {
                color: #333333;
                margin-bottom: 20px;
                font-size: 35px;
            }
            p {
                font-size: 16px;
                margin-bottom: 30px;
            }
            strong {
                color: rgb(107, 96, 253);
                font-size: 45px;
                font-style:oblique;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <p><h1>${user.username}</h1>  is registrated</p>
        </div>
     
    </body>
  </html>
    `
  }
};

module.exports = Html;
