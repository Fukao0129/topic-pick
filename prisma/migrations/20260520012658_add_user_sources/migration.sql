-- CreateTable
CREATE TABLE "_UserSources" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserSources_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserSources_B_index" ON "_UserSources"("B");

-- AddForeignKey
ALTER TABLE "_UserSources" ADD CONSTRAINT "_UserSources_A_fkey" FOREIGN KEY ("A") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSources" ADD CONSTRAINT "_UserSources_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
