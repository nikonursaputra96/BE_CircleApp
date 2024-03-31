import * as multer from 'multer'
import * as path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/assets/')
    },
    filename : (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, `${Date.now()}${ext}`)
    }
})

export const uploadImage = multer ({storage: storage})

