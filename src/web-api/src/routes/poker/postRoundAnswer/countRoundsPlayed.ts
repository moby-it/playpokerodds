import prisma from 'prisma';

export async function countUniqueRoundsPlayed(userId: string): Promise<number> {
  const [{ count }] = (await prisma.$queryRaw`
        select count (distinct "RoundAnswers"."roundId")
        from "RoundAnswers"
                 LEFT JOIN "Rounds" R on "RoundAnswers"."roundId" = R.id
        WHERE "RoundAnswers"."userId" = ${userId}
    `) as [{ count: number }];
  return Number(count);
}
