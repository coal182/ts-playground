function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U): string {
  return 'Value ' + obj[key];
}

console.log(extractAndConvert({ name: 'Cris' }, 'name'));
