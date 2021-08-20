#!usr/bin/env node

const fs = require("fs");
let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];
let secondaryArguments = [];

for(let i of arguments) {
    if(i[0] == "-") {
        flags.push(i);
    } else if(i[0] == "$") { //$@
        secondaryArguments.push(i.slice(1));
    } else {
        filenames.push(i);
    }
}

// if(flags.length == 0) {
//     for(let file of filenames) {
//         console.log(fs.readFileSync(file,"utf-8"));
//     }
// } else {
//     for(let flag of flags) {
//         if(flag == "-rs") {
//             for(let file of filenames) {
//                 let fileData = fs.readFileSync(file,"utf-8");
//                 console.log(fileData.split(" ").join(""));
//             }
//         } else if
//     }
// }


for(let file of filenames) {
    let fileData = fs.readFileSync(file,"utf-8");
    for(let flag of flags) {
        if(flag == "-rs") {
            fileData = removeAll(fileData," ");
        }
        if(flag == "-rn") {
            fileData = removeAll(fileData, "\r\n")
        }
        if(flag == "-rsc") {
            for(let secondaryArgument of secondaryArguments) {
                fileData = removeAll(fileData,secondaryArgument);
            }
        }
        if(flag=="-s")
        {
            fileData = addSeqNumber(fileData);
        }
        if(flag=="-sn")
        {
            fileData = addSeqNumToNonEmpty(fileData);
        }
        if(flag=="-rel")
        {
            fileData= removeExtraLine(fileData)
        }
    }
    console.log(fileData);
}

function removeAll(string, removalData) {
    return string.split(removalData).join("");
}

function addSeqNumber(data)
{
    let arr=data.split("\r\n");
    let str=""
    for(let i=0;i<arr.length;i++)
    {
        str +=i+1+" "+arr[i]+"\r\n";
    }
    return str;
}

function addSeqNumToNonEmpty(data)
{
    let arr=data.split("\r\n");
    let str="";
    let k=1
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i]!='')
        {
            str +=k+" "+arr[i]+"\n";
            k++;
        }
        else{
            str+=arr[i]+"\n"
        }
        
    }
    return str;
}

function removeExtraLine(data)
{
    
    let arr=data.split("\r\n")
    let str="1"+" "+arr[0]+"\n";
    let k=2;
    for(let i=1;i<arr.length;i++)
    {
        if(arr[i]=='' && arr[i-1]!='')
        {
            str+=k+arr[i]+"\n";
            k++;
        }
        if(arr[i]!='')
        {
            str+=k+arr[i]+"\n";
            k++;
        }
    }
    return str;
}