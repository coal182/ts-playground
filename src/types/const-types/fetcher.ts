// From: https://pro.codely.com/library/typescript-avanzado-mejora-tu-developer-experience-204725/

/* eslint-disable @typescript-eslint/no-explicit-any */

class EndpointPayload {}

class CreateCoursePayload extends EndpointPayload {
  constructor(public readonly title: string, public readonly startDate: Date) {
    super();
  }
}

class CreateUserPayload extends EndpointPayload {
  constructor(public readonly name: string) {
    super();
  }
}

type Endpoint = {
  name: string;
  url: string;
  payload: new (...params: any) => EndpointPayload;
};

function setupFetcher<const GetEndpoint extends Endpoint, const PostEndpoint extends Endpoint>(endpoints: {
  get: GetEndpoint[];
  post: PostEndpoint[];
}) {
  const endpointNameToUrl = (method: keyof typeof endpoints, name: string) => {
    const t = endpoints[method];

    const endpoint = t.find((t) => t.name === name);

    if (!endpoint) {
      throw new Error(`Unexpected fetcher error: Endpoint ${name} not found`);
    }

    return endpoint.url;
  };

  const post = <TName extends PostEndpoint['name'], TPayload extends Extract<PostEndpoint, { name: TName }>['payload']>(
    name: TName,
    payload: InstanceType<TPayload>
  ) => {
    console.log(endpointNameToUrl('post', name), payload.toString());
  };

  return { post };
}

const api = setupFetcher({
  get: [],
  post: [
    {
      name: 'createUser',
      url: '/api/user',
      payload: CreateUserPayload,
    },
    { name: 'createCourse', url: '/api/course', payload: CreateCoursePayload },
  ],
});

api.post('createCourse', new CreateCoursePayload('TypeScript Avanzado', new Date()));
