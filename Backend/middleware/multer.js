import multer from "multer";

const storage = multer.memoryStorage();

const multipleupload = multer({storage}).array("file",10);

export default multipleupload;
