var http = require('http');
var url = require('url'); 
var viddat="hup";
var mintest=[5,4,4,6,7,4];
//findmin(mintest);
function findmin(dat){
	var minindexes=[-1];
	var currmin = 2000000000;
	for(i=0; i<dat.length; i++){
		if(dat[i]<=currmin){
			if(dat[i]<currmin){
				currmin=dat[i];
				minindexes=[];
			}
			minindexes.push(i);
		}
		
	}
	console.log(minindexes);
	return minindexes;
}
fs = require('fs');
//fs.readFile('vids.json', 'utf8', function (err,data) {
//	if (err) 
//	{
//		return console.log(err);
//     }
//	console.log("cheers");
  //      console.log(data);
//	obj=JSON.parse(data);
//	obj.videos[2].freq=1;
//	var freq=obj.videos.map(function (vid) {
//		return vid.freq;
//	});
//	var minfreqs=findmin(freq);
//	var rand = Math.floor((Math.random() * minfreqs.length));
//	console.log(freq);
//	viddat=JSON.stringify(obj);
//	fs.writeFileSync('vi 	-ds.json', viddat);
//});

VideoKey_Array = ['eLLX4c6QdSM', 'gFVyjnFt8ik', 'CIlavZGqN1k', 'dwwP6udo9HA', '2Jj6pj22i38', 'ND7cmYIKqrM',
                  'uM5-YNBZuDM', '03WyCHsR0I8', '7KbqMaU4o7o', 'mb8HewaEAOk', 'm8IbGSYC810', 'FGk7mo20i_8',
                  'qKdvyfo9aC8', '0HNqE8GQlec', 'd55fgTFwtoI', 'bsINP0psVyU', 'EhDXfkTn55A', 'sOmGdij3oio',
                  'eSdipQhFcFI', 't7DxJ9_PCrE', 'ifZcw6LK-0k', 'b9NAeHB1uNQ', '8zNNhJanh7s', 'q-9xY-pe9yQ',
                  'X_VThk0Hfys', 'ciz_MnAUjqA', 'GDUUQ9qNmRA', '9L1A3T5lIDw', 'F9BxP59UUgA', 'yrWfl7-PVZc',
                  'HtuHa_eNLxA', 'GoV97n5WS-s', 'RmiwXOHN8To', 'LFo97kmRRoo', 'fq7oPqKImJg', 'Ifpvk94KrLA']

http.createServer(function (req, res) {
	//var viddat;
	//fs = require('fs');
	var queryObject = url.parse(req.url,true).query;
  	console.log(queryObject.gender);

	fs.readFile('vids.json', 'utf8', function (err,data) {
  		if (err) {
    			return console.log(err);
 		 }
		obj=JSON.parse(data);
		if(queryObject.reset=='t'){
			for(i = 0; i<36; i++){
			  obj.videos[i].freq=0;
			  obj.videos[i].mfreq=0;
			  obj.videos[i].ffreq=0; 
			}

        	        viddat=JSON.stringify(obj);
	                fs.writeFileSync('vids.json', viddat);
			res.writeHead(200, {'Content-Type': 'text/plain'});
	                 res.end("Freq Reset");


		}
		else{
		var freq=[]; 
		var nogender=false; 
                var freq=obj.videos.map(function (vid) {
			       if(vid.freq<=0)
				{
				 nogender=true; 
				}
                               return vid.freq;
                 });
		
		if(queryObject.gender=='f' && !nogender){
			console.log("it's a girl");
			freq=obj.videos.map(function (vid) {
			       if(vid.freq>=6){
				  return vid.freq;
				}
			       else{
         	               return vid.ffreq;
			      }
	                });


		}
		else if(queryObject.gender=='m'&& !nogender){
			console.log("it's a boy");
                        freq=obj.videos.map(function (vid) {
                              if(vid.freq>=6){
                                  return vid.freq;
                                }
                               else{
                               return vid.mfreq;
                              }

                        });

		}
		else{
			console.log("don't subject your child to a gender binary");
                        var freq=obj.videos.map(function (vid) {
                               return vid.freq;
                        });

		}
	        console.log(data);
//       		obj=JSON.parse(data);
//      	obj.videos[2].freq=1;
        
        	var minfreqs=findmin(freq);
        	var rand = Math.floor((Math.random() * minfreqs.length));
        	console.log(freq);
		obj.videos[minfreqs[rand]].freq+=1;
		if(queryObject.gender=='f'){
	                obj.videos[minfreqs[rand]].ffreq+=1;

		}
                if(queryObject.gender=='m'){
                        obj.videos[minfreqs[rand]].mfreq+=1;

                }

        	viddat=JSON.stringify(obj);
        	fs.writeFileSync('vids.json', viddat);

 		 console.log(data);
		 console.log("shoop");
//     		 console.log(viddat);
       		 res.writeHead(200, {'Content-Type': 'text/plain'});
       		// res.end(minfreqs[rand].toString() + " " + VideoKey_Array[minfreqs[rand]].toString());
		 res.end(minfreqs[rand].toString());}

	});
//	console.log("shoop");
//	console.log(viddat);
//	res.writeHead(200, {'Content-Type': 'text/plain'});
//	res.end(viddat + ' Hello Cheers\n');
}).listen(8080, 'localhost');
console.log('Server running at http://localhost:8080/');
