from flask import Flask
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)  # Habilita CORS para permitir conexiones desde otro puerto

# Ruta principal
@app.route("/")
def HolaFlask():
    return "<h1>¡Hola Flask!</h1> <hr>"

# Ruta para calcular notas
@app.route("/notas/<float:nota1>/<float:nota2>/<float:nota3>")
def notas(nota1=0, nota2=0, nota3=0):
    resultado = (nota1 * 30) / 100 + (nota2 * 30) / 100 + (nota3 * 40) / 100
    return f"<h1>El resultado es: {resultado:.2f}</h1> <hr>"

# Ruta para determinar la categoría de edad
@app.route("/edades/<int:edad>")
def edades(edad=0):
    if edad < 10:
        R = 'niño pequeño'
    elif edad < 18:
        R = 'menor de edad'
    elif edad < 60:
        R = 'adulto'
    else:
        R = 'adulto mayor'
    return f"<h1>La persona es: {R}</h1> <hr>"

# Ruta para generar arreglos aleatorios
@app.route("/arreglos/<int:valores>/<int:columnas>")
@app.route("/arreglos/<int:valores>/<int:columnas>/<int:filas>")
def arreglos(valores=0, columnas=0, filas=0):
    if filas == 0:
        arreglo = np.random.randint(valores, size=columnas)
    else:
        arreglo = np.random.randint(valores, size=(filas, columnas))
    return f"<h1>El arreglo aleatorio es: {arreglo}</h1> <hr>"

if __name__ == '__main__':
    app.run(debug=True)
