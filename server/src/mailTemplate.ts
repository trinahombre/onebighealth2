
export const getTemplate = (
    firstname?: string,
    lastname?: string,
    doctorname?: string,
    aptservice?: string,
    aptdate?: string,
    apttime?: string,
) => {
    return `<html>

    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <title></title>
      <style type="text/css" rel="stylesheet" media="all">
        /* Base ------------------------------ */
    
        @import url('https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap');
    
        body {
          width: 100% !important;
          height: 100%;
          margin: 0;
          -webkit-text-size-adjust: none;
        }
    
        a {
          color: #3869D4;
        }
    
        a img {
          border: none;
        }
    
        td {
          word-break: break-word;
        }
    
        .preheader {
          display: none !important;
          visibility: hidden;
          mso-hide: all;
          font-size: 1px;
          line-height: 1px;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
        }
    
        /* Type ------------------------------ */
    
        body,
        td,
        th {
          font-family: "Sen", Helvetica, Verdana, sans-serif;
        }
    
        td,
        th {
          font-size: 16px;
        }
    
        p,
        ul,
        ol,
        blockquote {
          margin: .4em 0 1.1875em;
          font-size: 16px;
          line-height: 1.625;
        }
    
        p.sub {
          font-size: 13px;
        }
    
        /* Utilities ------------------------------ */
    
        .align-right {
          text-align: right;
        }
    
        .align-left {
          text-align: left;
        }
    
        .align-center {
          text-align: center;
        }
    
        .u-margin-bottom-none {
          margin-bottom: 0;
        }
    
        /* Buttons ------------------------------ */
    
        .button {
          background-color: #3869D4;
          border-top: 10px solid #3869D4;
          border-right: 18px solid #3869D4;
          border-bottom: 10px solid #3869D4;
          border-left: 18px solid #3869D4;
          display: inline-block;
          color: #FFF;
          text-decoration: none;
          border-radius: 3px;
          box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
          -webkit-text-size-adjust: none;
          box-sizing: border-box;
        }
    
        .button--green {
          background-color: #226fbc;
          border-top: 10px solid #226fbc;
          border-right: 18px solid #226fbc;
          border-bottom: 10px solid #226fbc;
          border-left: 18px solid #226fbc;
        }
    
        @media only screen and (max-width: 500px) {
          .button {
            width: 100% !important;
            text-align: center !important;
          }
        }
    
        /* Data table ------------------------------ */
    
        body {
          background-color: #f2f4f6;
          color: #51575e;
        }
    
        p {
          color: #71767e;
          font-size: 15px;
        }
    
        .email-wrapper {
          width: 100%;
          margin: 0;
          padding: 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          background-color: #f2f3f6;
        }
    
        .email-content {
          width: 100%;
          margin: 0;
          padding: 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
        }
    
        /* Masthead ----------------------- */
    
        .email-masthead {
          padding: 22px 0;
          text-align: center;
        }
    
        .email-masthead-spacer {
          padding: 22px 0;
          text-align: center;
        }
    
        .email-masthead_logo {
          width: 94px;
        }
    
        .email-masthead_name {
          font-size: 17px;
          font-weight: bold;
          color: #a8acaf;
          text-decoration: none;
          text-shadow: 0 1px 0 white;
        }
    
        /* Body ------------------------------ */
    
        .email-body {
          width: 100%;
          margin: 0;
          padding: 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
        }
    
        .email-body_inner {
          width: 570px;
          margin: 0 auto;
          padding: 0;
          -premailer-width: 570px;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          background-color: #FFFFFF;
        }
    
        .email-footer {
          width: 570px;
          margin: 0 auto;
          padding: 0;
          -premailer-width: 570px;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          text-align: center;
        }
    
        .email-footer p {
          color: #a8aaaf;
        }
    
        .body-action {
          width: 100%;
          margin: 30px auto;
          padding: 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          text-align: center;
        }
    
        .body-sub {
          border-top: 1px solid #EAECEA;
        }
    
        .content-cell {
          padding: 32px;
        }
    
        /*Media Queries ------------------------------ */
    
        @media only screen and (max-width: 600px) {
    
          .email-body_inner,
          .email-footer {
            width: 100% !important;
          }
    
          .email-masthead-spacer {
            padding: 7px 0;
            text-align: center;
          }
    
          .content-cell {
            padding-top: 22px;
            padding-left: 11%;
            padding-right: 11%;
          }
    
          p {
            font-size: 16px;
            font-weight: 500;
          }
        }
    
        @media (prefers-color-scheme: dark) {
    
          body,
          .email-body,
          .email-body_inner,
          .email-content,
          .email-wrapper,
          .email-masthead,
          .email-footer {
            background-color: #333333 !important;
            color: #FFF !important;
          }
    
          p,
          ul,
          ol,
          blockquote,
          h1,
          h2,
          h3,
          span,
          .purchase_item {
            color: #FFF !important;
          }
    
          .email-masthead_name {
            text-shadow: none !important;
          }
        }
    
        :root {
          color-scheme: light dark;
          supported-color-schemes: light dark;
        }
      </style>
      <!--[if mso]>
        <style type="text/css">
          .f-fallback  {
            font-family: Arial, sans-serif;
          }
        </style>
      <![endif]-->
    </head>
    
    <body>
      <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td class="email-masthead email-masthead-spacer"><a class="f-fallback email-masthead_name">
                    ​
                  </a>
    
                </td>
              </tr>
              <!-- Email Body -->
              <tr>
                <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                  <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0"
                    role="presentation">
                    <!-- Body content -->
                    <tr>
                      <td class="content-cell">
                        <div class="f-fallback">
                          <p style="color: #51565e;font-weight:600">Hi ${firstname} ${lastname},</p>
                          <p>Your booking with Dr. ${doctorname} is confirmed. </p>
                          
                          <ul style="list-style:none">
                            <li><p style="margin:0"><strong>Service: </strong>${aptservice}</p></li>
                            <li><p style="margin:0"><strong>Date: </strong>${aptdate}</p></li>
                            <li><p style="margin:0"><strong>Time: </strong>${apttime}</p></li>
                            <li><p style="margin:0"><strong>Location: </strong>One Neo, 26th Street, Cor 3rd Ave, Taguig, 1634 Metro Manila</p></li>
                          </ul>
                          <p>We look forward to seeing you soon. Thank you for choosing One Big Healthcare.</p>
                          <p>With Big Heart,
                            <br>One Big Healthcare
                          </p>
    
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="email-masthead">
                  <a class="f-fallback email-masthead_name">
                    One Big Healthcare Solutions
                  </a>
                </td>
    
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    
    </html>`
}