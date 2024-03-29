import { PrismaClient } from '@prisma/client';

async function tearDown(prisma: PrismaClient) {
  await prisma.user.deleteMany();
  await prisma.round.deleteMany();
  await prisma.event.deleteMany();
  await prisma.roundAnswer.deleteMany();
  await prisma.userFavoriteRounds.deleteMany();
  await prisma.$disconnect();
}
export const mockDb = { tearDown };
