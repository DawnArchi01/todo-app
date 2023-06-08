const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const URI = 'mongodb+srv://todo-app:math45ematics@cluster0.18drpne.mongodb.net/mydatabase?retryWrites=true&w=majority';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = new Todo({ item: 'have a glass of beer' });
// itemOne.save()
//   .then(() => {
//     console.log('Item saved successfully');
//   })
//   .catch(err => {
//     console.error('Error saving item:', err);
//   });

// var data = [{ item: 'jog a while' }, { item: 'Play football' }, { item: 'Do some coding' }];

module.exports = function (app) {
    app.get('/todo', async function (req, res) {
        try {
          const data = await Todo.find({}).exec();
          res.render('todo', { todos: data });
        } catch (err) {
          console.error('Error retrieving todo items:', err);
          // Handle the error and send an appropriate response
        }
      });
      
    // res.render('todo', { todos: data });
//   });

app.post('/todo', urlencodedParser, async function (req, res) {
    try {
      const newTodo = await new Todo(req.body).save();
      res.json(newTodo);
    } catch (err) {
      console.error('Error saving todo item:', err);
      // Handle the error and send an appropriate response
    }
  });
  
  app.delete('/todo/:item', async function (req, res) {
    try {
      const deletedTodo = await Todo.findOneAndDelete({ item: req.params.item.replace(/\-/g, ' ') });
      res.json(deletedTodo);
    } catch (err) {
      console.error('Error deleting todo item:', err);
      // Handle the error and send an appropriate response
    }
  });
  
};
