import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method == "POST") {
    console.log("Que pada")
  } else {
    try {
      const aprobados = await prisma.orden.findMany({
        where: {
          estado: true,
        },
      });
      res.status(200).json(aprobados);
    } catch (error) {
      console.log(error);
    }
  }
}
