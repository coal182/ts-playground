// From: https://pro.codely.com/library/typescript-avanzado-mejora-tu-developer-experience-204725/
/* eslint-disable @typescript-eslint/no-unused-vars */
export type Route = {
  name: string;
  path: string;
  params: readonly string[];
};

function buildRouter<const T extends Route>(routes: T[]) {
  const getRoute = <RouteName extends T['name'], RouteParams extends Extract<T, { name: RouteName }>['params']>(
    name: RouteName,
    params: { [key in RouteParams[number]]: string }
  ): string => {
    const route = routes.find((n) => n.name && n.name === name)!.path;

    Object.entries<string>(params).forEach(([key, value]) => {
      route.replace(`:${key}`, value);
    });

    return route;
  };
  return { getRoute };
}

// Ejemplo de narrowing que explicando el porque funciona la firma anterior
type GeneratedRoutesType =
  | { name: 'login'; path: '/login'; params: [] }
  | { name: 'courses'; path: '/courses'; params: ['category'] };

type RouteNames = GeneratedRoutesType['name'];
//     ^?

// Es como un find, extraeme  el elemento del union donde el name sea courses, y quedate con el params
type RouteParams = Extract<GeneratedRoutesType, { name: 'courses' }>['params'];
//     ^?

const { getRoute } = buildRouter([
  {
    name: 'login',
    path: '/login',
    params: [],
  },
  {
    name: 'courses',
    path: '/courses/:category',
    params: ['category', 'status'],
  },
]);

const route = getRoute('courses', { category: 'typescript', status: 'ey' });
//      ^?
