import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import IMovieService from "@/contracts/IMovieService";
import TYPES from "@/config/types";
import { StatusCodes } from "http-status-codes";
import createError from "http-errors";

@injectable()
export class MovieController {
  private movieService: IMovieService;

  constructor(@inject(TYPES.IMovieService) movieService: IMovieService) {
    this.movieService = movieService;
  }

  getProducersWithMaxAndMinAwardIntervals = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const result =
        await this.movieService.getProducersWithMaxAndMinAwardIntervals();
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      if (error instanceof createError.HttpError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };
}
