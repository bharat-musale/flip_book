const { transporter } = require("./Email.confiq.js");
const { Verification_Email_Template, Welcome_Email_Template } = require("./EmailTemplate.js");

const sendVerificationEamil = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: 'Akshay <akshaymusale5641@gmail.com>',
            to: email,
            subject: "Verify your Email",
            text: `Your verification code is: ${verificationCode}`,
            html: Verification_Email_Template.replace("{verificationCode}", verificationCode)
        });
        console.log('Email sent Successfully:', response);
    } catch (error) {
        console.log('Email error:', error);
    }
};

const senWelcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: 'Akshay <akshaymusale5641@gmail.com>',
            to: email,
            subject: "Welcome Email",
            text: `Welcome to our platform, ${name}!`,
            html: Welcome_Email_Template.replace("{name}", name)
        });
        console.log('Welcome email sent Successfully:', response);
    } catch (error) {
        console.log('Welcome email error:', error);
    }
};

const sendContactEmail = async (data) => {
  const { name, email, mobile, purpose, description } = data;

  try {
    const response = await transporter.sendMail({
      from: `Contact Form <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL, // your receiving email address
      subject: `New Contact Message: ${purpose}`,
      text: `
Name: ${name}
Email: ${email}
Mobile: ${mobile}
Purpose: ${purpose}
Message:
${description}
      `,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Purpose:</strong> ${purpose}</p>
        <p><strong>Message:</strong><br>${description}</p>
      `,
    });

    console.log("Contact email sent successfully:", response);
  } catch (error) {
    console.error("Contact email error:", error);
    throw error;
  }
};

module.exports = {
  sendVerificationEamil,
  senWelcomeEmail,
  sendContactEmail
};