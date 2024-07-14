const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { name, email, description } = req.body;

    if (!name || !email || !description) {
        return res.status(400).json({ message: 'Name, email, and description are required' });
    }

    // Create a transporter object
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'contact.cpsvacations@gmail.com',
            pass: 'contact123@cpsvacations'
        }
    });

    // Set up email data
    const mailOptions = {
        from: email,
        to: 'cpsvacations.official@gmail.com', 
        subject: 'New Enquiry from ' + name,
        text: `You have a new enquiry from ${name} (${email}):\n\n${description}`
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
