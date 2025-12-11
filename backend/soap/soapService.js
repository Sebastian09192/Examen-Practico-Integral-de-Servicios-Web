const soap = require("soap");
const fs = require("fs");
const path = require("path");

module.exports = function(app) {
    const service = {
        DataCareService: {
            DataCarePort: {
                sumar({ a, b }) {
                    return { resultado: a + b };
                },
                validar({ nombre }) {
                    return { valido: nombre.length > 3 };
                }
            }
        }
    };

    const wsdl = fs.readFileSync(path.join(__dirname, "datacare.wsdl"), "utf8");

    const server = app.listen(8001, () => {
        soap.listen(server, "/wsdl", service, wsdl);
        console.log("SOAP corriendo en http://localhost:8001/wsdl?wsdl");
    });
};
