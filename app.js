const express = require('express');
const path = require('path');
const port = 8000;
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const alert = require('alert');

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1/fortuneTelecomm');
    console.log('Successfully connected to mongoDB');
}

//Defining mongoose schema
const visitSchema = new mongoose.Schema({
    name: String,
    contactNo: String,
    siteAddress: String,
});
const visit = mongoose.model('visit', visitSchema);
const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    contactNo: String,
    desc: String,
    bestDeals: String,
});
const contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF(configuration)
app.use(express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});
app.post('/', (req, res) => {
    const visitData = new visit(req.body);
    visitData
        .save()
        .then(() => {
            // res.send("Your form has been submitted sucessfully!");
            res.status(200).render('home.pug');
            alert('Form submited successfully!');
        })
        .catch(() => {
            res.status(400).send('Error occured while submitting the form.');
        });
});
app.get('/Business', (req, res) => {
    res.status(200).render('business.pug');
});
app.get('/Clients', (req, res) => {
    res.status(200).render('clients.pug');
});
app.get('/Contact', (req, res) => {
    res.status(200).render('contact.pug');
});
app.post('/Contact', (req, res) => {
    const contactData = new contact(req.body);
    contactData
        .save()
        .then(() => {
            res.status(200).render('contact.pug');
            alert('Form submited successfully!');
        })
        .catch(() => {
            res.status(400).send('Error occured while submitting the form.');
        });
});

//START SERVER
app.listen(port, () => {
    console.log(`The application is running at ${port}`);
});
