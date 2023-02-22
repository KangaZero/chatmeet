import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

async function seed() {
    const user1 = await prisma.user.create({
        data: {
          name: "John Doe",
          email: "john.doe@email.com",
          username: "johndoe",
          emailVerified: "2022-01-01T00:00:00.000Z",
          image: "https://example.com/john_doe.png",
          accounts: {
            create: [
              {
                type: "google",
                provider: "google",
                providerAccountId: "google_id_123",
                refresh_token: "refresh_token_123",
                access_token: "access_token_123",
                expires_at: 1703980800,
                token_type: "bearer",
                scope: "profile",
                id_token: "id_token_123",
                session_state: "session_state_123"
              },
              {
                type: "facebook",
                provider: "facebook",
                providerAccountId: "facebook_id_456",
                refresh_token: "refresh_token_456",
                access_token: "access_token_456",
                expires_at: 1703980800,
                token_type: "bearer",
                scope: "profile",
                id_token: "id_token_456",
                session_state: "session_state_456"
              }
            ]
          },
          sessions: {
            create: [
              {
                sessionToken: "session_token_123",
                expires: "2024-01-01T00:00:00.000Z"
              }
            ]
          }
        }
      });

  console.log( user1, "is seeded");

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Doe",
      email: "jane.doe@email.com",
      username: "janedoe",
      emailVerified: "2022-01-01T00:00:00.000Z",
      image: "https://example.com/jane_doe.png",
      accounts: {
        create: [
          {
            type: "google",
            provider: "google",
            providerAccountId: "google_id_789",
            refresh_token: "refresh_token_789",
            access_token: "access_token_789",
            expires_at: 13572468,
            token_type: "bearer",
            scope: "profile",
            id_token: "id_token_789",
            session_state: "session_state_789"
          }
        ]
      },
      sessions: {
        create: [
          {
            sessionToken: "session_token_456",
            expires: "2022-01-01T00:00:00.000Z"
          }
        ]
      }
    }
  });

}
seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })