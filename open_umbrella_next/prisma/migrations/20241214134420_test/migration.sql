-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "providers" TEXT[],
    "providerIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Umbrella" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Umbrella_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UmbrellaLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "umbrellaId" TEXT NOT NULL,

    CONSTRAINT "UmbrellaLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Umbrella_number_key" ON "Umbrella"("number");

-- CreateIndex
CREATE INDEX "UmbrellaLog_userId_idx" ON "UmbrellaLog"("userId");

-- CreateIndex
CREATE INDEX "UmbrellaLog_umbrellaId_idx" ON "UmbrellaLog"("umbrellaId");

-- AddForeignKey
ALTER TABLE "UmbrellaLog" ADD CONSTRAINT "UmbrellaLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UmbrellaLog" ADD CONSTRAINT "UmbrellaLog_umbrellaId_fkey" FOREIGN KEY ("umbrellaId") REFERENCES "Umbrella"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
