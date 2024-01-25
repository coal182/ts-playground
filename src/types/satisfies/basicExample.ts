type Route = { path: string; children?: Routes };
type Routes = Record<string, Route>;

const routesWithColon: Routes = {
  AUTH: {
    path: '/auth',
  },
  LIST: {
    path: '/list',
  },
  LOGIN: {
    path: '/login',
  },
};

routesWithColon.AUTH.path;
routesWithColon.LOGOUT.path; // LOGOUT does not exists

const routesWithAs = {} as Routes; // Allows everything

const routesWithSatisfies = {
  AUTH: {
    path: '/auth',
  },
  LIST: {
    path: '/list',
  },
  LOGIN: {
    path: '/login',
  },
} satisfies Routes;
//          ^?

routesWithSatisfies.LOGIN.path; // Autocompletes with AUTH|LIST|LOGIN
//      ^?

// @ts-expect-error: throws error if LOGOUT NOT EXISTS
routesWithSatisfies.LOGOUT.path;

const routesWithSatisfiesAncConst = {
  AUTH: {
    path: '/auth',
  },
  LIST: {
    path: '/list',
  },
  LOGIN: {
    path: '/login',
  },
} as const satisfies Routes;

routesWithSatisfiesAncConst; // specifies concrete exact values for paths
//  ^?
