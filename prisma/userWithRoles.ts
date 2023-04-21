import { Prisma } from '@prisma/client';

const userWithRoles = Prisma.validator<Prisma.UserArgs>()({
  include: {
    role: {
      include: {
        rights: true,
      },
    },
  },
});

export type UserWithRoles = Prisma.UserGetPayload<typeof userWithRoles>;
