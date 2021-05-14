if (!process.env.NETLIFY) {
    // get local env vars if not in CI
    // if in CI i expect its already set via the Netlify UI
    require('dotenv').config();
  }

  // required env vars
if (!process.env.accessKeyId)
throw new Error('no accessKeyId env var set');
if (!process.env.secretAccessKey)
throw new Error('no secretAccessKey env var set');
if (!process.env.region)
throw new Error('no region env var set');

//exports.handler = async event => {
  exports.handler = async (event, context) => {
    const AWS = require("aws-sdk")


    // Get Parameters
    let requestParams = JSON.parse(event.body)
    var emailTemplates = makeTemplates(requestParams)
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify(requestParams)

    //let name = requestParams.name
    let name = "info@getfods.com"
    let roi = requestParams.roi
    let email = requestParams.email_address

    let savings3yr = requestParams.savings3yr
    let savings5yr = requestParams.savings5yr
    let savings10yr = requestParams.savings10yr

    let savings_1_3yr = requestParams.savings_1_3yr
    let savings_1_5yr = requestParams.savings_1_5yr
    let savings_1_10yr = requestParams.savings_1_10yr
    let savings_3_3yr = requestParams.savings_3_3yr
    let savings_3_5yr = requestParams.savings_3_5yr
    let savings_3_10yr = requestParams.savings_3_10yr
    let savings_5_3yr = requestParams.savings_5_3yr
    let savings_5_5yr = requestParams.savings_5_5yr
    let savings_5_10yr = requestParams.savings_5_10yr
    let savings_10_3yr = requestParams.savings_10_3yr
    let savings_10_5yr = requestParams.savings_10_5yr
    let savings_10_10yr = requestParams.savings_10_10yr

    let data = {
      "roi": roi,
      'savings3yr': savings3yr,
      'savings5yr': savings5yr,
      'savings10yr': savings10yr,
      'savings_1_3yr': savings_1_3yr,
      'savings_1_5yr': savings_1_5yr,
      'savings_1_10yr': savings_1_10yr,
      'savings_3_3yr': savings_3_3yr,
      'savings_3_5yr': savings_3_5yr,
      'savings_3_10yr': savings_3_10yr,
      'savings_5_3yr': savings_5_3yr,
      'savings_5_5yr': savings_5_5yr,
      'savings_5_10yr': savings_5_10yr,
      'savings_10_3yr': savings_10_3yr,
      'savings_10_5yr': savings_10_5yr,
      'savings_10_10yr': savings_10_10yr
    }
    

      AWS.config.update({
          accessKeyId: process.env.accessKeyId,
          secretAccessKey: process.env.secretAccessKey,
          region: process.env.region
          
      })

      // Get Email Templates
      var emailTemplates = makeTemplates(data)

      const ses = new AWS.SES({ apiVersion: "2010-12-01" })
      const params = {
        Destination: {
          //ToAddresses: [email] // Email address/addresses that you want to send your email
          ToAddresses: [email]
        },
      //   ConfigurationSetName: <<ConfigurationSetName>>,
        Message: {
          Body: {
            Html: {
              // HTML Format of the email
              Charset: "UTF-8",
              Data: emailTemplates[0]              
            },
            Text: {
              Charset: "UTF-8",
              Data: ""
            }
          },
          Subject: {
            Charset: "UTF-8",
            Data: "From Contact Form"
          }
        },
        Source: "info@getfods.com"
      }
  
      return ses.sendEmail(params).promise().then(data => {
          console.log("email submitted to SES", data);
          return {
            statusCode: 200,
            body: `Message sent`,
          }
        })
        .catch(error => {
          console.log(error);
          return {
            statusCode: 500,
            body: `Message unsuccesfully sent, error: ${error}`,
          }
      })

  }
  
function makeTemplates(parsedData) {
  var currentData = parsedData
  var emailTemplates = [];
  var data = {
    'roi': currentData.roi,
    'savings3yr': Intl.NumberFormat('en-US').format(currentData.savings3yr),
    'savings5yr': Intl.NumberFormat('en-US').format(currentData.savings5yr),
    'savings10yr': Intl.NumberFormat('en-US').format(currentData.savings10yr),
    'savings_1_3yr': Intl.NumberFormat('en-US').format(currentData.savings_1_3yr),
    'savings_1_5yr': Intl.NumberFormat('en-US').format(currentData.savings_1_5yr),
    'savings_1_10yr': Intl.NumberFormat('en-US').format(currentData.savings_1_10yr),
    'savings_3_3yr': Intl.NumberFormat('en-US').format(currentData.savings_3_3yr),
    'savings_3_5yr': Intl.NumberFormat('en-US').format(currentData.savings_3_5yr),
    'savings_3_10yr': Intl.NumberFormat('en-US').format(currentData.savings_3_10yr),
    'savings_5_3yr': Intl.NumberFormat('en-US').format(currentData.savings_5_3yr),
    'savings_5_5yr': Intl.NumberFormat('en-US').format(currentData.savings_5_5yr),
    'savings_5_10yr': Intl.NumberFormat('en-US').format(currentData.savings_5_10yr),
    'savings_10_3yr': Intl.NumberFormat('en-US').format(currentData.savings_10_3yr),
    'savings_10_5yr': Intl.NumberFormat('en-US').format(currentData.savings_10_5yr),
    'savings_10_10yr': Intl.NumberFormat('en-US').format(currentData.savings_10_10yr)
  }

    // emailTemplates[0]
    emailTemplates.push(`
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <title>
      </title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        #outlook a {
          padding: 0;
        }
    
        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
    
        table,
        td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
    
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
    
        p {
          display: block;
          margin: 13px 0;
        }
      </style>
      <!--[if mso]>
            <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
      <!--[if lte mso 11]>
            <style type="text/css">
              .mj-outlook-group-fix { width:100% !important; }
            </style>
            <![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
      </style>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:480px) {
          .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
          }
    
          .mj-column-per-50 {
            width: 50% !important;
            max-width: 50%;
          }
        }
      </style>
      <style type="text/css">
        @media only screen and (max-width:480px) {
          table.mj-full-width-mobile {
            width: 100% !important;
          }
    
          td.mj-full-width-mobile {
            width: auto !important;
          }
        }
      </style>
      <style type="text/css">
        @media screen and (min-width:600px) {
          .show-mobile {
            display: none !important;
          }
    
          .hide-mobile {
            display: block !important;
          }
    
          #savings-1-3yr,
          #savings-1-5yr,
          #savings-1-10yr,
          #savings-3-3yr,
          #savings-3-5yr,
          #savings-3-10yr,
          #savings-5-3yr,
          #savings-5-5yr,
          #savings-5-10yr,
          #savings-10-3yr,
          #savings-10-5yr,
          #savings-10-10yr,
          #3-Yr-Savings-label,
          #5-Yr-Savings-label,
          #10-Yr-Savings-label,
            {
            padding: 0px 0px 0px 15px !important;
          }
    
          #savings-1-3yr.hide-mobile span,
          #savings-1-5yr.hide-mobile span,
          #savings-1-10yr.hide-mobile span,
          #savings-3-3yr.hide-mobile span,
          #savings-3-5yr.hide-mobile span,
          #savings-3-10yr.hide-mobile span,
          #savings-5-3yr.hide-mobile span,
          #savings-5-5yr.hide-mobile span,
          #savings-5-10yr.hide-mobile span,
          #savings-10-3yr.hide-mobile span,
          #savings-10-5yr.hide-mobile span,
          #savings-10-10yr.hide-mobile span,
          #3-Yr-Savings-label.hide-mobile>span,
          #5-Yr-Savings-label.hide-mobile>span,
          #10-Yr-Savings-label.hide-mobile>span,
            {
            display: inline !important;
          }
        }
      </style>
    </head>
    
    <body>
      <div style>
        <!--[if mso | IE]>
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
        <div style="margin: 0px auto; max-width: 600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;" width="100%">
            <tbody>
              <tr>
                <td style="direction: ltr; font-size: 0px; padding: 20px 0; text-align: center;" align="center">
                  <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="" style="vertical-align:top;width:600px;"
                >
              <![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%" valign="top">
                      <tr>
                        <td style="font-size: 0px; word-break: break-word;">
                          <!--[if mso | IE]>
        
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="20" style="height:20px;">
          
        <![endif]-->
                          <div style="height: 20px;"> &nbsp; </div>
                          <!--[if mso | IE]>
        
            </td></tr></table>
          
        <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="shadow-outlook rounded-outlook gray-outlook" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
        <div class="shadow rounded gray" style="box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); background-color: #f3f4f6; margin: 0px auto; max-width: 600px; border-radius: 6px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;" width="100%">
            <tbody>
              <tr>
                <td style="direction: ltr; font-size: 0px; padding: 20px 0; text-align: center;" align="center">
                  <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
                <tr>
                  <td
                     class="rounded-outlook gray-outlook" width="600px"
                  >
              
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="rounded-outlook gray-outlook" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
                  <div class="rounded gray" style="background-color: #f3f4f6; margin: 0px auto; max-width: 600px; border-radius: 6px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;" width="100%">
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 20px 0; padding-bottom: 0px; padding-top: 0px; text-align: center;" align="center">
                            <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="" style="vertical-align:top;width:600px;"
                >
              <![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%" valign="top">
                                <tr>
                                  <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; border-spacing: 0px;">
                                      <tbody>
                                        <tr>
                                          <td style="width: 100px;" width="100">
                                            <a href="https://getfods.com/" target="_blank">
                                              <img height="auto" src="https://calculator.getfods.com/img/logo.png" style="border: 0; display: block; outline: none; text-decoration: none; height: auto; width: 100%; font-size: 13px;" width="100">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: normal; line-height: 1; text-align: center; color: #111827;">ROI Calculator</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="font-size: 0px; word-break: break-word;">
                                    <!--[if mso | IE]>
        
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="20" style="height:20px;">
          
        <![endif]-->
                                    <div style="height: 20px;"> &nbsp; </div>
                                    <!--[if mso | IE]>
        
            </td></tr></table>
          
        <![endif]-->
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          
                  </td>
                </tr>
              
                <tr>
                  <td
                     class="space-outlook" width="600px"
                  >
              
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="space-outlook" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
                  <div class="space" style="padding: 15px; background: white; background-color: white; margin: 0px auto; max-width: 600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: white; background-color: white; width: 100%;" width="100%" bgcolor="white">
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 20px 0; text-align: center;" align="center">
                            <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="shadow-outlook rounded-outlook" style="vertical-align:top;width:300px;"
                >
              <![endif]-->
                            <div class="mj-column-per-50 mj-outlook-group-fix shadow rounded" style="box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%; border-radius: 6px;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%" valign="top">
                                <tr>
                                  <td align="left" class="gray pt-0 pb-0" style="background-color: #f3f4f6; font-size: 0px; padding: 10px 25px; word-break: break-word; padding-top: 0px; padding-bottom: 0px;" bgcolor="#f3f4f6">
                                    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 38px; font-weight: normal; line-height: 1; text-align: left; color: #000000;">
                                      <div class="inline-block" style="display: inline-block; font-weight: bold;">
                                        <p>ROI:</p>
                                      </div>
                                      <div class="inline text-space yellow rounded shadow" style="box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); background-color: #f8d146; padding: 2px 6px; display: inline; border-radius: 6px;">
                                        <span id="roiNumber" style="display: inline-block; font-weight: bold; padding-right: 0px; marign-right: 0px;">${data.roi}</span><span style="display: inline-block; font-size: 20px; font-weight: normal; padding-left: 0px;">mo</span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1; text-align: left; color: #000000;">
                                      <mj-text> Recomended Alternative FODS Layout is the <span class="padding yellow text-space center rounded" style="background-color: #f8d146; margin: auto; padding: 2px 6px; display: inline-block; border-radius: 6px;"> 1x5T. </span>
                                      </mj-text>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1; text-align: left; color: #000000;">The FODS Reusable Construction Entrance System<br></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1; text-align: left; color: #000000;">This layout is commonly used to replace a rock entrance up to x feet.</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1; text-align: left; color: #000000;">Expected Lifespan > 10 Years.</div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!--[if mso | IE]>
                </td>
              
                <td
                   class="" style="vertical-align:top;width:300px;"
                >
              <![endif]-->
                            <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%" valign="top">
                                <tr>
                                  <td align="center" style="font-size: 0px; padding: 10px 25px; padding-bottom: 0px; word-break: break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; border-spacing: 0px;">
                                      <tbody>
                                        <tr>
                                          <td style="width: 150px;" width="150">
                                            <img height="auto" src="http://calculator.getfods.com/img/1x5T.jpg" style="border: 0; display: block; outline: none; text-decoration: none; height: auto; width: 100%; font-size: 13px;" width="150">
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size: 0px; padding: 10px 25px; padding-top: 0px; word-break: break-word;">
                                    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1; text-align: center; color: #000000;"><span id="layout" class="padding yellow text-space center rounded max-content" style="background-color: #f8d146; width: max-content; margin: auto; padding: 2px 6px; border-radius: 6px;">1x5T</span></div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          
                  </td>
                </tr>
              
                <tr>
                  <td
                     class="white-outlook space-h-outlook" width="600px"
                  >
              
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="white-outlook space-h-outlook" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
                  <div class="white space-h" style="background-color: #fff; padding: 0px 15px; margin: 0px auto; max-width: 600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;" width="100%">
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 20px 0; text-align: center;" align="center">
                            <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="rounded-outlook shadow-outlook" style="vertical-align:top;width:600px;"
                >
              <![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix rounded shadow" style="box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%; border-radius: 6px;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%" valign="top">
                                <tr>
                                  <td align="left" class="rounded-t gray" style="border-radius: 6px 6px 0px 0px; background-color: #f3f4f6; font-size: 0px; padding: 10px 25px; word-break: break-word;" bgcolor="#f3f4f6">
                                    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1; text-align: left; color: #000000;">Your Cost Savings over...</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                    <table cellpadding="0" cellspacing="0" width="100%" border="0" style="color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 22px; table-layout: auto; width: 100%; border: none;">
                                      <tr style="border-bottom: 1px solid #ecedee; text-align: left; padding: 15px 0;" align="left">
                                        <th style="padding: 0 15px 0 0;">Year</th>
                                        <th style="text-align: right; padding: 0 0 0 15px;" align="right">Savings</th>
                                      </tr>
                                      <tr style="border-bottom: 1px solid #ecedee;">
                                        <td style="padding: 0 15px 0 0;">3 Years</td>
                                        <td id="savings-3yr" style="text-align: right; padding: 0 0 0 15px;" align="right">$${(data.savings3yr)}</td>
                                      </tr>
                                      <tr style="border-bottom: 1px solid #ecedee;">
                                        <td style="padding: 0 15px 0 0;">5 Years</td>
                                        <td id="savings-5yr" style="text-align: right; padding: 0 0 0 15px;" align="right">$${(data.savings5yr)}</td>
                                      </tr>
                                      <tr>
                                        <td style="padding: 0 15px 0 0;">10 Years</td>
                                        <td id="savings-10yr" style="text-align: right; padding: 0 0 0 15px;" align="right">$${(data.savings10yr)}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          
                  </td>
                </tr>
              
                <tr>
                  <td
                     class="white-outlook pt-0-outlook pb-0-outlook" width="600px"
                  >
              
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="white-outlook pt-0-outlook pb-0-outlook" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
                  <div class="white pt-0 pb-0" style="background-color: #fff; margin: 0px auto; max-width: 600px; padding-top: 0px; padding-bottom: 0px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;" width="100%">
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 20px 0; text-align: center;" align="center">
                            <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="pt-0-outlook pb-0-outlook" style="vertical-align:top;width:600px;"
                >
              <![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix pt-0 pb-0" style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%; padding-top: 0px; padding-bottom: 0px;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%" valign="top">
                                <tr>
                                  <td align="left" class="pt-0 pb-0" style="font-size: 0px; padding: 10px 25px; word-break: break-word; padding-top: 0px; padding-bottom: 0px;">
                                    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1; text-align: left; color: #000000;">
                                      <h3> Additional Savings When Relocating Entrance </h3>
                                      <p> Your cost savings increase every time you need to move your construction entrance during the job. Use the below estimates to identify savings for your phased projects. </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          
                  </td>
                </tr>
              
                <tr>
                  <td
                     class="pt-0-outlook pb-0-outlook white-outlook space-h-outlook" width="600px"
                  >
              
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="pt-0-outlook pb-0-outlook white-outlook space-h-outlook" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
                  <div class="pt-0 pb-0 white space-h" style="background-color: #fff; padding: 0px 15px; margin: 0px auto; max-width: 600px; padding-top: 0px; padding-bottom: 0px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;" width="100%">
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 20px 0; text-align: center;" align="center">
                            <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="rounded-outlook shadow-outlook pt-0-outlook pb-0-outlook" style="vertical-align:top;width:600px;"
                >
              <![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix rounded shadow pt-0 pb-0" style="box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%; border-radius: 6px; padding-top: 0px; padding-bottom: 0px;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%" valign="top">
                                <tr>
                                  <td align="left" class="rounded-t gray" style="border-radius: 6px 6px 0px 0px; background-color: #f3f4f6; font-size: 0px; padding: 10px 25px; word-break: break-word;" bgcolor="#f3f4f6">
                                    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1; text-align: left; color: #000000;">Additional Cost Savings Over</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" class style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                    <table cellpadding="0" cellspacing="0" width="100%" border="0" style="color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 22px; table-layout: auto; width: 100%; border: none;">
                                      <tr class style="border-bottom: 1px solid #ecedee; text-align: left; padding: 15px 0;" align="left">
                                        <th class="hide-mobile" style="display: none; padding: 0 15px 0 0;">Entrance Relocated...</th>
                                        <th class="show-mobile" style="padding: 0 5px 0 0; width: 50px;" width="50">Entr. Moved</th>
                                        <th id="3-Yr-Savings-label" style="text-align: right; padding: 0 0 0 5px;" align="right">3-Yr<span class="hide-mobile" style="display: none;"> Savings</span></th>
                                        <th id="5-Yr-Savings-label" style="text-align: right; padding: 0 0 0 5px;" align="right">5-Yr<span class="hide-mobile" style="display: none;"> Savings</span></th>
                                        <th id="10-Yr-Savings-label" style="text-align: right; padding: 0 0 0 5px;" align="right">10-Yr<span class="hide-mobile" style="display: none;"> Savings</span></th>
                                      </tr>
                                      <tr style="border-bottom: 1px solid #ecedee;">
                                        <td class="hide-mobile" style="display: none; padding: 0 15px 0 0;">1x Per Year</td>
                                        <td class="show-mobile" style="padding: 0 5px 0 0;">1x/Yr</td>
                                        <td id="savings-1-3yr" style="text-align: right; padding: 0 0 0 5px;" align="right">$${data.savings_1_3yr}</td>
                                        <td id="savings-1-5yr" style="text-align: right; padding: 0 0 0 5px;" align="right">$${data.savings_1_5yr}</td>
                                        <td id="savings-1-10yr" style="text-align: right; padding: 0 0 0 5px;" align="right">$${data.savings_1_10yr}</td>
                                      </tr>
                                      <tr style="border-bottom: 1px solid #ecedee;">
                                        <td class="hide-mobile" style="display: none; padding: 0 15px 0 0;">3x Per Year</td>
                                        <td class="show-mobile" style="padding: 0 5px 0 0;">3x/Yr</td>
                                        <td id="savings-3-3yr" style="text-align: right; padding: 0 0 0 5px;" align="right">$${data.savings_3_3yr}</td>
                                        <td id="savings-3-5yr" style="text-align: right; padding: 0 0 0 5px;" align="right">$${data.savings_3_5yr}</td>
                                        <td id="savings-3-10yr" style="text-align: right; padding: 0 0 0 5px;" align="right">$${data.savings_3_10yr}</td>
                                      </tr>
                                      <tr style="border-bottom: 1px solid #ecedee;">
                                        <td class="hide-mobile" style="display: none; padding: 0 15px 0 0;">5x Per Year</td>
                                        <td class="show-mobile" style="padding: 0 5px 0 0;">5x/Yr</td>
                                        <td id="savings-5-3yr" style="text-align: right; padding: 0 0 0 5px;" align="right">$${data.savings_5_3yr}</td>
                                        <td id="savings-5-10yr" style="text-align: right; padding: 0 0 0 5px;" align="right">$${data.savings_5_5yr}</td>
                                        <td id="savings-5-10yr" style="text-align: right; padding: 0 0 0 5px;" align="right">$${data.savings_5_10yr}</td>
                                      </tr>
                                      <tr style="border-bottom: 1px solid #ecedee;">
                                        <td class="hide-mobile" style="display: none; padding: 0 15px 0 0;">10x Per Year</td>
                                        <td class="show-mobile" style="padding: 0 5px 0 0;">10/Yr</td>
                                        <td id="savings-10-3yr" style="text-align: right; padding: 0 0 0 5px;" align="right">$${data.savings_10_3yr}</td>
                                        <td id="savings-10-5yr" style="text-align: right; padding: 0 0 0 5px;" align="right">$${data.savings_10_5yr}</td>
                                        <td id="savings-10-10yr" style="text-align: right; padding: 0 0 0 5px;" align="right">$${data.savings_10_10yr}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          
                  </td>
                </tr>
              
                <tr>
                  <td
                     class="" width="600px"
                  >
              
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
                  <div style="margin: 0px auto; max-width: 600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;" width="100%">
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 20px 0; text-align: center;" align="center">
                            <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="" style="vertical-align:top;width:600px;"
                >
              <![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%" valign="top">
                                <tr>
                                  <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; border-spacing: 0px;">
                                      <tbody>
                                        <tr>
                                          <td style="width: 100px;" width="100">
                                            <a href="https://getfods.com/" target="_blank">
                                              <img height="auto" src="https://calculator.getfods.com/img/logo.png" style="border: 0; display: block; outline: none; text-decoration: none; height: auto; width: 100%; font-size: 13px;" width="100">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; line-height: 1; text-align: center; color: #111827;"><a style="color: black; text-decoration: none;" href="tel:8442003637"> (844) 200-3637 </a></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; line-height: 1; text-align: center; color: #111827;"><a style="color: black; text-decoration: none;" href="https://www.getfods.com"> www.getfods.com </a></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; line-height: 1; text-align: center; color: #111827;"><a style="color: black; text-decoration: none;" href="mailto:info@getfods.com"> info@getfods.com </a></div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          
                  </td>
                </tr>
              
                      </table>
                    <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
        <div style="margin: 0px auto; max-width: 600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;" width="100%">
            <tbody>
              <tr>
                <td style="direction: ltr; font-size: 0px; padding: 20px 0; text-align: center;" align="center">
                  <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="" style="vertical-align:top;width:600px;"
                >
              <![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%" valign="top">
                      <tr>
                        <td style="font-size: 0px; word-break: break-word;">
                          <!--[if mso | IE]>
        
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="20" style="height:20px;">
          
        <![endif]-->
                          <div style="height: 20px;"> &nbsp; </div>
                          <!--[if mso | IE]>
        
            </td></tr></table>
          
        <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          <![endif]-->
      </div>
    </body>
    
    </html>
      `
      );

    // emailTemplates[1]
    emailTemplates.push(`
    <html>
      <body>
        From: ""\${name}""
        <br />
        Message: \${message}
      </body>
    </html>
    `
    );


  return emailTemplates
}