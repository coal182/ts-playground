export function enumMethods(): void {
  /**
   * Switch enum
   */

  const enum CourseCategory {
    FRONTEND,
    BACKEND,
    BEST_PRACTICES,
  }

  const frontendCourseCategory = CourseCategory.FRONTEND;

  function assertNever(value: never): never {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  }

  function print(courseCategory: CourseCategory): void {
    /*eslint indent: ["error", 2, {"SwitchCase": 1}]*/
    switch (courseCategory) {
      case CourseCategory.FRONTEND:
        console.log('This is the Frontend course category');
        break;
      case CourseCategory.BACKEND:
        console.log('This is the Backend course category');
        break;
      case CourseCategory.BEST_PRACTICES:
        console.log('This is the Best practices course category');
        break;
      default:
        assertNever(courseCategory);
    }
  }
  print(frontendCourseCategory);
}
