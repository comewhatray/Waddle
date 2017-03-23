Accounts.emailTemplates.siteName = "Axem";
Accounts.emailTemplates.from     = "Axem <livecueball@gmail.com>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[Axem] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "livecueball@gmail.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};