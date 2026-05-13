-- Enable pgvector extension (Neon supports this natively)
CREATE EXTENSION IF NOT EXISTS vector;

-- Create vector similarity search index for AIEmbedding table
-- This index uses IVFFlat for fast approximate nearest neighbor search
-- Run AFTER prisma migrate deploy has created the tables
CREATE INDEX IF NOT EXISTS "AIEmbedding_embedding_idx" 
  ON "AIEmbedding" 
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Create index for source-based filtering
CREATE INDEX IF NOT EXISTS "AIEmbedding_source_idx" ON "AIEmbedding" (source);
CREATE INDEX IF NOT EXISTS "AIEmbedding_sourceId_idx" ON "AIEmbedding" ("sourceId");

-- Create index for analytics queries
CREATE INDEX IF NOT EXISTS "AnalyticsEvent_event_idx" ON "AnalyticsEvent" (event);
CREATE INDEX IF NOT EXISTS "AnalyticsEvent_createdAt_idx" ON "AnalyticsEvent" ("createdAt");
CREATE INDEX IF NOT EXISTS "VisitorSession_visitorId_idx" ON "VisitorSession" ("visitorId");
