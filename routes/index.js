var express = require('express');
var router = express.Router();
const {Pool} = require('pg')

const pool = new Pool({
  user: 'unpnyvbgzgdqxl',
  host: 'ec2-54-83-33-213.compute-1.amazonaws.com',
  database: 'd973ecutt359ck',
  password: '8dc0bb2796ad3ac6e15283a517822a60e76d91a566763718853b6330f97e89d5',
  port: 5432,
})

router.get('/', function(req, res, next) {
  res.send('secret server')
});

router.post('/submit-visitor-facebook', function(req, res){
  var id = Number(req.body.data.data.id);
  var name = req.body.data.data.name;
  var image = req.body.data.data.image;
  var provider = req.body.data.data.provider
  pool.query(`insert into visitor(id, name, image, provider) values(${id}, '${name}', '${image}', '${provider}')`, function(err, afk){
    pool.query(`select * from visitor where id = ${id}`, function(err, data){
      if (err) {
        res.json({status: 'TercyduQ', err: err})
      }else{
        res.json({data: data.rows[0]})
      }
    })
  })
})

router.get('/get-visitor', function(req, res){
  pool.query(`select * from visitor limit 20 offset 0`, function(err, data){
    if (err) {
      res.json({status: 'TercyduQ'})
    }else{
      res.json({data: data.rows})
    }
  })
})

module.exports = router;
