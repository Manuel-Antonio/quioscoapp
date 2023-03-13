import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === "POST") {
    const { eliminarId } = req.query;
    try {
      const ordenEliminada = await prisma.orden.delete({
        where: {
          id: parseInt(eliminarId),
        }
      });
      res.status(200).json(ordenEliminada);
    } catch (error) {
      console.log(error);
    }
  }else {
    try {
      const ordenesEliminadas = await prisma.orden.deleteMany();
      res.status(200).json(ordenesEliminadas);
    } catch (error) {
      console.log(error);
    }
  }
}
