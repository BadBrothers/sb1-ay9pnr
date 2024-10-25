import { PrismaClient } from '@prisma/client';
import { politicians } from '../src/services/politicianService';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.statement.deleteMany();
  await prisma.billVote.deleteMany();
  await prisma.coverage.deleteMany();
  await prisma.bill.deleteMany();
  await prisma.politician.deleteMany();

  // Seed politicians
  for (const politician of politicians) {
    await prisma.politician.create({
      data: {
        id: politician.id,
        name: politician.name,
        position: politician.position,
        state: politician.state,
        district: politician.district,
        party: politician.party,
        nextElection: politician.nextElection,
        rating: politician.rating,
        website: politician.website,
        imageUrl: politician.imageUrl,
      },
    });
  }

  console.log('Database has been seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });