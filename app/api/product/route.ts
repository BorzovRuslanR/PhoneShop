import {db} from '@/prisma/db';

export const dynamic = "force-dynamic";

export async function GET(req:Request) {

    const data = await db.product.findMany()

    return Response.json({data})
}
