var http = require('http');
var fs = require("fs");
var qs = require('querystring');

var MongoClient = require('mongodb').MongoClient;     

var dbUrl = "mongodb://localhost:27017/";



http.createServer(function(request, response) {
   
	if(request.url === "/index"){
		sendFileContent(response, "web.html", "text/html");
	}
	else if(request.url === "/"){
		console.log("Requested URL is url" +request.url);
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
	}
    else if(request.url === "/form"){
		sendFileContent(response, "formjson.html", "text/html");
	}
    else if(request.url === "/member"){
        sendFileContent(response, "finalform.html", "text/html");
       
	}
    else if(request.url==="/test2"){
              
         if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                console.log("my data="+formData);
                var obj = JSON.parse(formData);
                console.log("myuse="+obj.user);
                console.log("mypass="+obj.pass);
                
                return request.on('end', function () {
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "username": obj.user};
                        dbo.collection("login").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
                            if (result.length == 1) {


                                var resultReturn = JSON.stringify(result);
                                db.close();
                                return response.end(resultReturn)
                            }

                        });
                    });
                });
            });
        }else{
            sendFileContent(response, "formjson.html", "text/html");
        }
   
              
	}	else if (request.url === "/passdata")
		{
			console.log("apple");
				
				if (request.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';
                   
					return request.on('data', function(data) {
						formData += data;
						console.log("form data="+ formData);
                      
                        var obj = JSON.parse(formData);
                        console.log(obj);
                        console.log(obj.user );
                        console.log( obj.pass );
 
						return request.on('end', function() {
							/////////////////////
                            
                            MongoClient.connect(dbUrl, function(err, db) {
								var finalcount;
								if (err) throw err;
								var dbo = db.db("304cemdbnew");
                                
                              
								var myobj = {"user" : obj.user, "password" : obj.pass};
							
                            dbo.collection("login").insertOne(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
                   
                                
                                return response.end('{"result":"This email is already registered"}');
							});
   
						
						});
					});
				}else{
                    console.log("here");
                }
			
			
		}
    
    else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}else if(/^\/[-a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
    else if(/^\/[a-zA-Z0-9\/]*.jpg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/jpg");
	}
    else if(/^\/[a-zA-Z0-9\/]*.png$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/png");
	}
	else{
		console.log("Requested URL is: " + request.url);
		response.end();
	}
}).listen(9999)

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}