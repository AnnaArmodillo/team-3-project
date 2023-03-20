const githubUsername = '';
export const LS_KEY = `Armodillo_${githubUsername}_KEY`;
export function getQueryKey(search) {
  return ['userByEmail', search];
}
