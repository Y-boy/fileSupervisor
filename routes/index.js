var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

var indexFilePath = path.join(__dirname, "../public/data/test.json");
// 存栏目章节（索引）的文件目录

/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('index', { title: 'Express' });
});

router.post('/addCol', function(req, res, next){
	var jsonMain = JSON.parse(fs.readFileSync(indexFilePath));
	console.log("index\'s num: "+jsonMain.length);
	jsonMain.push(req.body);
	// fs.writeFile(indexFilePath, JSON.stringify(jsonMain), function(error){
	// 	console.log(error);
	// 	if (error) throw error;

	// });
	fs.writeFileSync(indexFilePath, JSON.stringify(jsonMain));

	res.send("success");
});

router.post('/deleteCol', function(req, res, next){
	console.log(req.body.id);
	var jsonMain = JSON.parse(fs.readFileSync(indexFilePath));
	for (var i in jsonMain) {
		if(jsonMain[i].id == req.body.id){
			jsonMain[i].visible = "0";
			break;
		}
		// 假删：设为不可见（将来做回收站用得上）
	}
	fs.writeFileSync(indexFilePath, JSON.stringify(jsonMain));
	res.send("success");
});

router.get('/readCol/:id', function(req, res, next){
	console.log(req.params.id);
	var jsonMain = JSON.parse(fs.readFileSync(indexFilePath));
	for (var i in jsonMain) {
		if(jsonMain[i].id == req.params.id){
			jsonMain[i].viewDate = new Date().getTime().toString();
			// 统一存成字符串
			break;
		}
	}

/*----------------未写：根据id读取章节，并返回------------------------*/

	
	fs.writeFileSync(indexFilePath, JSON.stringify(jsonMain));

	res.send("success");
});

module.exports = router;
