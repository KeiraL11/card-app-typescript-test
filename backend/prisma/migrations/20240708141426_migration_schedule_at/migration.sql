/*
  Warnings:

  - Made the column `schedule_at` on table `Entry` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "schedule_at" DATETIME NULL
);
INSERT INTO "new_Entry" ("created_at", "description", "id", "schedule_at", "title") SELECT "created_at", "description", "id", "schedule_at", "title" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
