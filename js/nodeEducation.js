//Reading the File
var readline = require('readline');
var fs = require('fs');
var path=require("path");
i=0;
header=[];
var json = [];
var rl = readline.createInterface({
input: fs.createReadStream('../csv/General.csv')
});
//Reading File 1
rl.on('line',function(line){
     i++;
     if(i==1)
     {
       header=line.split(",");
     }
     else
     {
          var tempArray=[]; 
    row = line.split(",")
    if(row[5]=="All ages" && row[4]=="Total")
    {
        for(let i = 15; i <= 42; i+=3)
           tempArray.push(parseInt(row[i]));
    // Add object to list 
   
        if(json.length!=0)
            for(let j=0;j<tempArray.length;j++)
                json[0][j]=json[0][j]+tempArray[j];
        else
        json.push(tempArray);
    }
  }
     
});
//Closing CSV file 1
rl.on("close",function()
{
     
var rl1 = readline.createInterface({
input: fs.createReadStream('../csv/SC.csv')
});
//Reading File 2
rl1.on('line',function(line)
{
 i++;
 if(i==1)
 {
   header=line.split(",");
 }
 else
 {
    var tempArray=[]; 
    row = line.split(",")
    if(row[5]=="All ages" && row[4]=="Total")
    {
        for(let i = 15; i <= 42; i+=3)
           tempArray.push(parseInt(row[i]));
    // Add object to list 
        if(json.length!=0)
            for(let j=0;j<tempArray.length;j++)
                json[0][j]=json[0][j]+tempArray[j];
        else
        json.push(tempArray);
    }
  }

});
//Closing CSV file 2
rl1.on("close",function()
{
    var rl2 = readline.createInterface({
    input: fs.createReadStream('../csv/ST.csv')
    });
//Reading the file 3
    rl2.on('line',function(line){
     i++;
     if(i==1)
     {
       header=line.split(",");
     }
     else
     {
            var tempArray=[]; 
        row = line.split(",")
        if(row[5]=="All ages" && row[4]=="Total")
        {
            for(let i = 15; i <= 42; i+=3)
               tempArray.push(parseInt(row[i]));
        // Add object to list       
            if(json.length!=0)
                for(let j=0;j<tempArray.length;j++)
                    json[0][j]=json[0][j]+tempArray[j];
            else
            json.push(tempArray);
          
        }
}
     
});
//Closing CSV file 3
rl2.on("close",function()
{
  //Final Json Array
var finalJson=[];
var x=15;
for(let i=0;i<json[0].length;i++)
{
    var tmp={};
    tmp["catogories"]=header[x].substring(20,header[x].length);
    tmp["population"]=json[0][i];
     finalJson.push(tmp);
     x+=3;
}
//Output file path
var outPath = path.join(__dirname, '../json/data3.json');
// Convert object to string, write json to file
fs.writeFileSync(outPath, JSON.stringify(finalJson), 'utf8', 
    function(err){console.log(err);});

 
});
 });
});