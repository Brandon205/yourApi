const express = require('express');
const db = require('./models');

const app = express()
app.use(express.urlencoded({extended: false}));

function sendError() {
    console.log('EEEEERRRRRROOOOORRRRR');
}

app.get('/', function(req, res) {
    res.send("You've reached the home page!");
});

app.get('/dogs', function(req, res) {
    db.dog.findAll()
    .then(function(dogs) {
        res.json(dogs);
    })
});

app.get('/dogs/:id', function(req, res) {
    db.dog.findByPk(parseInt(req.params.id))
    .then(function(foundDog) {
        if (!foundDog) {
            res.json([{'message': 'no dog found'}]);
        } else {
            res.json(foundDog);
        }
    })
    .catch(sendError);
});

app.post('/dogs', function(req, res) {
    db.dog.findOrCreate({
        where: {
            firstName: req.body.firstName,
        },
        defaults: {
            breed: req.body.breed,
            mainColor: req.body.mainColor,
            age: req.body.age,
        }
    }).spread(function(dog, created) {
        console.log(`${dog.firstName} the ${dog.breed} was ${created ? 'created' : 'found'}`);
        res.redirect('/dogs');
    })
})

app.put('/dogs/:id', function(req, res) {
    db.dog.update(req.body, {
        where: {
            id: parseInt(req.params.id)
        }
    }).then(function(updatedDog) {
        res.redirect(`/dogs/${req.params.id}`);
    })
})

app.delete('/dogs/:id', function(req, res) {
    db.dog.destroy({
        where: {
            id: parseInt(req.params.id),
        }
    }).then(function(deletedDog) {
        res.redirect('/dogs');
    })
})

app.listen(3000, () => console.log('Listening in on port 3000!'));