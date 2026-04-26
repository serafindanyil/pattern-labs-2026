import { Injectable, Logger } from '@nestjs/common';
import type { IDataAccess, ICsvRow } from '../domain/interfaces/data-access.interface';
import { CompleteDomainModel } from '../domain/models/domain.model';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import csv = require('csv-parser');

@Injectable()
export class DataAccessService implements IDataAccess {
  private prisma: PrismaClient;
  private readonly logger = new Logger(DataAccessService.name);

  constructor() {
    this.prisma = new PrismaClient();
  }

  async readCsv(filePath: string): Promise<ICsvRow[]> {
    const results: ICsvRow[] = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          this.logger.log(`Read ${results.length} rows from CSV.`);
          resolve(results);
        })
        .on('error', (error) => reject(error));
    });
  }

  async saveData(data: CompleteDomainModel[]): Promise<void> {
    this.logger.log(`Starting to save ${data.length} records to DB...`);

    for (const item of data) {
      const { authLearner, specialization, course, subscription, enrollment } = item;

      const auth = await this.prisma.auth.upsert({
        where: { email: authLearner.email },
        update: { password: authLearner.password },
        create: {
          email: authLearner.email,
          password: authLearner.password,
          learner: {
            create: { fullName: authLearner.fullName },
          },
        },
        include: { learner: true },
      });

      const learnerId = auth.learner?.id;

      const spec = await this.prisma.specialization.findFirst({
        where: { title: specialization.title },
      });
      const specRecord = spec || await this.prisma.specialization.create({
        data: {
          title: specialization.title,
          description: specialization.description,
        },
      });

      const existingCourse = await this.prisma.course.findFirst({
        where: { title: course.title, specializationId: specRecord.id },
      });
      if (!existingCourse) {
        await this.prisma.course.create({
          data: { title: course.title, specializationId: specRecord.id },
        });
      }

      const subRecord = await this.prisma.subscription.findFirst({
        where: { title: subscription.title, type: subscription.type },
      }) ?? await this.prisma.subscription.create({
        data: {
          title: subscription.title,
          type: subscription.type,
          price: subscription.price,
        },
      });

      const specEnrollment = await this.prisma.specializationEnrollment.findFirst({
        where: { specializationId: specRecord.id, subscriptionId: subRecord.id },
      }) ?? await this.prisma.specializationEnrollment.create({
        data: {
          specializationId: specRecord.id,
          subscriptionId: subRecord.id,
          enrolledAt: enrollment.enrolledAt ? new Date(enrollment.enrolledAt) : new Date(),
        },
      });

      if (learnerId) {
        await this.prisma.enrollment.findFirst({
          where: { learnerId, specializationEnrollmentId: specEnrollment.id },
        }) ?? await this.prisma.enrollment.create({
          data: { learnerId, specializationEnrollmentId: specEnrollment.id },
        });
      }
    }

    this.logger.log('Finished saving records to DB.');
  }
}
