import multer from "multer";

 export const configStorage = (location: string) => {
    return multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, location)
        },
        filename: function (req, file, cb) {
            let uniqueSuffix = Date.now()
            let org_file_name = file.originalname
            let re_file = org_file_name.split('.')
            let finalName = `${uniqueSuffix}.${re_file[1]}`
            cb(null, finalName)
        }
    })
}

export const validation_type = (extension: string) => {
    return (req: any, file: any, cb: any) => {
      if (extension === "image") {
        let type = file.mimetype == "image/jpeg" || file.mimetype == "image/png";
        if (type) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      } 
    //   else if (extension === "rar") {
    //     let type =
    //       file.mimetype == "application/zip" ||
    //       file.mimetype == "application/x-rar-compressed";
    //     if (type) {
    //       cb(null, true);
    //     } else {
    //       cb(null, false);
    //     }
    //   } //else if (extension === "document") {
        // const allowedTypes = [
        //   "application/msword",
        //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        //   "application/pdf",
        // ];
        // if (!allowedTypes.includes(file.mimetype)) {
        //   cb(null, false);
        // }
        // cb(null, true);
      //} 
      else {
        console.log(`EXTENSION TYPE CANNOT IDENTIFIED ! => ${file.mimetype}`);
        cb(null, false);
      }
    };
  };