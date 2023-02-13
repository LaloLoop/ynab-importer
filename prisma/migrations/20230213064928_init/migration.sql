-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "last_modified_on" DATETIME NOT NULL,
    "first_month" DATETIME NOT NULL
);
