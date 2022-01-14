import AppError from '@shared/errors/appError';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

export default class CreateCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute({ name, icon }: ICreateCategoryDTO): Promise<Category> {
    const findCategoryByName = await this.categoryRepository.findByName(name);

    if (findCategoryByName) {
      throw new AppError('Category with that name already exists', 409);
    }

    const category = await this.categoryRepository.create({ name, icon });

    return category;
  }
}