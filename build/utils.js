/*
  @Author: lize
  @Date: 2021/4/20
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/4/20
 */
const fs = require('fs');

// 判断路径是否存在
exports.fileExist =  (filePath) => {
    return fs.existsSync(filePath, (exist) => {
        return exist;
    })
}
// 写具体路径下写文件
exports.WriteFileFn = (src, path, writeContent) =>{
    fs.exists(src, publicxists => {
        if (publicxists) {
            fs.writeFile(path, writeContent, "utf8", error => {
                if (error) return console.log(error);
            });
        } else {
            fs.mkdir(src, err => {
                if (err) return console.error(err);
                fs.writeFile(path, writeContent, "utf8", error => {
                    if (error) return console.log(error);
                });
            });
        }
    });
}

// 删除文件
exports.delDir = (path) => {
    let files = [];
    if(fileExist(path)){
        files = fs.readdirSync(path); // 获取模块下所有的文件
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){ // 判断是不是文件夹
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}

// 读取文件
exports.readFileSync = (packConfigPath, options = "utf-8") => {
    return JSON.parse(fs.readFileSync(packConfigPath, options));
}
