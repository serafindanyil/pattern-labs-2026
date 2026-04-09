export interface SpecializationModel {
  title: string;
  description: string;
}

export interface CourseModel {
  title: string;
  specializationTitle: string;
}

export interface SubscriptionModel {
  title: string;
  type: string;
  price: number;
}

export interface AuthLearnerModel {
  email: string;
  password: string;
  fullName: string;
}

export interface EnrollmentModel {
  learnerEmail: string;
  specializationTitle: string;
  subscriptionTitle: string;
  subscriptionType: string;
  enrolledAt: string;
}

export interface CompleteDomainModel {
  authLearner: AuthLearnerModel;
  specialization: SpecializationModel;
  course: CourseModel;
  subscription: SubscriptionModel;
  enrollment: EnrollmentModel;
}
