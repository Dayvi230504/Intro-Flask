from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite que el frontend se comunique con el backend sin problemas

# Ruta principal
@app.route("/")
def home():
    return "<h1>¡Bienvenido a la API con Flask!</h1><hr><p>Selecciona una opción en la interfaz.</p>"

# 📌 Ejercicio 1: Calcular Y = X * Z + Z + X
@app.route("/calcular/<int:x>/<int:z>")
def calcular(x, z):
    y = x * z + z + x
    return f"<h1>El resultado de Y = X * Z + Z + X es: {y}</h1><hr>"

# 📌 Ejercicio 2: Tabla de multiplicar hasta el 10
@app.route("/tabla/<int:num>")
def tabla(num):
    tabla_html = "<h1>Tabla de multiplicar del " + str(num) + "</h1><hr><ul>"
    for i in range(1, 11):
        tabla_html += f"<li>{num} x {i} = {num * i}</li>"
    tabla_html += "</ul>"
    return tabla_html

# 📌 Ejercicio 3: Cálculo de áreas (Círculo, Cuadrado, Triángulo)
import math

@app.route("/area/circulo/<float:radio>")
def area_circulo(radio):
    area = math.pi * (radio ** 2)
    return f"<h1>El área del círculo es: {area:.2f}</h1><hr>"

@app.route("/area/cuadrado/<float:lado>")
def area_cuadrado(lado):
    area = lado ** 2
    return f"<h1>El área del cuadrado es: {area:.2f}</h1><hr>"

@app.route("/area/triangulo/<float:base>/<float:altura>")
def area_triangulo(base, altura):
    area = (base * altura) / 2
    return f"<h1>El área del triángulo es: {area:.2f}</h1><hr>"

# Iniciar servidor
if __name__ == "__main__":
    app.run(debug=True)
