import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import bodyParser from 'body-parser';
import path from 'path';
import Pusher from 'pusher';
import mongoPosts from './mongoPosts.js';

Grid.mongo = mongoose.mongo;

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: '1142618',
  key: 'c397d07b35dad43ab500',
  secret: '3dafa82f6a1848c83f5c',
  cluster: 'eu',
  useTLS: true,
});

//middleware
app.use(bodyParser.json());
app.use(cors());

//db config
const mongoURI =
  'mongodb+srv://admin:OInH4S00s35Wf3KK@cluster0.fcesd.mongodb.net/blogdb?retryWrites=true&w=majority';

//when server starts we will be crrating a connection
const conn = mongoose.createConnection(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('DB connencted');

  const changeStream = mongoose.connection.collection('posts').watch();

  changeStream.on('change', (change) => {
    console.log(change);

    if (change.operationType === 'insert') {
      console.log('Triggering Pusher');
      pusher.trigger('posts', 'inserted', {
        change: change,
      });
    } else {
      console.log('Error triggering Pusher');
    }
  });
});

//grid file system
//for files larger than 16mb
let gfs;

conn.once('open', () => {
  console.log('DB Connected');
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('images');
});

//creating schmea for storing images
const storage = GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `image-${Date.now()}${path.extname(file.originalname)}`;

      const fileInfo = {
        filename: filename,
        bucketName: 'images',
      };
      resolve(fileInfo);
    });
  },
});

//upload images through multer

const upload = multer({ storage });

//in this way we connect
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//api routes
app.get('/', (req, res) => res.status(200).send('hello world'));

//upload image
app.post('/upload/image', upload.single('file'), (req, res) => {
  res.status(201).send(req.file);
});

//upload post //1.33
app.post('/upload/post', (req, res) => {
  const dbPost = req.body;
  // console.log(dbPost)

  mongoPosts.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//post retrive //1.35
app.get('/retrieve/post', (req, res) => {
  mongoPosts.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });
      res.status(200).send(data);
    }
  });
});

//images retrive

//using get
//http://localhost:9000/retrieve/images/single?name=image-1611253041966.jpg

//use params
//with name and image name

app.get('/retrieve/image/single', (req, res) => {
  gfs.files.findOne({ filename: req.query.name }, (err, file) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!file || file.length === 0) {
        res.status(404).json({ err: 'file not found' });
      } else {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
    }
  });
});

//listen
app.listen(port, () => console.log(`listening on port ${port}`));
