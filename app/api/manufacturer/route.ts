import {db} from '@/prisma/db';

export const dynamic = "force-dynamic";

export async function GET(req:Request) {

    const data = await db.manufacturer.findMany()
    return Response.json({ data })
}
