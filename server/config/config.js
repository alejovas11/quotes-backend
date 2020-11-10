//===============================
//configuracion del puerto
//===============================

process.env.PORT = process.env.PORT || 3000;


//===============================
//cadena de conexion de base de datos
//===============================

//process.env.CONEXIONDB = 'mongodb://localhost:27017/quotes-moviles';
process.env.CONEXIONDB = 'mongodb+srv://elidev-databases:elidev-password12345@cluster0.7vddh.mongodb.net/<dbname>?retryWrites=true&w=majority'