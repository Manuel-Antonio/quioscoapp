import {categorias} from "./data/categorias";
import {productos} from "./data/productos";
import {PrismaClient} from "@prisma/client";

const main = async () => {
    const prisma = new PrismaClient();
    try {
        await prisma.categoria.createMany(
            {
                data: categorias
            }
        );

        await prisma.producto.createMany(
            {
                data: productos
            }
        );
    } catch (error) {
        console.log(error)
    }
}

main();