var http = require('http');
var fs = require("fs");

var MongoClient = require('mongodb').MongoClient;   //npm install mongdb

var dbUrl = "mongodb://localhost:27017/";

http.createServer(function(request, response) {
	
	if(request.url === "/index"){
		sendFileContent(response, "index.html", "text/html");
		
	}else if(request.url ==="/addproduct"){
			console.log("data is coming");
		
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
                        console.log(obj.item );
						console.log(obj.price );
						console.log(obj.img );
						console.log(obj.desc );
 
						return request.on('end', function() {
							/////////////////////
                            
                            MongoClient.connect(dbUrl, function(err, db) {
								var finalcount;
								if (err) throw err;
								var dbo = db.db("304cemdb1");
                                
                              
								var myobj = {"user":obj.user,"item":obj.item,"price":obj.price,"img":obj.img,"desc":obj.desc};
							
                            dbo.collection("product").insertOne(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted"); 
											db.close();
										});
                   
                                
                                return response.end('{"result":"Record Added"}');
							});
   
						
						});
					});
				}else{
                    console.log("here");
                }
			
			
		
    }else if(request.url ==="/delfav"){
			console.log("ddelete Record");
				
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
 
						return request.on('end', function() {
                            MongoClient.connect(dbUrl, function(err, db) {
								var finalcount;
								if (err) throw err;
								var dbo = db.db("304cemdb1");
                                var myobj = {"item":obj.item};
							
                            dbo.collection("product").deleteOne(myobj, function(err, res) {
											if (err) throw err;
											console.log("item delete"); 
											db.close();
										});
                   
                                
                                return response.end('{"result":"Record deleted"}');
							});
   
						
						});
					});
				}else{
                    console.log("here");
				}
         }else if(request.url ==="/updatepw"){
			console.log("Update Password");
				
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
 
						return request.on('end', function() {
                            MongoClient.connect(dbUrl, function(err, db) {
								var finalcount;
								if (err) throw err;
								var dbo = db.db("304cemdb1");
                                var myobj = {"email" : obj.email};
								var newobj = {$set: {"password" : obj.password}};
                            dbo.collection("login").updateOne(myobj, newobj, function(err, res) {
											if (err) throw err;
											console.log("password updated"); 
											db.close();
										});
                   
                                
                                return response.end('{"result":"password updated"}');
							});
   
						
						});
					});
				}else{
                    console.log("here");
         }
	}else if(request.url ==="/getfav"){
			console.log("action = getfavourite");
		
		
		if (request.method === "POST") {
            return request.on('data', function (data) {
				formData = '';
                formData += data;
                console.log("my data="+formData);
				
                var obj = JSON.parse(formData);
                console.log("email="+obj.email);
        
                
                return request.on('end', function () {
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("304cemdb1");
                        var myquery = { "user": obj.email};
                        dbo.collection("product").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
							console.log(result.length);
                            if (result.length == 0) {
								 db.close();
								 return response.end('("result":"no")');
							}

                                var resultReturn = JSON.stringify(result);
                                return response.end(resultReturn);
                            
                        });
                    });
                });
            });
        }else{
            sendFileContent(response, "formjson.html", "text/html");
			}
	}else if(request.url ==="/getinfo"){
			console.log("action = Get User Info");
		
		
		if (request.method === "POST") {
            return request.on('data', function (data) {
				formData = '';
                formData += data;
                console.log("my data="+formData);
				
                var obj = JSON.parse(formData);
                console.log("email="+obj.email);
        
                
                return request.on('end', function () {
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("304cemdb1");
                        var myquery = { "email": obj.email};
                        dbo.collection("login").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
							console.log(result.length);
                            if (result.length == 0) {
								 db.close();
								 return response.end('("result":"no")');
							}

                                var resultReturn = JSON.stringify(result);
                                return response.end(resultReturn);
                            
                        });
                    });
                });
            });
        }else{
            sendFileContent(response, "formjson.html", "text/html");
			}
	}else if(request.url ==="/Registration"){
			console.log("data is coming");
		
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
                        console.log( obj.email );
						console.log( obj.password );
 
						return request.on('end', function() {
							/////////////////////
                            
                            MongoClient.connect(dbUrl, function(err, db) {
								var finalcount;
								if (err) throw err;
								var dbo = db.db("304cemdb1");
								var myobj = {"user" : obj.user, "email" : obj.email,"password" : obj.password};
								console.log(myobj);
							var myquery = { "email": obj.email, "password":obj.password};
                        dbo.collection("login").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
                            if (result.length == 0) {
								 console.log("sucess");
                            dbo.collection("login").insertOne(myobj, function(err, res) {
											if (err) throw err;
											console.log("success"); 
											db.close();
										});
                   
                                
                                return response.end('{"result":"success"}');
							}else{
								return response.end('{"result":"not success"}');
							}
							});	
							});
   
						
						});
					});
				
				}else{
                    console.log("here");
                }
		
    }else if(request.url ==="/Login"){
		console.log("data is coming");
		
		
		if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                console.log("my data="+formData);
                var obj = JSON.parse(formData);
                console.log("email="+obj.email);
                console.log("password="+obj.password);
                
                return request.on('end', function () {
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("304cemdb1");
                        var myquery = { "email": obj.email, "password":obj.password};
                        dbo.collection("login").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
                            if (result.length == 1) {
								 console.log("sucess");

                                var resultReturn = JSON.stringify(result);
                                db.close();
                                return response.end(resultReturn);
                            }else{
								
								return response.end("0");
							}

                        });
                    });
                });
            });
        }else{
            sendFileContent(response, "formjson.html", "text/html");
        }
   
    }else if(request.url ==="/cart"){
		sendFileContent(response, "cart.html", "text/html");
        }
		else if(request.url === "/"){
        console.log("Requested URL is url" +request.url);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
    }
    else if(request.url === "/cart2"){
        sendFileContent(response, "cart.html", "text/html");
    } else if(request.url === "/test"){
        sendFileContent(response, "test.html", "text/html");
    }
    else if(request.url === "/member"){
        sendFileContent(response, "member.html", "text/html");
      
    }
	else if(request.url === "/location"){
        sendFileContent(response, "location.html", "text/html");
      
    }
	else if(request.url === "/product"){
        sendFileContent(response, "product.html", "text/html");
    }
	else if(request.url === "/myaccount"){
        sendFileContent(response, "myaccount.html", "text/html");
      
    }
	else if(request.url === "/changepw"){
        sendFileContent(response, "changepw.html", "text/html");
      
    }
    else if(request.url==="/test"){
             
      
  
             
    }else if (request.url === "/passdata")
        {
           
               
                if (request.method === "POST")
                {
                    console.log("action = post");
                    formData = '';
                    msg = '';
                  
                    return request.on('data', function(data) {
                        formData += data;
                        console.log("form data="+ formData);
                        return request.on('end', function() {
                           
                           return response.end("fail");
                       
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