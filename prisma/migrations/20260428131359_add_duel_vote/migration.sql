-- CreateTable
CREATE TABLE "duel_votes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ipHash" TEXT NOT NULL,
    "choice" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "duel_votes_ipHash_key" ON "duel_votes"("ipHash");

-- CreateIndex
CREATE INDEX "duel_votes_choice_idx" ON "duel_votes"("choice");
