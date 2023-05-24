var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://rahul:rahul4800@ds261440.mlab.com:61440/algofocus', ['algofocus']);
 
// Get All todos
router.get('/user', function(req, res, next){
    db.todos.find(function(err, todos){
        if(err){
            res.send(err);
        }
        res.json(todos);
    });
});
 
// Get Single Task
router.get('/user/:id', function(req, res, next){
    db.todos.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, todo){
        if(err){
            res.send(err);
        }
        res.json(todo);
    });
});
 
//Save todo
router.post('/new', function(req, res, next){
    var todo = req.body;
    if(!todo.title || !(todo.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.todos.save(todo, function(err, todo){
            if(err){
                res.send(err);
            }
            res.json(todo);
        });
    }
});
 
// Delete todo
router.delete('/todo/:id', function(req, res, next){
    db.todos.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, todo){
        if(err){
            res.send(err);
        }
        res.json(todo);
    });
});
 
// Update todo
router.put('/todo/:id', function(req, res, next){
    var todo = req.body;
    var updtodo = {};
 
    if(todo.isDone){
        updtodo.isDone = todo.isDone;
    }
 
    if(todo.title){
        updtodo.title = todo.title;
    }
 
    if(!updtodo){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.todos.update({_id: mongojs.ObjectId(req.params.id)},updtodo, {}, function(err, todo){
            if(err){
                res.send(err);
            }
            res.json(todo);
        });
    }
});
 
module.exports = router;