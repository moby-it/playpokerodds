import prisma from 'prisma';

export async function getLeaderboards(): Promise<
  { username: string; score: number }[]
> {
  const leaderboardMinGames = Number(process.env['LEADERBOARD_MIN_GAMES']) ?? 0;
  const users = await prisma.user.findMany({
    include: { _count: { select: { RoundAnswer: true } } },
  });
  return users
    .filter(user => user._count.RoundAnswer >= leaderboardMinGames)
    .sort((a, b) => (a.score < b.score ? 1 : -1))
    .map(user => ({
      username: user.username,
      score: Number(user.score),
    }));
}
