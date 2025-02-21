const generarCorreoVerificacion = (token) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Verificación de Cuenta</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                text-align: center;
                padding: 20px;
            }
            .container {
                max-width: 500px;
                background: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
                margin: auto;
            }
            h2 {
                color: #333;
            }
            p {
                color: #555;
                font-size: 16px;
                line-height: 1.5;
            }
            .btn {
                display: inline-block;
                padding: 12px 25px;
                background: #ff4081;
                color: #fff;
                text-decoration: none;
                font-size: 16px;
                font-weight: bold;
                border-radius: 5px;
                margin-top: 20px;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>¡Verifica tu Cuenta!</h2>
            <p>Gracias por registrarte. Para activar tu cuenta, haz clic en el siguiente botón:</p>
            <a href="https://tusitio.com/verificar?token=${token}" class="btn">
                ✅ Verificar Cuenta
            </a>
            <p class="footer">Si no solicitaste este registro, ignora este correo.</p>
        </div>
    </body>
    </html>
    `;
};

module.exports = generarCorreoVerificacion;