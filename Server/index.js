const express= require('express');
//const bodyParser= require ('body-parser'); 
const usersRoutes= require ('./routes/user.js');
const videoRoutes= require ('./routes/video.js');
const artcileRoutes = require('./routes/article.js');
const tagsRoutes = require('./routes/tags.js');
const podcastRoutes = require('./routes/podcast.js');
const mediaRoutes = require('./routes/Media.js');
const themeRoutes = require('./routes/theme.js');
const connectDB =require ('./config/dbConnect.js');
const dotenv = require("dotenv");
const cors = require('cors');
const fileupload = require('express-fileupload'); 

//const swaggerUi = require('swagger-ui-express');
//const {swaggerDocument} = require('./swagger.json')

dotenv.config();

//require('dotenv').config({ path: 'ENV_FILENAME' });


const app = express();

app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));
app.use(fileupload({tempFileDir: '/tmp/'}))

//app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



connectDB();
app.use('/users', usersRoutes);
app.use('/videos', videoRoutes);
app.use('/articles', artcileRoutes);
app.use('/tags',tagsRoutes);
app.use('/podcast', podcastRoutes);
app.use('/media', mediaRoutes);
app.use('/theme', themeRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server running on port : http://localhost:${PORT}`) );
