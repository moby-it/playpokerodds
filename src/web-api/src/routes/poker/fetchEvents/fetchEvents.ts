import { Event, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from 'prisma';

(BigInt.prototype as any).toJSON = function () {
  try {
    return Number(this);
  } catch (e) {
    return this.toString();
  }
};
/**
 * Fetch paginated events endpoint.
 * @QueryParam pageSize Query Param
 * @QueryParam page Query Param - page index
 * @QueryParam term Query Param - search term
 */
export async function fetchEvents(
  req: Request,
  res: Response,
) {
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const term: string = String(req.query.term) || '' as string;
  const offset = (page - 1) * pageSize;
  let r = 'select *, count(*) over() as total from "Events"';
  if (term) {
    r += `where payload::text like '%${term}%'`;
  }
  r += `order by timestamp desc
    limit ${pageSize}
    offset ${offset}`;
  const events: Array<Event & { total?: number; }> = await prisma.$queryRaw(Prisma.raw(r));
  const total = events[0]?.total || 0;
  events.forEach(e => delete e.total);
  res.status(200).send({ events, total });
}
