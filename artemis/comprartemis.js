const http = require('http');

const data = {
  nombre: 'Ventartemis',
  location: 'ciudad',
  empleados: 100,
};

const usuarios = ['Usuario 1', 'Usuario 2', 'Usuario 3'];

const categorias = [
  { id: 1, nombre: 'Categoría 1' },
  { id: 2, nombre: 'Categoría 2' },
];

const productos = [
  { id: 1, nombre: 'Producto 1' },
  { id: 2, nombre: 'Producto 2' },
];

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.write(`<h1>Datos de la empresa ${data.nombre}</h1>`);
    res.write(`<p>Ubicación: ${data.location}</p>`);
    res.write(`<p>Empleados: ${data.empleados}</p>`);
    res.end();
  } else if (url === '/usuarios') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.write('<ul>');
    usuarios.forEach(user => {
      res.write(`<li>${user}</li>`);
    });
    res.write('</ul>');
    res.end();
  } else if (url === '/categorias') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.write('<table>');
    res.write('<tr><th>ID</th><th>Categoría</th></tr>');
    categorias.forEach(categoria => {
      res.write(`<tr><td>${categoria.id}</td><td>${categoria.nombre}</td></tr>`);
    });
    res.write('</table>');
    res.end();
  } else if (url === '/clientes') {
    if (req.method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.write('<form action="/createcustomer" method="POST">');
      res.write('<label for="nombre">Nombre:</label>');
      res.write('<input type="text" id="nombre" name="nombre"><br>');
      res.write('<label for="email">Email:</label>');
      res.write('<input type="email" id="email" name="email"><br>');
      res.write('<button type="submit">Enviar</button>');
      res.write('</form>');
      res.end();
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      });
      req.on('end', () => {
        const formData = new URLSearchParams(body);
        const nombre = formData.get('nombre ');
        const email = formData.get('email');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.write(`<p>Cliente creado:</p>`);
        res.write(`<p>Nombre: ${nombre}</p>`);
        res.write(`<p>Email: ${email}</p>`);
        res.end();
      });
    }
  } else if (url === '/productos') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.write('<table>');
    res.write('<tr><th>ID</th><th>Producto</th></tr>');
    productos.forEach(producto => {
      res.write(`<tr><td>${producto.id}</td><td>${producto.nombre}</td></tr>`);
    });
    res.write('</table> ');
    res.end();
  }
});

server.listen(7000, () => {
  console.log('puerto 7000');
});
