var express = require('express');
var randomString = require('random-string');
var app = express();
var port = process.env.PORT || 3030;
var request = require('request');
var cheerio = require('cheerio');
var http = require('http').Server(app);
var mailer = require("nodemailer");
var bodyParser = require('body-parser');
app.use(bodyParser.json({ parameterLimit: 10000000,
    limit: '90mb'}));

var multer  = require('multer');
var datetimestamp='';
var filename='';
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        //  cb(null, '../uploads/');
        // cb(null, '../src/assets/images/uploads/'); //for local
        //  cb(null, '/home/nexhealthtoday/public_html/assets/images/uploads/'); //for server
        cb(null, '../assets/images/uploads/'); //for server
    },
    filename: function (req, file, cb) {
        //console.log(cb);

        console.log(file.originalname);
        filename=file.originalname.split('.')[0].replace(/ /g,'') + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        console.log(filename);
        cb(null, filename);
    }
});
var EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter()
//emitter.setMaxListeners(100)
// or 0 to turn off the limit
emitter.setMaxListeners(0)
var upload = multer({ //multer settings
    storage: storage
}).single('file');

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/** API path that will upload the files */
app.get('/uploads', function(req, res) {
    datetimestamp = Date.now();
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }

        else{
            //  res.json(filename[filename.length-1]);
            //  setTimeout(function () {
            //console.log('-----');

            // console.log(filename[filename.length-1]);
            // console.log(filename.length);
            console.log(filename);
            //  filename=[];

            res.send(JSON.stringify(filename));
            return;
            //  },1500);
        }


    });
});

var mongodb = require('mongodb');
var db;
var url = 'mongodb://localhost:27017/employeeonboarding';

var MongoClient = mongodb.MongoClient;

MongoClient.connect(url, function (err, database) {
    if (err) {
        console.log(err);

    }else{
        db=database;
        console.log('connected');
    }});

/*-----------------------------------EXAMPLES_START------------------------------------------*/
app.get('/addexpertarea', function (req, resp) {
    value1 = {title: 'koushik',description: '54353116', priority: 611,status: 0};
    var collection = db.collection('addexpertarea');
    collection.insert([value1], function (err, result) {
        if (err) {
            resp.send(err);
        } else {
            resp.send('Inserted documents into the "addexpertarea" collection.');
        }
    });
});
app.get('/testlist', function (req, resp) {
    var collection = db.collection('addexpertarea');
    collection.find().toArray(function(err, items) {
        resp.send(JSON.stringify(items));
    });
});
/*-----------------------------------EXAMPLES_END---------------------------------*/
app.get('/oldlogin',function(req,resp){
    var collection = db.collection('users');
    collection.find({email:password}).toArray(function(err, items) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});


app.get('/login', function (req, resp) {
    var crypto = require('crypto');
    var secret = req.query.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    //resp.send(JSON.stringify({'status':'error','msg':req.query.email}));
    //return;
    var collection = db.collection('users');
    collection.find({ email:req.query.email}).toArray(function(err, items){
        if(items.length==0){
            resp.send(JSON.stringify({'status':'error','msg':'Email ID invalid.'}));
            return;
        }
        if(items.length>0 && items[0].password!=hash){
            resp.send(JSON.stringify({'status':'error','msg':'Password Doesnot match'}));
            return;
        }
        if(items.length>0 && items[0].status==0){
            resp.send(JSON.stringify({'status':'error','msg':'This is Inactive User'}));
            return;
        }
        if(items.length>0 && items[0].password==hash){
            resp.send(JSON.stringify({'status':'success','msg':items[0]}));
            return;
        }
    });
});


app.get('/adduser',function(req,resp){
    var collection = db.collection('users');
    var crypto = require('crypto');
    var secret = req.query.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    collection.insert([{
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        email: req.query.email,
        password: hash,
        address: req.query.address,
        telephoneno: req.query.telephoneno,
        mobileno: req.query.mobileno,
        type: req.query.type,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});

app.get('/addemployee',function(req,resp){
    var collection = db.collection('users');
    collection.insert([{
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        gender: req.query.gender,
        address: req.query.address,
        city: req.query.city,
        state: req.query.state,
        zip: req.query.zip,
        email: req.query.email,
        phoneno: req.query.phoneno,
        date: req.query.date,
        type: req.query.type,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});

app.get('/details',function(req,resp){
    var resitem = {};
    var collection = db.collection('users');
    var o_id = new mongodb.ObjectID(req.query._id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.get('/editadmin',function(req,resp){
    var collection = db.collection('users');
    var data = {
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        email: req.query.email,
        //   password: hash,
        address: req.query.address,
        telephoneno: req.query.telephoneno,
        mobileno: req.query.mobileno,
    }
    var o_id = new mongodb.ObjectID(req.query.id);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});
app.get('/adminlist',function (req,resp) {
    var collection = db.collection('users');
    collection.find({type:'admin'}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});

app.get('/employeelist',function (req,resp) {
    var collection = db.collection('users');
    collection.find({type:'employee'}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});

app.get('/det',function(req,resp){
    var resitem = {};
    var collection = db.collection('users');
    var o_id = new mongodb.ObjectID(req.query._id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.get('/editemployee',function(req,resp){
    var collection = db.collection('users');
    var data = {
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        gender: req.query.gender,
        address: req.query.address,
        city: req.query.city,
        state: req.query.state,
        zip: req.query.zip,
        email: req.query.email,
        phoneno: req.query.phoneno,
        date: req.query.date,
    }
    var o_id = new mongodb.ObjectID(req.query.id);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});



app.get('/deleteadmin', function (req, resp) {
    var o_id = new mongodb.ObjectID(req.query.id);
    var collection = db.collection('signupnew');
    collection.deleteOne({_id: o_id}, function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});
/*-----------------------------------URL_UPDATE_END---------------------------------*/


app.get('/getusastates',function (req,resp) {


    var usastates=[
        {
            "name": "Alabama",
            "abbreviation": "AL"
        },
        {
            "name": "Alaska",
            "abbreviation": "AK"
        },
        /*  {
         "name": "American Samoa",
         "abbreviation": "AS"
         },*/
        {
            "name": "Arizona",
            "abbreviation": "AZ"
        },
        {
            "name": "Arkansas",
            "abbreviation": "AR"
        },
        {
            "name": "California",
            "abbreviation": "CA"
        },
        {
            "name": "Colorado",
            "abbreviation": "CO"
        },
        {
            "name": "Connecticut",
            "abbreviation": "CT"
        },
        {
            "name": "Delaware",
            "abbreviation": "DE"
        },
        /*{
         "name": "District Of Columbia",
         "abbreviation": "DC"
         },*/
        /* {
         "name": "Federated States Of Micronesia",
         "abbreviation": "FM"
         },*/
        {
            "name": "Florida",
            "abbreviation": "FL"
        },
        {
            "name": "Georgia",
            "abbreviation": "GA"
        },
        /*{
         "name": "Guam",
         "abbreviation": "GU"
         },*/
        {
            "name": "Hawaii",
            "abbreviation": "HI"
        },
        {
            "name": "Idaho",
            "abbreviation": "ID"
        },
        {
            "name": "Illinois",
            "abbreviation": "IL"
        },
        {
            "name": "Indiana",
            "abbreviation": "IN"
        },
        {
            "name": "Iowa",
            "abbreviation": "IA"
        },
        {
            "name": "Kansas",
            "abbreviation": "KS"
        },
        {
            "name": "Kentucky",
            "abbreviation": "KY"
        },
        {
            "name": "Louisiana",
            "abbreviation": "LA"
        },
        {
            "name": "Maine",
            "abbreviation": "ME"
        },
        /*{
         "name": "Marshall Islands",
         "abbreviation": "MH"
         },*/
        {
            "name": "Maryland",
            "abbreviation": "MD"
        },
        {
            "name": "Massachusetts",
            "abbreviation": "MA"
        },
        {
            "name": "Michigan",
            "abbreviation": "MI"
        },
        {
            "name": "Minnesota",
            "abbreviation": "MN"
        },
        {
            "name": "Mississippi",
            "abbreviation": "MS"
        },
        {
            "name": "Missouri",
            "abbreviation": "MO"
        },
        {
            "name": "Montana",
            "abbreviation": "MT"
        },
        {
            "name": "Nebraska",
            "abbreviation": "NE"
        },
        {
            "name": "Nevada",
            "abbreviation": "NV"
        },
        {
            "name": "New Hampshire",
            "abbreviation": "NH"
        },
        {
            "name": "New Jersey",
            "abbreviation": "NJ"
        },
        {
            "name": "New Mexico",
            "abbreviation": "NM"
        },
        {
            "name": "New York",
            "abbreviation": "NY"
        },
        {
            "name": "North Carolina",
            "abbreviation": "NC"
        },
        {
            "name": "North Dakota",
            "abbreviation": "ND"
        },
        /* {
         "name": "Northern Mariana Islands",
         "abbreviation": "MP"
         },*/
        {
            "name": "Ohio",
            "abbreviation": "OH"
        },
        {
            "name": "Oklahoma",
            "abbreviation": "OK"
        },
        {
            "name": "Oregon",
            "abbreviation": "OR"
        },
        /* {
         "name": "Palau",
         "abbreviation": "PW"
         },*/
        {
            "name": "Pennsylvania",
            "abbreviation": "PA"
        },
        /* {
         "name": "Puerto Rico",
         "abbreviation": "PR"
         },*/
        {
            "name": "Rhode Island",
            "abbreviation": "RI"
        },
        {
            "name": "South Carolina",
            "abbreviation": "SC"
        },
        {
            "name": "South Dakota",
            "abbreviation": "SD"
        },
        {
            "name": "Tennessee",
            "abbreviation": "TN"
        },
        {
            "name": "Texas",
            "abbreviation": "TX"
        },
        {
            "name": "Utah",
            "abbreviation": "UT"
        },
        {
            "name": "Vermont",
            "abbreviation": "VT"
        },
        /* {
         "name": "Virgin Islands",
         "abbreviation": "VI"
         },*/
        {
            "name": "Virginia",
            "abbreviation": "VA"
        },
        {
            "name": "Washington",
            "abbreviation": "WA"
        },
        {
            "name": "West Virginia",
            "abbreviation": "WV"
        },
        {
            "name": "Wisconsin",
            "abbreviation": "WI"
        },
        {
            "name": "Wyoming",
            "abbreviation": "WY"
        }
    ];

    resp.send(usastates);

});
var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    //  console.log("Example app listening at http://%s:%s", host, port)
})

app.get('/employeecompanyview_test',function(req,resp){
    var collection = db.collection('employeecompanyview_test');
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});