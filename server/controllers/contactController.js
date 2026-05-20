import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save to database
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact: ${subject}`,
      html: `<p><strong>From:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message}</p>`,
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );
    res.json({ message: 'Marked as read', contact });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update contact', error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contact', error: error.message });
  }
};
