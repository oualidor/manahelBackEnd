//import basic libraries
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;


////import config files
const globalConfig = require("./config/globalConstants");

const app = express();
app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


const adminRouters       = require("./routers/adminRouters");
const GuestRouters       = require("./routers/GuestRouters");
const TeacherRouter = require("./routers/TeacherRouter");
const SetRelations = require("./apis/Relations");




SetRelations()



app.use('/guest/', GuestRouters);
app.use('/admin/', adminRouters);
app.use('/teacher/', TeacherRouter);
app.use(express.static('public'));
app.use('/storeImages', express.static(__dirname + '/public/uploads'));
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional





app.listen(process.env.PORT || 5000, () => {
    console.log(`Back End Running ${PORT}.`)
});
