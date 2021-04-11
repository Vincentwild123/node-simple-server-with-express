var formidable = require("formidable");
const fs = require('fs');
const path = require('path')
const stringRandom = require('string-random')
module.exports = async function useUploadFile(req, uploadPath) {
    try {
        if (!req || !req.app || !req.app.settings) throw new Error('check the req params');
        var form = new formidable.IncomingForm({
            multiples: true
        });
        form.parse(req, async function (err, fields, files) {
            if (err || files === undefined) throw new Error('some error in form.parse');
            //判断文件数量
            if (files.file.length > 1) {
                for (const file of files.file) {
                    await fileParser(file, uploadPath);
                }
            } else {
                await fileParser(files.file, uploadPath)
            }
        });
    } catch (err) {
        console.error(err);
    }
}


function fileParser(file, uploadPath) {
    return new Promise((resolve, reject) => {
        try {
            const fileMetaData = Object.create(null);
            //get the file mata data
            fileMetaData.fileName = file.name;
            fileMetaData.tempPath = file.path;
            fileMetaData.fileSize = file.size;

            //the target PATH from user to save files , default value is `${process.cwd()}+"/uploadfiles"`
            let uploadFilesPath = uploadPath || process.cwd() + '/uploadfiles';
            //create the dir
            if (!fs.existsSync(uploadFilesPath)) {
                fs.mkdirSync(uploadFilesPath);
            }
            let targetPath = path.join(uploadFilesPath, fileMetaData.fileName);
            //check the file whether is exist
            while (fs.existsSync(targetPath)) {
                //the file path exited,create a hash file name
                const randomStr = stringRandom(8, {
                    number: false
                })
                const fileCommonName = fileMetaData.fileName.split('.')[0];
                const fileExtendName = fileMetaData.fileName.split('.')[1];
                targetPath = path.join(uploadFilesPath, (fileCommonName + "-" + randomStr + "." + fileExtendName));
            }
            fs.rename(fileMetaData.tempPath, targetPath, (err) => {
                if (err) {
                    throw new Error('some err in fs.rename');
                }
                console.log("***************")
                console.log('name:', fileMetaData.fileName);
                console.log('path:', targetPath);
                console.log('size:' + (fileMetaData.fileSize / 1024).toFixed(2) + "k");
                console.log("***************")
                resolve()
            })
        } catch (err) {
            reject(err);
        }
    })
}