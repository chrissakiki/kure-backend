import { Request, Response } from 'express';

const getFaqsController = async (req: Request, res: Response) =>{
res.status(200).json({
data: 'test'
})
}


export { getFaqsController }