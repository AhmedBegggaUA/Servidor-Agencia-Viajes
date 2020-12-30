const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/adv',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

.then(db => console.log('Db2 is connect'))
.catch(err => console.error(err));