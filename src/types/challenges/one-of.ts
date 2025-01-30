interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

type OneOf<T, KEYS extends keyof T = keyof T> = {
  [key in KEYS]-?: { [R in Extract<KEYS, key>]: T[R] } & { [U in Exclude<KEYS, key>]?: never };
}[KEYS];

type OneContactInfo = OneOf<ContactInfo>;

const oneOf: OneOf<ContactInfo> = {
  phone: '123456789',
  //  email: 'email@gmail.com',
};
