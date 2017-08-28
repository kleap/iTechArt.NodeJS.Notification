import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import users from './routes/users';
import path from 'path';

const app = express();
const port = process.env.PORT || 8080;
//Log with Morgan
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname + '/../dist')));
app.use('/api/users', users);


app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname + './../dist/index.html'));
})
app.listen(port);

console.log(`listening on port ${port}`);
