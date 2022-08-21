const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        switch(file.fieldname){
            case 'fileBook':
                cb(null, 'public/books');
                break;
            case 'fileCover':
                cb(null, 'public/covers');
                break;
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}`)
    }
});

const allowedTypesBook = ['application/pdf'];
const allowedTypesCover = ['image/jpeg', 'image/webp', 'image/png'];

const fileFilter = (req, file, cb) => {
    console.log(file.fieldname);
    switch(file.fieldname){
        case 'fileBook':
            if(allowedTypesBook.includes(file.mimetype)){
                cb(null, true);
            }else {
                cb(null, false);
            }
            break;
        case 'fileCover':
            if(allowedTypesCover.includes(file.mimetype)){
                cb(null, true);
            }else {
                cb(null, false);
            }
            break;
    }
}

const upload = multer({
    fileFilter,
    storage
});

module.exports = upload;