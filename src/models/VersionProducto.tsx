import Producto from "./Producto";

export default interface VersionProducto {
    id: number,
    versionProducto: string,
    fechaLanzamiento: Date,
    producto: Producto
}
