

// ELIMINAR CUANDO EL SOCIAL DEJE DE FUNCIONAR

import { environment } from "../../../environments/environment";



declare var require: any;

/**
 * Constante con el nombre del prefijo que se asignara al Storage del navegador.
 * @type {String}
 */
const prefix = "ns0ci@l";

/**
 * Clase para el Manejo de los datos almacenados en el Storage del navegador.
 */
export class Storage {
  /**
   * @ignore
   */
  static CryptoJS = require("crypto-js");

  /**
   * Remueve un valor en el almacenamiento local.
   * @param {string} key key Nombre del valor a remover
   */
  static remove(key: string) {
    localStorage.removeItem(`${prefix}_${key.toLowerCase()}`);
  }

  /**
   * Obtiene Un valor tipo String del almacenamiento local.
   * @param {string} key Nombre del valor a recuperar.
   * @return {string} Retorna un string con el valor.
   */
  static getOne(key: string): string | null{
    const text :any = localStorage.getItem(`${prefix}_${key.toLowerCase()}`)
    return this.decrypt(text);
  }

  /**
   * Obtiene un Objeto almacenado en el almacenamiento local.
   * @param {string} key Clave el Objeto a recuperar.
   * @return {Object} Retorna Objeto recuperado del Storage.
   */
  static getAll(key: string): Object {
    let info = localStorage.getItem(`${prefix}_${key.toLowerCase()}`);
    if (info) {
      let dcp: any = this.decrypt(info);
      try {
        dcp = dcp && typeof dcp === "string" ? JSON.parse(dcp) : dcp;

        if (dcp.IsBroker) {
          let infoSession = sessionStorage.getItem(
            `${prefix}_${key.toLowerCase()}`
          );

          if (infoSession) {
            let dcpSession: any = this.decrypt(infoSession);
            dcp = { ...dcp, ...JSON.parse(dcpSession) };
            return dcp;
          } else {
            return dcp;
          }
        } else {
          return dcp;
        }
      } catch {
        return dcp;
      }
    } else {
      return {};
    }
  }

  /**
   * Almacena un valor String en el almacenamiento local.
   * @param {string}	key		Clave del valor .
   * @param {string}	Value	Valor a almacenar.
   */
  static setOne(key: string, value: string) {
    return localStorage.setItem(
      `${prefix}_${key.toLowerCase()}`,
      this.encrypt(value)
    );
  }

  /**
   * Recupera Objecto desde el Storage del navegador.
   * @param {string}	key		Clave del Objeto para almacenar.
   * @param {any}		value	Objecto para Almacenar.
   * @returns {void}	No tiene retorno de información.
   */
  static setAll(key: string, value: any): void {
    if (value.IsBroker) {
      let { idCompany, pipedriveId, currentPipedriveId, idRequest } = value;

      const dataSession = this.encrypt(
        JSON.stringify({
          idCompany,
          pipedriveId,
          currentPipedriveId,
          idRequest,
        })
      );
      delete value.idCompany;
      delete value.pipedriveId;
      delete value.currentPipedriveId;
      delete value.idRequest;
      sessionStorage.setItem(`${prefix}_${key.toLowerCase()}`, dataSession);
    }

    let data = this.encrypt(JSON.stringify(value));
    localStorage.setItem(`${prefix}_${key.toLowerCase()}`, data);
  }

  /**
   * Remueve todos los datos del almacenamiento local.
   * @returns {void} No retorna valor.
   */
  static clear(): void {
    localStorage.clear();
  }

  /**
   * Comprueba existencia de un valor en el Storage del navegador.
   * @param {boolean} return Valor boolean si existe valor en el Storage del navegador.
   */
  static check(key: string): boolean {
    let data = localStorage.getItem(`${prefix}_${key.toLowerCase()}`);
    return data !== null;
  }

  /**
   * Convierte una cadena de texto en una encriptada.
   * @param {string} Cadena para encriptación
   */
  static encrypt(data: string) {
    if (environment.production)
      return this.CryptoJS.AES.encrypt(data, "c0l34m5k3y");
    else return data;
  }

  /**
   * Desencriptar una cadena de texto encriptada previamente.
   * @param {string} Cadena de texto para desencriptación
   */
  static decrypt(ciphertext: string) {
    let resp = "";
    let stringfy = "";
    if (ciphertext) {
      if (environment.production) {
        let bytes = this.CryptoJS.AES.decrypt(ciphertext, "c0l34m5k3y");
        stringfy = bytes.toString(this.CryptoJS.enc.Utf8);
      } else {
        stringfy = ciphertext;
      }
      try {
        return stringfy;
      } catch {
        return null;
      }
    }
    return null;
  }
}
