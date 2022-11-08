import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.query.url && !req.query.id) {
        const count = await prisma.url.count()
        const { url } = req.query
        await prisma.url.create({
            data: {
                id: count + 1,
                short_url: `${process.env.DOMAIN_NAME}/geturl?id=${count + 1}`,
                long_url: `${url}`
            }
        })

        return res.status(200).json({ short_url: `${process.env.DOMAIN_NAME}/api/gu?id=${count + 1}` })

    } else if (req.query.id && !req.query.url) {
        const id = Number(req.query.id)
        const url = await prisma.url.findUnique({
            where: {
                id: id
            }
        })
        console.log(`${url.long_url}`)
        return res.redirect(`${url.long_url}`)
    }

    return res.status(400).json({ error: 'Something went wrong' })

}