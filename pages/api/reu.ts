import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";
import prisma from "../../lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    
    return res.redirect('https://www.google.com')
}


