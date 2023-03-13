export function formatearDinero(cantidad) {
    return cantidad.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })
}

export function formatearFecha(tiempo) {
    const fecha = new Date(parseInt(tiempo));
    const opciones = {
        year: "numeric",
        month: "long",
        day: "2-digit"
    }
    return fecha.toLocaleDateString("es-ES", opciones)
}