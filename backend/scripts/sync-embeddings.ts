/**
 * Portfolio Embedding Sync Script
 * 
 * Generates OpenAI embeddings for all portfolio content and stores them
 * in pgvector for semantic RAG search.
 * 
 * Usage:
 *   npx tsx scripts/sync-embeddings.ts
 * 
 * Requires: DATABASE_URL, OPENAI_API_KEY environment variables
 */

import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.slice(0, 8000),
  });
  return response.data[0].embedding;
}

async function upsert(source: string, sourceId: string, content: string) {
  const embedding = await generateEmbedding(content);
  const vectorStr = `[${embedding.join(',')}]`;

  const existing = await prisma.aIEmbedding.findFirst({
    where: { source, sourceId },
  });

  if (existing) {
    await prisma.$executeRawUnsafe(
      `UPDATE "AIEmbedding" SET content = $1, embedding = $2::vector, "updatedAt" = NOW() WHERE id = $3`,
      content,
      vectorStr,
      existing.id,
    );
    console.log(`  ✓ Updated ${source}/${sourceId}`);
  } else {
    await prisma.$executeRawUnsafe(
      `INSERT INTO "AIEmbedding" (id, source, "sourceId", content, embedding, "createdAt", "updatedAt")
       VALUES (gen_random_uuid()::text, $1, $2, $3, $4::vector, NOW(), NOW())`,
      source,
      sourceId,
      content,
      vectorStr,
    );
    console.log(`  + Created ${source}/${sourceId}`);
  }
}

async function main() {
  console.log('🔄 Syncing portfolio embeddings...\n');

  // Profiles
  console.log('📋 Profiles...');
  const profiles = await prisma.profile.findMany();
  for (const p of profiles) {
    const content = [p.name, p.headline, p.subheadline, p.summary].filter(Boolean).join('\n');
    await upsert('resume', p.id, content);
  }

  // Experiences
  console.log('💼 Experiences...');
  const experiences = await prisma.experience.findMany();
  for (const exp of experiences) {
    const content = [exp.title, exp.company, exp.description, ...(exp.bullets || [])].filter(Boolean).join('\n');
    await upsert('experience', exp.id, content);
  }

  // Projects
  console.log('🚀 Projects...');
  const projects = await prisma.project.findMany();
  for (const p of projects) {
    const content = [p.title, p.tagline, p.description, p.problem, p.solution, p.outcome, ...(p.stack || [])].filter(Boolean).join('\n');
    await upsert('project', p.id, content);
  }

  // Skills
  console.log('⚡ Skills...');
  const skillGroups = await prisma.skillGroup.findMany({ include: { skills: true } });
  for (const g of skillGroups) {
    const content = [g.name, ...g.skills.map((s) => s.name)].join('\n');
    await upsert('skill', g.id, content);
  }

  // Blog posts
  console.log('📝 Blog Posts...');
  const posts = await prisma.blogPost.findMany({ where: { published: true } });
  for (const post of posts) {
    const content = [post.title, post.excerpt, post.content, ...(post.tags || [])].filter(Boolean).join('\n');
    await upsert('blog', post.id, content);
  }

  // Case studies
  console.log('📊 Case Studies...');
  const caseStudies = await prisma.caseStudy.findMany({ where: { published: true } });
  for (const cs of caseStudies) {
    const content = [cs.title, cs.subtitle, cs.problem, cs.solution, cs.businessContext, cs.architecture, cs.workflow, ...(cs.stack || [])].filter(Boolean).join('\n');
    await upsert('service', cs.id, content);
  }

  // Summary
  const counts = await prisma.aIEmbedding.groupBy({
    by: ['source'],
    _count: { id: true },
  });

  console.log('\n✅ Sync complete!');
  console.log('Embedding counts:');
  for (const c of counts) {
    console.log(`  ${c.source}: ${c._count.id}`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('❌ Sync failed:', e);
  prisma.$disconnect();
  process.exit(1);
});
