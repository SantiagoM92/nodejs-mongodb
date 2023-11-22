import { BadGatewayException, Injectable } from '@nestjs/common';
import { IBaseService } from '../base/IBase.service';
import { BaseEntity } from './base.entity';
import { Model } from 'mongoose';

@Injectable()
export class BaseService<T extends BaseEntity> implements IBaseService<T> {
	
	constructor(private readonly basemodule: Model<T>) { }

	async findAll(): Promise<T[]> {
	 try{
		return this.basemodule.find().exec();
	 } catch (error) {
			throw new BadGatewayException(error);
		}
	}
	async get(id: number): Promise<T> {
		try{
			const customer = await this.basemodule.findById(id).exec();
			return customer;
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}
	async update(entity: T): Promise<T> {
		
		return null;
	}
	async delete(id: number) {
		return null;
	}

	async create(entity: T): Promise<T> {
		try{
			const newEntity = new this.basemodule(entity);
			const savedEntity = await newEntity.save();
			return savedEntity.toObject() as T;
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

}