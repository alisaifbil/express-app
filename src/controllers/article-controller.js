const Articles = require("../model/articles");
const nodemailer = require("nodemailer");
const EMAIL_USER = process.env.MAIL_USER;
const EMAIL_PASSWORD = process.env.MAIL_PASSWORD;

//Get all Method
const getAll = async (req, res) => {
  try {
    const data = await Articles.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get by Category AND Title Method
const catTitle = async (req, res) => {
  try {
    const data = await Articles.findOne({
      category: req.params.category,
      metaTitle: req.params.metaTitle,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Search By Filter / Title Method
const findByTitle = async (req, res) => {
  try {
    const data = await Articles.findOne({
      metaTitle: new RegExp(req.query.metaTitle, "i"),
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Sort by Property Method
const sortByProperty = async (req, res) => {
  let sortParam = req.body.sortParam;
  let order = req.body.order;
  try {
    const data = await Articles.find({}).sort({ [sortParam]: order });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Send Email Method
const sendEmail = async (req, res) => {
  let name = req.body.body.name;
  let email = req.body.body.sendTo;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: EMAIL_USER,
    to: email,
    subject: "Form Submitted",
    html: `
          <p>Hi ${name},</p>
          <p>Thank you for showing your interest. It would be great working with you!</p>
          <p>Regards</p>
        `,
  });

  res.status(200).send("Email Sent");
};

module.exports = {
  getAll,
  catTitle,
  findByTitle,
  sortByProperty,
  sendEmail,
};
