const express = require('express')
const app = express();
const socket = require('socket.io');
const model = require('./model/database')
const router = require('./routes/home');
const removeRoute = require('./routes/ApiSend');
const { Module } = require('module');
const http = require('http');
const server = http.createServer(app)
const io = socket(server);




app.use(express.static('FRONTEND'));
app.set('view engine', 'ejs');
app.use('/home', router);
app.use('/req', removeRoute);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//refused to work in the routes folder idky

app.delete('/delete/:id', async (req, res) => {
   const { id } = req.params;
   console.log(typeof id)
   console.log(id);

   try {
      const removeData = await model.deleteOne({ blogTitle: id });
      //console.log(removeData);
      if (removeData.deletedCount == 1) {
         res.json({
            message: 1
         });
      }
      else {
         res.json({
            message: 0
         })
      }
   } catch (error) {
      console.log(error.message);
   }




});


app.put('/edit/:blogTitle', async (req, res) => {
   const body = req.body.blogText;
   console.log(body);
   try {
      
      console.log(typeof body);
      const { blogTitle } = req.params;
      
      const Updated = await model.updateOne({blogTitle: blogTitle}, {$set:{blogText: body }});
     // console.log(Updated)
      if (Updated.acknowledged && Updated.matchedCount === 1) {
         res.json({
            "message": 1
         })
        // window.location.reload();
      }
      else{
      res.json({
         "message": 0
      })
   }

   } catch (error) {
      res.status(404).send("internal server error")
      console.log(error.message);
   }

})


io.on('connection', async socket => {

   console.log('a user has entered the blog..')

   socket.on('blogData', (data) => {
      // console.log(data);


      model.create(data)
         .then(() => {
            console.log('data inserted into database')
         })
         .catch(() => {
            console.log('error while inserting data.');
         });

   })

   const fetchBlog = await model.findOne({});
   // console.log(fetchBlog);
   //console.log(fetchBlog.blogText)


})





server.listen(5000, () => console.log('server running on port 5000..'))








