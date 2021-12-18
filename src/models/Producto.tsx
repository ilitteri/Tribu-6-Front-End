import VersionProducto from './VersionProducto'

export default interface Producto {
    id: number,
    nombre: string,
    versionesProducto: Array<VersionProducto>
}
