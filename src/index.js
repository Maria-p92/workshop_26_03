const express = require ('express');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({ //Para guardar los archivos subidos, con nombre y extension en filename(es una funcion)
    distanation: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

// initilizations
const app = express();

// Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views')); //esto indica que la carpeta "views" está dentro de "src"
app.set('view engine', 'ejs');

// Middlewares  (MULTER - Importante que esté antes de las rutas)
app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads')
}).single('profile_pic')); //Guarda la variable en "req.file", que lo situamos en app.post

//Routes
app.get('/', (req, res) => {
    res.render('index'); // Esto se refiere al archivo "index.ejs", el cuál definimos su ruta arriba la anterior explicación
});

app.post('/upload', (req, res) =>{
    console.log(req.file);
    res.send('uploaded');
});

// Start the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});