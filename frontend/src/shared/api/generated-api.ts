import { baseApi as api } from "./base-api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    courseControllerFindAll: build.query<
      CourseControllerFindAllApiResponse,
      CourseControllerFindAllApiArg
    >({
      query: () => ({ url: `/api/courses` }),
    }),
    courseControllerCreate: build.mutation<
      CourseControllerCreateApiResponse,
      CourseControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/courses`,
        method: "POST",
        body: queryArg.createCourseDto,
      }),
    }),
    courseControllerFindById: build.query<
      CourseControllerFindByIdApiResponse,
      CourseControllerFindByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/courses/${queryArg.id}` }),
    }),
    courseControllerUpdate: build.mutation<
      CourseControllerUpdateApiResponse,
      CourseControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/courses/${queryArg.id}`,
        method: "PUT",
        body: queryArg.updateCourseDto,
      }),
    }),
    courseControllerRemove: build.mutation<
      CourseControllerRemoveApiResponse,
      CourseControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/courses/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    specializationControllerFindAll: build.query<
      SpecializationControllerFindAllApiResponse,
      SpecializationControllerFindAllApiArg
    >({
      query: () => ({ url: `/api/specializations` }),
    }),
    specializationControllerCreate: build.mutation<
      SpecializationControllerCreateApiResponse,
      SpecializationControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/specializations`,
        method: "POST",
        body: queryArg.createSpecializationDto,
      }),
    }),
    specializationControllerFindById: build.query<
      SpecializationControllerFindByIdApiResponse,
      SpecializationControllerFindByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/specializations/${queryArg.id}` }),
    }),
    specializationControllerUpdate: build.mutation<
      SpecializationControllerUpdateApiResponse,
      SpecializationControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/specializations/${queryArg.id}`,
        method: "PUT",
        body: queryArg.updateSpecializationDto,
      }),
    }),
    specializationControllerRemove: build.mutation<
      SpecializationControllerRemoveApiResponse,
      SpecializationControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/specializations/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as patternLabsApi };
export type CourseControllerFindAllApiResponse =
  /** status 200  */ CourseWithSpecializationDto[];
export type CourseControllerFindAllApiArg = void;
export type CourseControllerCreateApiResponse =
  /** status 201  */ CourseWithSpecializationDto;
export type CourseControllerCreateApiArg = {
  createCourseDto: CreateCourseDto;
};
export type CourseControllerFindByIdApiResponse =
  /** status 200  */ CourseWithSpecializationDto;
export type CourseControllerFindByIdApiArg = {
  /** Course ID */
  id: string;
};
export type CourseControllerUpdateApiResponse =
  /** status 200  */ CourseWithSpecializationDto;
export type CourseControllerUpdateApiArg = {
  /** Course ID */
  id: string;
  updateCourseDto: UpdateCourseDto;
};
export type CourseControllerRemoveApiResponse =
  /** status 200  */ DeleteResultDto;
export type CourseControllerRemoveApiArg = {
  /** Course ID */
  id: string;
};
export type SpecializationControllerFindAllApiResponse =
  /** status 200  */ SpecializationWithCoursesDto[];
export type SpecializationControllerFindAllApiArg = void;
export type SpecializationControllerCreateApiResponse =
  /** status 201  */ SpecializationWithCoursesDto;
export type SpecializationControllerCreateApiArg = {
  createSpecializationDto: CreateSpecializationDto;
};
export type SpecializationControllerFindByIdApiResponse =
  /** status 200  */ SpecializationWithCoursesDto;
export type SpecializationControllerFindByIdApiArg = {
  /** Specialization ID */
  id: string;
};
export type SpecializationControllerUpdateApiResponse =
  /** status 200  */ SpecializationWithCoursesDto;
export type SpecializationControllerUpdateApiArg = {
  /** Specialization ID */
  id: string;
  updateSpecializationDto: UpdateSpecializationDto;
};
export type SpecializationControllerRemoveApiResponse =
  /** status 200  */ DeleteResultDto;
export type SpecializationControllerRemoveApiArg = {
  /** Specialization ID */
  id: string;
};
export type CourseSpecializationDto = {
  id: string;
  title: string;
};
export type CourseWithSpecializationDto = {
  id: string;
  title: string;
  description: string;
  specializationId?: string | null;
  specialization?: CourseSpecializationDto | null;
};
export type CreateCourseDto = {
  title: string;
  description: string;
  specializationId?: (string | null) | null;
};
export type UpdateCourseDto = {
  title?: string;
  description?: string;
  specializationId?: (string | null) | null;
};
export type DeleteResultDto = {
  success: boolean;
};
export type CourseDto = {
  id: string;
  title: string;
  description: string;
  specializationId?: string | null;
};
export type SpecializationWithCoursesDto = {
  id: string;
  title: string;
  description: string;
  courses: CourseDto[];
};
export type CreateSpecializationDto = {
  title: string;
  description: string;
};
export type UpdateSpecializationDto = {
  title?: string;
  description?: string;
};
export const {
  useCourseControllerFindAllQuery,
  useCourseControllerCreateMutation,
  useCourseControllerFindByIdQuery,
  useCourseControllerUpdateMutation,
  useCourseControllerRemoveMutation,
  useSpecializationControllerFindAllQuery,
  useSpecializationControllerCreateMutation,
  useSpecializationControllerFindByIdQuery,
  useSpecializationControllerUpdateMutation,
  useSpecializationControllerRemoveMutation,
} = injectedRtkApi;
