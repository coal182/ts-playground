// From: https://pro.codely.com/library/typescript-avanzado-mejora-tu-developer-experience-204725/
/* eslint-disable @typescript-eslint/no-unused-vars */
type ExtractRouteParams<T> = T extends `:${infer P}/${infer Rest}`
  ? P | ExtractRouteParams<`${Rest}`>
  : T extends `:${infer P}`
  ? P
  : T extends `${infer _Start}/${infer Rest}`
  ? ExtractRouteParams<Rest>
  : never;

type RouteParamsObject<T extends string> = {
  [key in T]: string;
};

export type Route = {
  name: string;
  path: string;
};

function buildRouter<const T extends Route>(routes: T[]) {
  const getRoute = <
    RouteName extends T['name'],
    RouteParams extends RouteParamsObject<ExtractRouteParams<Extract<T, { name: RouteName }>['path']>>
  >(
    // eslint-disable-next-line prettier/prettier
      name: RouteName,
    // eslint-disable-next-line prettier/prettier
      params: RouteParams
    // eslint-disable-next-line prettier/prettier
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
  | { name: 'courses'; path: '/courses/:category/:year'; params: ['category'] };

type RouteNames = GeneratedRoutesType['name'];
//     ^?

type RouteParams = Extract<GeneratedRoutesType, { name: 'courses' }>['params'];
//     ^?

type RoutePath = Extract<GeneratedRoutesType, { name: 'courses' }>['path'];
//     ^?

const { getRoute } = buildRouter([
  {
    name: 'login',
    path: '/login',
  },
  {
    name: 'courses',
    path: '/courses/:category/:status',
  },
]);

const route = getRoute('courses', { category: 'TypeScript', status: 'enabled' });
