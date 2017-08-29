import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import users from './routes/users';
import auth from './routes/auth';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import { uri } from './constants';
import cookieParser from 'cookie-parser';

const MongoStore = mongoStore(session);
const app = express();
const port = process.env.PORT || 8080;
mongoose.connect(uri, {
	useMongoClient: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname + '/../dist')));

app.use(session({
	secret: '1bd59f6c-ab43-49e0-9e72-0b9aa7ffd4aa',
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		ttl: 20 * 60
	})
}))
app.use(morgan('dev'));
app.use(cors());


app.use('/api/users', users);
app.use('/api/auth', auth);



app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname + './../dist/index.html'));
});

app.listen(port);

console.log(`listening on port ${port}`);
