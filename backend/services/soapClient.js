const soap = require("soap");

const SOAP_URL = "http://localhost:8001/wsdl?wsdl";

module.exports = {
  async sumar(a, b) {
    try {
      const client = await soap.createClientAsync(SOAP_URL);
      const args = { a: Number(a), b: Number(b) };

      const [result] = await client.sumarAsync(args);
      return result;
    } catch (err) {
      console.error("ERROR EN SUMAR:", err);
      throw { error: "Error al consumir SOAP (sumar)" };
    }
  },

  async validar(nombre) {
    try {
      const client = await soap.createClientAsync(SOAP_URL);
      const args = { nombre };

      const [result] = await client.validarAsync(args);
      return result;
    } catch (err) {
      console.error("ERROR EN VALIDAR:", err);
      throw { error: "Error al consumir SOAP (validar)" };
    }
  }
};
