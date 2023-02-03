import { compare } from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';
import prisma from 'prisma';

export const registerPassportMiddleware = () => {
  passport.use(
    new Strategy({ usernameField: 'username' }, async (username, password, done) => {
      const user = await prisma.user.findFirst({
        where: { username },
        include: { role: true },
      });
      if (!user) return done(new Error('user not found'));
      if (await compare(password, user?.hash)) {
        return done(null, user);
      } else {
        return done(new Error('Wrong Credentials'));
      }
    })
  );
};
