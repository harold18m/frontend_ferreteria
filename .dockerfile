# Usa la imagen sugerida por Railway
FROM railwayapp/node:18

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al directorio de trabajo
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto en el que Vite sirve la aplicación (por defecto, el puerto 3000)
EXPOSE 3000

# Comando para iniciar la aplicación cuando se ejecute el contenedor
CMD ["npm", "run", "preview"]
