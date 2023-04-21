-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Right" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Right_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RightToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Right_name_key" ON "Right"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_RightToRole_AB_unique" ON "_RightToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_RightToRole_B_index" ON "_RightToRole"("B");

-- AddForeignKey
ALTER TABLE "_RightToRole" ADD CONSTRAINT "_RightToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Right"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RightToRole" ADD CONSTRAINT "_RightToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
